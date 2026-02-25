import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'

interface ContactFormData {
  name: string
  email: string
  phone?: string
  itemDescription?: string
  dateLost?: string
  message?: string
  queryDescription?: string
  incidentDate?: string
  requestedAction?: string
  needsFollowUp?: boolean
}

interface BusinessHoursViewProps {
  register: UseFormRegister<ContactFormData>
  errors: FieldErrors<ContactFormData>
  needsFollowUp: boolean
  onFollowUpChange: (checked: boolean) => void
}

export function BusinessHoursView({
  register,
  errors,
  needsFollowUp,
  onFollowUpChange,
}: BusinessHoursViewProps) {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-manor-brown/50 border border-manor-gold/30 rounded-xl">
        <h3 className="font-blur text-xl text-manor-gold uppercase tracking-wider mb-4">
          Our Opening Hours
        </h3>
        <div className="space-y-3 font-acumin">
          <div className="flex justify-between items-center py-2 border-b border-manor-gold/20">
            <span className="text-white">Saturday</span>
            <span className="text-manor-gold">11pm - 4am</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-white/70">Other days</span>
            <span className="text-white/70">Private functions only</span>
          </div>
        </div>
        <p className="text-sm text-white/70 mt-4 font-acumin">
          We're also available for private functions on other days. Contact us for availability.
        </p>
      </div>

      <div className="flex items-start gap-3">
        <Checkbox
          id="needsFollowUp"
          checked={needsFollowUp}
          onCheckedChange={onFollowUpChange}
          className="mt-1 border-manor-gold/50 data-[state=checked]:bg-manor-coral data-[state=checked]:border-manor-coral"
        />
        <label htmlFor="needsFollowUp" className="text-sm text-white cursor-pointer font-acumin">
          I still need to contact someone about my question
        </label>
      </div>

      {needsFollowUp && (
        <div>
          <label className="block text-sm font-acumin font-medium text-manor-gold mb-1">
            How can we help?
          </label>
          <Textarea
            {...register('message')}
            placeholder="Let us know what you need and we'll get back to you"
            className="bg-manor-brown/50 border-manor-gold/30 text-white placeholder:text-white/50 focus:border-manor-gold font-acumin"
            rows={3}
          />
        </div>
      )}
    </div>
  )
}
