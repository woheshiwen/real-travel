import type { WeatherDay } from '../data/xianTrip'

const label: Record<WeatherDay['icon'], string> = {
  rain: '雨',
  cloud: '阴',
  sun: '晴',
  partly: '云',
}

export default function WeatherIcon({
  icon,
  className = '',
}: {
  icon: WeatherDay['icon']
  className?: string
}) {
  return (
    <span className={`wx-icon wx-icon--${icon} ${className}`.trim()} aria-hidden="true">
      {label[icon]}
    </span>
  )
}
