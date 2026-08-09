import { useMemo, useState } from 'react'
import { driveLegsForDay, type DriveLeg } from '../data/xianDriveLegs'
import { useI18n } from '../i18n'
import { openAmapNavigation } from '../services/amap'

function routeSummary(leg: DriveLeg): string {
  const parts = [leg.from.name]
  if (leg.via) parts.push(leg.via.name)
  parts.push(leg.to.name)
  return parts.join(' → ')
}

export default function AmapNav({ activeDayId }: { activeDayId?: string }) {
  const { t } = useI18n()
  const [scope, setScope] = useState<'day' | 'all'>('day')
  const [openedId, setOpenedId] = useState<string | null>(null)

  const legs = useMemo(() => {
    if (scope === 'all') return driveLegsForDay()
    return driveLegsForDay(activeDayId)
  }, [activeDayId, scope])

  function openLeg(leg: DriveLeg) {
    openAmapNavigation({
      from: leg.from,
      to: leg.to,
      via: leg.via,
      mode: 'car',
      callnative: true,
    })
    setOpenedId(leg.id)
  }

  return (
    <section className="panel amap-nav" id="amap-nav">
      <div className="panel__head">
        <h2>{t.amapTitle}</h2>
        <span className="pill pill--live">{t.amapPill}</span>
      </div>
      <p className="panel__lede">{t.amapLede}</p>

      <div className="amap-nav__controls">
        <div className="control-group">
          <span className="control-group__label">{t.amapScope}</span>
          <div className="chip-row">
            <button
              type="button"
              className={`chip${scope === 'day' ? ' is-active' : ''}`}
              onClick={() => setScope('day')}
              aria-pressed={scope === 'day'}
            >
              {t.amapScopeDay}
            </button>
            <button
              type="button"
              className={`chip${scope === 'all' ? ' is-active' : ''}`}
              onClick={() => setScope('all')}
              aria-pressed={scope === 'all'}
            >
              {t.amapScopeAll}
            </button>
          </div>
        </div>
      </div>

      <ul className="amap-nav__list">
        {legs.map((leg) => (
          <li key={leg.id} className="amap-nav__item">
            <div className="amap-nav__meta">
              <strong>{t[leg.labelKey]}</strong>
              <span className="amap-nav__route">{routeSummary(leg)}</span>
              <span className="amap-nav__note">{t[leg.noteKey]}</span>
            </div>
            <button
              type="button"
              className="btn btn--primary btn--small"
              onClick={() => openLeg(leg)}
            >
              {t.amapOpen}
            </button>
          </li>
        ))}
      </ul>

      {openedId && (
        <p className="amap-nav__done" role="status">
          {t.amapDone}
        </p>
      )}
    </section>
  )
}
