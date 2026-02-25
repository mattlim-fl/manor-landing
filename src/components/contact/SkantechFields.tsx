import { UseFormRegister, FieldErrors, UseFormSetValue } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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
}

interface SkantechFieldsProps {
  register: UseFormRegister<ContactFormData>
  errors: FieldErrors<ContactFormData>
  setValue: UseFormSetValue<ContactFormData>
  requestedAction?: string
}

export function SkantechFields({ register, errors, setValue, requestedAction }: SkantechFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-manor-gold/10 border border-manor-gold/30 rounded-lg">
        <p className="text-sm text-white/90 font-acumin">
          If you believe you've been incorrectly identified by our security system or have a
          question about an incident, please provide the details below. All inquiries are
          reviewed by our security team.
        </p>
      </div>

      <div>
        <label className="block text-sm font-acumin font-medium text-manor-gold mb-1">
          Describe your inquiry *
        </label>
        <Textarea
          {...register('queryDescription', { required: 'Please describe your inquiry' })}
          placeholder="Please provide as much detail as possible about your situation"
          className="bg-manor-brown/50 border-manor-gold/30 text-white placeholder:text-white/50 focus:border-manor-gold font-acumin"
          rows={4}
        />
        {errors.queryDescription && (
          <p className="text-sm text-red-400 mt-1 font-acumin">{errors.queryDescription.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-acumin font-medium text-manor-gold mb-1">
          Date of incident *
        </label>
        <Input
          type="date"
          {...register('incidentDate', { required: 'Please select a date' })}
          className="bg-manor-brown/50 border-manor-gold/30 text-white focus:border-manor-gold font-acumin"
        />
        {errors.incidentDate && (
          <p className="text-sm text-red-400 mt-1 font-acumin">{errors.incidentDate.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-acumin font-medium text-manor-gold mb-1">
          What would you like us to do? *
        </label>
        <Select
          value={requestedAction}
          onValueChange={(value) => setValue('requestedAction', value)}
        >
          <SelectTrigger className="bg-manor-brown/50 border-manor-gold/30 text-white focus:border-manor-gold font-acumin">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent className="bg-manor-brown border-manor-gold/30">
            <SelectItem value="review_ban" className="text-white font-acumin">Review my ban status</SelectItem>
            <SelectItem value="provide_info" className="text-white font-acumin">I have information about an incident</SelectItem>
            <SelectItem value="question" className="text-white font-acumin">I have a question</SelectItem>
            <SelectItem value="other" className="text-white font-acumin">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.requestedAction && (
          <p className="text-sm text-red-400 mt-1 font-acumin">{errors.requestedAction.message}</p>
        )}
      </div>
    </div>
  )
}
