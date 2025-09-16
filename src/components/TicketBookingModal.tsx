import React, { useMemo, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Calendar } from './ui/calendar'
import { addDays, format } from 'date-fns'
import { createTicketBooking, type Venue } from '../services/ticketBooking'
import ReferenceCodeDisplay from './ReferenceCodeDisplay'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { Info, Check, X } from 'lucide-react'

interface Props {
  isOpen: boolean
  onClose: () => void
  defaultVenue?: Venue
}

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
  const [successBooking, setSuccessBooking] = useState<{ id: string; reference_code: string } | null>(null)

  const dateStr = useMemo(() => (date ? format(date, 'yyyy-MM-dd') : ''), [date])

  const quantityOptions = Array.from({ length: 10 }, (_, i) => i + 1)

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
           isAgeValid()
  }

  const submit = async () => {
    setError(null)
    if (!dateStr) { setError('Please choose a date'); return }
    if (!email && !phone) { setError('Provide an email or phone'); return }
    if (!name.trim()) { setError('Please provide your name'); return }
    if (!dateOfBirth) { setError('Please provide your date of birth'); return }
    if (!isAgeValid()) { setError('This ticket type is only for guests who are 25 or older'); return }
    
    setSubmitting(true)
    try {
      const res = await createTicketBooking({
        customerName: name,
        customerEmail: email || undefined,
        customerPhone: phone || undefined,
        venue,
        bookingDate: dateStr,
        ticketQuantity
      })
      setSuccessBooking(res)
      window.dispatchEvent(new CustomEvent('ticket-booking-success', { detail: { bookingId: res.id } }))
    } catch (e: any) {
      setError(e.message || 'Failed to create booking')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(v) => { if (!v) onClose() }}>
      <DialogContent className="w-full max-w-[90vw] sm:max-w-2xl">
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
            <h3 className="text-2xl font-medium text-center">25+ Priority Ticket Booked!</h3>
            <p className="text-center text-gray-600">Your VIP ticket has been booked. Make sure that you and all of your guests bring your ID on the day. Below is your reference code, but we've sent that to you separately.</p>
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
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-gray-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="z-50">
                          <p className="max-w-xs">We don't store this information, but we use it to validate your age for booking purposes. We'll check your ID on the day to verify this information.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
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
