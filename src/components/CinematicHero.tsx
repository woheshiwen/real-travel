import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type Scene = {
  id: string
  label: string
  place: string
  image: string
  imageAlt: string
}

const scenes: Scene[] = [
  {
    id: 'pagoda',
    label: '走近标志性景点',
    place: '西安 · 大雁塔',
    image:
      'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=1800&q=80',
    imageAlt: '西安夜色与古塔轮廓',
  },
  {
    id: 'wall',
    label: '以人的视角继续向前',
    place: '西安 · 古城墙',
    image:
      'https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=1800&q=80',
    imageAlt: '中国古建筑与石径',
  },
  {
    id: 'peak',
    label: '抵达云海边缘',
    place: '华山 · 西峰',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=80',
    imageAlt: '险峻山峰云海',
  },
]

const loaderSteps = [
  '读取出发地交通与约束',
  '对照目的地实况天气',
  '走进旅行案例的标志景点',
  '把漫长路书收进掌心',
  '一键生成可改版行程',
]

const STEP_MS = 2400

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
    const id = window.setInterval(() => {
      setStep((s) => (s + 1) % loaderSteps.length)
    }, STEP_MS)
    return () => window.clearInterval(id)
  }, [reduced])

  /** 0–2 walk scenes, 3–4 palm finale */
  const sceneIndex = Math.min(step, scenes.length - 1)
  const inPalm = step >= 3
  const phase = inPalm ? 'palm' : 'walk'

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
          className={`cine-world${inPalm ? ' cine-world--miniature' : ''}`}
          data-scene={scenes[sceneIndex].id}
        >
          {scenes.map((scene, i) => (
            <figure
              key={scene.id}
              className={`cine-scene${i === sceneIndex && !inPalm ? ' is-active' : ''}${
                inPalm && i === scenes.length - 1 ? ' is-active is-miniature' : ''
              }`}
            >
              <img src={scene.image} alt="" />
              <figcaption>
                <span>{scene.label}</span>
                <strong>{scene.place}</strong>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className={`cine-hand${inPalm ? ' is-visible' : ''}`}>
          <svg
            className="cine-hand__svg"
            viewBox="0 0 640 520"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="palmGrad" x1="180" y1="40" x2="460" y2="500">
                <stop stopColor="#f0d2b4" />
                <stop offset="0.55" stopColor="#c9926a" />
                <stop offset="1" stopColor="#8a5a3c" />
              </linearGradient>
              <filter id="palmSoft" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.2" />
              </filter>
            </defs>
            {/* stylized open palm rising from bottom */}
            <path
              filter="url(#palmSoft)"
              fill="url(#palmGrad)"
              d="M292 508c-58-8-118-46-148-98-22-38-28-78-18-118 8-32 28-54 52-62 18-6 34 2 42 18l18 36V168c0-28 18-48 44-48s44 20 44 48v78c8-22 28-36 52-34 26 2 44 24 44 50v54c10-16 30-24 50-18 28 8 42 36 36 64-10 48-42 96-94 132-46 32-86 44-122 48z"
            />
            <path
              fill="rgba(255,255,255,0.18)"
              d="M314 170c0-18 10-30 26-30s26 12 26 30v120h-16V170c0-8-4-14-10-14s-10 6-10 14v98h-16V170z"
            />
            <ellipse
              className="cine-hand__glow"
              cx="340"
              cy="250"
              rx="72"
              ry="48"
              fill="rgba(255, 214, 140, 0.35)"
            />
          </svg>
          <div className="cine-hand__model">
            <span className="cine-hand__model-tag">你的路书</span>
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
          以人的视角走向旅行案例里的标志风景；真程对照实况，把可变的路书轻轻放进你手里。
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
