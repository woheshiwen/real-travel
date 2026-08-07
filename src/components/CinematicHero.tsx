import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'

type Scene = {
  id: string
  placeKey: 'placeCoast' | 'placeTropic' | 'placeCape'
  src: string
  poster: string
}

const asset = (file: string) => `${import.meta.env.BASE_URL}hero/${file}`

const scenes: Scene[] = [
  {
    id: 'coast',
    placeKey: 'placeCoast',
    src: asset('hero-1.mp4'),
    poster: asset('hero-1.jpg'),
  },
  {
    id: 'tropic',
    placeKey: 'placeTropic',
    src: asset('hero-2.mp4'),
    poster: asset('hero-2.jpg'),
  },
  {
    id: 'cape',
    placeKey: 'placeCape',
    src: asset('hero-3.mp4'),
    poster: asset('hero-3.jpg'),
  },
]

/** Short enough that slide changes are obvious */
const SCENE_MS = 6500

export default function CinematicHero() {
  const { t } = useI18n()
  const [sceneIndex, setSceneIndex] = useState(0)
  const [reduced, setReduced] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
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

  /* Keep every clip playing so crossfades never land on a frozen poster */
  useEffect(() => {
    if (reduced) return
    const vids = videoRefs.current.filter(Boolean) as HTMLVideoElement[]

    const kick = (video: HTMLVideoElement) => {
      video.muted = true
      video.defaultMuted = true
      video.playsInline = true
      const attempt = video.play()
      if (attempt && typeof attempt.catch === 'function') {
        attempt.catch(() => {
          /* autoplay blocked — poster + CSS drift still move */
        })
      }
    }

    vids.forEach(kick)

    const onVisible = () => {
      if (document.visibilityState === 'visible') vids.forEach(kick)
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [reduced, sceneIndex])

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
      targetX = nx * -8.5
      targetY = ny * -6
    }

    const tick = () => {
      parallaxRef.current.x += (targetX - parallaxRef.current.x) * 0.08
      parallaxRef.current.y += (targetY - parallaxRef.current.y) * 0.08
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
    <section className="cine-hero" aria-label={t.brand} ref={heroRef}>
      <div className="cine-stage" ref={stageRef} aria-hidden="true">
        <div className="cine-gallery">
          {scenes.map((item, i) => {
            const active = i === sceneIndex
            const prev = i === (sceneIndex + scenes.length - 1) % scenes.length
            return (
              <figure
                key={item.id}
                className={`cine-plate cine-plate--${item.id}${active ? ' is-active' : ''}${
                  prev ? ' is-prev' : ''
                }`}
              >
                <div className="cine-plate__parallax">
                  <div className="cine-plate__media">
                    {reduced ? (
                      <img src={item.poster} alt="" draggable={false} />
                    ) : (
                      <video
                        ref={(el) => {
                          videoRefs.current[i] = el
                        }}
                        className="cine-plate__video"
                        src={item.src}
                        poster={item.poster}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                      />
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
          <span className="cine-hero__brand-en">Real Travel</span>
          <span className="cine-hero__brand-zh" lang="zh-Hans">
            真程
          </span>
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
        <div className="cine-place-chip__dots" aria-hidden="true">
          {scenes.map((item, i) => (
            <span
              key={item.id}
              className={`cine-place-chip__dot${i === sceneIndex ? ' is-on' : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
