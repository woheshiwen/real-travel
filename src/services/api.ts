/**
 * Client for the proprietary 真程 API (private repo: real-travel-api).
 * When VITE_API_BASE_URL is unset or unreachable, callers fall back to
 * bundled demo data so the open-source frontend stays runnable alone.
 */

import type {
  CostRow,
  DayPlan,
  SituationUpdate,
  TransportLeg,
  WeatherDay,
} from '../data/xianTrip'

export const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '')

export const apiConfigured = apiBaseUrl.length > 0

export type ApiMoment = {
  id: string
  author: string
  place: string
  weatherTruth: string
  joy: string
  tip: string
  likes: number
  createdAt: string
}

/** Summary returned by POST /v1/trips/plan */
export type ApiTripSummary = {
  id: string
  title: string
  origin: string
  destination: string
  dates: string
  party: string
  version: string
  weatherNote: string
  transportNote: string
  createdAt: string
}

export type TripMeta = {
  title: string
  version: string
  updatedAt: string
  origin: string
  destination: string
  dates: string
  nights: string
  party: string
  goMode: string
  returnMode: string
  homeNote: string
  changelog: string
}

/** Full itinerary book from GET /v1/trips/:id (aligned with xianTrip.ts) */
export type TripBook = {
  id: string
  meta: TripMeta
  weatherDays: WeatherDay[]
  weatherSummary: string
  transportLegs: TransportLeg[]
  transportNote: string
  days: DayPlan[]
  costs: CostRow[]
  costTotal: string
  costPerPerson: string
  tips: string[]
  situations: SituationUpdate[]
}

/** Matches private API GET /v1/conditions/compare (real-travel-api). */
export type ConditionsCompare = {
  place: string
  dateRange: string
  updatedAt: string
  social: {
    source: string
    headline: string
    summary: string
    sentiment: 'alarm' | 'neutral' | 'positive'
  }
  forecast: {
    source: string
    headline: string
    summary: string
    sentiment: 'alarm' | 'neutral' | 'positive'
    days?: WeatherDay[]
    dataSource: 'demo' | 'live'
  }
  recommendation: {
    title: string
    summary: string
    verdict: 'keep' | 'adjust' | 'cancel'
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!apiConfigured) throw new Error('api_not_configured')

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers: {
      'content-type': 'application/json',
      ...(init?.headers ?? {}),
    },
  })

  if (!response.ok) throw new Error(`api_error_${response.status}`)
  return (await response.json()) as T
}

function asTripBook(payload: unknown): TripBook {
  if (!payload || typeof payload !== 'object') throw new Error('invalid_trip')
  const root = payload as Record<string, unknown>
  const trip = (root.trip && typeof root.trip === 'object' ? root.trip : root) as TripBook
  if (!trip.meta || !Array.isArray(trip.days)) throw new Error('invalid_trip_shape')
  return trip
}

export const api = {
  async listMoments() {
    const data = await request<{ moments: ApiMoment[] }>('/v1/moments')
    return data.moments
  },

  async createMoment(input: {
    author?: string
    place: string
    joy: string
    weatherTruth?: string
    tip?: string
  }) {
    const data = await request<{ moment: ApiMoment }>('/v1/moments', {
      method: 'POST',
      body: JSON.stringify(input),
    })
    return data.moment
  },

  async planTrip(input: {
    origin: string
    destination: string
    startDate: string
    endDate: string
    party: string
    interests?: string[]
  }) {
    const data = await request<{ trip: ApiTripSummary }>('/v1/trips/plan', {
      method: 'POST',
      body: JSON.stringify(input),
    })
    return data.trip
  },

  async getTrip(id: string) {
    const data = await request<unknown>(`/v1/trips/${encodeURIComponent(id)}`)
    return asTripBook(data)
  },

  async compareConditions(params?: {
    tripId?: string
    destination?: string
    startDate?: string
    endDate?: string
  }) {
    const q = new URLSearchParams()
    if (params?.tripId) q.set('tripId', params.tripId)
    if (params?.destination) q.set('destination', params.destination)
    if (params?.startDate) q.set('startDate', params.startDate)
    if (params?.endDate) q.set('endDate', params.endDate)
    const suffix = q.toString() ? `?${q}` : ''
    const raw = await request<unknown>(`/v1/conditions/compare${suffix}`)
    return normalizeConditionsCompare(raw)
  },
}

/** Accepts current contract + transitional backend shapes. */
function normalizeConditionsCompare(raw: unknown): ConditionsCompare {
  const data = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>
  const socialIn = (data.social && typeof data.social === 'object' ? data.social : {}) as Record<
    string,
    unknown
  >
  const forecastIn = (
    data.forecast && typeof data.forecast === 'object'
      ? data.forecast
      : data.live && typeof data.live === 'object'
        ? data.live
        : {}
  ) as Record<string, unknown>
  const recIn = (
    data.recommendation && typeof data.recommendation === 'object'
      ? data.recommendation
      : data.advice && typeof data.advice === 'object'
        ? data.advice
        : {}
  ) as Record<string, unknown>

  const verdictRaw = recIn.verdict
  const verdict =
    verdictRaw === 'keep' || verdictRaw === 'adjust' || verdictRaw === 'cancel'
      ? verdictRaw
      : recIn.keepTrip === false
        ? 'adjust'
        : 'keep'

  const sentiment = (value: unknown, fallback: ConditionsCompare['social']['sentiment']) =>
    value === 'alarm' || value === 'neutral' || value === 'positive' ? value : fallback

  return {
    place: typeof data.place === 'string' ? data.place : '西安',
    dateRange:
      typeof data.dateRange === 'string'
        ? data.dateRange
        : typeof data.asOf === 'string'
          ? data.asOf
          : '',
    updatedAt:
      typeof data.updatedAt === 'string'
        ? data.updatedAt
        : typeof data.asOf === 'string'
          ? data.asOf
          : '',
    social: {
      source: typeof socialIn.source === 'string' ? socialIn.source : '社媒热议',
      headline: typeof socialIn.headline === 'string' ? socialIn.headline : '',
      summary:
        typeof socialIn.summary === 'string'
          ? socialIn.summary
          : typeof socialIn.headline === 'string'
            ? socialIn.headline
            : '',
      sentiment: sentiment(socialIn.sentiment, 'alarm'),
    },
    forecast: {
      source: typeof forecastIn.source === 'string' ? forecastIn.source : '实况预报',
      headline: typeof forecastIn.headline === 'string' ? forecastIn.headline : '',
      summary:
        typeof forecastIn.summary === 'string'
          ? forecastIn.summary
          : typeof forecastIn.outlook === 'string'
            ? forecastIn.outlook
            : '',
      sentiment: sentiment(forecastIn.sentiment, 'positive'),
      days: Array.isArray(forecastIn.days) ? (forecastIn.days as ConditionsCompare['forecast']['days']) : undefined,
      dataSource: forecastIn.dataSource === 'live' ? 'live' : 'demo',
    },
    recommendation: {
      title: typeof recIn.title === 'string' ? recIn.title : 'AI 建议',
      summary: typeof recIn.summary === 'string' ? recIn.summary : '',
      verdict,
    },
  }
}
