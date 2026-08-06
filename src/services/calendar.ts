import type { TripBook } from './api'

/**
 * Builds an RFC 5545 calendar from a trip book:
 * - one timed event per itinerary item
 * - one alarm-bearing event per booking window (抢票提醒)
 * - transport legs as separate events so delays are easy to spot
 *
 * Times are emitted in Asia/Shanghai wall time with a VTIMEZONE block so
 * phones show the same clock as the itinerary.
 */

const TZID = 'Asia/Shanghai'
const CRLF = '\r\n'

/** Year the demo itinerary belongs to; API books can override via meta. */
const DEFAULT_YEAR = 2026

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function escapeText(value: string) {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n')
}

/** Fold long lines to 75 octets per RFC 5545. */
function fold(line: string) {
  const bytes = new TextEncoder().encode(line)
  if (bytes.length <= 75) return line

  const out: string[] = []
  let current = ''
  let currentBytes = 0

  for (const char of line) {
    const size = new TextEncoder().encode(char).length
    const limit = out.length === 0 ? 75 : 74
    if (currentBytes + size > limit) {
      out.push(current)
      current = char
      currentBytes = size
    } else {
      current += char
      currentBytes += size
    }
  }
  out.push(current)
  return out.join(`${CRLF} `)
}

function parseMonthDay(label: string) {
  const match = label.match(/(\d{1,2})\s*[/月-]\s*(\d{1,2})/)
  if (!match) return null
  return { month: Number(match[1]), day: Number(match[2]) }
}

/** "07:35 — 10:20" | "16:00 —" | "19:30 - 22:00" */
function parseTimeRange(label: string) {
  const times = [...label.matchAll(/(\d{1,2}):(\d{2})/g)].map((m) => ({
    hour: Number(m[1]),
    minute: Number(m[2]),
  }))
  if (!times.length) return null
  return { start: times[0]!, end: times[1] ?? null }
}

function localStamp(year: number, month: number, day: number, hour: number, minute: number) {
  return `${year}${pad(month)}${pad(day)}T${pad(hour)}${pad(minute)}00`
}

function addMinutes(
  base: { year: number; month: number; day: number; hour: number; minute: number },
  minutes: number,
) {
  const d = new Date(Date.UTC(base.year, base.month - 1, base.day, base.hour, base.minute))
  d.setUTCMinutes(d.getUTCMinutes() + minutes)
  return {
    year: d.getUTCFullYear(),
    month: d.getUTCMonth() + 1,
    day: d.getUTCDate(),
    hour: d.getUTCHours(),
    minute: d.getUTCMinutes(),
  }
}

function utcStamp(date = new Date()) {
  return (
    `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}` +
    `T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`
  )
}

type EventInput = {
  uid: string
  summary: string
  description?: string
  location?: string
  start: string
  end: string
  alarms?: { trigger: string; description: string }[]
}

function renderEvent(event: EventInput, stamp: string) {
  const lines = [
    'BEGIN:VEVENT',
    `UID:${event.uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART;TZID=${TZID}:${event.start}`,
    `DTEND;TZID=${TZID}:${event.end}`,
    fold(`SUMMARY:${escapeText(event.summary)}`),
  ]

  if (event.description) lines.push(fold(`DESCRIPTION:${escapeText(event.description)}`))
  if (event.location) lines.push(fold(`LOCATION:${escapeText(event.location)}`))

  for (const alarm of event.alarms ?? []) {
    lines.push(
      'BEGIN:VALARM',
      'ACTION:DISPLAY',
      `TRIGGER:${alarm.trigger}`,
      fold(`DESCRIPTION:${escapeText(alarm.description)}`),
      'END:VALARM',
    )
  }

  lines.push('END:VEVENT')
  return lines
}

const VTIMEZONE = [
  'BEGIN:VTIMEZONE',
  `TZID:${TZID}`,
  'BEGIN:STANDARD',
  'DTSTART:19700101T000000',
  'TZOFFSETFROM:+0800',
  'TZOFFSETTO:+0800',
  'TZNAME:CST',
  'END:STANDARD',
  'END:VTIMEZONE',
]

export type IcsOptions = {
  /** Include booking/ticket alarms (default true) */
  includeBookings?: boolean
  /** Include transport legs (default true) */
  includeTransport?: boolean
  /** Minutes before each itinerary item to alert (default 30) */
  reminderMinutes?: number
  /** Restrict to a single day id */
  dayId?: string
  year?: number
}

