export type Locale = 'zh-CN' | 'en' | 'fr' | 'ja' | 'ko'

export const LOCALES: { id: Locale; label: string; short: string }[] = [
  { id: 'zh-CN', label: '简体中文', short: '中文' },
  { id: 'en', label: 'English', short: 'EN' },
  { id: 'fr', label: 'Français', short: 'FR' },
  { id: 'ja', label: '日本語', short: '日本語' },
  { id: 'ko', label: '한국어', short: '한국어' },
]

export const DEFAULT_LOCALE: Locale = 'zh-CN'

export type Messages = {
  brandMark: string
  brandEn: string
  navHome: string
  navTrip: string
  navCommunity: string
  navPlan: string
  langMenu: string
  heroEyebrow: string
  heroTitle: string
  heroLede: string
  heroCtaPlan: string
  heroCtaSample: string
  placePagoda: string
  placeWall: string
  placePeak: string
  placeNight: string
  step1: string
  step2: string
  step3: string
  step4: string
  step5: string
  truthEyebrow: string
  truthTitle: string
  truthText: string
  trustEyebrow: string
  trustTitle: string
  trustText: string
  howEyebrow: string
  howTitle: string
  how1: string
  how2: string
  how3: string
  momentsEyebrow: string
  momentsTitle: string
  momentsText: string
  demoTitle: string
  demoText: string
  demoTrip: string
  demoCommunity: string
  footerTag: string
  planEyebrow: string
  planTitle: string
  planText: string
  planSubmit: string
  planSubmitting: string
  communityEyebrow: string
  communityTitle: string
  communityText: string
  communityShare: string
  tripCalendar: string
}
