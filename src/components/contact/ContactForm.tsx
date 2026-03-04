import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { LostPropertyFields } from './LostPropertyFields'
import { SkantechFields } from './SkantechFields'
import { BusinessHoursView } from './BusinessHoursView'
import { GeneralFields } from './GeneralFields'
import { SuccessState } from './SuccessState'
import { submitContactInquiry, type ContactCategory, type Venue } from '@/services/contact'
import { Loader2 } from 'lucide-react'

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

interface ContactFormProps {
  venue: Venue
}

const categoryLabels: Record<ContactCategory, string> = {
  lost_property: 'Lost Property',
  skantech: 'Scantech Inquiry',
  function_inquiry: 'Function / Venue Hire',
  business_hours: 'Opening Hours',
  something_else: 'Something Else',
}

export function ContactForm({ venue }: ContactFormProps) {
  const navigate = useNavigate()
  const [category, setCategory] = useState<ContactCategory | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean
    referenceCode?: string
    error?: string
  } | null>(null)
  const [needsFollowUp, setNeedsFollowUp] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ContactFormData>()

  const requestedAction = watch('requestedAction')

  const onSubmit = async (data: ContactFormData) => {
    if (!category) return

    // For function_inquiry, redirect to services page
    if (category === 'function_inquiry') {
      navigate('/services')
      return
    }

    // For business_hours without follow-up, don't submit (just showed info)
    if (category === 'business_hours' && !needsFollowUp) {
      return
    }

    setIsSubmitting(true)

    // Build inquiry data based on category
    const inquiryData: Record<string, unknown> = {}

    if (category === 'lost_property') {
      inquiryData.itemDescription = data.itemDescription
      inquiryData.dateLost = data.dateLost
    } else if (category === 'skantech') {
      inquiryData.queryDescription = data.queryDescription
      inquiryData.incidentDate = data.incidentDate
      inquiryData.requestedAction = data.requestedAction
    } else if (category === 'business_hours') {
      inquiryData.message = data.message
      inquiryData.needsFollowUp = true
    } else {
      inquiryData.message = data.message
    }

    const result = await submitContactInquiry({
      venue,
      category,
      name: data.name,
      email: data.email,
      phone: data.phone,
      inquiryData,
    })

    setIsSubmitting(false)
    setSubmissionResult(result)
  }

  const handleReset = () => {
    reset()
    setCategory(null)
    setSubmissionResult(null)
    setNeedsFollowUp(false)
  }

  // Show success state
  if (submissionResult?.success && submissionResult.referenceCode) {
    return (
      <SuccessState
        referenceCode={submissionResult.referenceCode}
        category={category || 'something_else'}
        onReset={handleReset}
      />
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Category Selection */}
      <div>
        <label className="block text-sm font-acumin font-medium text-manor-gold mb-2">
          What can we help you with? *
        </label>
        <Select
          value={category || ''}
          onValueChange={(value) => setCategory(value as ContactCategory)}
        >
          <SelectTrigger className="bg-manor-brown/50 border-manor-gold/30 text-white focus:border-manor-gold font-acumin">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent className="bg-manor-brown border-manor-gold/30">
            {(Object.keys(categoryLabels) as ContactCategory[]).map((key) => (
              <SelectItem key={key} value={key} className="text-white font-acumin hover:bg-manor-coral/20">
                {categoryLabels[key]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Show different content based on category */}
      {category === 'function_inquiry' && (
        <div className="p-4 bg-manor-brown/50 border border-manor-gold/30 rounded-lg">
          <p className="text-white mb-4 font-acumin">
            For function and venue hire inquiries, please visit our services page.
          </p>
          <button
            type="submit"
            className="manor-pill-btn manor-pill-btn-coral px-6 py-3"
          >
            Go to Services
          </button>
        </div>
      )}

      {category === 'business_hours' && (
        <>
          <BusinessHoursView
            register={register}
            errors={errors}
            needsFollowUp={needsFollowUp}
            onFollowUpChange={setNeedsFollowUp}
          />

          {/* Only show contact fields if they need follow-up */}
          {needsFollowUp && (
            <ContactDetailsFields register={register} errors={errors} />
          )}

          {needsFollowUp && (
            <SubmitButton isSubmitting={isSubmitting} />
          )}
        </>
      )}

      {category && category !== 'function_inquiry' && category !== 'business_hours' && (
        <>
          {/* Contact Details */}
          <ContactDetailsFields register={register} errors={errors} />

          {/* Category-specific fields */}
          {category === 'lost_property' && (
            <LostPropertyFields register={register} errors={errors} />
          )}

          {category === 'skantech' && (
            <SkantechFields
              register={register}
              errors={errors}
              setValue={setValue}
              requestedAction={requestedAction}
            />
          )}

          {category === 'something_else' && (
            <GeneralFields register={register} errors={errors} />
          )}

          {/* Error message */}
          {submissionResult?.error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm font-acumin">{submissionResult.error}</p>
            </div>
          )}

          <SubmitButton isSubmitting={isSubmitting} />
        </>
      )}
    </form>
  )
}

function ContactDetailsFields({
  register,
  errors,
}: {
  register: ReturnType<typeof useForm<ContactFormData>>['register']
  errors: ReturnType<typeof useForm<ContactFormData>>['formState']['errors']
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-acumin font-medium text-manor-gold mb-1">
            Your name *
          </label>
          <Input
            {...register('name', { required: 'Name is required' })}
            placeholder="Full name"
            className="bg-manor-brown/50 border-manor-gold/30 text-white placeholder:text-white/50 focus:border-manor-gold font-acumin"
          />
          {errors.name && (
            <p className="text-sm text-red-400 mt-1 font-acumin">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-acumin font-medium text-manor-gold mb-1">
            Email *
          </label>
          <Input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            placeholder="you@example.com"
            className="bg-manor-brown/50 border-manor-gold/30 text-white placeholder:text-white/50 focus:border-manor-gold font-acumin"
          />
          {errors.email && (
            <p className="text-sm text-red-400 mt-1 font-acumin">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-acumin font-medium text-manor-gold mb-1">
          Phone (optional)
        </label>
        <Input
          type="tel"
          {...register('phone')}
          placeholder="04XX XXX XXX"
          className="bg-manor-brown/50 border-manor-gold/30 text-white placeholder:text-white/50 focus:border-manor-gold font-acumin"
        />
      </div>
    </div>
  )
}

function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full manor-pill-btn manor-pill-btn-coral py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isSubmitting ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Submitting...
        </>
      ) : (
        'Submit'
      )}
    </button>
  )
}
