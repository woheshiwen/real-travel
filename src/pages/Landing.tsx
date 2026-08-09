import { useEffect, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import CinematicHero from '../components/CinematicHero'
import DestinationMarquee from '../components/DestinationMarquee'
import SiteChrome from '../components/SiteChrome'
import { moments, trustPillars } from '../data/community'
import { api, apiConfigured, type ConditionsCompare } from '../services/api'
import { useReveal } from '../hooks/useReveal'
import { useSpotlight } from '../hooks/useSpotlight'
import { useLang } from '../i18n'

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

const stepKeys = ['step.1', 'step.2', 'step.3'] as const

export default function Landing() {
  const rootRef = useReveal()
  const spotlight = useSpotlight()
  const { t } = useLang()
  const preview = moments.slice(0, 3)
  const [compare, setCompare] = useState(fallbackCompare)
  const [liveSource, setLiveSource] = useState<'demo' | 'api'>('demo')

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
      <SiteChrome variant="overlay" cta={{ to: '/plan', label: 'nav.plan' }} />

      <CinematicHero />

      <section className="section section--truth" id="truth">
        <div className="section__intro reveal">
          <p className="eyebrow">{t('landing.truth.eyebrow')}</p>
          <h2 className="section__title">{t('landing.truth.title')}</h2>
          <p className="section__text">{t('landing.truth.text')}</p>
        </div>
        <aside className="truth-board truth-board--solo reveal" aria-label={t('landing.truth.eyebrow')}>
          <div className="truth-board__head">
            <span>
              {compare.place} · {compare.dateRange}
            </span>
            <span className="pill pill--live">
              {liveSource === 'api' ? t('landing.truth.api') : t('landing.truth.live')}
            </span>
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
          <p className="eyebrow">{t('landing.principles.eyebrow')}</p>
          <h2 className="section__title">{t('landing.principles.title')}</h2>
          <p className="section__text">{t('landing.principles.text')}</p>
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
          <p className="eyebrow">{t('landing.how.eyebrow')}</p>
          <h2 className="section__title">{t('landing.how.title')}</h2>
        </div>
        <ol className="steps">
          {stepKeys.map((key, i) => (
            <li
              className="steps__item spot reveal"
              key={key}
              style={{ '--i': i } as CSSProperties}
              {...spotlight}
            >
              <span className="steps__num">0{i + 1}</span>
              <p>{t(key)}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section" id="community-preview">
        <div className="section__intro reveal">
          <p className="eyebrow">{t('landing.moments.eyebrow')}</p>
          <h2 className="section__title">{t('landing.moments.title')}</h2>
          <p className="section__text">{t('landing.moments.text')}</p>
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
            <h2 className="section__title">{t('landing.cta.title')}</h2>
            <p className="section__text">{t('landing.cta.text')}</p>
          </div>
          <div className="cine-hero__actions">
            <Link className="btn btn--primary" to="/trip/xian">
              {t('landing.cta.open')}
            </Link>
            <Link className="btn btn--ghost-dark" to="/community">
              {t('landing.cta.community')}
            </Link>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <strong>{t('brand.zh')} {t('brand.en')}</strong>
          <span>{t('landing.footer.tagline')}</span>
        </div>
        <p>© {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}
