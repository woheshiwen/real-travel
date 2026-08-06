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

export type ConditionsCompare = {
  place: string
  asOf: string
  social: { headline: string; source: string }
  live: { summary: string; outlook?: string }
  advice: { keepTrip: boolean; summary: string }
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

  async compareConditions(params?: { tripId?: string; place?: string }) {
    const q = new URLSearchParams()
    if (params?.tripId) q.set('tripId', params.tripId)
    if (params?.place) q.set('place', params.place)
    const suffix = q.toString() ? `?${q}` : ''
    return request<ConditionsCompare>(`/v1/conditions/compare${suffix}`)
  },
}
