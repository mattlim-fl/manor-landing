import { useEffect, useMemo, useState } from 'react'
import getSupabase from '../lib/supabaseClient'
import { Button } from './ui/button'
import { Users, Share2, Check, Calendar, Clock } from 'lucide-react'

interface BookingDetails {
  referenceCode: string
  bookingDate: string
  startTime: string
  endTime: string
  boothName: string
  guestCount: number
}

interface GuestEntry {
  id: string | null  // null for empty slots
  name: string
  isOrganiser: boolean
}

interface LinkedBooking {
  id: string
  customerName: string
  ticketQuantity: number
  guests: { name: string; isOrganiser: boolean }[]
}

interface GuestListEditorProps {
  bookingId: string
  token?: string
  readOnly?: boolean
  heading?: string
  subheading?: string
  showBookingDetails?: boolean
  showLinkedBookings?: boolean // Show guests from linked bookings (shared link purchases)
}

function formatDateAU(iso?: string): string {
  if (!iso) return ''
  try {
    const d = new Date(iso + 'T00:00:00')
    return d.toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  } catch {
    return iso
  }
}

function formatTime12h(time24?: string): string {
  if (!time24) return ''
  try {
    const [hours, minutes] = time24.slice(0, 5).split(':').map(Number)
    if (isNaN(hours) || isNaN(minutes)) return time24
    const period = hours >= 12 ? 'PM' : 'AM'
    const hour12 = hours % 12 || 12
    return `${hour12}:${String(minutes).padStart(2, '0')} ${period}`
  } catch {
    return time24
  }
}

