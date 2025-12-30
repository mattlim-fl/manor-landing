import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import { Loader2, AlertCircle, Calendar, Users, Copy, Check, Share2 } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import GuestListEditor from '../components/GuestListEditor'
import { fetchOccasionByOrganiserToken, fetchOrganiserBooking, OccasionWithStats } from '../services/occasion'

export default function OccasionPage() {
  const { token } = useParams<{ token: string }>()

  const [loading, setLoading] = useState(true)
  const [occasion, setOccasion] = useState<OccasionWithStats | null>(null)
  const [organiserBooking, setOrganiserBooking] = useState<any | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copiedShare, setCopiedShare] = useState(false)

  useEffect(() => {
    if (!token) {
      setError('Invalid link')
      setLoading(false)
      return
    }

    loadOccasion()
  }, [token])

  const loadOccasion = async () => {
    if (!token) return

    try {
      const occasionData = await fetchOccasionByOrganiserToken(token)
      if (!occasionData) {
        setError('This link is invalid or has expired')
      } else {
        setOccasion(occasionData)
        
        // Try to fetch organiser's booking if they have an email
        if (occasionData.customer_email) {
          const booking = await fetchOrganiserBooking(occasionData.id, occasionData.customer_email)
          setOrganiserBooking(booking)
        }
      }
    } catch (err) {
      setError('Failed to load occasion details')
    } finally {
      setLoading(false)
    }
  }

  const copyShareLink = async () => {
    if (!occasion) return
    
    const shareUrl = `${window.location.origin}/occasion/buy/${occasion.share_token}`
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopiedShare(true)
      setTimeout(() => setCopiedShare(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#271308', color: '#FFFFFF' }}>
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
        </div>
      </div>
    )
  }

  // Error state
  if (error || !occasion) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#271308', color: '#FFFFFF' }}>
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center space-y-4 max-w-md">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
            <h1 className="text-xl font-medium">{error || 'Something went wrong'}</h1>
            <p className="text-gray-400">This link may be invalid or expired.</p>
            <Link to="/">
              <Button variant="outline" className="mt-4">
                Go to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const formattedDate = format(parseISO(occasion.booking_date), 'EEEE, MMMM d, yyyy')
  const ticketPrice = (occasion.ticket_price_cents / 100).toFixed(2)
  const capacityPercent = (occasion.total_guests / occasion.capacity) * 100
  const shareUrl = `${window.location.origin}/occasion/buy/${occasion.share_token}`
  const organiserName = occasion.customer_name

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#271308', color: '#FFFFFF' }}>
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-3xl space-y-6">
          {/* Header Card */}
          <div className="bg-white text-gray-900 rounded-xl p-6">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold" style={{ color: '#CD3E28' }}>{occasion.name}</h1>
              
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>${ticketPrice} per ticket</span>
                </div>
              </div>

              {/* Capacity Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Capacity</span>
                  <span className="font-bold">{occasion.total_guests}/{occasion.capacity}</span>
                </div>
                <div className="bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      capacityPercent >= 100
                        ? 'bg-red-600'
                        : capacityPercent >= 80
                        ? 'bg-yellow-600'
                        : 'bg-green-600'
                    }`}
                    style={{ width: `${Math.min(capacityPercent, 100)}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600">
                  {occasion.remaining_capacity} {occasion.remaining_capacity === 1 ? 'spot' : 'spots'} remaining
                </p>
              </div>
            </div>
          </div>

          {/* Share Link Card */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-amber-600" />
              <h2 className="font-semibold text-amber-900">Invite Your Friends</h2>
            </div>
            <p className="text-sm text-amber-800">
              Share this link so your friends can buy their own tickets for this occasion:
            </p>
            <div className="flex gap-2">
              <Input 
                value={shareUrl} 
                readOnly 
                className="flex-1 bg-white text-sm font-mono"
              />
              <Button 
                variant="outline" 
                size="sm" 
                onClick={copyShareLink}
                className="shrink-0"
              >
                {copiedShare ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Guest List Editor */}
          {organiserBooking && organiserBooking.guest_list_token && (
            <div className="bg-white text-gray-900 rounded-xl p-6">
              <GuestListEditor
                bookingId={organiserBooking.id}
                token={organiserBooking.guest_list_token}
                heading="Your Guest List"
                subheading="Add the names of your guests so they're on the door when they arrive."
                showLinkedBookings={true}
              />
            </div>
          )}

          {/* Info */}
          <div className="bg-white text-gray-900 rounded-xl p-6">
            <h3 className="font-semibold mb-3">Important Information</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• All guests must bring valid ID</li>
              <li>• Tickets are non-refundable</li>
              <li>• Capacity is limited to {occasion.capacity} guests total</li>
              <li>• Share the link above so friends can purchase their own tickets</li>
            </ul>
          </div>

          <div className="text-center">
            <Link to="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

