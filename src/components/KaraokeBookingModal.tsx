import React, { useEffect, useMemo, useState } from 'react'
import { SQUARE_APPLICATION_ID, SQUARE_LOCATION_ID, SQUARE_SCRIPT_SRC } from '../lib/config'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Calendar } from './ui/calendar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { format } from 'date-fns'
import ReferenceCodeDisplay from './ReferenceCodeDisplay'
import {
  type Venue,
  type AvailabilityResponse,
  type SlotBooth,
  fetchKaraokeAvailability,
  fetchBoothsForSlot,
  createKaraokeHold,
  releaseKaraokeHold,
  payAndBookKaraoke
} from '../services/karaoke'

interface Props {
  isOpen: boolean
  onClose: () => void
  defaultVenue?: Venue
}

export default function KaraokeBookingModal({ isOpen, onClose, defaultVenue = 'manor' }: Props) {
  const [venue] = useState<Venue>(defaultVenue)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [partySize, setPartySize] = useState<number>(2)
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(null)
  const [loadingAvail, setLoadingAvail] = useState(false)
  const [selectedBoothId, setSelectedBoothId] = useState<string>('')
  const [selectedSlot, setSelectedSlot] = useState<{ start: string; end: string } | null>(null)
  const [slotBooths, setSlotBooths] = useState<SlotBooth[]>([])
  const [loadingBooths, setLoadingBooths] = useState(false)
  const [hold, setHold] = useState<{ id: string; expiresAt: string } | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<{ id: string; ref: string; karaokeRef?: string; ticketRef?: string } | null>(null)
  const [showPayment, setShowPayment] = useState(false)
  const [squareLoaded, setSquareLoaded] = useState(false)
  const [squarePayments, setSquarePayments] = useState<{ card: () => Promise<{ attach: (sel: string) => Promise<void>; tokenize: () => Promise<{ status: string; token: string; errors?: Array<{ message?: string }> }> }> } | null>(null)
  const [squareCard, setSquareCard] = useState<{ attach: (sel: string) => Promise<void>; tokenize: () => Promise<{ status: string; token: string; errors?: Array<{ message?: string }> }> } | null>(null)
  const [cardMounted, setCardMounted] = useState(false)
  const [confirmCloseOpen, setConfirmCloseOpen] = useState(false)

  const dateStr = useMemo(() => (date ? format(date, 'yyyy-MM-dd') : ''), [date])
  const selectedBooth = useMemo(() => slotBooths.find(b => b.id === selectedBoothId) || null, [slotBooths, selectedBoothId])
  const boothUnitPrice = selectedBooth?.hourly_rate ?? undefined
  const ticketUnitPrice = 10
  const ticketsQty = partySize
  const ticketsTotal = useMemo(() => ticketsQty * ticketUnitPrice, [ticketsQty])
  const boothTotal = useMemo(() => (boothUnitPrice ? Number(boothUnitPrice) : 0), [boothUnitPrice])
  const grandTotal = useMemo(() => boothTotal + ticketsTotal, [boothTotal, ticketsTotal])
  const formatAUD = (n: number) => n.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' })

  // Release hold when modal closes
  useEffect(() => {
    if (!isOpen && hold) {
      releaseKaraokeHold(hold.id).catch(() => {})
      setHold(null)
      setSelectedBoothId('')
      setSelectedSlot(null)
    }
  }, [isOpen, hold])

  useEffect(() => {
    if (!isOpen) return
    if (!dateStr) return
    setSelectedBoothId('')
    setSelectedSlot(null)
    setHold(null)
    setLoadingAvail(true)
    fetchKaraokeAvailability({ venue, date: dateStr, partySize }).then(setAvailability).catch((e) => {
      console.error(e)
      setError(e.message || 'Failed to load availability')
    }).finally(() => setLoadingAvail(false))
  }, [isOpen, venue, dateStr, partySize])

  const createHold = async (boothId: string, start: string, end: string) => {
    setError(null)
    // Release any existing hold first
    if (hold) {
      try {
        await releaseKaraokeHold(hold.id)
      } catch (err) {
        console.debug('Failed to release existing hold before creating a new one', err)
      }
      setHold(null)
    }
    try {
      const res = await createKaraokeHold({ venue, booth_id: boothId, booking_date: dateStr, start_time: start, end_time: end })
      setHold({ id: res.hold_id, expiresAt: res.expires_at })
      setSelectedBoothId(boothId)
      setSelectedSlot({ start, end })
      // Auto-open payment step once a hold is successfully created
      setShowPayment(true)
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      setError(msg || 'Failed to create hold')
    }
  }

  const cancelHold = async () => {
    if (!hold) return
    try { await releaseKaraokeHold(hold.id) } catch (err) { console.debug('Failed to release hold', err) }
    setHold(null)
    setSelectedSlot(null)
    setSelectedBoothId('')
  }

  const hasAnyInput = useMemo(() => {
    return Boolean(name.trim() || email.trim() || phone.trim() || date || selectedBoothId || hold)
  }, [name, email, phone, date, selectedBoothId, hold])

  const handleClose = () => {
    if (hasAnyInput) {
      setConfirmCloseOpen(true)
      return
    }
    if (hold) {
      releaseKaraokeHold(hold.id).catch((err) => { console.debug('Failed to release hold on close', err) })
    }
    onClose()
  }

  // Load Square SDK when needed
  useEffect(() => {
    if (!showPayment || squareLoaded) return
    const existing = document.querySelector(`script[src="${SQUARE_SCRIPT_SRC}"]`) as HTMLScriptElement | null
    if (existing) { setSquareLoaded(true); return }
    const script = document.createElement('script')
    script.src = SQUARE_SCRIPT_SRC
    script.async = true
    script.onload = () => setSquareLoaded(true)
    script.onerror = () => setError('Failed to load payment SDK')
    document.body.appendChild(script)
  }, [showPayment, squareLoaded])

  // Initialize payments instance when SDK is loaded
  useEffect(() => {
    if (!showPayment || !squareLoaded || squarePayments) return
    const squareObj = (window as unknown as { Square?: { payments: (appId: string, locationId: string) => { card: () => Promise<{ attach: (sel: string) => Promise<void>; tokenize: () => Promise<{ status: string; token: string; errors?: Array<{ message?: string }> }> }> } } }).Square
    if (!squareObj) return
    try {
      const p = squareObj.payments(SQUARE_APPLICATION_ID, SQUARE_LOCATION_ID)
      setSquarePayments(p)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      setError(msg || 'Failed to initialize payment SDK')
    }
  }, [showPayment, squareLoaded, squarePayments])

  // Create and mount the card when payments is ready and payment view is visible
  useEffect(() => {
    let canceled = false
    const mount = async () => {
      if (!showPayment || !squarePayments || squareCard || cardMounted) return
      try {
        const card = await squarePayments.card()
        await card.attach('#card-container')
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
  }, [showPayment, squarePayments, squareCard, cardMounted])

  // Cleanup card when closing payment step
  useEffect(() => {
    if (!showPayment) {
      setSquareCard(null)
      setCardMounted(false)
      const el = document.getElementById('card-container')
      if (el) el.innerHTML = ''
    }
  }, [showPayment])

  // Show payment UI automatically once hold is created; button stays disabled until all fields valid

  const handlePayAndBook = async () => {
    if (!hold || !selectedSlot || !selectedBoothId || !dateStr) { setError('Missing selection details'); return }
    if (!name.trim()) { setError('Please enter your name'); return }
    if (!email && !phone) { setError('Provide an email or phone'); return }
    if (!partySize || partySize < 1) { setError('Please select tickets required'); return }
    if (!squareCard) { setError('Payment form not ready'); return }
    setSubmitting(true)
    setError(null)
    try {
      // Tokenize the mounted card
      const result = await squareCard.tokenize()
      if (result.status !== 'OK') throw new Error(result?.errors?.[0]?.message || 'Failed to tokenize card')

      const res = await payAndBookKaraoke({
        holdId: hold.id,
        customer_name: name,
        customer_email: email || undefined,
        customer_phone: phone || undefined,
        party_size: partySize,
        venue,
        booking_date: dateStr,
        start_time: selectedSlot.start,
        end_time: selectedSlot.end,
        booth_id: selectedBoothId,
        ticket_quantity: partySize,
        payment_token: result.token
      })
      console.log('PayAndBook response:', res)
      const karaokeRef = res.karaoke_booking?.referenceCode || res.reference_code || ''
      const ticketRef = res.ticket_booking?.referenceCode || ''
      console.log('Karaoke reference code:', karaokeRef)
      console.log('Ticket reference code:', ticketRef)
      
      // Use karaoke reference code as primary, but show both if ticket booking exists
      const primaryRef = karaokeRef || ticketRef
      console.log('Primary reference code being set:', primaryRef)
      setSuccess({ 
        id: res.booking_id, 
        ref: primaryRef,
        karaokeRef: karaokeRef,
        ticketRef: ticketRef
      })
      setShowPayment(false)
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      setError(msg || 'Payment failed')
    } finally {
      setSubmitting(false)
    }
  }

  const canPay = useMemo(() => {
    const hasContact = Boolean(name.trim() && (email || phone))
    const ticketsOk = partySize >= 1
    const selectionOk = Boolean(hold && selectedSlot && selectedBoothId && dateStr)
    const paymentReady = Boolean(squareCard)
    return hasContact && ticketsOk && selectionOk && paymentReady && !submitting
  }, [name, email, phone, partySize, hold, selectedSlot, selectedBoothId, dateStr, squareCard, submitting])

  return (
    <>
    <Dialog open={isOpen} onOpenChange={(v) => { if (!v) handleClose() }}>
      <DialogContent className="max-w-3xl">
        {!success && (
          <DialogHeader>
            <DialogTitle className="font-medium">Book Karaoke Booth</DialogTitle>
          </DialogHeader>
        )}

        {success ? (
          <div className="space-y-8">
            <div className="flex justify-center">
              <svg className="h-16 w-16 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-2xl font-medium text-center">Karaoke Booking Confirmed!</h3>
            <p className="text-center text-gray-600">Your karaoke booking has been received, and you're booked in.</p>
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h4 className="font-medium text-blue-900 mb-2">Important Information:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Please arrive 5 minutes before your session to get ready</li>
                <li>• You will need to leave 5 minutes before the end of your time to allow us to clean between sessions</li>
              </ul>
            </div>
            {success.karaokeRef && success.ticketRef ? (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Karaoke Booth Reference</h4>
                  <ReferenceCodeDisplay referenceCode={success.karaokeRef} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">VIP Tickets Reference</h4>
                  <ReferenceCodeDisplay referenceCode={success.ticketRef} />
                </div>
              </div>
            ) : (
              <ReferenceCodeDisplay referenceCode={success.ref} />
            )}
            <div className="flex justify-center">
              <Button onClick={onClose}>Close</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Top section: Contact info and date picker in two columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column: Contact information */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name *</label>
                  <input className="w-full border rounded-md p-2" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <input className="w-full border rounded-md p-2" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <input className="w-full border rounded-md p-2" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tickets Required</label>
                  <Select value={String(partySize)} onValueChange={(v) => setPartySize(Number(v))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {[...Array(10)].map((_, i) => (
                        <SelectItem key={i+1} value={String(i+1)}>{i+1}</SelectItem>
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
                  disabled={(d) => {
                    const today = new Date()
                    today.setHours(0,0,0,0)
                    const dd = new Date(d)
                    dd.setHours(0,0,0,0)
                    return dd < today
                  }}
                />
              </div>
            </div>

            {/* Booth and slots */}
            {loadingAvail && (
              <div className="text-sm text-gray-500">Loading availability…</div>
            )}
            {availability && !loadingAvail && (
              <div className="space-y-4">
                <label className="text-sm font-medium">Select Booth & Time</label>
                <div className="space-y-6">
                  {availability.booths.map((b) => (
                    <div key={b.booth.id} className="space-y-3">
                      <p className="font-medium">Time Slots</p>
                      <div className="flex flex-wrap gap-2">
                        {b.slots.map((s, idx) => {
                          const isSelected = selectedSlot && selectedSlot.start === s.start_time && selectedSlot.end === s.end_time
                          const disabled = s.status !== 'available' || !!hold
                          const btn = (
                            <button
                              key={idx}
                              disabled={disabled}
                              onClick={async () => {
                                setSelectedSlot({ start: s.start_time, end: s.end_time })
                                setSelectedBoothId('')
                                setHold(null)
                                setLoadingBooths(true)
                                try {
                                  const booths = await fetchBoothsForSlot({ venue, bookingDate: dateStr, startTime: s.start_time, endTime: s.end_time, minCapacity: partySize })
                                  setSlotBooths(booths)
                                } catch (e) {
                                  const msg = e instanceof Error ? e.message : String(e)
                                  setError(msg || 'Failed to load booths for slot')
                                } finally {
                                  setLoadingBooths(false)
                                }
                              }}
                              className={`px-3 py-2 rounded-md text-sm border ${isSelected ? 'bg-black text-white' : 'bg-white'} disabled:opacity-50`}
                            >
                              {s.start_time}–{s.end_time} {s.status !== 'available' ? `· ${s.status}` : ''}
                            </button>
                          )
                          if (disabled && !!hold) {
                            return (
                              <TooltipProvider key={idx}>
                                <Tooltip>
                                  <TooltipTrigger asChild>{btn}</TooltipTrigger>
                                  <TooltipContent side="top">
                                    <p className="max-w-xs">Release your current time slot to change to a new one.</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )
                          }
                          return btn
                        })}
                      </div>

                      {/* Booth selector appears after slot selection */}
                      {selectedSlot && (
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Select Booth</label>
                          {loadingBooths ? (
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                              <span>Loading booths...</span>
                            </div>
                          ) : slotBooths.length === 0 ? (
                            <div className="text-sm text-gray-500">No booths available for this slot</div>
                          ) : (
                            <Select value={selectedBoothId} onValueChange={(v) => {
                              setSelectedBoothId(v)
                              if (v) {
                                createHold(v, selectedSlot.start, selectedSlot.end)
                              }
                            }}>
                              <SelectTrigger><SelectValue placeholder="Choose a booth" /></SelectTrigger>
                              <SelectContent>
                                {slotBooths.map((booth) => (
                                  <SelectItem key={booth.id} value={booth.id}>{booth.name} · up to {booth.capacity}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {hold && (
              <div className="flex items-center justify-between rounded-md border p-3">
                <p className="text-sm">Slot reserved until {new Date(hold.expiresAt).toLocaleTimeString()}</p>
                <Button variant="secondary" onClick={cancelHold}>Release hold</Button>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              {/* Show invoice + card only after a hold is created (we auto-open payment then) */}
              {showPayment && (
                <>
                <div className="rounded-md border p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium">Order Summary</h4>
                  </div>
                  <div className="divide-y">
                    <div className="py-2 flex text-sm">
                      <div className="flex-1">
                        <div className="font-medium">Karaoke Booth</div>
                        <div className="text-gray-500">Qty 1</div>
                      </div>
                      <div className="w-28 text-right">{boothUnitPrice ? formatAUD(boothUnitPrice) : '—'}</div>
                      <div className="w-32 text-right font-medium">{boothUnitPrice ? formatAUD(boothTotal) : '—'}</div>
                    </div>
                    <div className="py-2 flex text-sm">
                      <div className="flex-1">
                        <div className="font-medium">Venue Tickets</div>
                        <div className="text-gray-500">Qty {ticketsQty}</div>
                      </div>
                      <div className="w-28 text-right">{formatAUD(ticketUnitPrice)}</div>
                      <div className="w-32 text-right font-medium">{formatAUD(ticketsTotal)}</div>
                    </div>
                    <div className="py-2 flex text-sm">
                      <div className="flex-1" />
                      <div className="w-28 text-right font-medium">Total</div>
                      <div className="w-32 text-right font-medium">{formatAUD(grandTotal)}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Payment</label>
                  <div id="card-container" className="border rounded-md p-3" />
                </div>
                </>
              )}
              <div className="flex justify-end gap-2">
                <Button onClick={handlePayAndBook} disabled={!canPay}>{submitting ? 'Processing...' : 'Pay & Book'}</Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>

    {/* Confirm close dialog */}
    <AlertDialog open={confirmCloseOpen} onOpenChange={setConfirmCloseOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Discard your booking?</AlertDialogTitle>
          <AlertDialogDescription>
            You have entered some details. If you close now, your progress will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setConfirmCloseOpen(false)}>Continue booking</AlertDialogCancel>
          <AlertDialogAction onClick={() => { setConfirmCloseOpen(false); if (hold) releaseKaraokeHold(hold.id).catch(()=>{}); onClose() }}>Discard</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  )
}


