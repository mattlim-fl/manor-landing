import React, { useEffect, useMemo, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Calendar } from './ui/calendar'
import { format } from 'date-fns'
import ReferenceCodeDisplay from './ReferenceCodeDisplay'
import { createVenueBooking, type Venue, type VenueArea } from '../services/booking'
import { fetchActiveVenueAreas, type VenueAreaRecord, generateHalfHourSlotsForDate, getEffectiveWeeklyHours } from '../services/venueAreas'

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
  const [areaOptions, setAreaOptions] = useState<{ value: string; label: string }[]>([])
  const [areasByCode, setAreasByCode] = useState<Record<string, VenueAreaRecord>>({})
  const [loadingAreas, setLoadingAreas] = useState(false)
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

  const MIN_DURATION_HOURS = 2
  const MAX_DURATION_HOURS = 8

  const toMinutes = (t: string): number => {
    const [hh, mm] = t.split(':').map(Number)
    return (hh * 60) + mm
  }
  const minutesToTime = (mins: number): string => {
    const m = ((mins % (24 * 60)) + (24 * 60)) % (24 * 60)
    const hh = Math.floor(m / 60)
    const mm = m % 60
    return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`
  }

  useEffect(() => {
    let isMounted = true
    async function loadAreas() {
      try {
        setLoadingAreas(true)
        const areas: VenueAreaRecord[] = await fetchActiveVenueAreas(venue)
        if (!isMounted) return
        const opts = areas.map(a => ({ value: a.code, label: a.name }))
        const byCode: Record<string, VenueAreaRecord> = {}
        areas.forEach(a => { byCode[a.code] = a })
        setAreasByCode(byCode)
        setAreaOptions(opts)
        if (opts.length > 0 && !opts.find(o => o.value === venueArea)) {
          setVenueArea(opts[0].value as VenueArea)
        }
      } catch (e) {
        console.warn('Failed to load venue areas', e)
      } finally {
        if (isMounted) setLoadingAreas(false)
      }
    }
    loadAreas()
    return () => { isMounted = false }
  }, [venue])

  

  const [timeOptions, setTimeOptions] = useState<string[]>([])
  const [availableDurations, setAvailableDurations] = useState<number[]>([])

  useEffect(() => {
    // Compute slots from weekly_hours embedded on chosen area
    const area = areasByCode[venueArea as string]
    if (!area || !dateStr) { setTimeOptions([]); setAvailableDurations([]); return }
    const slots = generateHalfHourSlotsForDate(dateStr, area.weekly_hours)

    const day = new Date(dateStr).getDay()
    const effective = getEffectiveWeeklyHours(area.weekly_hours)
    const todays = effective[String(day)]
    if (!todays) { setTimeOptions([]); setAvailableDurations([]); return }
    let openM = toMinutes(todays.open)
    let closeM = toMinutes(todays.close)
    if (closeM <= openM) closeM += 24 * 60

    // Filter start times to ensure min duration fits before close
    const filtered = slots.filter((t) => {
      const m = toMinutes(t)
      const abs = (closeM > 24 * 60 && m < openM) ? m + 24 * 60 : m
      return abs + MIN_DURATION_HOURS * 60 <= closeM
    })
    setTimeOptions(filtered)
    if (startTime && !filtered.includes(startTime)) {
      setStartTime('')
    }

    // Compute available durations based on selected start time
    if (startTime && filtered.includes(startTime)) {
      const m = toMinutes(startTime)
      const abs = (closeM > 24 * 60 && m < openM) ? m + 24 * 60 : m
      const remaining = Math.max(0, closeM - abs)
      const maxByClose = Math.floor(remaining / 60)
      const maxAllowed = Math.min(MAX_DURATION_HOURS, maxByClose)
      const minAllowed = Math.min(MIN_DURATION_HOURS, maxAllowed)
      const opts = Array.from({ length: Math.max(0, maxAllowed - minAllowed + 1) }, (_, i) => minAllowed + i)
      setAvailableDurations(opts)
      if (!opts.includes(duration)) {
        if (opts.length > 0) setDuration(opts[0])
      }
    } else {
      // No start time selected yet: show the base 2..8 range
      setAvailableDurations(Array.from({ length: MAX_DURATION_HOURS - MIN_DURATION_HOURS + 1 }, (_, i) => MIN_DURATION_HOURS + i))
      if (duration < MIN_DURATION_HOURS || duration > MAX_DURATION_HOURS) setDuration(MIN_DURATION_HOURS)
    }
  }, [areasByCode, venueArea, dateStr, startTime, duration])

  const getModalTitle = () => 'Venue Hire Enquiry'

  const isFormValid = () => {
    const hasValidDuration = availableDurations.includes(duration)
    return dateStr && 
           (email || phone) && 
           name.trim() && 
           guestCount && guestCount > 0 &&
           startTime && hasValidDuration
  }

  const submit = async () => {
    setError(null)
    if (!dateStr) { setError('Please choose a date'); return }
    if (!email && !phone) { setError('Provide an email or phone'); return }
    if (!name.trim()) { setError('Please provide your name'); return }
    if (!guestCount || guestCount < 1) { setError('Please enter guest count'); return }

    setSubmitting(true)
    try {
      // compute end time from start time and duration
      const area = areasByCode[venueArea as string]
      let computedEndTime: string | undefined = undefined
      if (area && startTime) {
        const day = new Date(dateStr).getDay()
        const effective = getEffectiveWeeklyHours(area.weekly_hours)
        const todays = effective[String(day)]
        if (todays) {
          let openM = toMinutes(todays.open)
          let closeM = toMinutes(todays.close)
          if (closeM <= openM) closeM += 24 * 60
          const startM = toMinutes(startTime)
          const startAbs = (closeM > 24 * 60 && startM < openM) ? startM + 24 * 60 : startM
          const endAbs = startAbs + duration * 60
          // endAbs could pass midnight; convert back to time-of-day
          computedEndTime = minutesToTime(endAbs)
        }
      }

      const res = await createVenueBooking({
        customerName: name,
        customerEmail: email || undefined,
        customerPhone: phone || undefined,
        venue,
        venueArea,
        venueAreaName: (areaOptions.find(o => o.value === venueArea)?.label) || undefined,
        bookingDate: dateStr,
        startTime: startTime || undefined,
        endTime: computedEndTime,
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
      <DialogContent className="w-full max-w-[90vw] sm:max-w-[640px]">
        {!successBooking && (
          <DialogHeader>
            <DialogTitle className="font-medium">{getModalTitle()}</DialogTitle>
          </DialogHeader>
        )}

        {successBooking ? (
          <div className="space-y-8">
            <div className="flex justify-center">
              <svg className="h-16 w-16 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-2xl font-medium text-center">Venue Hire Enquiry Received!</h3>
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
                  <Select value={venueArea} onValueChange={(v) => setVenueArea(v as VenueArea)} disabled={loadingAreas}>
                    <SelectTrigger>
                      <SelectValue placeholder={loadingAreas ? 'Loading areas...' : 'Select area'} />
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
                  <Select value={startTime} onValueChange={setStartTime} disabled={!dateStr || timeOptions.length === 0}>
                    <SelectTrigger>
                      <SelectValue placeholder={!dateStr ? 'Select a date first' : (timeOptions.length === 0 ? 'No times available' : 'Select start time')} />
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
                      {availableDurations.map((hours) => (
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


