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
import GuestListEditor from './GuestListEditor'

interface Props {
  isOpen: boolean
  onClose: () => void
  defaultVenue?: Venue
}

export default function KaraokeBookingModal({ isOpen, onClose, defaultVenue = 'manor' }: Props) {
  const [venue] = useState<Venue>(defaultVenue)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [groupSize, setGroupSize] = useState<number>(2)
  const [sessionLengthHours, setSessionLengthHours] = useState<1 | 2>(1)
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
  const [success, setSuccess] = useState<{ id: string; ref: string; karaokeRef?: string; ticketRef?: string; guestListToken?: string } | null>(null)
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
  const ticketsQty = groupSize
  const ticketsTotal = useMemo(() => ticketsQty * ticketUnitPrice, [ticketsQty])
  const boothTotal = useMemo(() => {
    if (!boothUnitPrice) return 0
    const durationMultiplier = sessionLengthHours === 2 ? 2 : 1
    return Number(boothUnitPrice) * durationMultiplier
  }, [boothUnitPrice, sessionLengthHours])
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
    fetchKaraokeAvailability({ venue, date: dateStr, partySize: groupSize }).then(setAvailability).catch((e) => {
      console.error(e)
      setError(e.message || 'Failed to load availability')
    }).finally(() => setLoadingAvail(false))
  }, [isOpen, venue, dateStr, groupSize])

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
    // If the booking has already been confirmed, just close without warning
    if (success) {
      if (hold) {
        releaseKaraokeHold(hold.id).catch((err) => { console.debug('Failed to release hold on close after success', err) })
      }
      onClose()
      return
    }
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
    if (!email.trim()) { setError('Please provide your email'); return }
    if (!phone.trim()) { setError('Please provide your phone number'); return }
    if (!groupSize || groupSize < 1) { setError('Please select group size'); return }
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
        party_size: groupSize,
        venue,
        booking_date: dateStr,
        start_time: selectedSlot.start,
        end_time: selectedSlot.end,
        booth_id: selectedBoothId,
        ticket_quantity: groupSize,
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
        ticketRef: ticketRef,
        guestListToken: res.guest_list_token
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
    const hasContact = Boolean(name.trim() && email.trim() && phone.trim())
    const ticketsOk = groupSize >= 1
    const selectionOk = Boolean(hold && selectedSlot && selectedBoothId && dateStr)
    const paymentReady = Boolean(squareCard)
    // Extra safeguard: ensure client-side duration does not exceed 2 hours
    let durationOk = true
    if (selectedSlot) {
      const toMinutes = (t: string) => {
        const [h, m] = t.slice(0, 5).split(':').map((v) => Number(v) || 0)
        return h * 60 + m
      }
      const minutes = Math.max(0, toMinutes(selectedSlot.end) - toMinutes(selectedSlot.start))
      const hours = minutes / 60
      durationOk = hours > 0 && hours <= 2
    }
    return hasContact && ticketsOk && selectionOk && paymentReady && durationOk && !submitting
  }, [name, email, phone, groupSize, hold, selectedSlot, selectedBoothId, dateStr, squareCard, submitting])

  return (
    <>
    <Dialog open={isOpen} onOpenChange={(v) => { if (!v) handleClose() }}>
      <DialogContent className="max-w-[90vw] font-blur" style={{ backgroundColor: '#D04E2B', color: '#271308', border: 'none', borderRadius: '12px' }}>
        {!success && (
          <DialogHeader>
            <DialogTitle className="font-bold text-xl uppercase tracking-wider" style={{ color: '#271308' }}>Book Karaoke Booth</DialogTitle>
            <p className="text-sm" style={{ color: '#271308' }}>
              50-minute sessions • Bookings available on the hour
            </p>
          </DialogHeader>
        )}

        {success ? (
          <div className="space-y-6">
            {/* Compact success header */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <svg className="h-6 w-6 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <h3 className="text-xl font-medium">Booking Confirmed!</h3>
              </div>
              <p className="text-sm text-gray-600">
                Reference: <span className="font-mono font-medium">{success.karaokeRef || success.ref}</span>
              </p>
              <p className="text-sm text-gray-500">
                Arrive 5 mins early. Full details have been sent to your email.
              </p>
            </div>

            {/* Guest list editor - prominent */}
            {success.id && success.guestListToken && (
              <GuestListEditor
                bookingId={success.id}
                token={success.guestListToken}
                heading="Add your guests to the door list"
                subheading="Enter the names of everyone in your group so they're on the door when they arrive."
              />
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
                  <label className="text-sm font-medium" style={{ color: '#271308' }}>Full Name</label>
                  <input className="w-full border-none rounded-full p-3" style={{ backgroundColor: '#271308', color: '#FFFFFF' }} value={name} onChange={(e) => setName(e.target.value)} required placeholder="Enter your name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: '#271308' }}>Email *</label>
                  <input className="w-full border-none rounded-full p-3" style={{ backgroundColor: '#271308', color: '#FFFFFF' }} value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: '#271308' }}>Phone *</label>
                  <input className="w-full border-none rounded-full p-3" style={{ backgroundColor: '#271308', color: '#FFFFFF' }} value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="Enter your phone" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: '#271308' }}>Group Size</label>
                  <div className="flex items-center gap-3">
                    <button 
                      type="button"
                      onClick={() => setGroupSize(Math.max(1, groupSize - 1))}
                      disabled={groupSize <= 1}
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      style={{
                        backgroundColor: '#271308',
                        color: '#FFFFFF'
                      }}
                    >
                      -
                    </button>
                    <div className="min-w-[60px] text-center">
                      <span className="text-xl font-bold" style={{ color: '#271308' }}>{groupSize}</span>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setGroupSize(Math.min(10, groupSize + 1))}
                      disabled={groupSize >= 10}
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      style={{
                        backgroundColor: '#271308',
                        color: '#FFFFFF'
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Right column: Date picker */}
              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: '#271308' }}>Date</label>
                <div style={{ backgroundColor: '#FFFFFF', borderRadius: '6px', padding: '8px', border: '2px solid #D04E2B' }}>
                  <style>
                    {`
                      .rdp-day_disabled:not(.rdp-day_today) {
                        color: #CCCCCC !important;
                        opacity: 0.5 !important;
                        font-weight: 300 !important;
                        cursor: not-allowed !important;
                        background-color: transparent !important;
                      }
                      .rdp-day_disabled:not(.rdp-day_today):hover {
                        color: #CCCCCC !important;
                        opacity: 0.5 !important;
                        background-color: transparent !important;
                      }
                      .rdp-button[disabled]:not(.rdp-day_today) {
                        color: #CCCCCC !important;
                        opacity: 0.5 !important;
                        font-weight: 300 !important;
                        cursor: not-allowed !important;
                        background-color: transparent !important;
                      }
                      .rdp-button[disabled]:not(.rdp-day_today):hover {
                        color: #CCCCCC !important;
                        opacity: 0.5 !important;
                        background-color: transparent !important;
                      }
                      .rdp-day:not([disabled]) {
                        color: #271308 !important;
                        font-weight: 500 !important;
                      }
                      .rdp-day_today,
                      .rdp-button[aria-current="date"],
                      button[aria-current="date"],
                      .rdp-day[aria-current="date"],
                      .rdp-day_disabled.rdp-day_today {
                        background-color: #808080 !important;
                        color: #FFFFFF !important;
                        font-weight: 500 !important;
                        border-radius: 6px !important;
                        border: 1px solid #666666 !important;
                        opacity: 1 !important;
                        cursor: pointer !important;
                      }
                      .rdp-day_today:not([disabled]):not(.rdp-day_selected):hover,
                      .rdp-day_today:hover,
                      .rdp-button[aria-current="date"]:hover,
                      button[aria-current="date"]:hover,
                      .rdp-day[aria-current="date"]:hover {
                        background-color: #666666 !important;
                        color: #FFFFFF !important;
                      }
                      .rdp-nav_button,
                      .rdp-nav button,
                      .rdp-button_previous,
                      .rdp-button_next,
                      button[name="previous-month"],
                      button[name="next-month"] {
                        color: #271308 !important;
                        background-color: transparent !important;
                        border: 2px solid #D04E2B !important;
                        border-radius: 6px !important;
                        width: 32px !important;
                        height: 32px !important;
                        font-weight: bold !important;
                        font-size: 16px !important;
                      }
                      .rdp-nav_button:hover,
                      .rdp-nav button:hover,
                      .rdp-button_previous:hover,
                      .rdp-button_next:hover,
                      button[name="previous-month"]:hover,
                      button[name="next-month"]:hover {
                        background-color: #D04E2B !important;
                        color: #FFFFFF !important;
                      }
                      .rdp-nav_button:disabled,
                      .rdp-nav button:disabled,
                      .rdp-button_previous:disabled,
                      .rdp-button_next:disabled,
                      button[name="previous-month"]:disabled,
                      button[name="next-month"]:disabled {
                        color: #CCCCCC !important;
                        border-color: #CCCCCC !important;
                        cursor: not-allowed !important;
                      }
                      .rdp-nav_button:disabled:hover,
                      .rdp-nav button:disabled:hover,
                      .rdp-button_previous:disabled:hover,
                      .rdp-button_next:disabled:hover,
                      button[name="previous-month"]:disabled:hover,
                      button[name="next-month"]:disabled:hover {
                        background-color: transparent !important;
                        color: #CCCCCC !important;
                      }
                      .rdp-caption_label,
                      .rdp-head_cell,
                      .rdp-caption,
                      .rdp-head {
                        color: #271308 !important;
                        font-weight: 600 !important;
                      }
                      /* More specific today selector */
                      .rdp .rdp-day_today {
                        background-color: #808080 !important;
                        color: #FFFFFF !important;
                        font-weight: 500 !important;
                        border-radius: 6px !important;
                        border: 1px solid #666666 !important;
                        opacity: 1 !important;
                      }
                    `}
                  </style>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md"
                    classNames={{
                      caption: "flex justify-center pt-1 relative items-center",
                      caption_label: "text-[#271308] font-medium",
                      head_cell: "text-[#271308] font-medium rounded-md w-9 font-normal text-[0.8rem]",
                      nav: "space-x-1 flex items-center",
                      nav_button: "h-7 w-7 bg-transparent p-0 border-2 border-[#D04E2B] rounded-md text-[#271308] hover:bg-[#D04E2B] hover:text-white flex items-center justify-center",
                      nav_button_previous: "absolute left-1",
                      nav_button_next: "absolute right-1",
                      day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                      day_selected: "bg-[#271308] text-white hover:bg-[#271308] hover:text-white focus:bg-[#271308] focus:text-white border-2 border-[#D04E2B] font-medium",
                      day_today: "bg-[#808080] text-white font-medium rounded-md border border-[#666666]",
                      day_disabled: "opacity-50 pointer-events-none",
                    }}
                    disabled={(d) => {
                      const today = new Date()
                      today.setHours(0,0,0,0)
                      const dd = new Date(d)
                      dd.setHours(0,0,0,0)
                      const dayOfWeek = dd.getDay()
                      // Only allow Saturdays (day 6) and dates not in the past
                      return dd < today || dayOfWeek !== 6
                    }}
                    modifiers={{
                      selected: date ? [date] : []
                    }}
                    modifiersStyles={{
                      selected: {
                        backgroundColor: '#271308',
                        color: '#FFFFFF',
                        fontWeight: 'bold',
                        border: '2px solid #D04E2B',
                        borderRadius: '6px'
                      }
                    }}
                    styles={{
                      day_selected: {
                        backgroundColor: '#271308 !important',
                        color: '#FFFFFF !important',
                        fontWeight: 'bold !important',
                        border: '2px solid #D04E2B !important',
                        borderRadius: '6px !important',
                        opacity: '1 !important'
                      },
                      day_today: {
                        backgroundColor: '#808080 !important',
                        color: '#FFFFFF !important',
                        fontWeight: '500 !important',
                        border: '1px solid #666666 !important',
                        borderRadius: '6px !important'
                      },
                      day_disabled: {
                        color: '#F0F0F0 !important',
                        backgroundColor: 'transparent !important',
                        opacity: '0.2 !important',
                        cursor: 'not-allowed !important',
                        fontWeight: '300 !important'
                      },
                      day: {
                        borderRadius: '4px',
                        transition: 'all 0.2s ease',
                        opacity: '1',
                        color: '#271308',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Booth and slots */}
            {loadingAvail && (
              <div className="text-sm" style={{ color: '#E59D50' }}>Loading availability…</div>
            )}
            {availability && !loadingAvail && (
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <label className="text-sm font-medium" style={{ color: '#E59D50' }}>Select Time</label>
                  <div className="flex items-center gap-3">
                    <span className="text-xs md:text-sm" style={{ color: '#E59D50' }}>Session length</span>
                    <div className="inline-flex rounded-full border" style={{ borderColor: '#D04E2B' }}>
                      <button
                        type="button"
                        onClick={() => setSessionLengthHours(1)}
                        className="px-3 py-1 text-xs md:text-sm font-medium rounded-full"
                        style={{
                          backgroundColor: sessionLengthHours === 1 ? '#D04E2B' : 'transparent',
                          color: sessionLengthHours === 1 ? '#FFFFFF' : '#E59D50',
                          borderRight: '1px solid #D04E2B'
                        }}
                      >
                        1 hour
                      </button>
                      <button
                        type="button"
                        onClick={() => setSessionLengthHours(2)}
                        className="px-3 py-1 text-xs md:text-sm font-medium rounded-full"
                        style={{
                          backgroundColor: sessionLengthHours === 2 ? '#D04E2B' : 'transparent',
                          color: sessionLengthHours === 2 ? '#FFFFFF' : '#E59D50'
                        }}
                      >
                        2 hours
                      </button>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  {availability.booths.map((b) => (
                    <div key={b.booth.id} className="space-y-3">
                      <p className="font-medium" style={{ color: '#FFFFFF' }}>Time Slots</p>
                      <div className="flex flex-wrap gap-2">
                        {b.slots.map((s, idx) => {
                          const isTwoHour = sessionLengthHours === 2
                          const nextSlot = isTwoHour ? b.slots[idx + 1] : undefined
                          const canStartTwoHour =
                            isTwoHour &&
                            nextSlot &&
                            s.status === 'available' &&
                            nextSlot.status === 'available'
                          const slotStart = s.start_time
                          const slotEnd = isTwoHour && canStartTwoHour ? nextSlot!.end_time : s.end_time
                          const isSelected =
                            selectedSlot &&
                            selectedSlot.start === slotStart &&
                            selectedSlot.end === slotEnd
                          const baseDisabled = s.status !== 'available' || !!hold
                          const disabled = baseDisabled || (isTwoHour && !canStartTwoHour)
                          const btn = (
                            <button
                              key={idx}
                              disabled={disabled}
                              onClick={async () => {
                                const combinedStart = slotStart
                                const combinedEnd = slotEnd
                                setSelectedSlot({ start: combinedStart, end: combinedEnd })
                                setSelectedBoothId('')
                                setHold(null)
                                setLoadingBooths(true)
                                try {
                                  const booths = await fetchBoothsForSlot({
                                    venue,
                                    bookingDate: dateStr,
                                    startTime: combinedStart,
                                    endTime: combinedEnd,
                                    minCapacity: groupSize
                                  })
                                  setSlotBooths(booths)
                                } catch (e) {
                                  const msg = e instanceof Error ? e.message : String(e)
                                  setError(msg || 'Failed to load booths for slot')
                                } finally {
                                  setLoadingBooths(false)
                                }
                              }}
                              className="px-3 py-2 rounded-md text-sm border disabled:opacity-50 font-medium"
                              style={{
                                backgroundColor: isSelected ? '#D04E2B' : '#FFFFFF',
                                color: isSelected ? '#FFFFFF' : '#000000',
                                borderColor: isSelected ? '#D04E2B' : '#CCCCCC'
                              }}
                            >
                              {s.start_time}–{s.end_time}
                              {isTwoHour && canStartTwoHour ? ' (2 hours)' : ''}
                              {s.status !== 'available' ? ` · ${s.status}` : ''}
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
                          <label className="text-sm font-medium" style={{ color: '#E59D50' }}>Select Booth</label>
                          {loadingBooths ? (
                            <div className="flex items-center space-x-2 text-sm" style={{ color: '#E59D50' }}>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2" style={{ borderColor: '#E59D50' }}></div>
                              <span>Loading booths...</span>
                            </div>
                          ) : slotBooths.length === 0 ? (
                            <div className="text-sm" style={{ color: '#CCCCCC' }}>No booths available for this slot</div>
                          ) : (
                            <Select value={selectedBoothId} onValueChange={(v) => {
                              setSelectedBoothId(v)
                              if (v) {
                                createHold(v, selectedSlot.start, selectedSlot.end)
                              }
                            }}>
                              <SelectTrigger 
                                className="font-medium" 
                                style={{ 
                                  backgroundColor: '#FFFFFF', 
                                  color: '#000000', 
                                  borderColor: '#D04E2B',
                                  borderWidth: '2px'
                                }}
                              >
                                <SelectValue 
                                  placeholder="Choose a booth" 
                                  style={{ color: '#666666' }}
                                />
                              </SelectTrigger>
                              <SelectContent 
                                style={{ 
                                  backgroundColor: '#FFFFFF', 
                                  border: '2px solid #D04E2B',
                                  borderRadius: '6px'
                                }}
                              >
                                {slotBooths.map((booth) => (
                                  <SelectItem 
                                    key={booth.id} 
                                    value={booth.id}
                                    className="font-medium hover:bg-red-50 focus:bg-red-50"
                                    style={{ 
                                      color: '#000000',
                                      backgroundColor: 'transparent'
                                    }}
                                  >
                                    {booth.name} · up to {booth.capacity}
                                  </SelectItem>
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
              <div className="flex items-center justify-between rounded-md border p-3" style={{ borderColor: '#D04E2B', backgroundColor: 'rgba(208, 78, 43, 0.1)' }}>
                <p className="text-sm" style={{ color: '#FFFFFF' }}>Slot reserved until {new Date(hold.expiresAt).toLocaleTimeString()}</p>
                <Button 
                  variant="secondary" 
                  onClick={cancelHold}
                  className="font-medium"
                  style={{ backgroundColor: '#FFFFFF', color: '#D04E2B', border: '1px solid #D04E2B' }}
                >
                  Release hold
                </Button>
              </div>
            )}

            {error && (
              <div className="p-3 rounded-md" style={{ backgroundColor: 'rgba(220, 38, 127, 0.2)', border: '1px solid #DC2678' }}>
                <p className="text-sm" style={{ color: '#FFB3D1' }}>{error}</p>
              </div>
            )}

            <div className="space-y-4">
              {/* Show invoice + card only after a hold is created (we auto-open payment then) */}
              {showPayment && (
                <>
                <div className="rounded-md border p-3" style={{ borderColor: '#D04E2B', backgroundColor: 'rgba(208, 78, 43, 0.1)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium" style={{ color: '#E59D50' }}>Order Summary</h4>
                  </div>
                  <div className="divide-y" style={{ borderColor: '#D04E2B' }}>
                    <div className="py-2 flex text-sm">
                      <div className="flex-1">
                        <div className="font-medium" style={{ color: '#FFFFFF' }}>Karaoke Booth</div>
                        <div style={{ color: '#CCCCCC' }}>Qty 1</div>
                      </div>
                      <div className="w-28 text-right" style={{ color: '#FFFFFF' }}>{boothUnitPrice ? formatAUD(boothUnitPrice) : '—'}</div>
                      <div className="w-32 text-right font-medium" style={{ color: '#FFFFFF' }}>{boothUnitPrice ? formatAUD(boothTotal) : '—'}</div>
                    </div>
                    <div className="py-2 flex text-sm">
                      <div className="flex-1">
                        <div className="font-medium" style={{ color: '#FFFFFF' }}>Venue Tickets</div>
                        <div style={{ color: '#CCCCCC' }}>Qty {ticketsQty}</div>
                      </div>
                      <div className="w-28 text-right" style={{ color: '#FFFFFF' }}>{formatAUD(ticketUnitPrice)}</div>
                      <div className="w-32 text-right font-medium" style={{ color: '#FFFFFF' }}>{formatAUD(ticketsTotal)}</div>
                    </div>
                    <div className="py-2 flex text-sm">
                      <div className="flex-1" />
                      <div className="w-28 text-right font-medium" style={{ color: '#E59D50' }}>Total</div>
                      <div className="w-32 text-right font-medium" style={{ color: '#E59D50' }}>{formatAUD(grandTotal)}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium" style={{ color: '#E59D50' }}>Payment</label>
                  <div id="card-container" className="border rounded-md p-3" style={{ borderColor: '#D04E2B', backgroundColor: '#FFFFFF' }} />
                </div>
                </>
              )}
              <div className="flex justify-end gap-2">
                <Button 
                  onClick={handlePayAndBook} 
                  disabled={!canPay}
                  className="font-blur font-bold px-8 py-3 rounded-full uppercase tracking-wider transition-all duration-300 disabled:opacity-50 hover:scale-105"
                  style={{
                    backgroundColor: '#271308',
                    color: '#D04E2B',
                    border: 'none'
                  }}
                >
                  {submitting ? 'Processing...' : 'PAY & BOOK'}
                </Button>
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


