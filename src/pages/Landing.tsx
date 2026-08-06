import { Link } from 'react-router-dom'
import { moments, trustPillars } from '../data/community'
import { useReveal } from '../hooks/useReveal'

export default function Landing() {
  const rootRef = useReveal()
  const preview = moments.slice(0, 3)

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
            真程结合出发地交通、目的地实况天气与持续变化的约束，生成可改版的 AI
            路书；也让走过的人把真实喜悦留在平台上，帮助下一位出发者。
          </p>
          <div className="hero-live__actions">
            <Link className="btn btn--primary" to="/plan">
              生成我的行程
            </Link>
            <Link className="btn btn--ghost-dark" to="/community">
              看看大家的足迹
            </Link>
          </div>
        </div>

        <aside className="truth-board" aria-label="实况对照">
          <div className="truth-board__head">
            <span>实况对照 · 西安 8/11–8/15</span>
            <span className="pill pill--live">LIVE</span>
          </div>
          <div className="truth-board__row truth-board__row--alert">
            <strong>社媒热议</strong>
            <p>抖音大量「暴雨别去了」视频</p>
          </div>
          <div className="truth-board__row truth-board__row--ok">
            <strong>实况预报</strong>
            <p>8/11 小雨转阴，其后转晴；比深圳凉快 5–8°C</p>
          </div>
          <div className="truth-board__row">
            <strong>AI 建议</strong>
            <p>保留行程。Day1 改室内陕历博，夜景照去；无需取消。</p>
          </div>
        </aside>
      </section>

      <section className="section" id="trust">
        <div className="section__intro reveal">
          <p className="eyebrow">产品原则</p>
          <h2 className="section__title">先做成大家用得上、信得过的系统。</h2>
          <p className="section__text">
            不是又一个热点旅游站。真程要长期可核对、可改版、可分享——让决策站在实况上，让快乐留在社区里。
          </p>
        </div>
        <div className="reason-grid">
          {trustPillars.map((item) => (
            <article className="reason reveal" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--band" id="how">
        <div className="section__intro reveal">
          <p className="eyebrow">双引擎</p>
          <h2 className="section__title">实用系统 + 交互平台。</h2>
        </div>
        <ol className="steps">
          {[
            '按天气、交通与约束生成可执行路书',
            '情况变化时提出改版，并写清依据',
            '行程中的快乐与避坑，沉淀到足迹广场',
          ].map((text, i) => (
            <li className="steps__item reveal" key={text}>
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
          {preview.map((moment) => (
            <article className="home-moment reveal" key={moment.id}>
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
        <div className="demo-cta reveal" style={{ marginTop: '2rem' }}>
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
