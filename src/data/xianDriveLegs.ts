import type { Messages } from '../i18n'
import type { AmapPoint } from '../services/amap'

/** Self-drive segment for the Xi’an sample trip (Amap one-tap test). */
export type DriveLeg = {
  id: string
  /** Matches DayPlan.id in xianTrip */
  dayId: string
  labelKey: keyof Messages
  noteKey: keyof Messages
  from: AmapPoint
  to: AmapPoint
  via?: AmapPoint
}

/** Landmark coords in GCJ-02 (高德). Approximate visitor / parking approaches. */
export const xianPlaces = {
  airportT3: {
    lng: 108.762,
    lat: 34.441,
    name: '西安咸阳国际机场T3',
  },
  bellTowerHotel: {
    lng: 108.9531,
    lat: 34.261,
    name: '钟楼附近酒店',
  },
  terracotta: {
    lng: 109.2784,
    lat: 34.3842,
    name: '秦始皇帝陵博物院',
  },
  huaqing: {
    lng: 109.2139,
    lat: 34.3624,
    name: '华清宫',
  },
  muslimQuarter: {
    lng: 108.9426,
    lat: 34.2635,
    name: '回民街',
  },
} as const satisfies Record<string, AmapPoint>

/**
 * Xi’an self-drive test legs.
 * Day2 is the primary car day (兵马俑 → 华清宫 → 市区);
 * Day1 airport transfer is optional for rental/driver pickup.
 */
export const xianDriveLegs: DriveLeg[] = [
  {
    id: 'day1-airport-hotel',
    dayId: 'day1',
    labelKey: 'amapLegDay1Airport',
    noteKey: 'amapLegDay1AirportNote',
    from: xianPlaces.airportT3,
    to: xianPlaces.bellTowerHotel,
  },
  {
    id: 'day2-hotel-terracotta',
    dayId: 'day2',
    labelKey: 'amapLegDay2Morning',
    noteKey: 'amapLegDay2MorningNote',
    from: xianPlaces.bellTowerHotel,
    to: xianPlaces.terracotta,
  },
  {
    id: 'day2-terracotta-huaqing-city',
    dayId: 'day2',
    labelKey: 'amapLegDay2Afternoon',
    noteKey: 'amapLegDay2AfternoonNote',
    from: xianPlaces.terracotta,
    via: xianPlaces.huaqing,
    to: xianPlaces.muslimQuarter,
  },
]

export function driveLegsForDay(dayId?: string): DriveLeg[] {
  if (!dayId) return xianDriveLegs
  const filtered = xianDriveLegs.filter((leg) => leg.dayId === dayId)
  return filtered.length > 0 ? filtered : xianDriveLegs
}
