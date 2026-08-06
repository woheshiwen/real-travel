import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import CalendarExport from '../components/CalendarExport'
import WeatherIcon from '../components/WeatherIcon'
import { staticXianBook } from '../data/staticTripBook'
import type { SituationUpdate } from '../data/xianTrip'
import { api, apiConfigured, type TripBook } from '../services/api'

const kindLabel: Record<SituationUpdate['kind'], string> = {
  weather: '天气',
  transport: '交通',
  booking: '预约',
  social: '社媒',
}

export default function Trip() {
  const location = useLocation()
  const fromPlan = Boolean((location.state as { fromPlan?: boolean } | null)?.fromPlan)
  const [book, setBook] = useState<TripBook>(() => staticXianBook())
  const [source, setSource] = useState<'demo' | 'api'>('demo')
  const [activeDay, setActiveDay] = useState(book.days[0]?.id ?? 'day1')
  const [showReplan, setShowReplan] = useState(fromPlan)

  useEffect(() => {
    if (!apiConfigured) return
    let cancelled = false

    api
      .getTrip('xian')
      .then((trip) => {
        if (cancelled) return
        setBook(trip)
        setSource('api')
        setActiveDay(trip.days[0]?.id ?? 'day1')
      })
      .catch(() => {
        /* keep bundled static book */
      })

    return () => {
      cancelled = true
    }
  }, [])

  const day = useMemo(
    () => book.days.find((d) => d.id === activeDay) ?? book.days[0],
    [book.days, activeDay],
  )

  if (!day) return null

  const { meta } = book

  return (
    <div className="page page--plain">
      <header className="topnav topnav--solid">
        <Link to="/" className="brand">
          <span className="brand__mark">真程</span>
          <span className="brand__en">Real Travel</span>
        </Link>
        <nav className="topnav__links">
          <Link to="/community">足迹广场</Link>
          <Link to="/plan">重新规划</Link>
          <a className="btn btn--small btn--primary" href="#calendar">
            加入日历
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
              {meta.version} · 更新于 {meta.updatedAt}
              <span className="pill" style={{ marginLeft: '0.6rem' }}>
                {source === 'api' ? '已连接后台' : '演示数据'}
              </span>
            </p>
            <h1>{meta.title}</h1>
            <p className="trip-hero__meta">
              {meta.origin}出发 · {meta.dates} · {meta.nights}
              <br />
              {meta.party} · {meta.goMode} · {meta.returnMode} · {meta.homeNote}
            </p>
            <p className="trip-hero__change">{meta.changelog}</p>
          </div>
          <div className="trip-hero__stat">
            <span>3人合计</span>
            <strong>{book.costTotal}</strong>
            <span>人均约 {book.costPerPerson}</span>
          </div>
        </section>

        <section className="panel" id="weather">
          <div className="panel__head">
            <h2>天气实况条</h2>
            <span className="pill pill--live">对照社媒</span>
          </div>
          <p className="panel__lede">{book.weatherSummary}</p>
          <div className="weather-strip">
            {book.weatherDays.map((w) => (
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
            {book.situations.map((item) => (
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
          <p className="panel__lede">{book.transportNote}</p>
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
                {book.transportLegs.map((leg) => (
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
            {book.days.map((d) => (
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

        <CalendarExport book={book} activeDayId={activeDay} />

        <section className="split-panels">
          <div className="panel">
            <div className="panel__head">
              <h2>费用估算</h2>
            </div>
            <div className="table-wrap">
              <table className="data-table">
                <tbody>
                  {book.costs.map((row) => (
                    <tr key={row.item}>
                      <td>{row.item}</td>
                      <td>{row.detail}</td>
                      <td>{row.amount}</td>
                    </tr>
                  ))}
                  <tr className="data-table__total">
                    <td>合计</td>
                    <td>3人总费用</td>
                    <td>{book.costTotal}</td>
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
              {book.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="panel panel--replan">
          <div>
            <p className="eyebrow">信任之后，是分享</p>
            <h2>走完这趟，把快乐留给后来者。</h2>
            <p>
              真程要做成大家真正用得上的系统：实况可核对、行程可改版；也做成交互平台——把雨中灯火、山顶并肩、当晚到家的安心，分享给下一个出发的人。
            </p>
          </div>
          <div className="hero-live__actions">
            <Link className="btn btn--primary" to="/community">
              分享这段快乐
            </Link>
            <Link
              className="btn btn--ghost-dark"
              to="/plan"
              style={{ borderColor: 'rgba(244,247,245,.45)', color: '#f4f7f5' }}
            >
              再生成一版
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
