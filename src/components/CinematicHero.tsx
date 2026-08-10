import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n'

type Scene = {
  id: 'coast' | 'tropic' | 'cape'
  placeZh: string
  placeEn: string
  src: string
  poster: string
}

const asset = (file: string) => `${import.meta.env.BASE_URL}hero/${file}`

const scenes: Scene[] = [
  {
    id: 'coast',
    placeZh: '远岸 · 浪线',
    placeEn: 'Coast · Wave Line',
    src: asset('hero-1.mp4'),
    poster: asset('hero-1.jpg'),
  },
  {
    id: 'tropic',
    placeZh: '热带 · 岸线',
    placeEn: 'Tropic · Shoreline',
    src: asset('hero-2.mp4'),
    poster: asset('hero-2.jpg'),
  },
  {
    id: 'cape',
    placeZh: '岩岬 · 潮汐',
    placeEn: 'Cape · Tide',
    src: asset('hero-3.mp4'),
    poster: asset('hero-3.jpg'),
  },
]

const loaderKeys = ['loader.1', 'loader.2', 'loader.3', 'loader.4', 'loader.5'] as const

/** Bloom-like dwell between coastal clips */
const SCENE_MS = 6500

export default function CinematicHero() {
  const { t, lang } = useLang()
  const [sceneIndex, setSceneIndex] = useState(0)
  const [loaderStep, setLoaderStep] = useState(0)
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

  /* Scene switching always runs — the hero should feel alive regardless
     of prefers-reduced-motion (only UI chrome respects that setting). */
  useEffect(() => {
    const id = window.setInterval(() => {
      setSceneIndex((i) => (i + 1) % scenes.length)
    }, SCENE_MS)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    if (reduced) {
      setLoaderStep(loaderKeys.length - 1)
      return
    }
    const id = window.setInterval(() => {
      setLoaderStep((s) => (s + 1) % loaderKeys.length)
    }, 3400)
    return () => window.clearInterval(id)
  }, [reduced])

  /* Keep every clip playing so crossfades never land on a frozen poster.
     Always kick videos regardless of prefers-reduced-motion. */
  useEffect(() => {
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
  }, [sceneIndex])

  /* Bloom-style inverse mouse parallax */
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
    <section
      className="cine-hero"
      aria-label={`${t('brand.zh')} ${t('brand.en')}`}
      ref={heroRef}
    >
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
                  </div>
                </div>
              </figure>
            )
          })}
          <div className="cine-gallery__veil" />
        </div>

        <div className="cine-place-chip">
          <span className="cine-place-chip__zh">
            {lang === 'zh' ? scene.placeZh : scene.placeEn}
          </span>
          <div className="cine-place-chip__dots" aria-hidden="true">
            {scenes.map((item, i) => (
              <span
                key={item.id}
                className={`cine-place-chip__dot${i === sceneIndex ? ' is-on' : ''}`}
              />
            ))}
          </div>
        </div>

        <div className="cine-grain" />
        <div className="cine-vignette" />
      </div>

      <div className="cine-hero__ui">
        <p className="cine-hero__eyebrow">{t('hero.eyebrow')}</p>
        <p className="cine-hero__brand">
          <span className="cine-hero__brand-en">Real Travel</span>
          <span className="cine-hero__brand-zh" lang="zh-Hans">
            真程
          </span>
        </p>
        <h1 className="cine-hero__title">{t('hero.title.zh')}</h1>
        <p className="cine-hero__lede">{t('hero.lede.zh')}</p>
        <div className="cine-hero__actions">
          <Link className="btn btn--primary btn--cine" to="/plan">
            {t('hero.cta.plan')}
          </Link>
          <Link className="btn btn--ghost-cine" to="/trip/xian">
            {t('hero.cta.xian')}
          </Link>
        </div>

        <ol className="cine-loader" aria-live="polite">
          {loaderKeys.map((key, i) => (
            <li
              key={key}
              className={`cine-loader__item${i === loaderStep ? ' is-current' : ''}${
                i < loaderStep ? ' is-done' : ''
              }`}
            >
              <span className="cine-loader__mark" aria-hidden="true">
                {i < loaderStep ? '✓' : i === loaderStep ? '●' : '○'}
              </span>
              <span className="cine-loader__text">{t(key)}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