export function buildTripIcs(book: TripBook, options: IcsOptions = {}) {
  const {
    includeBookings = true,
    includeTransport = true,
    reminderMinutes = 30,
    dayId,
    year = DEFAULT_YEAR,
  } = options

  const stamp = utcStamp()
  const slug = book.id || 'trip'
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//真程 Real Travel//Itinerary//ZH',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    fold(`X-WR-CALNAME:${escapeText(book.meta.title)}`),
    `X-WR-TIMEZONE:${TZID}`,
    ...VTIMEZONE,
  ]

  const days = dayId ? book.days.filter((d) => d.id === dayId) : book.days

  for (const day of days) {
    const md = parseMonthDay(day.date)
    if (!md) continue

    for (const [index, item] of day.timeline.entries()) {
      const range = parseTimeRange(item.time)
      if (!range) continue

      const startBase = {
        year,
        month: md.month,
        day: md.day,
        hour: range.start.hour,
        minute: range.start.minute,
      }
      const endBase = range.end
        ? { ...startBase, hour: range.end.hour, minute: range.end.minute }
        : addMinutes(startBase, 90)

      const descriptionParts = [item.body, `天气：${day.weather}`]
      if (day.callout) descriptionParts.push(day.callout)

      lines.push(
        ...renderEvent(
          {
            uid: `${slug}-${day.id}-${index}@real-travel`,
            summary: `${item.title}`,
            description: descriptionParts.join('\n\n'),
            location: book.meta.destination,
            start: localStamp(
              startBase.year,
              startBase.month,
              startBase.day,
              startBase.hour,
              startBase.minute,
            ),
            end: localStamp(endBase.year, endBase.month, endBase.day, endBase.hour, endBase.minute),
            alarms: [
              {
                trigger: `-PT${reminderMinutes}M`,
                description: `${item.title}（${day.date} ${day.weekday}）`,
              },
            ],
          },
          stamp,
        ),
      )
    }

    if (!includeBookings) continue

    for (const [index, booking] of day.bookings.entries()) {
      const bookingDate = parseMonthDay(booking.deadline)
      if (!bookingDate) continue

      const time = parseTimeRange(booking.deadline)
      const hour = time?.start.hour ?? 9
      const minute = time?.start.minute ?? 0

      const start = {
        year,
        month: bookingDate.month,
        day: bookingDate.day,
        hour,
        minute,
      }
      const end = addMinutes(start, 15)

      lines.push(
        ...renderEvent(
          {
            uid: `${slug}-${day.id}-booking-${index}@real-travel`,
            summary: `抢票提醒：${booking.name}`,
            description: [
              booking.detail,
              `对应行程：${day.date} ${day.weekday} · ${day.title}`,
              booking.urgent ? '⚠ 紧急：错过窗口需盯退票捡漏' : '',
            ]
              .filter(Boolean)
              .join('\n\n'),
            start: localStamp(start.year, start.month, start.day, start.hour, start.minute),
            end: localStamp(end.year, end.month, end.day, end.hour, end.minute),
            alarms: [
              { trigger: '-PT1440M', description: `明天开抢：${booking.name}` },
              { trigger: '-PT10M', description: `10 分钟后开抢：${booking.name}，提前填好身份信息` },
              { trigger: '-PT1M', description: `马上开抢：${booking.name}` },
            ],
          },
          stamp,
        ),
      )
    }
  }

  if (includeTransport && !dayId) {
    for (const [index, leg] of book.transportLegs.entries()) {
      const md = parseMonthDay(leg.date)
      const range = parseTimeRange(leg.time)
      if (!md || !range) continue

      const start = {
        year,
        month: md.month,
        day: md.day,
        hour: range.start.hour,
        minute: range.start.minute,
      }
      const end = range.end
        ? { ...start, hour: range.end.hour, minute: range.end.minute }
        : addMinutes(start, 60)

      lines.push(
        ...renderEvent(
          {
            uid: `${slug}-transport-${index}@real-travel`,
            summary: `${leg.type} ${leg.code}`,
            description: [
              `${leg.route}`,
              `时长 ${leg.duration} · 票价/人 ${leg.price}`,
              leg.dayLabel,
            ].join('\n'),
            location: leg.route,
            start: localStamp(start.year, start.month, start.day, start.hour, start.minute),
            end: localStamp(end.year, end.month, end.day, end.hour, end.minute),
            alarms: [
              { trigger: '-PT120M', description: `2 小时后出发：${leg.code}（${leg.route}）` },
              { trigger: '-PT40M', description: `准备进站/安检：${leg.code}` },
            ],
          },
          stamp,
        ),
      )
    }
  }

  lines.push('END:VCALENDAR')
  return lines.join(CRLF) + CRLF
}

export function downloadIcs(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename.endsWith('.ics') ? filename : `${filename}.ics`
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}
