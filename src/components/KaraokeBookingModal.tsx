import React, { useEffect, useMemo, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Calendar } from './ui/calendar'
import { format } from 'date-fns'
import ReferenceCodeDisplay from './ReferenceCodeDisplay'
import {
  type Venue,
  type AvailabilityResponse,
  fetchKaraokeAvailability,
  fetchBoothsForSlot,
  createKaraokeHold,
  releaseKaraokeHold,
  confirmKaraokeBooking
} from '../services/karaoke'

interface Props {
  isOpen: boolean
  onClose: () => void
  defaultVenue?: Venue
}

export default function KaraokeBookingModal({ isOpen, onClose, defaultVenue = 'manor' }: Props) {
  const [venue, setVenue] = useState<Venue>(defaultVenue)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [partySize, setPartySize] = useState<number>(2)
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(null)
  const [loadingAvail, setLoadingAvail] = useState(false)
  const [selectedBoothId, setSelectedBoothId] = useState<string>('')
  const [selectedSlot, setSelectedSlot] = useState<{ start: string; end: string } | null>(null)
  const [slotBooths, setSlotBooths] = useState<{ id: string; name: string; capacity: number }[]>([])
  const [hold, setHold] = useState<{ id: string; expiresAt: string } | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<{ id: string; ref: string } | null>(null)

  const dateStr = useMemo(() => (date ? format(date, 'yyyy-MM-dd') : ''), [date])

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
    try {
      const res = await createKaraokeHold({ venue, booth_id: boothId, booking_date: dateStr, start_time: start, end_time: end })
      setHold({ id: res.hold_id, expiresAt: res.expires_at })
      setSelectedBoothId(boothId)
      setSelectedSlot({ start, end })
    } catch (e: any) {
      setError(e.message || 'Failed to create hold')
    }
  }

  const cancelHold = async () => {
    if (!hold) return
    try { await releaseKaraokeHold(hold.id) } catch {}
    setHold(null)
    setSelectedSlot(null)
  }

  const confirm = async () => {
    if (!hold) { setError('Please select a time slot'); return }
    if (!name.trim()) { setError('Please enter your name'); return }
    if (!email && !phone) { setError('Provide an email or phone'); return }
    setSubmitting(true)
    setError(null)
    try {
      const res = await confirmKaraokeBooking({ holdId: hold.id, customer_name: name, customer_email: email || undefined, customer_phone: phone || undefined })
      let ref = res.reference_code
      // If reference code isn't returned by the function, fetch it from the DB
      if (!ref && res.booking_id) {
        try {
          const { fetchBookingReferenceCode } = await import('../services/karaoke')
          ref = (await fetchBookingReferenceCode(res.booking_id)) || ''
        } catch {}
      }
      setSuccess({ id: res.booking_id, ref: ref || '' })
    } catch (e: any) {
      setError(e.message || 'Failed to confirm booking')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(v) => { if (!v) onClose() }}>
      <DialogContent className="max-w-3xl">
        {!success && (
          <DialogHeader>
            <DialogTitle>Book Karaoke Booth</DialogTitle>
          </DialogHeader>
        )}

        {success ? (
          <div className="space-y-8">
            <div className="flex justify-center">
              <svg className="h-16 w-16 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-2xl font-semibold text-center">Karaoke Booking Submitted!</h3>
            <p className="text-center text-gray-600">Your enquiry has been received. Our team will contact you within two business days to confirm details and payment.</p>
            <ReferenceCodeDisplay referenceCode={success.ref} />
            <div className="flex justify-center">
              <Button onClick={onClose}>Close</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Venue</label>
                <Select value={venue} onValueChange={(v: Venue) => setVenue(v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manor">Manor</SelectItem>
                    <SelectItem value="hippie">Hippie</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Date</label>
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
              </div>
            </div>

            {/* Party size */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Party Size</label>
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
                          return (
                            <button
                              key={idx}
                              disabled={disabled}
                              onClick={async () => {
                                setSelectedSlot({ start: s.start_time, end: s.end_time })
                                setSelectedBoothId('')
                                setHold(null)
                                try {
                                  const booths = await fetchBoothsForSlot({ venue, bookingDate: dateStr, startTime: s.start_time, endTime: s.end_time, minCapacity: partySize })
                                  setSlotBooths(booths)
                                } catch (e: any) {
                                  setError(e.message || 'Failed to load booths for slot')
                                }
                              }}
                              className={`px-3 py-2 rounded-md text-sm border ${isSelected ? 'bg-black text-white' : 'bg-white'} disabled:opacity-50`}
                            >
                              {s.start_time}–{s.end_time} {s.status !== 'available' ? `· ${s.status}` : ''}
                            </button>
                          )
                        })}
                      </div>

                      {/* Booth selector appears after slot selection */}
                      {selectedSlot && (
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Select Booth</label>
                          {slotBooths.length === 0 ? (
                            <div className="text-sm text-gray-500">No booths available for this slot</div>
                          ) : (
                            <>
                              <Select value={selectedBoothId} onValueChange={(v) => setSelectedBoothId(v)}>
                                <SelectTrigger><SelectValue placeholder="Choose a booth" /></SelectTrigger>
                                <SelectContent>
                                  {slotBooths.map((booth) => (
                                    <SelectItem key={booth.id} value={booth.id}>{booth.name} · up to {booth.capacity}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <div>
                                <Button disabled={!selectedBoothId} onClick={() => createHold(selectedBoothId, selectedSlot.start, selectedSlot.end)}>Reserve Booth</Button>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2 md:col-span-3">
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
            </div>

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

            <div className="flex justify-end">
              <Button onClick={confirm} disabled={submitting || !hold}>{submitting ? 'Submitting...' : 'Confirm Booking'}</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}


