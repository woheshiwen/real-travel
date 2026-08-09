export type RelicSlide = {
  src: string
  /** Darkened paper-mark strip used by ink-assembly motion */
  markSrc: string
  titleZh: string
  titleEn: string
}

/** Respect Vite `base` so GitHub Pages (`/real-travel/`) resolves assets. */
const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

/** Paper Relic stills for below-fold ambient sections (Photo Relic Editorial / 纸上北京). */
export const truthRelicSlides: RelicSlide[] = [
  {
    src: asset('relic/temple-of-heaven.webp'),
    markSrc: asset('relic/temple-of-heaven-mark.webp'),
    titleZh: '天光有序',
    titleEn: 'Ordered Sky Light',
  },
  {
    src: asset('relic/corner-tower-water.webp'),
    markSrc: asset('relic/corner-tower-water-mark.webp'),
    titleZh: '水照宫墙',
    titleEn: 'Palace Wall in Water',
  },
  {
    src: asset('relic/great-wall-ridge.webp'),
    markSrc: asset('relic/great-wall-ridge-mark.webp'),
    titleZh: '山脊有路',
    titleEn: 'A Road Along the Ridge',
  },
]

export const trustRelicSlides: RelicSlide[] = [
  {
    src: asset('relic/bird-nest-reflection.webp'),
    markSrc: asset('relic/bird-nest-reflection-mark.webp'),
    titleZh: '巢光入水',
    titleEn: 'Nest Light Enters Water',
  },
  {
    src: asset('relic/china-zun.webp'),
    markSrc: asset('relic/china-zun-mark.webp'),
    titleZh: '暮色立住',
    titleEn: 'Dusk Stands Still',
  },
  {
    src: asset('relic/geese-procession.webp'),
    markSrc: asset('relic/geese-procession-mark.webp'),
    titleZh: '碎石成队',
    titleEn: 'Gravel Falls Into Line',
  },
]
