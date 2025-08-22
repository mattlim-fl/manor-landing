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
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [guestCount, setGuestCount] = useState<number>(20)
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

  const getModalTitle = () => 'Enquire: Venue Hire'

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
        endTime: endTime || undefined,
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
        <DialogHeader>
          <DialogTitle>{getModalTitle()}</DialogTitle>
        </DialogHeader>

        {successBooking ? (
          <div className="space-y-6">
            <p className="text-sm text-gray-600">
              Your booking enquiry has been received. We will be in touch shortly.
            </p>
            <ReferenceCodeDisplay referenceCode={successBooking.reference_code} />
            <div className="flex justify-end">
              <Button onClick={onClose}>Close</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {error && (
              <div className="text-sm text-red-600">{error}</div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Venue</label>
                <Input value={venue} disabled />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Area</label>
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

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Date</label>
                <div className="border rounded-md p-2 inline-block">
                  <Calendar mode="single" selected={date} onSelect={setDate} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Start time</label>
                <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">End time</label>
                <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Guests</label>
                <Input
                  type="number"
                  min={1}
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Your name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@example.com" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Phone</label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+61 ..." />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Special requests</label>
                <textarea
                  className="w-full border rounded-md p-2 min-h-[96px]"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Anything else we should know?"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={onClose} disabled={submitting}>Cancel</Button>
              <Button onClick={submit} disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit enquiry'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}


