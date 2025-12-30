import getSupabase from '../lib/supabaseClient'

export interface VenueAreaRecord {
  id: number
  venue: string
  code: string
  name: string
  description?: string | null
  capacity_min?: number | null
  capacity_max?: number | null
  is_active: boolean
  sort_order?: number | null
  image_url?: string | null
  weekly_hours: Record<string, { open: string; close: string }>
}

export const DEFAULT_WEEKLY_HOURS: Record<string, { open: string; close: string }> = {
  // 0=Sun .. 6=Sat
  '0': { open: '20:00', close: '02:00' },
  '1': { open: '18:00', close: '05:00' },
  '2': { open: '18:00', close: '05:00' },
  '3': { open: '18:00', close: '05:00' },
  '4': { open: '18:00', close: '05:00' },
  '5': { open: '18:00', close: '05:00' },
  '6': { open: '18:00', close: '23:00' }
}

export function getEffectiveWeeklyHours(weeklyHours?: Record<string, { open: string; close: string }>): Record<string, { open: string; close: string }> {
  const hasAny = weeklyHours && Object.keys(weeklyHours).length > 0
  if (!hasAny) return DEFAULT_WEEKLY_HOURS
  // fill missing days from defaults
  const merged: Record<string, { open: string; close: string }> = { ...DEFAULT_WEEKLY_HOURS }
  for (const k in weeklyHours) {
    if (weeklyHours[k]?.open && weeklyHours[k]?.close) {
      merged[k] = weeklyHours[k]
    }
  }
  return merged
}

export async function fetchActiveVenueAreas(venue: string): Promise<VenueAreaRecord[]> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('venue_areas')
    .select('id, venue, code, name, description, capacity_min, capacity_max, is_active, sort_order, image_url, weekly_hours')
    .eq('venue', venue)
    .eq('is_active', true)
    .order('sort_order', { ascending: true, nullsFirst: false })
    .order('name', { ascending: true })

  if (error) throw new Error(error.message)
  return data || []
}

export function generateHalfHourSlotsForDate(dateISO: string, weeklyHours: Record<string, { open: string; close: string }>): string[] {
  const date = new Date(dateISO)
  const day = date.getDay() // 0=Sunday
  const effective = getEffectiveWeeklyHours(weeklyHours)
  const todays = effective?.[String(day)]
  if (!todays || !todays.open || !todays.close) return []

  const toMinutes = (t: string): number => {
    const [hh, mm] = t.split(':').map(Number)
    return (hh * 60) + mm
  }

  const openM = toMinutes(todays.open)
  const closeM = toMinutes(todays.close)

  // handle overnight: if close <= open, it closes next day
  const total = (closeM <= openM) ? (closeM + (24 * 60)) - openM : closeM - openM

  const slots: string[] = []
  for (let m = 0; m < total; m += 30) {
    const mins = (openM + m) % (24 * 60)
    const hh = Math.floor(mins / 60)
    const mm = mins % 60
    slots.push(`${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`)
  }
  return slots
}


