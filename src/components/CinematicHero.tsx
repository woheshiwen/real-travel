import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n'

type Scene = {
  id: string
  placeZh: string
  placeEn: string
  image: string
  drift: 'in-tl' | 'in-tr' | 'in-bl' | 'in-br'
}

const scenes: Scene[] = [
  {
    id: 'pagoda',
    placeZh: '西安 · 大雁塔',
    placeEn: 'Xi’an · Giant Wild Goose Pagoda',
    image:
      'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=2400&q=80',
    drift: 'in-tr',
  },
  {
    id: 'wall',
    placeZh: '西安 · 古城墙',
    placeEn: 'Xi’an · City Wall',
    image:
      'https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=2400&q=80',
    drift: 'in-bl',
  },
  {
    id: 'peak',
    placeZh: '华山 · 西峰',
    placeEn: 'Mount Hua · West Peak',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=80',
    drift: 'in-tl',
  },
  {
    id: 'night',
    placeZh: '西安 · 大唐不夜城',
    placeEn: 'Xi’an · Great Tang Everbright City',
    image:
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=2400&q=80',
    drift: 'in-br',
  },
]

const loaderKeys = ['loader.1', 'loader.2', 'loader.3', 'loader.4', 'loader.5'] as const

/** Bloom-like dwell: slow enough to feel cinematic */
const SCENE_MS = 6500

export default function CinematicHero() {
  const { t, lang } = useLang()
  const [sceneIndex, setSceneIndex] = useState(0)
  const [loaderStep, setLoaderStep] = useState(0)
  const [reduced, setReduced] = useState(false)
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

  /* Bloom-style inverse mouse parallax on the active plate */
  useEffect(() => {
    if (reduced) return
    const stage = stageRef.current
    if (!stage) return

    let targetX = 0
    let targetY = 0

    const onMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect()
      const nx = (event.clientX - rect.left) / rect.width - 0.5
      const ny = (event.clientY - rect.top) / rect.height - 0.5
      targetX = nx * -3.2
      targetY = ny * -2.4
    }

    const tick = () => {
      parallaxRef.current.x += (targetX - parallaxRef.current.x) * 0.08
      parallaxRef.current.y += (targetY - parallaxRef.current.y) * 0.08
      stage.style.setProperty('--px', `${parallaxRef.current.x.toFixed(3)}%`)
      stage.style.setProperty('--py', `${parallaxRef.current.y.toFixed(3)}%`)
      rafRef.current = requestAnimationFrame(tick)
    }

    stage.addEventListener('pointermove', onMove)
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      stage.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [reduced])

  const scene = scenes[sceneIndex]

  return (
    <section className="cine-hero" aria-label={`${t('brand.zh')} ${t('brand.en')}`}>
      <div className="cine-stage" ref={stageRef} aria-hidden="true">
        <div className="cine-gallery">
          {scenes.map((item, i) => (
            <figure
              key={item.id}
              className={`cine-plate cine-plate--${item.drift}${
                i === sceneIndex ? ' is-active' : ''
              }${i === (sceneIndex + scenes.length - 1) % scenes.length ? ' is-prev' : ''}`}
            >
              <div className="cine-plate__parallax">
                <div className="cine-plate__media">
                  <img src={item.image} alt="" draggable={false} />
                </div>
              </div>
            </figure>
          ))}
          <div className="cine-gallery__veil" />
        </div>

        <div className="cine-place-chip">
          <span className="cine-place-chip__zh">{lang === 'zh' ? scene.placeZh : scene.placeEn}</span>
        </div>

        <div className="cine-grain" />
        <div className="cine-vignette" />
      </div>

      <div className="cine-hero__ui">
        <p className="cine-hero__brand">
          {t('brand.zh')} <span className="cine-hero__brand-en">{t('brand.en')}</span>
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
