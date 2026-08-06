import { useEffect, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import CinematicHero from '../components/CinematicHero'
import DestinationMarquee from '../components/DestinationMarquee'
import SiteChrome from '../components/SiteChrome'
import { moments, trustPillars } from '../data/community'
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

const steps = [
  '按天气、交通与约束生成可执行路书',
  '情况变化时提出改版，并写清依据',
  '一键导入日历，抢票闹钟自动就位',
]

export default function Landing() {
  const rootRef = useReveal()
  const spotlight = useSpotlight()
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
      <SiteChrome variant="overlay" />

      <CinematicHero />

      <section className="section section--truth" id="truth">
        <div className="section__intro reveal">
          <p className="eyebrow">实况对照</p>
          <h2 className="section__title">社媒恐慌之外，还有可核对的判断。</h2>
          <p className="section__text">
            真程把热议与预报放在一起看——保留、微调还是改版，都写得清楚。
          </p>
        </div>
        <aside className="truth-board truth-board--solo reveal" aria-label="实况对照">
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
          <p className="eyebrow">产品原则</p>
          <h2 className="section__title">先做成大家用得上、信得过的系统。</h2>
          <p className="section__text">
            不是又一个热点旅游站。真程要长期可核对、可改版、可分享——让决策站在实况上，让快乐留在社区里。
          </p>
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
          <p className="eyebrow">工作方式</p>
          <h2 className="section__title">实用系统 + 交互平台。</h2>
        </div>
        <ol className="steps">
          {steps.map((text, i) => (
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
          <p className="eyebrow">足迹广场</p>
          <h2 className="section__title">大家正在分享的快乐。</h2>
          <p className="section__text">
            亲历者留下的不是夸张标题，而是可对照的实况判断，和一段想传下去的喜悦。
          </p>
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
            <h2 className="section__title">从示例行程，走到真实社区。</h2>
            <p className="section__text">
              先打开西安家庭游路书，再去足迹广场看看同行人怎么做决定、怎么把快乐留下来。
            </p>
          </div>
          <div className="cine-hero__actions">
            <Link className="btn btn--primary" to="/trip/xian">
              打开示例行程
            </Link>
            <Link className="btn btn--ghost-dark" to="/community">
              进入足迹广场
            </Link>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <strong>真程 Real Travel</strong>
          <span>按实况出行，把快乐留给后来者。</span>
        </div>
        <p>© {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}
