import { useI18n } from '../i18n'

const destinationsEn = [
  ['Xi’an', 'City Wall · History Museum'],
  ['Mount Hua', 'West up, north down'],
  ['Dunhuang', 'Mogao Caves'],
  ['Wuyuan', 'Rapeseed season'],
  ['Quanzhou', 'Harbor nights'],
  ['Kashgar', 'Old town dawn'],
  ['Changbai', 'Heaven Lake wind'],
  ['Chaoshan', 'Night porridge stalls'],
] as const

const destinationsZh = [
  ['西安', '城墙 · 陕历博'],
  ['华山', '西上北下'],
  ['敦煌', '莫高窟'],
  ['婺源', '油菜花期'],
  ['泉州', '烟火人间'],
  ['喀什', '老城清晨'],
  ['长白山', '天池风口'],
  ['潮汕', '夜粥摊'],
] as const

export default function DestinationMarquee() {
  const { locale, t } = useI18n()
  const destinations = locale === 'zh-CN' ? destinationsZh : destinationsEn
  const items = [...destinations, ...destinations]

  return (
    <div className="marquee" aria-label={t.marqueeLabel}>
      <div className="marquee__track">
        {items.map(([city, note], index) => (
          <p
            className="marquee__item"
            key={`${city}-${index}`}
            aria-hidden={index >= destinations.length}
          >
            <span>{city}</span>
            {note}
          </p>
        ))}
      </div>
    </div>
  )
}
