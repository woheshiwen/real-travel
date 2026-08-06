import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type Scene = {
  id: string
  label: string
  place: string
  image: string
}

const scenes: Scene[] = [
  {
    id: 'pagoda',
    label: '走近标志性景点',
    place: '西安 · 大雁塔',
    image:
      'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=1800&q=80',
  },
  {
    id: 'wall',
    label: '以人的视角继续向前',
    place: '西安 · 古城墙',
    image:
      'https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=1800&q=80',
  },
  {
    id: 'peak',
    label: '抵达云海边缘',
    place: '华山 · 西峰',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=80',
  },
]

const loaderSteps = [
  '读取出发地交通与约束',
  '对照目的地实况天气',
  '走进旅行案例的标志景点',
  '景点收进掌心 · 3D 路书',
  '一键生成可改版行程',
]

const STEP_MS = [2300, 2300, 2500, 4200, 3400]

/** CSS 3D miniature landmark resting in the palm */
function LandmarkModel({ place }: { place: string }) {
  return (
    <div className="landmark-3d" aria-hidden="true">
      <div className="landmark-3d__stage">
        <div className="pagoda3d">
          <div className="pagoda3d__base" />
          <div className="pagoda3d__tier pagoda3d__tier--1">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="pagoda3d__tier pagoda3d__tier--2">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="pagoda3d__tier pagoda3d__tier--3">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="pagoda3d__finial" />
        </div>
        <div className="landmark-3d__glow" />
        <div className="landmark-3d__shadow" />
      </div>
      <p className="landmark-3d__label">{place}</p>
    </div>
  )
}

export default function CinematicHero() {
  const [step, setStep] = useState(0)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (reduced) {
      setStep(loaderSteps.length - 1)
      return
    }
    const delay = STEP_MS[step] ?? 2400
    const id = window.setTimeout(() => {
      setStep((s) => (s + 1) % loaderSteps.length)
    }, delay)
    return () => window.clearTimeout(id)
  }, [reduced, step])

  const sceneIndex = Math.min(step, scenes.length - 1)
  const inPalm = step >= 3
  const phase = inPalm ? 'palm' : 'walk'
  const activePlace = scenes[sceneIndex].place

  return (
    <section className="cine-hero" aria-label="真程首页">
      <div className={`cine-stage cine-stage--${phase}`} aria-hidden="true">
        <div className="cine-sky" />
        <div className="cine-haze" />
        <div className="cine-path">
          <div className="cine-path__vanish" />
          <div className="cine-path__road" />
        </div>

        <div
          className={`cine-world${inPalm ? ' cine-world--exit' : ''}`}
          data-scene={scenes[sceneIndex].id}
        >
          {scenes.map((scene, i) => (
            <figure
              key={scene.id}
              className={`cine-scene${i === sceneIndex && !inPalm ? ' is-active' : ''}`}
            >
              <img src={scene.image} alt="" />
              <figcaption>
                <span>{scene.label}</span>
                <strong>{scene.place}</strong>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className={`cine-palm${inPalm ? ' is-visible' : ''}`}>
          <img
            className="cine-palm__hand"
            src={`${import.meta.env.BASE_URL}palm-hand.png`}
            alt=""
          />
          <div className="cine-palm__model">
            <LandmarkModel place={activePlace} />
          </div>
        </div>

        <div className="cine-grain" />
        <div className="cine-vignette" />
      </div>

      <div className="cine-hero__ui">
        <p className="cine-hero__brand">真程</p>
        <p className="cine-hero__en">Real Travel</p>
        <h1 className="cine-hero__title">走进景点，再把行程收进掌心。</h1>
        <p className="cine-hero__lede">
          以人的视角走向旅行案例里的标志风景；真程对照实况，把可变的路书收成掌心里的立体模型。
        </p>
        <div className="cine-hero__actions">
          <Link className="btn btn--primary btn--cine" to="/plan">
            生成我的行程
          </Link>
          <Link className="btn btn--ghost-cine" to="/trip/xian">
            看西安示例
          </Link>
        </div>

        <ol className="cine-loader" aria-live="polite">
          {loaderSteps.map((text, i) => (
            <li
              key={text}
              className={`cine-loader__item${i === step ? ' is-current' : ''}${
                i < step ? ' is-done' : ''
              }`}
            >
              <span className="cine-loader__mark" aria-hidden="true">
                {i < step ? '✓' : i === step ? '●' : '○'}
              </span>
              <span>{text}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
