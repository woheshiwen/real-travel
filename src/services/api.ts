/**
 * Client for the proprietary 真程 API (private repo: real-travel-api).
 * When VITE_API_BASE_URL is unset or unreachable, callers fall back to
 * bundled demo data so the open-source frontend stays runnable alone.
 */

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

export type ApiTrip = {
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

export const api = {
  async listMoments() {
    const data = await request<{ moments: ApiMoment[] }>('/v1/moments')
    return data.moments
  },

  async createMoment(input: {
    author?: string
    place: string
    weatherTruth?: string
    joy: string
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
    const data = await request<{ trip: ApiTrip }>('/v1/trips/plan', {
      method: 'POST',
      body: JSON.stringify(input),
    })
    return data.trip
  },
}
