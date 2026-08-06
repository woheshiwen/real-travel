import {
  costPerPerson,
  costs,
  costTotal,
  days,
  situations,
  tips,
  transportLegs,
  transportNote,
  tripMeta,
  weatherDays,
  weatherSummary,
} from '../data/xianTrip'
import type { TripBook } from '../services/api'

/** Bundled fallback when the proprietary API is offline. */
export function staticXianBook(): TripBook {
  return {
    id: 'xian',
    meta: { ...tripMeta },
    weatherDays: [...weatherDays],
    weatherSummary,
    transportLegs: [...transportLegs],
    transportNote,
    days: [...days],
    costs: [...costs],
    costTotal,
    costPerPerson,
    tips: [...tips],
    situations: [...situations],
  }
}
