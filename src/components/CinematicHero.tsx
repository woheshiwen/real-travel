import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type Scene = {
  id: string
  labelZh: string
  labelEn: string
  placeZh: string
  placeEn: string
  image: string
}

const scenes: Scene[] = [
  {
    id: 'pagoda',
    labelZh: '走近标志性景点',
    labelEn: 'Approach the landmark',
    placeZh: '西安 · 大雁塔',
    placeEn: 'Xi’an · Giant Wild Goose Pagoda',
    image:
      'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=2000&q=80',
  },
  {
    id: 'wall',
    labelZh: '以人的视角继续向前',
    labelEn: 'Keep walking forward',
    placeZh: '西安 · 古城墙',
    placeEn: 'Xi’an · City Wall',
    image:
      'https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=2000&q=80',
  },
  {
    id: 'peak',
    labelZh: '抵达云海边缘',
    labelEn: 'Arrive at the cloud edge',
    placeZh: '华山 · 西峰',
    placeEn: 'Mount Hua · West Peak',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80',
  },
]

const loaderSteps = [
  { zh: '读取出发地交通与约束', en: 'Read origin transport & constraints' },
  { zh: '对照目的地实况天气', en: 'Compare live destination weather' },
  { zh: '走进旅行案例的标志景点', en: 'Walk into case-study landmarks' },
  { zh: '把眼前风景收进掌心', en: 'Draw the view into your palm' },
  { zh: '一键生成可改版行程', en: 'Generate an editable itinerary' },
]

/** Slow Bloom-like dwell per background plate */
const SCENE_MS = 7000
/** Palm phase starts after this many scene cycles (0-indexed scene index) — independent of images staying visible */
const PALM_AFTER_MS = 16000

/** Glass souvenir: the same landmark photo, with thickness — not a toy pagoda */
function PalmSouvenir({
  image,
  placeZh,
  placeEn,
  visible,
}: {
  image: string
  placeZh: string
  placeEn: string
  visible: boolean
}) {
  return (
    <div className={`souvenir${visible ? ' is-visible' : ''}`} aria-hidden="true">
      <div className="souvenir__orbit">
        <div className="souvenir__card">
          <div className="souvenir__face souvenir__face--front">
            <img src={image} alt="" />
            <div className="souvenir__sheen" />
          </div>
          <div className="souvenir__face souvenir__face--back" />
          <div className="souvenir__edge souvenir__edge--left" />
          <div className="souvenir__edge souvenir__edge--right" />
          <div className="souvenir__edge souvenir__edge--top" />
          <div className="souvenir__edge souvenir__edge--bottom" />
        </div>
        <div className="souvenir__glow" />
        <div className="souvenir__shadow" />
      </div>
      <p className="souvenir__caption">
        <strong>{placeZh}</strong>
        <span>{placeEn}</span>
      </p>
    </div>
  )
}

export default function CinematicHero() {
  const [sceneIndex, setSceneIndex] = useState(0)
  const [loaderStep, setLoaderStep] = useState(0)
  const [palm, setPalm] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  /* Background plates: slow loop, never stop / never exit */
  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => {
      setSceneIndex((i) => (i + 1) % scenes.length)
    }, SCENE_MS)
    return () => window.clearInterval(id)
  }, [reduced])

  /* Loader ticks slower than scenes */
  useEffect(() => {
    if (reduced) {
      setLoaderStep(loaderSteps.length - 1)
      setPalm(true)
      return
    }
    const id = window.setInterval(() => {
      setLoaderStep((s) => (s + 1) % loaderSteps.length)
    }, 3200)
    return () => window.clearInterval(id)
  }, [reduced])

  /* Palm arrives once, then stays — background keeps cycling behind it */
  useEffect(() => {
    if (reduced) return
    const id = window.setTimeout(() => setPalm(true), PALM_AFTER_MS)
    return () => window.clearTimeout(id)
  }, [reduced])

  const scene = scenes[sceneIndex]

  return (
    <section className="cine-hero" aria-label="真程 Real Travel">
      <div className={`cine-stage${palm ? ' cine-stage--palm' : ''}`} aria-hidden="true">
        <div className="cine-sky" />

        {/* Persistent Bloom-style gallery — never removed */}
        <div className="cine-gallery">
          {scenes.map((item, i) => (
            <figure
              key={item.id}
              className={`cine-plate${i === sceneIndex ? ' is-active' : ''}${
                i === (sceneIndex + scenes.length - 1) % scenes.length ? ' is-prev' : ''
              }`}
            >
              <img src={item.image} alt="" />
            </figure>
          ))}
          <div className="cine-gallery__veil" />
        </div>

        <div className="cine-place-chip">
          <span className="cine-place-chip__zh">{scene.placeZh}</span>
          <span className="cine-place-chip__en">{scene.placeEn}</span>
        </div>

        <div className={`cine-palm${palm ? ' is-visible' : ''}`}>
          <img
            className="cine-palm__hand"
            src={`${import.meta.env.BASE_URL}palm-hand.webp`}
            alt=""
          />
          <div className="cine-palm__model">
            <PalmSouvenir
              image={scene.image}
              placeZh={scene.placeZh}
              placeEn={scene.placeEn}
              visible={palm}
            />
          </div>
        </div>

        <div className="cine-grain" />
        <div className="cine-vignette" />
      </div>

      <div className="cine-hero__ui">
        <p className="cine-hero__brand">
          真程 <span className="cine-hero__brand-en">Real Travel</span>
        </p>
        <h1 className="cine-hero__title">
          <span className="cine-hero__title-zh">走进景点，再把行程收进掌心。</span>
          <span className="cine-hero__title-en">
            Walk into the landmark — then hold the journey in your palm.
          </span>
        </h1>
        <p className="cine-hero__lede">
          <span className="cine-hero__lede-zh">
            以人的视角走向旅行案例里的标志风景；真程对照实况，把可变的路书轻轻收进手里。
          </span>
          <span className="cine-hero__lede-en">
            First-person toward real places. Live weather and transport shape an itinerary you can
            revise — and keep.
          </span>
        </p>
        <div className="cine-hero__actions">
          <Link className="btn btn--primary btn--cine" to="/plan">
            生成我的行程 · Plan
          </Link>
          <Link className="btn btn--ghost-cine" to="/trip/xian">
            西安示例 · Xi’an
          </Link>
        </div>

        <ol className="cine-loader" aria-live="polite">
          {loaderSteps.map((text, i) => (
            <li
              key={text.en}
              className={`cine-loader__item${i === loaderStep ? ' is-current' : ''}${
                i < loaderStep ? ' is-done' : ''
              }`}
            >
              <span className="cine-loader__mark" aria-hidden="true">
                {i < loaderStep ? '✓' : i === loaderStep ? '●' : '○'}
              </span>
              <span className="cine-loader__text">
                <span className="cine-loader__zh">{text.zh}</span>
                <span className="cine-loader__en">{text.en}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
