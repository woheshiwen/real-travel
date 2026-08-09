export type RelicSlide = {
  src: string
  /** Darkened paper-mark strip used by ink-assembly motion */
  markSrc: string
  titleZh: string
  titleEn: string
}

/** Paper Relic stills for below-fold ambient sections (Photo Relic Editorial / 纸上北京). */
export const truthRelicSlides: RelicSlide[] = [
  {
    src: '/relic/temple-of-heaven.webp',
    markSrc: '/relic/temple-of-heaven-mark.webp',
    titleZh: '天光有序',
    titleEn: 'Ordered Sky Light',
  },
  {
    src: '/relic/corner-tower-water.webp',
    markSrc: '/relic/corner-tower-water-mark.webp',
    titleZh: '水照宫墙',
    titleEn: 'Palace Wall in Water',
  },
  {
    src: '/relic/great-wall-ridge.webp',
    markSrc: '/relic/great-wall-ridge-mark.webp',
    titleZh: '山脊有路',
    titleEn: 'A Road Along the Ridge',
  },
]

export const trustRelicSlides: RelicSlide[] = [
  {
    src: '/relic/bird-nest-reflection.webp',
    markSrc: '/relic/bird-nest-reflection-mark.webp',
    titleZh: '巢光入水',
    titleEn: 'Nest Light Enters Water',
  },
  {
    src: '/relic/china-zun.webp',
    markSrc: '/relic/china-zun-mark.webp',
    titleZh: '暮色立住',
    titleEn: 'Dusk Stands Still',
  },
  {
    src: '/relic/geese-procession.webp',
    markSrc: '/relic/geese-procession-mark.webp',
    titleZh: '碎石成队',
    titleEn: 'Gravel Falls Into Line',
  },
]
