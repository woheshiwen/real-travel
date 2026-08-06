import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import WeatherIcon from '../components/WeatherIcon'
import {
  costPerPerson,
  costs,
  costTotal,
  days,
  situations,
  tips,
  transportLegs,
  transportNote,
  tripMeta,
  weatherDays,
  weatherSummary,
  type SituationUpdate,
} from '../data/xianTrip'

const kindLabel: Record<SituationUpdate['kind'], string> = {
  weather: '天气',
  transport: '交通',
  booking: '预约',
  social: '社媒',
}

export default function Trip() {
  const location = useLocation()
  const fromPlan = Boolean((location.state as { fromPlan?: boolean } | null)?.fromPlan)
  const [activeDay, setActiveDay] = useState(days[0].id)
  const [showReplan, setShowReplan] = useState(fromPlan)
  const day = useMemo(() => days.find((d) => d.id === activeDay) ?? days[0], [activeDay])

  return (
    <div className="page page--plain">
      <header className="topnav topnav--solid">
        <Link to="/" className="brand">
          <span className="brand__mark">真程</span>
          <span className="brand__en">Real Travel</span>
        </Link>
        <nav className="topnav__links">
          <Link to="/plan">重新规划</Link>
          <a href="#situations">动态建议</a>
          <a className="btn btn--small btn--primary" href="#days">
            每日行程
          </a>
        </nav>
      </header>

      <main className="trip">
        {showReplan && (
          <div className="banner-toast" role="status">
            <div>
              <strong>已生成可执行路书</strong>
              <p>以下为深圳出发西安家庭游示例（对应你的 WorkBuddy v9 方案结构）。</p>
            </div>
            <button type="button" onClick={() => setShowReplan(false)}>
              知道了
            </button>
          </div>
        )}

        <section className="trip-hero">
          <div>
            <p className="eyebrow">
              {tripMeta.version} · 更新于 {tripMeta.updatedAt}
            </p>
            <h1>{tripMeta.title}</h1>
            <p className="trip-hero__meta">
              {tripMeta.origin}出发 · {tripMeta.dates} · {tripMeta.nights}
              <br />
              {tripMeta.party} · {tripMeta.goMode} · {tripMeta.returnMode} · {tripMeta.homeNote}
            </p>
            <p className="trip-hero__change">{tripMeta.changelog}</p>
          </div>
          <div className="trip-hero__stat">
            <span>3人合计</span>
            <strong>{costTotal}</strong>
            <span>人均约 {costPerPerson}</span>
          </div>
        </section>

        <section className="panel" id="weather">
          <div className="panel__head">
            <h2>天气实况条</h2>
            <span className="pill pill--live">对照社媒</span>
          </div>
          <p className="panel__lede">{weatherSummary}</p>
          <div className="weather-strip">
            {weatherDays.map((w) => (
              <article className="weather-card" key={w.date}>
                <WeatherIcon icon={w.icon} />
                <strong>
                  {w.date} {w.weekday}
                </strong>
                <span>{w.temp}</span>
                <span>{w.condition}</span>
                <p>{w.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel" id="situations">
          <div className="panel__head">
            <h2>动态情况与 AI 建议</h2>
            <span className="pill">随实情改版</span>
          </div>
          <div className="situation-list">
            {situations.map((item) => (
              <article className={`situation situation--${item.kind}`} key={item.id}>
                <div className="situation__meta">
                  <span>{kindLabel[item.kind]}</span>
                  <time>{item.time}</time>
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                {item.action && (
                  <a className="text-link" href={item.kind === 'weather' ? '#weather' : '#days'}>
                    {item.action}
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="panel" id="transport">
          <div className="panel__head">
            <h2>全程交通时刻表</h2>
          </div>
          <p className="panel__lede">{transportNote}</p>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>日期</th>
                  <th>类型</th>
                  <th>班次</th>
                  <th>路线</th>
                  <th>时间</th>
                  <th>时长</th>
                  <th>票价/人</th>
                </tr>
              </thead>
              <tbody>
                {transportLegs.map((leg) => (
                  <tr key={`${leg.dayLabel}-${leg.code}`}>
                    <td>
                      {leg.date}
                      <br />
                      <small>{leg.dayLabel}</small>
                    </td>
                    <td>{leg.type}</td>
                    <td>{leg.code}</td>
                    <td>{leg.route}</td>
                    <td>{leg.time}</td>
                    <td>{leg.duration}</td>
                    <td>{leg.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel" id="days">
          <div className="panel__head">
            <h2>每日行程</h2>
          </div>
          <div className="day-tabs" role="tablist" aria-label="选择日期">
            {days.map((d) => (
              <button
                key={d.id}
                type="button"
                role="tab"
                aria-selected={d.id === activeDay}
                className={`day-tab${d.id === activeDay ? ' is-active' : ''}`}
                onClick={() => setActiveDay(d.id)}
              >
                <WeatherIcon icon={d.weatherIcon} />
                <span>
                  {d.date} {d.weekday}
                </span>
              </button>
            ))}
          </div>

          <article className="day-detail">
            <header className="day-detail__head">
              <div>
                <p className="eyebrow">
                  {day.date} · {day.weekday} · {day.weather}
                </p>
                <h3>{day.title}</h3>
              </div>
            </header>

            {day.callout && <p className="callout">{day.callout}</p>}

            <div className="booking-grid">
              {day.bookings.map((b) => (
                <div className={`booking${b.urgent ? ' booking--urgent' : ''}`} key={b.name}>
                  <strong>{b.name}</strong>
                  <p>{b.detail}</p>
                  <span>抢票 / 购买：{b.deadline}</span>
                </div>
              ))}
            </div>

            <ol className="timeline">
              {day.timeline.map((item) => (
                <li key={`${item.time}-${item.title}`}>
                  <time>{item.time}</time>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </article>
        </section>

        <section className="split-panels">
          <div className="panel">
            <div className="panel__head">
              <h2>费用估算</h2>
            </div>
            <div className="table-wrap">
              <table className="data-table">
                <tbody>
                  {costs.map((row) => (
                    <tr key={row.item}>
                      <td>{row.item}</td>
                      <td>{row.detail}</td>
                      <td>{row.amount}</td>
                    </tr>
                  ))}
                  <tr className="data-table__total">
                    <td>合计</td>
                    <td>3人总费用</td>
                    <td>{costTotal}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="panel">
            <div className="panel__head">
              <h2>实用提示</h2>
            </div>
            <ul className="tip-list">
              {tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="panel panel--replan">
          <div>
            <p className="eyebrow">下一版能力</p>
            <h2>情况一变，路书跟着改。</h2>
            <p>
              接入实时天气、航班/高铁动态与预约余票后，真程会像这次 v8→v9
              一样自动提出结构调整：挪景点、改交通、重算费用，并写清「为什么改」。
            </p>
          </div>
          <Link className="btn btn--primary" to="/plan">
            用我的约束再生成一版
          </Link>
        </section>
      </main>
    </div>
  )
}
