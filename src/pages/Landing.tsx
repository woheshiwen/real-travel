import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DestinationMarquee from '../components/DestinationMarquee'
import { moments, trustPillars } from '../data/community'
import { api, apiConfigured, type ConditionsCompare } from '../services/api'
import { useReveal } from '../hooks/useReveal'
import { useSpotlight } from '../hooks/useSpotlight'

const fallbackCompare: ConditionsCompare = {
  place: '西安',
  asOf: '',
  social: {
    headline: '抖音大量「暴雨别去了」视频',
    source: '短视频热议',
  },
  live: {
    summary: '8/11 小雨转阴，其后转晴；比深圳凉快 5–8°C',
  },
  advice: {
    keepTrip: true,
    summary: '保留行程。Day1 改室内陕历博，夜景照去；无需取消。',
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
      .compareConditions({ tripId: 'xian', place: '西安' })
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
    <div className="page" ref={rootRef}>
      <header className="topnav">
        <Link to="/" className="brand">
          <span className="brand__mark">真程</span>
          <span className="brand__en">Real Travel</span>
        </Link>
        <nav className="topnav__links">
          <a href="#trust">信任</a>
          <Link to="/community">足迹广场</Link>
          <Link to="/trip/xian">西安示例</Link>
          <Link className="btn btn--small btn--primary" to="/plan">
            开始规划
          </Link>
        </nav>
      </header>

      <section className="hero-live">
        <div className="hero-live__atmosphere" aria-hidden="true">
          <div className="hero-live__radar" />
          <div className="hero-live__grid" />
        </div>

        <div className="hero-live__content">
          <p className="hero-live__brand">真程</p>
          <h1 className="hero-live__title">值得信任的出行建议，和值得分享的快乐。</h1>
          <p className="hero-live__lede">
            结合出发地交通、目的地实况天气与持续变化的约束，生成可改版的路书；
            定好行程后一键导入日历，连抢票闹钟都替你设好。
          </p>
          <div className="hero-live__actions">
            <Link className="btn btn--primary" to="/plan">
              生成我的行程
            </Link>
            <Link className="btn btn--ghost-dark" to="/trip/xian">
              看西安示例路书
            </Link>
          </div>
        </div>

        <aside className="truth-board" aria-label="实况对照">
          <div className="truth-board__head">
            <span>实况对照 · {compare.place}</span>
            <span className="pill pill--live">{liveSource === 'api' ? 'API' : 'LIVE'}</span>
          </div>
          <div className="truth-board__row truth-board__row--alert">
            <strong>社媒热议</strong>
            <p>{compare.social.headline}</p>
          </div>
          <div className="truth-board__row truth-board__row--ok">
            <strong>实况预报</strong>
            <p>{compare.live.summary}</p>
          </div>
          <div className="truth-board__row">
            <strong>AI 建议</strong>
            <p>{compare.advice.summary}</p>
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
              style={{ '--i': index } as React.CSSProperties}
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
              style={{ '--i': i } as React.CSSProperties}
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
              style={{ '--i': index } as React.CSSProperties}
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
          <div className="hero-live__actions">
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
