import React, { useEffect, useMemo, useState } from 'react'
import getSupabase from '../lib/supabaseClient'
import { Button } from './ui/button'

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

interface GuestListEditorProps {
  bookingId: string
  token?: string
  readOnly?: boolean
  heading?: string
  subheading?: string
  showBookingDetails?: boolean
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
}: GuestListEditorProps) {
  const [maxGuests, setMaxGuests] = useState<number | null>(null)
  const [guests, setGuests] = useState<GuestEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null)

  const supabase = useMemo(() => getSupabase(), [])

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
          .select('ticket_quantity, guest_count, reference_code, booking_date, start_time, end_time, karaoke_booth_id')
          .eq('id', bookingId)
          .single()

        if (bookingError) {
          throw bookingError
        }

        const ticketQty = booking?.ticket_quantity || booking?.guest_count || 0

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
        const hasOrganiser = existingGuests.some((g) => g.isOrganiser)
        const max = hasOrganiser ? ticketQty + 1 : ticketQty

        if (!cancelled) {
          setMaxGuests(max)
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
  }, [bookingId, token])

  const handleChangeName = (index: number, value: string) => {
    setGuests((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], name: value }
      return next
    })
    setSaved(false)
    setError(null)
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
    <div className="mt-4 space-y-5">
      {/* Booking Details Card */}
      {showBookingDetails && bookingDetails && (
        <div className="rounded-xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-red-500/10 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-lg font-semibold text-white">Your Booking</h4>
            {bookingDetails.referenceCode && (
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-orange-300">
                {bookingDetails.referenceCode}
              </span>
            )}
          </div>
          <div className="grid gap-3 text-sm">
            {formattedDate && (
              <div className="flex items-center gap-3">
                <span className="text-lg">📅</span>
                <div>
                  <p className="text-xs text-gray-400">Date</p>
                  <p className="font-medium text-white">{formattedDate}</p>
                </div>
              </div>
            )}
            {formattedTime && (
              <div className="flex items-center gap-3">
                <span className="text-lg">🕐</span>
                <div>
                  <p className="text-xs text-gray-400">Time</p>
                  <p className="font-medium text-white">{formattedTime}</p>
                </div>
              </div>
            )}
            {bookingDetails.boothName && (
              <div className="flex items-center gap-3">
                <span className="text-lg">🎤</span>
                <div>
                  <p className="text-xs text-gray-400">Booth</p>
                  <p className="font-medium text-white">{bookingDetails.boothName}</p>
                </div>
              </div>
            )}
            {bookingDetails.guestCount > 0 && (
              <div className="flex items-center gap-3">
                <span className="text-lg">👥</span>
                <div>
                  <p className="text-xs text-gray-400">Guests</p>
                  <p className="font-medium text-white">{bookingDetails.guestCount} {bookingDetails.guestCount === 1 ? 'person' : 'people'}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Guest List Form */}
      <div className="rounded-lg border border-gray-200 bg-white/60 p-5 space-y-4">
        <div>
          <h4 className="text-base font-semibold text-gray-900">{heading}</h4>
          {subheading && <p className="mt-1 text-sm text-gray-600">{subheading}</p>}
          {maxGuests && maxGuests > 0 && (
            <p className="mt-2 text-xs text-gray-500">
              You can add up to <span className="font-medium">{maxGuests}</span> guests.
            </p>
          )}
        </div>

        {error && (
          <p className="text-xs text-red-600">
            {error}
          </p>
        )}

        <div className="space-y-2">
          {(guests || []).map((guest, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="w-6 text-xs font-medium text-gray-500">{idx + 1}.</span>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={guest.name}
                  onChange={(e) => handleChangeName(idx, e.target.value)}
                  placeholder={guest.isOrganiser ? 'Your name (Organiser)' : `Guest ${idx + 1} full name`}
                  disabled={readOnly}
                  className={`w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 ${
                    guest.isOrganiser ? 'border-orange-400 pr-24' : 'border-gray-300'
                  }`}
                />
                {guest.isOrganiser && (
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-medium text-orange-700">
                    Organiser
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {!readOnly && (
          <div className="flex items-center justify-between gap-3">
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


