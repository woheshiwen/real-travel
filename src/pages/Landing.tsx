import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

export default function Landing() {
  const rootRef = useReveal()

  return (
    <div className="page" ref={rootRef}>
      <header className="topnav">
        <Link to="/" className="brand">
          <span className="brand__mark">真程</span>
          <span className="brand__en">Real Travel</span>
        </Link>
        <nav className="topnav__links">
          <a href="#why">为什么</a>
          <a href="#how">怎么工作</a>
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
          <h1 className="hero-live__title">别让一条短视频，取消你真正查过的行程。</h1>
          <p className="hero-live__lede">
            结合出发地交通、目的地实况天气与不断变化的行程约束，给你可执行、可改版的
            AI 出行建议——像一份一直在更新的路书。
          </p>
          <div className="hero-live__actions">
            <Link className="btn btn--primary" to="/plan">
              生成我的行程
            </Link>
            <Link className="btn btn--ghost-dark" to="/trip/xian">
              看西安家庭游示例
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

      <section className="section" id="why">
        <div className="section__intro reveal">
          <p className="eyebrow">问题</p>
          <h2 className="section__title">行程最怕的不是下雨，是信息失真。</h2>
          <p className="section__text">
            你查过后面几天的天气预报，感觉还可以；刷到短视频却开始犹豫。真程把「天气 /
            交通 / 预约窗口 / 行李与换乘」放进同一套持续更新的建议里。
          </p>
        </div>
        <div className="reason-grid">
          {[
            {
              t: '真实天气，不是标题党',
              d: '逐日气温与降水对照行程节点，告诉你该不该改、改哪一段。',
            },
            {
              t: '从出发地算交通',
              d: '飞机、高铁、换乘缓冲与当晚能否到家，一起进入方案，而不是事后补票。',
            },
            {
              t: '情况变了就改版',
              d: '像 v9 路书一样：华山挪后、返程改高铁、费用重算——每次变更都说清楚。',
            },
          ].map((item) => (
            <article className="reason reveal" key={item.t}>
              <h3>{item.t}</h3>
              <p>{item.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--band" id="how">
        <div className="section__intro reveal">
          <p className="eyebrow">工作方式</p>
          <h2 className="section__title">输入约束，输出可执行路书。</h2>
        </div>
        <ol className="steps">
          {[
            '填写出发地、目的地、日期与同行人',
            '系统拉取天气与主要交通选项，生成按日时间轴',
            '社媒恐慌、延误、预约余票变化时，给你改版建议而非空泛提醒',
          ].map((text, i) => (
            <li className="steps__item reveal" key={text}>
              <span className="steps__num">0{i + 1}</span>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section">
        <div className="demo-cta reveal">
          <div>
            <p className="eyebrow">示例路书</p>
            <h2 className="section__title">深圳出发 · 西安家庭游 5 天</h2>
            <p className="section__text">
              直接打开由真实规划沉淀的示例：天气条、全程交通时刻表、每日预约窗口、费用与动态改版记录。
            </p>
          </div>
          <Link className="btn btn--primary" to="/trip/xian">
            打开示例行程
          </Link>
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <strong>真程 Real Travel</strong>
          <span>按实况出行，而不是按热搜出行。</span>
        </div>
        <p>© {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}
