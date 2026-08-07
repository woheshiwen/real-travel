export type Locale = 'zh-CN' | 'en' | 'fr' | 'ja' | 'ko'

/** English-first locale list for the language switcher */
export const LOCALES: { id: Locale; label: string; short: string }[] = [
  { id: 'en', label: 'English', short: 'EN' },
  { id: 'zh-CN', label: '简体中文', short: '中文' },
  { id: 'fr', label: 'Français', short: 'FR' },
  { id: 'ja', label: '日本語', short: 'JA' },
  { id: 'ko', label: '한국어', short: 'KO' },
]

export const DEFAULT_LOCALE: Locale = 'en'

export type Messages = {
  /** Single brand string for the active locale — never mix scripts */
  brand: string
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
  placeCoast: string
  placeTropic: string
  placeCape: string
  truthEyebrow: string
  truthTitle: string
  truthText: string
  trustEyebrow: string
  trustTitle: string
  trustText: string
  trust1Title: string
  trust1Body: string
  trust2Title: string
  trust2Body: string
  trust3Title: string
  trust3Body: string
  trust4Title: string
  trust4Body: string
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
  marqueeLabel: string
  planEyebrow: string
  planTitle: string
  planText: string
  planOrigin: string
  planDest: string
  planStart: string
  planEnd: string
  planParty: string
  planHome: string
  planPrefs: string
  planSubmit: string
  planSubmitting: string
  interestMuseum: string
  interestNature: string
  interestFood: string
  interestFamily: string
  interestWalk: string
  interestNight: string
  communityEyebrow: string
  communityTitle: string
  communityText: string
  communityShare: string
  tripCalendar: string
}