export default function GuestListEditor({
  bookingId,
  token,
  readOnly = false,
  heading = 'Guest list',
  subheading = 'Add the names of the guests who will be using your tickets so they are on the door when they arrive.',
  showBookingDetails = true,
  showLinkedBookings = true,
}: GuestListEditorProps) {
  const [maxGuests, setMaxGuests] = useState<number | null>(null)
  const [guests, setGuests] = useState<GuestEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null)
  const [linkedBookings, setLinkedBookings] = useState<LinkedBooking[]>([])
  const [hasShareToken, setHasShareToken] = useState(false)
  const [shareToken, setShareToken] = useState<string | null>(null)
  const [linkCopied, setLinkCopied] = useState(false)

  const supabase = useMemo(() => getSupabase(), [])

  // Build share URL from current origin
  const shareUrl = useMemo(() => {
    if (!shareToken) return null
    const origin = window.location.origin
    return `${origin}/tickets/${shareToken}`
  }, [shareToken])

  // Calculate total guests across all bookings
  const totalGuestCount = useMemo(() => {
    // Count guests with names in this booking
    const ownGuests = guests.filter(g => g.name.trim()).length
    // Count all guests from linked bookings
    const linkedGuests = linkedBookings.reduce((sum, lb) => sum + lb.guests.length, 0)
    return ownGuests + linkedGuests
  }, [guests, linkedBookings])

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      if (!bookingId) return
      setLoading(true)
      setError(null)
      setSaved(false)
      try {
        // Fetch booking to get max guests and booking details
        const { data: booking, error: bookingError } = await supabase
          .from('bookings')
          .select('ticket_quantity, guest_count, reference_code, booking_date, start_time, end_time, karaoke_booth_id, share_token, booking_type, is_occasion_organiser, capacity')
          .eq('id', bookingId)
          .single()

        if (bookingError) {
          throw bookingError
        }

        // For occasion organiser bookings, use capacity instead of ticket_quantity
        const isOccasionOrganiser = booking?.booking_type === 'occasion' && booking?.is_occasion_organiser === true
        const ticketQty = isOccasionOrganiser 
          ? (booking?.capacity || 0)
          : (booking?.ticket_quantity || booking?.guest_count || 0)
        const hasToken = Boolean(booking?.share_token)
        const tokenValue = booking?.share_token || null

        // Fetch booth name if available
        let boothName = ''
        if (booking?.karaoke_booth_id) {
          const { data: booth } = await supabase
            .from('karaoke_booths')
            .select('name')
            .eq('id', booking.karaoke_booth_id)
            .single()
          boothName = booth?.name || ''
        }

        // Fetch existing guest names with is_organiser flag
        // Order by is_organiser DESC to ensure organiser is first, then by created_at
        const { data: guestRows, error: guestsError } = await supabase
          .from('booking_guests')
          .select('id, guest_name, is_organiser')
          .eq('booking_id', bookingId)
          .order('is_organiser', { ascending: false })
          .order('created_at', { ascending: true })

        if (guestsError) {
          throw guestsError
        }

        // Convert to GuestEntry array
        const existingGuests: GuestEntry[] = (guestRows || []).map((r: { id: string; guest_name: string; is_organiser: boolean }) => ({
          id: r.id,
          name: r.guest_name,
          isOrganiser: r.is_organiser || false,
        }))

        // Check if organiser exists - if so, max = ticketQty + 1 (organiser + guests)
        // For occasion organiser bookings, capacity already includes all guests, so don't add 1
        const hasOrganiser = existingGuests.some((g) => g.isOrganiser)
        const max = isOccasionOrganiser 
          ? ticketQty  // Capacity already represents total guests
          : (hasOrganiser ? ticketQty + 1 : ticketQty)

        // Fetch linked bookings (guests who used the share link)
        let linked: LinkedBooking[] = []
        if (showLinkedBookings && hasToken) {
          const { data: linkedRows, error: linkedError } = await supabase
            .from('bookings')
            .select('id, customer_name, ticket_quantity')
            .eq('parent_booking_id', bookingId)
            .order('created_at', { ascending: true })

          if (!linkedError && linkedRows && linkedRows.length > 0) {
            // Fetch guests for all linked bookings
            const linkedIds = linkedRows.map((r: { id: string }) => r.id)
            const { data: linkedGuestRows } = await supabase
              .from('booking_guests')
              .select('booking_id, guest_name, is_organiser')
              .in('booking_id', linkedIds)
              .order('is_organiser', { ascending: false })
              .order('created_at', { ascending: true })

            // Group guests by booking_id
            const guestsByBooking: Record<string, { name: string; isOrganiser: boolean }[]> = {}
            for (const g of (linkedGuestRows || [])) {
              if (!guestsByBooking[g.booking_id]) {
                guestsByBooking[g.booking_id] = []
              }
              guestsByBooking[g.booking_id].push({
                name: g.guest_name,
                isOrganiser: g.is_organiser || false,
              })
            }

            linked = linkedRows.map((r: { id: string; customer_name: string; ticket_quantity: number }) => ({
              id: r.id,
              customerName: r.customer_name,
              ticketQuantity: r.ticket_quantity || 1,
              guests: guestsByBooking[r.id] || [],
            }))
          }
        }

        if (!cancelled) {
          setMaxGuests(max)
          setHasShareToken(hasToken)
          setShareToken(tokenValue)
          setLinkedBookings(linked)
          setBookingDetails({
            referenceCode: booking?.reference_code || '',
            bookingDate: booking?.booking_date || '',
            startTime: booking?.start_time || '',
            endTime: booking?.end_time || '',
            boothName,
            guestCount: max,
          })
          if (max > 0) {
            // Pad with empty slots up to max
            const padded: GuestEntry[] = [...existingGuests]
            while (padded.length < max) {
              padded.push({ id: null, name: '', isOrganiser: false })
            }
            setGuests(padded.slice(0, max))
          } else {
            setGuests([])
          }
        }
      } catch (e) {
        if (!cancelled) {
          const msg = e instanceof Error ? e.message : (e as { message?: string })?.message || 'Failed to load guest list'
          setError(msg)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    load()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingId, token, showLinkedBookings])

  const handleChangeName = (index: number, value: string) => {
    setGuests((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], name: value }
      return next
    })
    setSaved(false)
    setError(null)
  }

  const copyShareLink = async () => {
    if (!shareUrl) return
    try {
      // Use native share sheet on mobile if available
      if (navigator.share) {
        await navigator.share({
          title: 'Join me for 25+ Priority Entry',
          text: 'Join me for 25+ Priority Entry at Manor',
          url: shareUrl,
        })
        return
      }
      
      // Fallback to clipboard copy on desktop
      await navigator.clipboard.writeText(shareUrl)
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
    } catch (err) {
      // User cancelled share or clipboard failed - silently handle
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error('Failed to share/copy link:', err)
      }
    }
  }

  const handleSave = async () => {
    if (readOnly) return
    if (!bookingId) return

    // Validate organiser name is not empty
    const organiser = guests.find((g) => g.isOrganiser)
    if (organiser && !organiser.name.trim()) {
      setError('Organiser name cannot be empty')
      return
    }

    setSaving(true)
    setError(null)
    setSaved(false)
    try {
      // Update organiser's name if they exist
      if (organiser && organiser.id) {
        const { error: updateError } = await supabase
          .from('booking_guests')
          .update({ guest_name: organiser.name.trim() })
          .eq('id', organiser.id)

        if (updateError) {
          throw updateError
        }
      }

      // Delete existing non-organiser guests
      const { error: deleteError } = await supabase
        .from('booking_guests')
        .delete()
        .eq('booking_id', bookingId)
        .eq('is_organiser', false)

      if (deleteError) {
        throw deleteError
      }

      // Insert new non-organiser guest names
      const nonOrganiserGuests = guests
        .filter((g) => !g.isOrganiser && g.name.trim().length > 0)
        .map((g) => ({
          booking_id: bookingId,
          guest_name: g.name.trim(),
          is_organiser: false,
        }))

      if (nonOrganiserGuests.length > 0) {
        const { error: insertError } = await supabase
          .from('booking_guests')
          .insert(nonOrganiserGuests)

        if (insertError) {
          throw insertError
        }
      }

      setSaved(true)
    } catch (e) {
      const msg = e instanceof Error ? e.message : (e as { message?: string })?.message || 'Failed to save guest list'
      setError(msg)
    } finally {
      setSaving(false)
    }
  }

  if (loading && maxGuests === null) {
    return (
      <div className="mt-6 rounded-lg border border-dashed border-gray-600 p-4 text-sm text-gray-400">
        Loading booking details…
      </div>
    )
  }

  if (maxGuests !== null && maxGuests <= 0) {
    return null
  }

  const formattedDate = bookingDetails ? formatDateAU(bookingDetails.bookingDate) : ''
  const formattedTime = bookingDetails 
    ? `${formatTime12h(bookingDetails.startTime)} – ${formatTime12h(bookingDetails.endTime)}`
    : ''

  return (
    <div className="mt-4 space-y-6">
      {/* Booking Details Card */}
      {showBookingDetails && bookingDetails && (
        <div className="rounded-xl border border-orange-300 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h4 className="text-base font-semibold text-gray-900">Your Booking</h4>
              {bookingDetails.referenceCode && (
                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                  {bookingDetails.referenceCode}
                </span>
              )}
            </div>
            {shareUrl && (
              <Button
                variant="default"
                size="sm"
                onClick={copyShareLink}
                className="h-8 px-3 text-xs"
              >
                {linkCopied ? (
                  <>
                    <Check className="h-3 w-3 mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Share2 className="h-3 w-3 mr-1" />
                    Share
                  </>
                )}
              </Button>
            )}
          </div>
          <div className="grid gap-3 text-sm">
            {formattedDate && (
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="font-medium text-gray-900">{formattedDate}</p>
                </div>
              </div>
            )}
            {formattedTime && (
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Time</p>
                  <p className="font-medium text-gray-900">{formattedTime}</p>
                </div>
              </div>
            )}
            {bookingDetails.boothName && (
              <div className="flex items-center gap-3">
                <span className="text-lg">🎤</span>
                <div>
                  <p className="text-xs text-gray-500">Booth</p>
                  <p className="font-medium text-gray-900">{bookingDetails.boothName}</p>
                </div>
              </div>
            )}
            {(totalGuestCount > 0 || linkedBookings.length > 0) && (
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-gray-500" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Total group size</p>
                  <p className="font-medium text-gray-900">
                    {totalGuestCount} {totalGuestCount === 1 ? 'person' : 'people'}
                  </p>
                  {linkedBookings.length > 0 && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      {linkedBookings.length} {linkedBookings.length === 1 ? 'friend' : 'friends'} purchased via invite link
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Unified Guest List Table */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 space-y-4">
        <div>
          <h4 className="text-base font-semibold text-gray-900">{heading}</h4>
        </div>

        {error && (
          <p className="text-xs text-red-600">
            {error}
          </p>
        )}

        {/* Table */}
        <div className="overflow-x-auto -mx-5 px-5">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 w-12">#</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 min-w-[200px]">Guest Name</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 min-w-[150px]">Invited By</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 w-24">Tags</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                let rowNumber = 1
                const rows: JSX.Element[] = []

                // Add organiser's guests with names (or organiser)
                guests.forEach((guest, idx) => {
                  if (guest.name.trim() || guest.isOrganiser) {
                    rows.push(
                      <tr key={`own-${idx}`} className="border-b border-gray-100">
                        <td className="py-3 px-3 text-sm text-gray-500 align-middle">{rowNumber++}</td>
                        <td className="py-3 px-3 align-middle">
                          <input
                            type="text"
                            value={guest.name}
                            onChange={(e) => handleChangeName(idx, e.target.value)}
                            placeholder={guest.isOrganiser ? 'Your name (Organiser)' : `Guest ${idx + 1} full name`}
                            disabled={readOnly}
                            className={`w-full rounded-md border bg-white px-2 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 h-9 ${
                              guest.isOrganiser ? 'border-orange-400' : 'border-gray-300'
                            }`}
                          />
                        </td>
                        <td className="py-3 px-3 text-sm text-gray-600 align-middle" style={{ height: '36px' }}>You</td>
                        <td className="py-3 px-3 align-middle" style={{ height: '36px' }}>
                          {guest.isOrganiser && (
                            <span className="inline-flex rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-medium text-orange-700">
                              Organiser
                            </span>
                          )}
                        </td>
                      </tr>
                    )
                  }
                })

                // Add empty slots for organiser to add more guests
                guests.forEach((guest, idx) => {
                  if (!guest.name.trim() && !guest.isOrganiser) {
                    rows.push(
                      <tr key={`empty-${idx}`} className="border-b border-gray-100">
                        <td className="py-3 px-3 text-sm text-gray-400 align-middle">{rowNumber++}</td>
                        <td className="py-3 px-3 align-middle">
                          <input
                            type="text"
                            value={guest.name}
                            onChange={(e) => handleChangeName(idx, e.target.value)}
                            placeholder={`Guest ${idx + 1} full name`}
                            disabled={readOnly}
                            className="w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 h-9"
                          />
                        </td>
                        <td className="py-3 px-3 text-sm text-gray-600 align-middle" style={{ height: '36px' }}>You</td>
                        <td className="py-3 px-3 align-middle" style={{ height: '36px' }}></td>
                      </tr>
                    )
                  }
                })

                // Add linked booking guests (read-only)
                linkedBookings.forEach((lb) => {
                  lb.guests.forEach((g, gIdx) => {
                    rows.push(
                      <tr key={`linked-${lb.id}-${gIdx}`} className="border-b border-gray-100 bg-gray-50/50">
                        <td className="py-3 px-3 text-sm text-gray-500 align-middle">{rowNumber++}</td>
                        <td className="py-3 px-3 text-sm text-gray-900 align-middle" style={{ height: '36px' }}>{g.name}</td>
                        <td className="py-3 px-3 text-sm text-gray-600 align-middle" style={{ height: '36px' }}>{lb.customerName}</td>
                        <td className="py-3 px-3 align-middle" style={{ height: '36px' }}>
                          {g.isOrganiser && (
                            <span className="inline-flex rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-700">
                              Purchaser
                            </span>
                          )}
                        </td>
                      </tr>
                    )
                  })
                })

                return rows
              })()}
            </tbody>
          </table>
        </div>

        {!readOnly && (
          <div className="flex items-center justify-between gap-3 pt-2">
            <p className="text-[11px] text-gray-500">
              You can update this list any time using the link in your confirmation email.
            </p>
            <Button
              variant="default"
              size="sm"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Saving…' : 'Save guest list'}
            </Button>
          </div>
        )}

        {saved && !error && (
          <p className="text-[11px] text-green-600">
            Guest list saved. Our team will see the latest names on the door list.
          </p>
        )}
      </div>
    </div>
  )
}
