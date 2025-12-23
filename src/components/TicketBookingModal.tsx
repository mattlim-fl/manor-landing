import { useEffect, useMemo, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Calendar } from './ui/calendar'
import { format } from 'date-fns'
import { createPaidTicketBooking, type Venue, type PaidTicketBookingResult } from '../services/ticketBooking'
import ReferenceCodeDisplay from './ReferenceCodeDisplay'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { Info, Check, X, Copy, Share2 } from 'lucide-react'
import { SQUARE_APPLICATION_ID, SQUARE_LOCATION_ID, SQUARE_SCRIPT_SRC } from '../lib/config'
import GuestListEditor from './GuestListEditor'

interface Props {
  isOpen: boolean
  onClose: () => void
  defaultVenue?: Venue
}

const TICKET_PRICE_CENTS = 1000 // $10 per ticket

export default function TicketBookingModal({ 
  isOpen, 
  onClose, 
  defaultVenue = 'manor' 
}: Props) {
  const [venue] = useState<Venue>(defaultVenue)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined)
  const [dateOfBirthString, setDateOfBirthString] = useState('')
  const [ticketQuantity, setTicketQuantity] = useState<number>(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successBooking, setSuccessBooking] = useState<PaidTicketBookingResult | null>(null)
  const [linkCopied, setLinkCopied] = useState(false)

  // Square payment state
  const [squareLoaded, setSquareLoaded] = useState(false)
  const [squarePayments, setSquarePayments] = useState<{ 
    card: () => Promise<{ 
      attach: (sel: string) => Promise<void>
      tokenize: () => Promise<{ status: string; token: string; errors?: Array<{ message?: string }> }> 
    }> 
  } | null>(null)
  const [squareCard, setSquareCard] = useState<{ 
    attach: (sel: string) => Promise<void>
    tokenize: () => Promise<{ status: string; token: string; errors?: Array<{ message?: string }> }> 
  } | null>(null)
  const [cardMounted, setCardMounted] = useState(false)

  const dateStr = useMemo(() => (date ? format(date, 'yyyy-MM-dd') : ''), [date])

  const quantityOptions = Array.from({ length: 10 }, (_, i) => i + 1)

  const totalPriceCents = useMemo(() => ticketQuantity * TICKET_PRICE_CENTS, [ticketQuantity])
  const totalPriceDisplay = useMemo(() => (totalPriceCents / 100).toLocaleString('en-AU', { style: 'currency', currency: 'AUD' }), [totalPriceCents])

  const getModalTitle = () => {
    return '25+ Priority Entry'
  }

  const isAgeValid = () => {
    if (!dateOfBirth) return false
    const today = new Date()
    const age = today.getFullYear() - dateOfBirth.getFullYear()
    const monthDiff = today.getMonth() - dateOfBirth.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
      return age - 1 >= 25
    }
    return age >= 25
  }

  const calculateAge = () => {
    if (!dateOfBirth) return null
    const today = new Date()
    const age = today.getFullYear() - dateOfBirth.getFullYear()
    const monthDiff = today.getMonth() - dateOfBirth.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
      return age - 1
    }
    return age
  }

  const handleDateOfBirthChange = (value: string) => {
    setDateOfBirthString(value)
    if (value && value.length === 10) {
      const date = new Date(value)
      if (!isNaN(date.getTime())) {
        setDateOfBirth(date)
      }
    } else {
      setDateOfBirth(undefined)
    }
  }

  const isFormValid = () => {
    return dateStr && 
           (email || phone) && 
           name.trim() && 
           ticketQuantity > 0 &&
           isAgeValid() &&
           squareCard !== null
  }

  // Load Square SDK when modal opens
  useEffect(() => {
    if (!isOpen || squareLoaded) return
    const existing = document.querySelector(`script[src="${SQUARE_SCRIPT_SRC}"]`) as HTMLScriptElement | null
    if (existing) { setSquareLoaded(true); return }
    const script = document.createElement('script')
    script.src = SQUARE_SCRIPT_SRC
    script.async = true
    script.onload = () => setSquareLoaded(true)
    script.onerror = () => setError('Failed to load payment SDK')
    document.body.appendChild(script)
  }, [isOpen, squareLoaded])

  // Initialize payments instance when SDK is loaded
  useEffect(() => {
    if (!isOpen || !squareLoaded || squarePayments) return
    const squareObj = (window as unknown as { Square?: { payments: (appId: string, locationId: string) => { card: () => Promise<{ attach: (sel: string) => Promise<void>; tokenize: () => Promise<{ status: string; token: string; errors?: Array<{ message?: string }> }> }> } } }).Square
    if (!squareObj) return
    try {
      const p = squareObj.payments(SQUARE_APPLICATION_ID, SQUARE_LOCATION_ID)
      setSquarePayments(p)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      setError(msg || 'Failed to initialize payment SDK')
    }
  }, [isOpen, squareLoaded, squarePayments])

  // Create and mount the card when payments is ready
  useEffect(() => {
    let canceled = false
    const mount = async () => {
      if (!isOpen || !squarePayments || squareCard || cardMounted) return
      try {
        const card = await squarePayments.card()
        await card.attach('#ticket-card-container')
        if (!canceled) {
          setSquareCard(card)
          setCardMounted(true)
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err)
        setError(msg || 'Failed to mount payment form')
      }
    }
    mount()
    return () => { canceled = true }
  }, [isOpen, squarePayments, squareCard, cardMounted])

  // Cleanup card when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSquareCard(null)
      setCardMounted(false)
      const el = document.getElementById('ticket-card-container')
      if (el) el.innerHTML = ''
    }
  }, [isOpen])

  const copyShareLink = async () => {
    if (!successBooking?.shareUrl) return
    try {
      await navigator.clipboard.writeText(successBooking.shareUrl)
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const submit = async () => {
    setError(null)
    if (!dateStr) { setError('Please choose a date'); return }
    if (!email && !phone) { setError('Provide an email or phone'); return }
    if (!name.trim()) { setError('Please provide your name'); return }
    if (!dateOfBirth) { setError('Please provide your date of birth'); return }
    if (!isAgeValid()) { setError('This ticket type is only for guests who are 25 or older'); return }
    if (!squareCard) { setError('Payment form not ready'); return }
    
    setSubmitting(true)
    try {
      // Tokenize the card
      const result = await squareCard.tokenize()
      if (result.status !== 'OK') {
        throw new Error(result?.errors?.[0]?.message || 'Failed to process card')
      }

      const res = await createPaidTicketBooking({
        customerName: name,
        customerEmail: email || undefined,
        customerPhone: phone || undefined,
        venue,
        bookingDate: dateStr,
        ticketQuantity,
        paymentToken: result.token
      })
      setSuccessBooking(res)
      window.dispatchEvent(new CustomEvent('ticket-booking-success', { detail: { bookingId: res.bookingId } }))
    } catch (e: any) {
      setError(e.message || 'Failed to process payment')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <TooltipProvider>
      <Dialog open={isOpen} onOpenChange={(v) => { if (!v) onClose() }}>
        <DialogContent className="w-full max-w-[90vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          {!successBooking && (
            <DialogHeader>
              <DialogTitle className="font-medium">{getModalTitle()}</DialogTitle>
            </DialogHeader>
          )}

          {successBooking ? (
            <div className="space-y-6">
              {/* Success header */}
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <svg className="h-6 w-6 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <h3 className="text-xl font-medium">25+ Priority Entry Confirmed!</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Reference: <span className="font-mono font-medium">{successBooking.referenceCode}</span>
                </p>
              </div>

              {/* Shareable link section */}
              {successBooking.shareUrl && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Share2 className="h-5 w-5 text-amber-600" />
                    <h4 className="font-medium text-amber-900">Invite your friends</h4>
                  </div>
                  <p className="text-sm text-amber-800">
                    Share this link so your friends can buy their own tickets for the same date:
                  </p>
                  <div className="flex gap-2">
                    <Input 
                      value={successBooking.shareUrl} 
                      readOnly 
                      className="flex-1 bg-white text-sm font-mono"
                    />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={copyShareLink}
                      className="shrink-0"
                    >
                      {linkCopied ? (
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
              )}

              {/* Guest list editor */}
              {successBooking.bookingId && successBooking.guestListToken && (
                <GuestListEditor
                  bookingId={successBooking.bookingId}
                  token={successBooking.guestListToken}
                  heading="Add your guests to the door list"
                  subheading="Enter the names of everyone in your group so they're on the door when they arrive."
                />
              )}

              <p className="text-sm text-gray-500 text-center">
                Make sure all guests bring valid ID. Full details have been sent to your email.
              </p>

              <div className="flex justify-center">
                <Button onClick={onClose}>Close</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">{error}</div>
              )}

              {/* Contact information and date picker in two columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column: Contact information */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium">Date of Birth</label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button type="button" className="inline-flex items-center">
                            <Info className="h-4 w-4 text-gray-400 cursor-help hover:text-gray-600 transition-colors" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="top" align="start" sideOffset={8} className="z-[100] max-w-xs">
                          <p>We don't store this information, but we use it to validate your age for booking purposes. We'll check your ID on the day to verify this information.</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="flex gap-2">
                      <Input 
                        type="date" 
                        value={dateOfBirthString} 
                        onChange={(e) => handleDateOfBirthChange(e.target.value)}
                        max={format(new Date(), 'yyyy-MM-dd')}
                        className="flex-1"
                      />
                      {calculateAge() !== null && (
                        <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm text-gray-600 flex items-center gap-2">
                          <span>{calculateAge()} y.o.</span>
                          {isAgeValid() ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <X className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@example.com" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone</label>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+61 ..." />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Number of Tickets</label>
                    <Select value={String(ticketQuantity)} onValueChange={(v) => setTicketQuantity(Number(v))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select quantity" />
                      </SelectTrigger>
                      <SelectContent>
                        {quantityOptions.map((quantity) => (
                          <SelectItem key={quantity} value={String(quantity)}>
                            {quantity} {quantity === 1 ? 'ticket' : 'tickets'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Right column: Date picker */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Calendar 
                    mode="single" 
                    selected={date} 
                    onSelect={setDate} 
                    className="rounded-md border"
                    disabled={(date) => {
                      // Only allow Saturdays (day 6) and dates in the past
                      const dayOfWeek = date.getDay()
                      const today = new Date()
                      today.setHours(0, 0, 0, 0)
                      return dayOfWeek !== 6 || date < today
                    }}
                  />
                </div>
              </div>

              {!isAgeValid() && dateOfBirth && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <p className="text-sm text-red-800">
                    This ticket type is reserved only for guests who are 25 years of age or older.
                  </p>
                </div>
              )}

              {isAgeValid() && ticketQuantity > 1 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                  <p className="text-sm text-yellow-800">
                    All guests will need to be 25 years of age or older to use these tickets. Please make sure all of your guests have valid ID when you arrive.
                  </p>
                </div>
              )}

              {/* Order Summary */}
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 space-y-3">
                <h4 className="text-sm font-medium">Order Summary</h4>
                <div className="flex justify-between text-sm">
                  <span>{ticketQuantity} × 25+ Priority Entry ($10.00 each)</span>
                  <span className="font-medium">{totalPriceDisplay}</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-medium">Total</span>
                  <span className="font-medium text-lg">{totalPriceDisplay}</span>
                </div>
              </div>

              {/* Payment Card */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Payment</label>
                <div id="ticket-card-container" className="border border-gray-300 rounded-md p-3 bg-white min-h-[50px]" />
                {!squareCard && squareLoaded && (
                  <p className="text-xs text-gray-500">Loading payment form...</p>
                )}
              </div>

              <div className="flex justify-end gap-3">
                <Button onClick={submit} disabled={submitting || !isFormValid()}>
                  {submitting ? 'Processing...' : `Pay ${totalPriceDisplay}`}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  )
}
