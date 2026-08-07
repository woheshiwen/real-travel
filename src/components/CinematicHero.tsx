import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'

type Scene = {
  id: string
  placeKey: 'placePagoda' | 'placeWall' | 'placePeak'
  src: string
  poster: string
}

const asset = (file: string) => `${import.meta.env.BASE_URL}hero/${file}`

const scenes: Scene[] = [
  {
    id: 'coast',
    placeKey: 'placePagoda',
    src: asset('hero-1.mp4'),
    poster: asset('hero-1.jpg'),
  },
  {
    id: 'tropic',
    placeKey: 'placeWall',
    src: asset('hero-2.mp4'),
    poster: asset('hero-2.jpg'),
  },
  {
    id: 'cape',
    placeKey: 'placePeak',
    src: asset('hero-3.mp4'),
    poster: asset('hero-3.jpg'),
  },
]

/** Bloom-like: dwell long enough for the loop to breathe */
const SCENE_MS = 11000

export default function CinematicHero() {
  const { t } = useI18n()
  const [sceneIndex, setSceneIndex] = useState(0)
  const [reduced, setReduced] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(0)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => {
      setSceneIndex((i) => (i + 1) % scenes.length)
    }, SCENE_MS)
    return () => window.clearInterval(id)
  }, [reduced])

  /* Bloom-style inverse mouse parallax — listen on hero (UI is pointer-events:none) */
  useEffect(() => {
    if (reduced) return
    const hero = heroRef.current
    const stage = stageRef.current
    if (!hero || !stage) return

    let targetX = 0
    let targetY = 0

    const onMove = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect()
      const nx = (event.clientX - rect.left) / rect.width - 0.5
      const ny = (event.clientY - rect.top) / rect.height - 0.5
      targetX = nx * -4.5
      targetY = ny * -3.2
    }

    const tick = () => {
      parallaxRef.current.x += (targetX - parallaxRef.current.x) * 0.07
      parallaxRef.current.y += (targetY - parallaxRef.current.y) * 0.07
      stage.style.setProperty('--px', `${parallaxRef.current.x.toFixed(3)}%`)
      stage.style.setProperty('--py', `${parallaxRef.current.y.toFixed(3)}%`)
      rafRef.current = requestAnimationFrame(tick)
    }

    hero.addEventListener('pointermove', onMove)
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      hero.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [reduced])

  const scene = scenes[sceneIndex]

  return (
    <section className="cine-hero" aria-label={`${t.brandMark} ${t.brandEn}`} ref={heroRef}>
      <div className="cine-stage" ref={stageRef} aria-hidden="true">
        <div className="cine-gallery">
          {scenes.map((item, i) => {
            const active = i === sceneIndex
            const prev = i === (sceneIndex + scenes.length - 1) % scenes.length
            return (
              <figure
                key={item.id}
                className={`cine-plate${active ? ' is-active' : ''}${prev ? ' is-prev' : ''}`}
              >
                <div className="cine-plate__parallax">
                  <div className="cine-plate__media">
                    {reduced ? (
                      <img src={item.poster} alt="" draggable={false} />
                    ) : active ? (
                      /* remount on slide change so playback + drift always restart */
                      <video
                        key={`${item.id}-${sceneIndex}`}
                        className="cine-plate__video"
                        src={item.src}
                        poster={item.poster}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                      />
                    ) : (
                      <img src={item.poster} alt="" draggable={false} />
                    )}
                  </div>
                </div>
              </figure>
            )
          })}
          <div className="cine-gallery__veil" />
        </div>
        <div className="cine-grain" />
        <div className="cine-vignette" />
      </div>

      <div className="cine-hero__ui">
        <p className="cine-hero__eyebrow">{t.heroEyebrow}</p>
        <p className="cine-hero__brand">
          {t.brandMark} <span className="cine-hero__brand-en">{t.brandEn}</span>
        </p>
        <h1 className="cine-hero__title">{t.heroTitle}</h1>
        <p className="cine-hero__lede">{t.heroLede}</p>
        <div className="cine-hero__actions">
          <Link className="btn btn--primary btn--cine" to="/plan">
            {t.heroCtaPlan}
          </Link>
          <Link className="btn btn--ghost-cine" to="/trip/xian">
            {t.heroCtaSample}
          </Link>
        </div>
      </div>

      <div className="cine-place-chip" aria-live="polite">
        <span className="cine-place-chip__label">{t[scene.placeKey]}</span>
        <span className="cine-place-chip__index">
          {String(sceneIndex + 1).padStart(2, '0')} / {String(scenes.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  )
}
