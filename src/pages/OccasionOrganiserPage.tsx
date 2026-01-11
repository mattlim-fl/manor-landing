import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import { Loader2, AlertCircle, Calendar, Users, Ticket, Share2 } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip'
import { getSupabase } from '../lib/supabaseClient'
import Header from '../components/Header'
import Footer from '../components/Footer'

interface OccasionDetails {
  id: string
  occasion_name: string
  booking_date: string
  venue: 'manor' | 'hippie'
  capacity: number
  ticket_price_cents: number
  share_token: string
  organiser_token: string
  customer_name: string | null
  total_bookings: number
  total_guests: number
  remaining_capacity: number
}

interface GuestBooking {
  id: string
  customer_name: string | null
  customer_email: string | null
  ticket_quantity: number
  created_at: string
  parent_booking_id: string | null
  is_occasion_organiser: boolean
  booking_source: string | null
  square_payment_id: string | null
  booking_guests: { guest_name: string }[]
}

export default function OccasionOrganiserPage() {
  const { token } = useParams<{ token: string }>()
  const [loading, setLoading] = useState(true)
  const [occasion, setOccasion] = useState<OccasionDetails | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [guestList, setGuestList] = useState<GuestBooking[]>([])
  const [allGuests, setAllGuests] = useState<{ name: string; invitedBy: string; isOrganiser: boolean; isEditable: boolean; bookingId: string; index: number }[]>([])
  const [editingGuests, setEditingGuests] = useState<{ [key: string]: string }>({})
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    if (!token) {
      setError('Invalid link')
      setLoading(false)
      return
    }

    const loadOccasion = async () => {
      try {
        const supabase = getSupabase()

        // Fetch the occasion by organiser token
        const { data: occasion, error: occasionError } = await supabase
          .from('bookings')
          .select('*')
          .eq('organiser_token', token)
          .eq('booking_type', 'occasion')
          .eq('is_occasion_organiser', true)
          .single()

        if (occasionError || !occasion) {
          setError('This link is invalid or has expired')
          setLoading(false)
          return
        }

        // Get child booking stats and guest list with their guests
        const { data: childBookings, error: childBookingsError } = await supabase
          .from('bookings')
          .select('id, customer_name, customer_email, ticket_quantity, created_at, parent_booking_id, is_occasion_organiser, booking_source, square_payment_id, booking_guests(guest_name)')
          .eq('parent_booking_id', occasion.id)
          .neq('status', 'cancelled')
          .order('created_at', { ascending: false })

        if (childBookingsError) {
          console.error('Error fetching child bookings:', childBookingsError)
        }

        const total_bookings = childBookings?.length || 0
        const total_guests = childBookings?.reduce((sum, b) => sum + (b.ticket_quantity || 0), 0) || 0
        const remaining_capacity = (occasion.capacity || 0) - total_guests

        // Store guest list
        setGuestList(childBookings || [])

        // Fetch organiser's own booking guests from the parent booking
        const { data: organiserGuests, error: organiserGuestsError } = await supabase
          .from('booking_guests')
          .select('guest_name')
          .eq('booking_id', occasion.id)
          .order('created_at')

        if (organiserGuestsError) {
          console.error('Error fetching organiser guests:', organiserGuestsError)
        }

        // Build flat list of all guests with who invited them
        const guests: { name: string; invitedBy: string; isOrganiser: boolean; isEditable: boolean; bookingId: string; index: number }[] = []
        
        const organiserEmail = occasion.customer_email?.toLowerCase() || ''
        const organiserName = occasion.customer_name || 'Organiser'
        
        // Add organiser's own tickets (from parent booking)
        const organiserTicketQuantity = occasion.ticket_quantity || 0
        for (let i = 0; i < organiserTicketQuantity; i++) {
          const guestName = organiserGuests?.[i]?.guest_name || ''
          guests.push({
            name: guestName,
            invitedBy: organiserName,
            isOrganiser: i === 0,
            isEditable: true,
            bookingId: occasion.id,
            index: i
          })
        }
        
        // Track if we've marked the organiser yet
        let organiserMarked = organiserTicketQuantity > 0
        
        // Add all guests from child bookings
        childBookings?.forEach((booking) => {
          const customerName = booking.customer_name || 'Unknown'
          const ticketQuantity = booking.ticket_quantity || 0
          const existingGuests = booking.booking_guests || []
          
          const bookingEmail = booking.customer_email?.toLowerCase() || ''
          const isOrganiserBooking = organiserEmail && bookingEmail && bookingEmail === organiserEmail
          
          const isStaffAdded = booking.booking_source === 'admin' || 
                               customerName.toLowerCase().includes('staff') || 
                               customerName.toLowerCase().includes('walk-in')
          
          const isEditable = isOrganiserBooking || isStaffAdded
          const invitedByLabel = isOrganiserBooking ? organiserName : customerName
          
          for (let i = 0; i < ticketQuantity; i++) {
            const guestName = existingGuests[i]?.guest_name || ''
            const shouldMarkAsOrganiser = isOrganiserBooking && !organiserMarked && i === 0
            
            if (shouldMarkAsOrganiser) {
              organiserMarked = true
            }
            
            guests.push({
              name: guestName,
              invitedBy: invitedByLabel,
              isOrganiser: shouldMarkAsOrganiser,
              isEditable,
              bookingId: booking.id,
              index: i
            })
          }
        })

        // Sort guests to ensure organiser is always at the top
        guests.sort((a, b) => {
          if (a.isOrganiser && !b.isOrganiser) return -1
          if (!a.isOrganiser && b.isOrganiser) return 1
          return 0
        })

        setAllGuests(guests)
        
        // Initialize editing state with current names
        const initialEditing: { [key: string]: string } = {}
        guests.forEach((guest, idx) => {
          initialEditing[`${guest.bookingId}-${guest.index}`] = guest.name
        })
        setEditingGuests(initialEditing)

        setOccasion({
          id: occasion.id,
          occasion_name: occasion.occasion_name || '',
          booking_date: occasion.booking_date,
          venue: occasion.venue,
          capacity: occasion.capacity || 0,
          ticket_price_cents: occasion.ticket_price_cents || 1000,
          share_token: occasion.share_token,
          organiser_token: occasion.organiser_token,
          customer_name: occasion.customer_name,
          total_bookings,
          total_guests,
          remaining_capacity,
        })
      } catch (err) {
        console.error('Error loading occasion:', err)
        setError('Failed to load occasion details')
      } finally {
        setLoading(false)
      }
    }

    loadOccasion()
  }, [token])

  const shareUrl = occasion?.share_token 
    ? `${window.location.origin}/occasion/buy/${occasion.share_token}`
    : ''

  const copyShareLink = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl)
      const button = document.getElementById('share-button')
      if (button) {
        button.textContent = 'Copied!'
        setTimeout(() => {
          button.textContent = 'Share'
        }, 2000)
      }
    }
  }

  const handleGuestNameChange = (bookingId: string, index: number, value: string) => {
    const key = `${bookingId}-${index}`
    setEditingGuests(prev => ({
      ...prev,
      [key]: value
    }))
    setSaveSuccess(false)
  }

  const saveGuestList = async () => {
    if (!occasion) return
    
    setSaving(true)
    setSaveSuccess(false)
    
    try {
      const supabase = getSupabase()
      
      // Group ONLY EDITABLE guests by booking ID
      const guestsByBooking: { [bookingId: string]: string[] } = {}
      
      allGuests
        .filter(guest => guest.isEditable)
        .forEach((guest) => {
          if (!guestsByBooking[guest.bookingId]) {
            guestsByBooking[guest.bookingId] = []
          }
          const key = `${guest.bookingId}-${guest.index}`
          const name = editingGuests[key] || ''
          guestsByBooking[guest.bookingId].push(name)
        })
      
      // Update each booking's guests
      for (const [bookingId, names] of Object.entries(guestsByBooking)) {
        await supabase
          .from('booking_guests')
          .delete()
          .eq('booking_id', bookingId)
        
        if (names.length > 0) {
          const toInsert = names.map((name) => ({
            booking_id: bookingId,
            guest_name: name.trim(),
          }))
          
          await supabase
            .from('booking_guests')
            .insert(toInsert)
        }
      }
      
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (err) {
      console.error('Error saving guest list:', err)
      alert('Failed to save guest list. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const formattedDate = occasion?.booking_date
    ? format(parseISO(occasion.booking_date), 'EEEE, MMMM d, yyyy')
    : ''

  const ticketPriceDisplay = occasion?.ticket_price_cents
    ? (occasion.ticket_price_cents / 100).toLocaleString('en-AU', { style: 'currency', currency: 'AUD' })
    : '$0.00'

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col leopard-bg text-white relative">
        <div className="absolute inset-0 bg-black/30" />
        <Header />
        <main className="relative z-10 flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
        </main>
        <Footer />
      </div>
    )
  }

  // Error state
  if (error || !occasion) {
    return (
      <div className="min-h-screen flex flex-col leopard-bg text-white relative">
        <div className="absolute inset-0 bg-black/30" />
        <Header />
        <main className="relative z-10 flex-1 flex items-center justify-center px-4">
          <div className="text-center space-y-4 max-w-md">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
            <h1 className="text-xl font-medium">{error || 'Something went wrong'}</h1>
            <p className="text-gray-400">This link may be invalid or expired.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Main organiser view
  return (
    <div className="min-h-screen flex flex-col leopard-bg text-white relative">
      <div className="absolute inset-0 bg-black/30" />
      
      <Header />
      <main className="relative z-10 flex-1 mx-auto flex max-w-3xl w-full flex-col px-4 pt-32 pb-12">
        <h1 
          className="font-blur font-bold text-2xl md:text-3xl tracking-wider uppercase text-center"
          style={{ color: '#E59D50' }}
        >
          {occasion.occasion_name}
        </h1>
        <p 
          className="mt-2 text-sm font-acumin text-center"
          style={{ color: '#E59D50' }}
        >
          Manage your occasion and view your guest list
        </p>

        {/* Your Booking Card */}
        <div className="mt-6 space-y-4 rounded-lg border border-gray-200 bg-white/90 p-6">
          <h4 className="text-lg font-semibold text-gray-900">Your Booking</h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-xs text-gray-600">Date</p>
                <p className="text-sm font-medium text-gray-900">{formattedDate}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Ticket className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-xs text-gray-600">Ticket Price</p>
                <p className="text-sm font-medium text-gray-900">{ticketPriceDisplay}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-xs text-gray-600">Total group size</p>
                <p className="text-sm font-medium text-gray-900">{occasion.total_guests} / {occasion.capacity}</p>
              </div>
            </div>
          </div>

          {shareUrl && (
            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-600 mb-2">Invite your friends:</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-xs font-mono text-gray-700"
                />
                <Button 
                  id="share-button"
                  onClick={copyShareLink}
                  size="sm"
                  className="bg-gray-900 text-white hover:bg-gray-800 shrink-0"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Invite your friends
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Your Guests Table */}
        <div className="mt-6 space-y-4 rounded-lg border border-gray-200 bg-white/90 p-6">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-900">Your Guests</h4>
            {allGuests.length > 0 && (
              <Button 
                onClick={saveGuestList}
                disabled={saving}
                size="sm"
                className="bg-gray-900 text-white hover:bg-gray-800"
              >
                {saving ? 'Saving...' : 'Save guest list'}
              </Button>
            )}
          </div>

          {saveSuccess && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-xs text-green-800">
                Guest list saved. Our team will see the latest names on the door list.
              </p>
            </div>
          )}

          {allGuests.length === 0 ? (
            <div className="py-8 text-center">
              <Users className="h-12 w-12 mx-auto mb-3 text-gray-400" />
              <p className="text-sm text-gray-600">No guests yet</p>
              <p className="text-xs text-gray-500 mt-1">Share the link above to invite guests</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">#</th>
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Guest Name</th>
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Invited By</th>
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Tags</th>
                  </tr>
                </thead>
                <tbody>
                  {allGuests.map((guest, idx) => {
                    const key = `${guest.bookingId}-${guest.index}`
                    const currentValue = editingGuests[key] || ''
                    
                    return (
                      <tr key={idx} className="border-b border-gray-100">
                        <td className="py-3 px-2 text-sm text-gray-900">{idx + 1}</td>
                        <td className="py-2 px-2">
                          {guest.isEditable ? (
                            <input
                              type="text"
                              value={currentValue}
                              onChange={(e) => handleGuestNameChange(guest.bookingId, guest.index, e.target.value)}
                              placeholder={`Guest ${idx + 1} full name`}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                            />
                          ) : (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <input
                                    type="text"
                                    value={currentValue}
                                    disabled
                                    placeholder={`Guest ${idx + 1} full name`}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 text-sm text-gray-500 placeholder:text-gray-400 cursor-not-allowed"
                                  />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Guest added via share link - contact them to update</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </td>
                        <td className="py-3 px-2 text-sm text-gray-600">{guest.invitedBy}</td>
                        <td className="py-3 px-2">
                          {guest.isOrganiser && (
                            <Badge 
                              variant="secondary" 
                              className="bg-amber-100 text-amber-800 hover:bg-amber-100"
                            >
                              Organiser
                            </Badge>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          {allGuests.length > 0 && (
            <p className="text-xs text-gray-500 mt-4">
              You can update this list any time using this link. Changes will be reflected on the door list.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

