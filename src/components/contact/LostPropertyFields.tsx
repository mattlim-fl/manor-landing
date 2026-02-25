import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

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

interface LostPropertyFieldsProps {
  register: UseFormRegister<ContactFormData>
  errors: FieldErrors<ContactFormData>
}

export function LostPropertyFields({ register, errors }: LostPropertyFieldsProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-acumin font-medium text-manor-gold mb-1">
          What did you lose? *
        </label>
        <Textarea
          {...register('itemDescription', { required: 'Please describe the item' })}
          placeholder="Describe the item (e.g., black iPhone 14, blue wallet with ID)"
          className="bg-manor-brown/50 border-manor-gold/30 text-white placeholder:text-white/50 focus:border-manor-gold font-acumin"
          rows={3}
        />
        {errors.itemDescription && (
          <p className="text-sm text-red-400 mt-1 font-acumin">{errors.itemDescription.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-acumin font-medium text-manor-gold mb-1">
          When did you lose it? *
        </label>
        <Input
          type="date"
          {...register('dateLost', { required: 'Please select a date' })}
          className="bg-manor-brown/50 border-manor-gold/30 text-white focus:border-manor-gold font-acumin"
        />
        {errors.dateLost && (
          <p className="text-sm text-red-400 mt-1 font-acumin">{errors.dateLost.message}</p>
        )}
      </div>
    </div>
  )
}
