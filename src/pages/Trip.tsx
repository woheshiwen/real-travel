import { useEffect, useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import { Link, useLocation } from 'react-router-dom'
import CalendarExport from '../components/CalendarExport'
import SiteChrome from '../components/SiteChrome'
import WeatherIcon from '../components/WeatherIcon'
import { staticXianBook } from '../data/staticTripBook'
import type { SituationUpdate } from '../data/xianTrip'
import { api, apiConfigured, type TripBook } from '../services/api'
import { useSpotlight } from '../hooks/useSpotlight'
import { useLang } from '../i18n'

const kindKeys: Record<SituationUpdate['kind'], string> = {
  weather: 'kind.weather',
  transport: 'kind.transport',
  booking: 'kind.booking',
  social: 'kind.social',
}

export default function Trip() {
  const { t } = useLang()
  const location = useLocation()
  const fromPlan = Boolean((location.state as { fromPlan?: boolean } | null)?.fromPlan)
  const [book, setBook] = useState<TripBook>(() => staticXianBook())
  const [source, setSource] = useState<'demo' | 'api'>('demo')
  const [activeDay, setActiveDay] = useState(book.days[0]?.id ?? 'day1')
  const [showReplan, setShowReplan] = useState(fromPlan)
  const spotlight = useSpotlight()

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
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [])

  const day = useMemo(
    () => book.days.find((d) => d.id === activeDay) ?? book.days[0],
    [book.days, activeDay],
  )

  const urgentCount = useMemo(
    () =>
      book.days.reduce(
        (sum, d) => sum + d.bookings.filter((b) => b.urgent).length,
        0,
      ),
    [book.days],
  )

  if (!day) return null

  const { meta } = book

  return (
    <div className="page page--plain">
      <SiteChrome cta={{ href: '#calendar', label: 'trip.cta.calendar' }} />

      <main className="trip">
        <div className="day-rail" aria-hidden="true">
          <div className="day-rail__fill" />
        </div>

        {showReplan && (
          <div className="banner-toast" role="status">
            <div>
              <strong>{t('trip.banner.title')}</strong>
              <p>{t('trip.banner.text')}</p>
            </div>
            <button type="button" onClick={() => setShowReplan(false)}>
              {t('trip.banner.dismiss')}
            </button>
          </div>
        )}

        <section className="bento" aria-label={t('trip.aria.overview')}>
          <div className="bento__tile bento__tile--tall">
            <p className="eyebrow">
              {meta.version} · {meta.updatedAt}
              <span className="pill">{source === 'api' ? t('trip.source.api') : t('trip.source.demo')}</span>
            </p>
            <h1>{meta.title}</h1>
            <p className="bento__note">
              {meta.origin}出发 · {meta.dates} · {meta.nights}
              <br />
              {meta.party} · {meta.goMode} · {meta.returnMode}
            </p>
            <p className="bento__note">{meta.changelog}</p>
          </div>

          <div className="bento__tile spot" {...spotlight}>
            <span className="bento__label">{t('trip.cost.total')}</span>
            <strong className="bento__value">{book.costTotal}</strong>
            <p className="bento__note">{t('trip.cost.perPerson')} {book.costPerPerson}</p>
          </div>

          <div className="bento__tile spot" {...spotlight}>
            <span className="bento__label">{t('trip.days.label')}</span>
            <strong className="bento__value">{book.days.length} {t('trip.days.count')}</strong>
            <p className="bento__note">{meta.homeNote}</p>
          </div>

          <div className="bento__tile spot" {...spotlight}>
            <span className="bento__label">{t('trip.urgent.label')}</span>
            <strong className="bento__value">{urgentCount} {t('trip.urgent.count')}</strong>
            <p className="bento__note">{t('trip.urgent.note')}</p>
          </div>

          <div className="bento__tile spot" {...spotlight}>
            <span className="bento__label">{t('trip.weather.label')}</span>
            <strong className="bento__value">{book.weatherDays[0]?.condition ?? '—'}</strong>
            <p className="bento__note">{book.weatherDays[0]?.temp ?? ''}{t('trip.weather.note')}</p>
          </div>
        </section>

        <section className="panel" id="weather">
          <div className="panel__head">
            <h2>{t('trip.weather.title')}</h2>
            <span className="pill pill--live">{t('trip.weather.pill')}</span>
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
            <h2>{t('trip.situations.title')}</h2>
            <span className="pill">{t('trip.situations.pill')}</span>
          </div>
          <div className="situation-list">
            {book.situations.map((item) => (
              <article className={`situation situation--${item.kind}`} key={item.id}>
                <div className="situation__meta">
                  <span>{t(kindKeys[item.kind])}</span>
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

        <section className="panel" id="days">
          <div className="panel__head">
            <h2>{t('trip.days.title')}</h2>
          </div>

          <div className="day-layout">
            <aside className="day-aside">
              <div className="day-tabs" role="tablist" aria-label={t('trip.aria.dateSelect')}>
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

              <div className="day-context">
                <strong>
                  {day.date} {day.weekday}
                </strong>
                <span>{day.weather}</span>
                <span>{day.bookings.length} {t('trip.days.countLabel')} · {day.timeline.length} {t('trip.days.segments')}</span>
              </div>
            </aside>

            <article className="day-detail">
              <header className="day-detail__head">
                <p className="eyebrow">{day.weather}</p>
                <h3>{day.title}</h3>
              </header>

              {day.callout && <p className="callout">{day.callout}</p>}

              <div className="booking-grid">
                {day.bookings.map((b) => (
                  <div className={`booking${b.urgent ? ' booking--urgent' : ''}`} key={b.name}>
                    <strong>{b.name}</strong>
                    <p>{b.detail}</p>
                    <span>{t('trip.booking.deadline')}{b.deadline}</span>
                  </div>
                ))}
              </div>

              <ol className="timeline">
                {day.timeline.map((item, index) => (
                  <li key={`${item.time}-${item.title}`} style={{ '--i': index } as CSSProperties}>
                    <time>{item.time}</time>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </article>
          </div>
        </section>

        <section className="panel" id="transport">
          <div className="panel__head">
            <h2>{t('trip.transport.title')}</h2>
          </div>
          <p className="panel__lede">{book.transportNote}</p>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>{t('trip.transport.th.date')}</th>
                  <th>{t('trip.transport.th.type')}</th>
                  <th>{t('trip.transport.th.code')}</th>
                  <th>{t('trip.transport.th.route')}</th>
                  <th>{t('trip.transport.th.time')}</th>
                  <th>{t('trip.transport.th.duration')}</th>
                  <th>{t('trip.transport.th.price')}</th>
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

        <CalendarExport book={book} activeDayId={activeDay} />

        <section className="split-panels">
          <div className="panel">
            <div className="panel__head">
              <h2>{t('trip.costs.title')}</h2>
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
                    <td>{t('trip.costs.totalRow')}</td>
                    <td>{t('trip.costs.totalDetail')}</td>
                    <td>{book.costTotal}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="panel">
            <div className="panel__head">
              <h2>{t('trip.tips.title')}</h2>
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
            <p className="eyebrow">{t('trip.replan.eyebrow')}</p>
            <h2>{t('trip.replan.title')}</h2>
            <p>
              {t('trip.replan.text')}
            </p>
          </div>
          <div className="hero-live__actions">
            <Link className="btn btn--primary" to="/community">
              {t('trip.replan.share')}
            </Link>
            <Link className="btn btn--ghost-dark" to="/plan">
              {t('trip.replan.again')}
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
