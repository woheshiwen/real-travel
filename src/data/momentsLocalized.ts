import type { Locale } from '../i18n'
import type { Moment } from './community'

/** English is the primary demo catalog; zh-CN keeps the original Chinese set. */
export const momentsEn: Moment[] = [
  {
    id: 'm1',
    author: 'Lin family',
    from: 'From Shenzhen',
    place: 'Xi’an · Great Tang Everbright City',
    when: 'Day 1 · light rain night',
    weatherTruth:
      'Social posts screamed “cancel for storms”; live forecast was light rain — lanterns in puddles were better.',
    joy: 'We almost canceled after Douyin. The kids stood forever by the bobblehead sisters. Quiet joy on camera.',
    tip: 'Go after dark; a light rain needs only an umbrella.',
    likes: 128,
    replies: 16,
    image:
      'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Xi’an night lights',
    tripLink: '/trip/xian',
  },
  {
    id: 'm2',
    author: 'Zhe',
    from: 'From Hangzhou',
    place: 'Mount Hua · west up, north down',
    when: 'Day 4 · cloudy',
    weatherTruth: 'Summit ~15°C — cooler than the city. A light jacket beat sunscreen.',
    joy: 'Bags stayed at the hotel. South Peak was windy, but finishing together felt better than any check-in.',
    tip: 'Families: west up, north down. Don’t haul suitcases uphill.',
    likes: 96,
    replies: 11,
    image:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Mountain mist and lake',
    tripLink: '/trip/xian',
  },
  {
    id: 'm3',
    author: 'Mia',
    from: 'From Chengdu',
    place: 'Xi’an · Shaanxi History Museum',
    when: 'Rain day, indoor main line',
    weatherTruth: 'Moving outdoors indoors wasn’t a compromise — it was reordering by truth.',
    joy: 'Short queue at the Tang camel. Dad whispered: this trip was worth it.',
    tip: 'Rain days: museums first. Set alarms for timed tickets.',
    likes: 74,
    replies: 9,
    image:
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Historic street atmosphere',
  },
  {
    id: 'm4',
    author: 'Zhou',
    from: 'Hefei transfer',
    place: 'Return rail G2230',
    when: 'Day 5 · clear',
    weatherTruth: 'Skipping the flight + taxi made punctuality and comfort both better.',
    joy: 'Kids slept one leg; dinner at Hefei South. Lights were still on when we got home.',
    tip: 'Leave two hours for transfers — calmer than chasing the earliest train.',
    likes: 61,
    replies: 7,
    image:
      'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'High-speed rail platform',
    tripLink: '/trip/xian',
  },
]

export function momentsForLocale(locale: Locale, zhSeed: Moment[]): Moment[] {
  if (locale === 'zh-CN') return zhSeed
  return momentsEn
}
