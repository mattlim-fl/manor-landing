import React, { useMemo, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Calendar } from './ui/calendar'
import { addDays, format } from 'date-fns'
import { createTicketBooking, type Venue } from '../services/ticketBooking'
import ReferenceCodeDisplay from './ReferenceCodeDisplay'

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
  const [venue, setVenue] = useState<Venue>(defaultVenue)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [ticketQuantity, setTicketQuantity] = useState<number>(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successBooking, setSuccessBooking] = useState<{ id: string; reference_code: string } | null>(null)

  const dateStr = useMemo(() => (date ? format(date, 'yyyy-MM-dd') : ''), [date])

  const venueOptions = [
    { value: 'manor', label: 'Manor' },
    { value: 'hippie', label: 'Hippie' }
  ]

  const quantityOptions = Array.from({ length: 10 }, (_, i) => i + 1)

  const getModalTitle = () => {
    return 'Book VIP Entry'
  }

  const submit = async () => {
    setError(null)
    if (!dateStr) { setError('Please choose a date'); return }
    if (!email && !phone) { setError('Provide an email or phone'); return }
    if (!name.trim()) { setError('Please provide your name'); return }
    
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
      <DialogContent className="max-w-2xl">
        {!successBooking && (
          <DialogHeader>
            <DialogTitle>{getModalTitle()}</DialogTitle>
          </DialogHeader>
        )}

        {successBooking ? (
          <div className="space-y-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
                             <h3 className="text-2xl font-semibold text-gray-900 mb-4">VIP Entry Booking Submitted!</h3>
               <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                 Your VIP entry enquiry has been received! Our team will get in touch within the next two business days to confirm your booking and arrange payment.
               </p>
            </div>
            
            <ReferenceCodeDisplay referenceCode={successBooking.reference_code} />
            
            <div className="flex justify-end pt-4">
              <Button onClick={onClose} className="px-8 py-2">Close</Button>
            </div>
          </div>
                 ) : (
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Booking Details */}
              <div className="space-y-4">
                {/* Venue Selection */}
               <div className="space-y-2">
                 <label className="text-sm font-medium text-gray-700">Venue</label>
                 <Select value={venue} onValueChange={(value: Venue) => setVenue(value)}>
                   <SelectTrigger>
                     <SelectValue />
                   </SelectTrigger>
                   <SelectContent>
                     {venueOptions.map(option => (
                       <SelectItem key={option.value} value={option.value}>
                         {option.label}
                       </SelectItem>
                     ))}
                   </SelectContent>
                 </Select>
               </div>

               {/* Date Selection */}
               <div className="space-y-2">
                 <label className="text-sm font-medium text-gray-700">Event Date</label>
                 <Calendar
                   mode="single"
                   selected={date}
                   onSelect={setDate}
                   disabled={(date) => date < new Date()}
                   className="rounded-md border"
                 />
               </div>

               {/* Ticket Quantity */}
               <div className="space-y-2">
                 <label className="text-sm font-medium text-gray-700">Number of Tickets</label>
                 <Select value={ticketQuantity.toString()} onValueChange={(value) => setTicketQuantity(parseInt(value))}>
                   <SelectTrigger>
                     <SelectValue />
                   </SelectTrigger>
                   <SelectContent>
                     {quantityOptions.map(quantity => (
                       <SelectItem key={quantity} value={quantity.toString()}>
                         {quantity} {quantity === 1 ? 'ticket' : 'tickets'}
                       </SelectItem>
                     ))}
                   </SelectContent>
                 </Select>
               </div>
             </div>

             {/* Right Column - Contact Information */}
             <div className="space-y-4">
               {/* Full Name */}
               <div className="space-y-2">
                 <label className="text-sm font-medium text-gray-700">Full Name *</label>
                 <Input
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                   placeholder="Enter your full name"
                 />
               </div>

               {/* Email */}
               <div className="space-y-2">
                 <label className="text-sm font-medium text-gray-700">Email</label>
                 <Input
                   type="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder="Enter your email address"
                 />
               </div>

               {/* Phone */}
               <div className="space-y-2">
                 <label className="text-sm font-medium text-gray-700">Phone</label>
                 <Input
                   type="tel"
                   value={phone}
                   onChange={(e) => setPhone(e.target.value)}
                   placeholder="Enter your phone number"
                 />
               </div>
             </div>

             {/* Error Display - Full Width */}
             {error && (
               <div className="col-span-1 md:col-span-2 p-3 bg-red-50 border border-red-200 rounded-md">
                 <p className="text-sm text-red-600">{error}</p>
               </div>
             )}

             {/* Submit Button - Full Width */}
             <div className="col-span-1 md:col-span-2 flex justify-end pt-4">
               <Button 
                 onClick={submit} 
                 disabled={submitting}
                 className="px-8 py-2"
               >
                 {submitting ? 'Submitting...' : 'Book VIP Entry'}
               </Button>
             </div>
           </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
