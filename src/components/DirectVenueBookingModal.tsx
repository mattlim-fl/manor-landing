import React, { useMemo, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Calendar } from './ui/calendar'
import { format } from 'date-fns'
import ReferenceCodeDisplay from './ReferenceCodeDisplay'
import { createVenueBooking, type Venue, type VenueArea } from '../services/booking'

interface Props {
  isOpen: boolean
  onClose: () => void
  defaultVenue?: Venue
  defaultVenueArea?: VenueArea
}

export default function DirectVenueBookingModal({
  isOpen,
  onClose,
  defaultVenue = 'manor',
  defaultVenueArea = 'downstairs'
}: Props) {
  const [venue] = useState<Venue>(defaultVenue)
  const [venueArea, setVenueArea] = useState<VenueArea>(defaultVenueArea)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [startTime, setStartTime] = useState('')
  const [duration, setDuration] = useState<number>(2)
  const [guestCount, setGuestCount] = useState<number | undefined>(undefined)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [specialRequests, setSpecialRequests] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successBooking, setSuccessBooking] = useState<{ id: string; reference_code: string } | null>(null)

  const dateStr = useMemo(() => (date ? format(date, 'yyyy-MM-dd') : ''), [date])

  const areaOptions: { value: VenueArea; label: string }[] = [
    { value: 'downstairs', label: 'Downstairs' },
    { value: 'upstairs', label: 'Upstairs' },
    { value: 'full_venue', label: 'Full Venue' }
  ]

  const durationOptions = Array.from({ length: 12 }, (_, i) => i + 1) // 1-12 hours

  const timeOptions = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2)
    const minute = (i % 2) * 30
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
  })

  const getModalTitle = () => 'Venue Hire Enquiry'

  const isFormValid = () => {
    return dateStr && 
           (email || phone) && 
           name.trim() && 
           guestCount && guestCount > 0
  }

  const submit = async () => {
    setError(null)
    if (!dateStr) { setError('Please choose a date'); return }
    if (!email && !phone) { setError('Provide an email or phone'); return }
    if (!name.trim()) { setError('Please provide your name'); return }
    if (!guestCount || guestCount < 1) { setError('Please enter guest count'); return }

    setSubmitting(true)
    try {
      const res = await createVenueBooking({
        customerName: name,
        customerEmail: email || undefined,
        customerPhone: phone || undefined,
        venue,
        venueArea,
        bookingDate: dateStr,
        startTime: startTime || undefined,
        endTime: undefined, // We'll calculate this based on duration if needed
        guestCount,
        specialRequests: specialRequests || undefined
      })
      setSuccessBooking(res)
      window.dispatchEvent(new CustomEvent('venue-booking-success', { detail: { bookingId: res.id } }))
    } catch (e: any) {
      setError(e.message || 'Failed to create booking')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(v) => { if (!v) onClose() }}>
      <DialogContent className="sm:max-w-[640px]">
        {!successBooking && (
          <DialogHeader>
            <DialogTitle>{getModalTitle()}</DialogTitle>
          </DialogHeader>
        )}

        {successBooking ? (
          <div className="space-y-8">
            <div className="flex justify-center">
              <svg className="h-16 w-16 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-2xl font-semibold text-center">Venue Hire Enquiry Received!</h3>
            <p className="text-center text-gray-600">Your venue hire enquiry has been received. We will get back to you within 48 hours to respond to your enquiry. We have also emailed your reference code to you for your records.</p>
            <ReferenceCodeDisplay referenceCode={successBooking.reference_code} />
            <div className="flex justify-center">
              <Button onClick={onClose}>Close</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {error && (
              <div className="text-sm text-red-600">{error}</div>
            )}

            {/* Contact information at the top */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Your name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+61 ..." />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@example.com" />
              </div>
            </div>

            {/* Venue details and date picker in two columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column: Venue details */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Venue Area</label>
                  <Select value={venueArea} onValueChange={(v) => setVenueArea(v as VenueArea)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select area" />
                    </SelectTrigger>
                    <SelectContent>
                      {areaOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Time</label>
                  <Select value={startTime} onValueChange={setStartTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select start time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Expected Duration</label>
                  <Select value={String(duration)} onValueChange={(v) => setDuration(Number(v))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {durationOptions.map((hours) => (
                        <SelectItem key={hours} value={String(hours)}>
                          {hours} {hours === 1 ? 'hour' : 'hours'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Guests</label>
                  <Input
                    type="number"
                    min={1}
                    value={guestCount || ''}
                    onChange={(e) => setGuestCount(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="Enter number of guests"
                  />
                </div>
              </div>

              {/* Right column: Date picker */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
              </div>
            </div>

            {/* Special requests */}
            <div>
              <label className="block text-sm font-medium mb-2">Special requests</label>
              <textarea
                className="w-full border rounded-md p-2 min-h-[96px]"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Anything else we should know?"
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button onClick={submit} disabled={submitting || !isFormValid()}>
                {submitting ? 'Submitting...' : 'Submit enquiry'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}


