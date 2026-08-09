import { useEffect, useEffectEvent, useRef, useState } from 'react'
import type { RelicSlide } from '../data/relicSlides'

type RelicBackdropProps = {
  slides: RelicSlide[]
  /** light-fade = soft dissolve; ink-assembly = photo + rising paper mark */
  motion?: 'light-fade' | 'ink-assembly'
  intervalMs?: number
  label: string
}

export default function RelicBackdrop({
  slides,
  motion = 'light-fade',
  intervalMs = 7200,
  label,
}: RelicBackdropProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [inView, setInView] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  const advance = useEffectEvent(() => {
    setActive((i) => (i + 1) % slides.length)
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const node = rootRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.18, rootMargin: '8% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView || reduceMotion || slides.length < 2) return
    const id = window.setInterval(advance, intervalMs)
    return () => window.clearInterval(id)
  }, [inView, reduceMotion, slides.length, intervalMs])

  return (
    <div
      ref={rootRef}
      className={`relic-backdrop relic-backdrop--${motion}${inView ? ' is-live' : ''}`}
      aria-hidden="true"
      data-label={label}
    >
      <div className="relic-backdrop__stage">
        {slides.map((slide, index) => {
          const state =
            index === active
              ? 'is-active'
              : index === (active - 1 + slides.length) % slides.length
                ? 'is-prev'
                : ''
          return (
            <figure key={slide.src} className={`relic-backdrop__plate ${state}`.trim()}>
              <img
                className="relic-backdrop__media"
                src={slide.src}
                alt=""
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
              <img
                className="relic-backdrop__mark"
                src={slide.markSrc}
                alt=""
                loading="lazy"
                decoding="async"
              />
              <figcaption className="relic-backdrop__caption">
                <span lang="zh">{slide.titleZh}</span>
                <span lang="en">{slide.titleEn}</span>
              </figcaption>
            </figure>
          )
        })}
      </div>
      <div className="relic-backdrop__paper" />
      <div className="relic-backdrop__veil" />
    </div>
  )
}
