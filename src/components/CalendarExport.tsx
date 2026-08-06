import { useMemo, useState } from 'react'
import { buildTripIcs, downloadIcs } from '../services/calendar'
import type { TripBook } from '../services/api'

const reminderChoices = [15, 30, 60] as const

export default function CalendarExport({
  book,
  activeDayId,
}: {
  book: TripBook
  activeDayId?: string
}) {
  const [includeBookings, setIncludeBookings] = useState(true)
  const [includeTransport, setIncludeTransport] = useState(true)
  const [reminderMinutes, setReminderMinutes] = useState<number>(30)
  const [done, setDone] = useState<string | null>(null)

  const counts = useMemo(() => {
    const events = book.days.reduce((sum, day) => sum + day.timeline.length, 0)
    const bookings = book.days.reduce(
      (sum, day) => sum + day.bookings.filter((b) => /\d{1,2}\s*[/月-]\s*\d{1,2}/.test(b.deadline)).length,
      0,
    )
    return { events, bookings, transport: book.transportLegs.length }
  }, [book])

  function exportAll() {
    const ics = buildTripIcs(book, { includeBookings, includeTransport, reminderMinutes })
    downloadIcs(`真程-${book.meta.title}`, ics)
    setDone('已下载完整行程日历')
  }

  function exportDay() {
    if (!activeDayId) return
    const day = book.days.find((d) => d.id === activeDayId)
    const ics = buildTripIcs(book, {
      includeBookings,
      includeTransport: false,
      reminderMinutes,
      dayId: activeDayId,
    })
    downloadIcs(`真程-${day?.date ?? activeDayId}`, ics)
    setDone(`已下载 ${day?.date ?? ''} 当日日历`)
  }

  return (
    <section className="panel calendar-export" id="calendar">
      <div className="panel__head">
        <h2>一键加入日历与闹钟</h2>
        <span className="pill pill--live">.ics</span>
      </div>
      <p className="panel__lede">
        导出后用手机日历打开即可：行程按时间落到日程上，抢票窗口会带
        <strong>提前一天 / 10 分钟 / 1 分钟</strong>三重提醒，交通班次带出发与进站提醒。
      </p>

      <div className="calendar-export__stats">
        <div>
          <strong>{counts.events}</strong>
          <span>行程事件</span>
        </div>
        <div>
          <strong>{counts.bookings}</strong>
          <span>抢票闹钟</span>
        </div>
        <div>
          <strong>{counts.transport}</strong>
          <span>交通班次</span>
        </div>
      </div>

      <div className="calendar-export__controls">
        <div className="control-group">
          <span className="control-group__label">行程提前提醒</span>
          <div className="chip-row">
            {reminderChoices.map((min) => (
              <button
                key={min}
                type="button"
                className={`chip${reminderMinutes === min ? ' is-active' : ''}`}
                onClick={() => setReminderMinutes(min)}
                aria-pressed={reminderMinutes === min}
              >
                {min} 分钟
              </button>
            ))}
          </div>
        </div>

        <div className="control-group">
          <span className="control-group__label">包含内容</span>
          <div className="chip-row">
            <button
              type="button"
              className={`chip${includeBookings ? ' is-active' : ''}`}
              onClick={() => setIncludeBookings((v) => !v)}
              aria-pressed={includeBookings}
            >
              抢票提醒
            </button>
            <button
              type="button"
              className={`chip${includeTransport ? ' is-active' : ''}`}
              onClick={() => setIncludeTransport((v) => !v)}
              aria-pressed={includeTransport}
            >
              交通班次
            </button>
          </div>
        </div>
      </div>

      <div className="calendar-export__actions">
        <button type="button" className="btn btn--primary" onClick={exportAll}>
          下载完整行程 .ics
        </button>
        {activeDayId && (
          <button type="button" className="btn btn--ghost-dark" onClick={exportDay}>
            只下载当天
          </button>
        )}
      </div>

      {done && (
        <p className="calendar-export__done" role="status">
          {done}：在手机上打开文件即可导入系统日历（iOS 日历 / Google 日历 / 华为·小米日历均支持）。
        </p>
      )}
    </section>
  )
}
