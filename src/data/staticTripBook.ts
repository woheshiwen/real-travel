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
import * as chengdu from '../data/chengduTrip'
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

/** Bundled fallback for the Chengdu autumn-break trip. */
export function staticChengduBook(): TripBook {
  return {
    id: 'chengdu',
    meta: { ...chengdu.tripMeta },
    weatherDays: [...chengdu.weatherDays],
    weatherSummary: chengdu.weatherSummary,
    transportLegs: [...chengdu.transportLegs],
    transportNote: chengdu.transportNote,
    days: [...chengdu.days],
    costs: [...chengdu.costs],
    costTotal: chengdu.costTotal,
    costPerPerson: chengdu.costPerPerson,
    tips: [...chengdu.tips],
    situations: [...chengdu.situations],
  }
}
