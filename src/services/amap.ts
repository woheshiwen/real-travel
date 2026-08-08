/** Amap (Gaode) URI helpers — GCJ-02 coords, web deep link with optional native app launch. */

export type AmapPoint = {
  /** Longitude (GCJ-02 / 高德坐标) */
  lng: number
  /** Latitude (GCJ-02 / 高德坐标) */
  lat: number
  /** Place name shown in Amap */
  name: string
}

export type AmapNavMode = 'car' | 'bus' | 'walk' | 'ride'

export type AmapNavigationOptions = {
  from: AmapPoint
  to: AmapPoint
  /** At most one via point (Amap URI API limit; car mode only). */
  via?: AmapPoint
  mode?: AmapNavMode
  /** Attempt to open the installed Amap app on mobile. Default true. */
  callnative?: boolean
}

function formatPoint(p: AmapPoint): string {
  return `${p.lng},${p.lat},${encodeURIComponent(p.name)}`
}

/** Build https://uri.amap.com/navigation?... for path planning / native handoff. */
export function buildAmapNavigationUrl(opts: AmapNavigationOptions): string {
  const mode = opts.mode ?? 'car'
  const callnative = opts.callnative === false ? '0' : '1'
  // Keep commas raw between lng/lat/name — only encode the place name.
  const qs = [
    `from=${formatPoint(opts.from)}`,
    `to=${formatPoint(opts.to)}`,
    opts.via ? `via=${formatPoint(opts.via)}` : null,
    `mode=${mode}`,
    'policy=0',
    'src=real-travel',
    'coordinate=gaode',
    `callnative=${callnative}`,
  ]
    .filter(Boolean)
    .join('&')

  return `https://uri.amap.com/navigation?${qs}`
}

/** Open Amap navigation in a new tab (mobile may hand off to the app). */
export function openAmapNavigation(opts: AmapNavigationOptions): string {
  const url = buildAmapNavigationUrl(opts)
  window.open(url, '_blank', 'noopener,noreferrer')
  return url
}
