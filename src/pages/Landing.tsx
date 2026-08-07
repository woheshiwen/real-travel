import { useEffect, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import CinematicHero from '../components/CinematicHero'
import DestinationMarquee from '../components/DestinationMarquee'
import SiteChrome from '../components/SiteChrome'
import { moments, trustPillars } from '../data/community'
import { useI18n } from '../i18n'
import { api, apiConfigured, type ConditionsCompare } from '../services/api'
import { useReveal } from '../hooks/useReveal'
import { useSpotlight } from '../hooks/useSpotlight'

const fallbackCompare: ConditionsCompare = {
  place: '西安',
  dateRange: '8/11–8/15',
  updatedAt: '',
  social: {
    source: '社媒热议',
    headline: '暴雨别去了',
    summary: '抖音大量「暴雨别去了」视频',
    sentiment: 'alarm',
  },
  forecast: {
    source: '实况预报',
    headline: '小雨转阴后转晴',
    summary: '8/11 小雨转阴，其后转晴；比深圳凉快 5–8°C',
    sentiment: 'positive',
    dataSource: 'demo',
  },
  recommendation: {
    title: 'AI 建议',
    summary: '保留行程。Day1 改室内陕历博，夜景照去；无需取消。',
    verdict: 'keep',
  },
}

export default function Landing() {
  const { t } = useI18n()
  const rootRef = useReveal()
  const spotlight = useSpotlight()
  const preview = moments.slice(0, 3)
  const [compare, setCompare] = useState(fallbackCompare)
  const [liveSource, setLiveSource] = useState<'demo' | 'api'>('demo')
  const howSteps = [t.how1, t.how2, t.how3]

  useEffect(() => {
    if (!apiConfigured) return
    let cancelled = false

    api
      .compareConditions({ tripId: 'xian', destination: '西安' })
      .then((data) => {
        if (cancelled) return
        setCompare(data)
        setLiveSource('api')
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="page page--cine" ref={rootRef}>
      <SiteChrome variant="overlay" />

      <CinematicHero />

      <section className="section section--truth" id="truth">
        <div className="section__intro reveal">
          <p className="eyebrow">{t.truthEyebrow}</p>
          <h2 className="section__title">{t.truthTitle}</h2>
          <p className="section__text">{t.truthText}</p>
        </div>
        <aside className="truth-board truth-board--solo reveal" aria-label={t.truthEyebrow}>
          <div className="truth-board__head">
            <span>
              {compare.place} · {compare.dateRange}
            </span>
            <span className="pill pill--live">{liveSource === 'api' ? 'API' : 'LIVE'}</span>
          </div>
          <div className="truth-board__row truth-board__row--alert">
            <strong>{compare.social.source}</strong>
            <p>{compare.social.summary || compare.social.headline}</p>
          </div>
          <div className="truth-board__row truth-board__row--ok">
            <strong>{compare.forecast.source}</strong>
            <p>{compare.forecast.summary}</p>
          </div>
          <div className="truth-board__row">
            <strong>{compare.recommendation.title}</strong>
            <p>{compare.recommendation.summary}</p>
          </div>
        </aside>
      </section>

      <DestinationMarquee />

      <section className="section" id="trust">
        <div className="section__intro reveal">
          <p className="eyebrow">{t.trustEyebrow}</p>
          <h2 className="section__title">{t.trustTitle}</h2>
          <p className="section__text">{t.trustText}</p>
        </div>
        <div className="reason-grid">
          {trustPillars.map((item, index) => (
            <article
              className="reason spot reveal"
              key={item.title}
              style={{ '--i': index } as CSSProperties}
              {...spotlight}
            >
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--band" id="how">
        <div className="section__intro reveal">
          <p className="eyebrow">{t.howEyebrow}</p>
          <h2 className="section__title">{t.howTitle}</h2>
        </div>
        <ol className="steps">
          {howSteps.map((text, i) => (
            <li
              className="steps__item spot reveal"
              key={text}
              style={{ '--i': i } as CSSProperties}
              {...spotlight}
            >
              <span className="steps__num">0{i + 1}</span>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section" id="community-preview">
        <div className="section__intro reveal">
          <p className="eyebrow">{t.momentsEyebrow}</p>
          <h2 className="section__title">{t.momentsTitle}</h2>
          <p className="section__text">{t.momentsText}</p>
        </div>
        <div className="home-moments">
          {preview.map((moment, index) => (
            <article
              className="home-moment reveal"
              key={moment.id}
              style={{ '--i': index } as CSSProperties}
            >
              <img src={moment.image} alt={moment.imageAlt} loading="lazy" />
              <div>
                <p className="home-moment__place">
                  {moment.place} · {moment.author}
                </p>
                <p className="home-moment__joy">{moment.joy}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="demo-cta reveal">
          <div>
            <h2 className="section__title">{t.demoTitle}</h2>
            <p className="section__text">{t.demoText}</p>
          </div>
          <div className="cine-hero__actions">
            <Link className="btn btn--primary" to="/trip/xian">
              {t.demoTrip}
            </Link>
            <Link className="btn btn--ghost-dark" to="/community">
              {t.demoCommunity}
            </Link>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <strong>
            {t.brandMark} {t.brandEn}
          </strong>
          <span>{t.footerTag}</span>
        </div>
        <p>© {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}
