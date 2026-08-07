import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import SiteChrome from '../components/SiteChrome'
import { useI18n } from '../i18n'
import { api, apiConfigured } from '../services/api'

export default function Plan() {
  const { t, locale } = useI18n()
  const navigate = useNavigate()
  const interests = useMemo(
    () => [
      t.interestMuseum,
      t.interestNature,
      t.interestFood,
      t.interestFamily,
      t.interestWalk,
      t.interestNight,
    ],
    [t],
  )
  const [selected, setSelected] = useState<string[]>([
    t.interestMuseum,
    t.interestFamily,
    t.interestFood,
  ])
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    setSelected([t.interestMuseum, t.interestFamily, t.interestFood])
  }, [locale, t.interestMuseum, t.interestFamily, t.interestFood])

  const defaults =
    locale === 'zh-CN'
      ? {
          origin: '深圳',
          destination: '西安',
          party: '两大一小（12岁）',
          home: '宿松东 / 当晚到家',
        }
      : {
          origin: 'Shenzhen',
          destination: 'Xi’an',
          party: '2 adults + 1 child (12)',
          home: 'Susong East / home same night',
        }

  function toggleInterest(item: string) {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item],
    )
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setSubmitting(true)

    if (apiConfigured) {
      try {
        await api.planTrip({
          origin: String(data.get('origin') || ''),
          destination: String(data.get('destination') || ''),
          startDate: String(data.get('start') || ''),
          endDate: String(data.get('end') || ''),
          party: String(data.get('party') || ''),
          interests: selected,
        })
      } catch {
        /* fall through to the bundled Xi'an demo route */
      }
      navigate('/trip/xian', { state: { fromPlan: true } })
      return
    }

    window.setTimeout(() => {
      navigate('/trip/xian', { state: { fromPlan: true } })
    }, 900)
  }

  return (
    <div className="page page--plain">
      <SiteChrome cta={{ to: '/trip/xian', label: t.heroCtaSample }} />

      <main className="plan">
        <div className="plan__intro">
          <p className="eyebrow">{t.planEyebrow}</p>
          <h1>{t.planTitle}</h1>
          <p>{t.planText}</p>
        </div>

        <form className="plan-form" onSubmit={onSubmit} key={locale}>
          <label className="field">
            <span>{t.planOrigin}</span>
            <input name="origin" defaultValue={defaults.origin} required />
          </label>
          <label className="field">
            <span>{t.planDest}</span>
            <input name="destination" defaultValue={defaults.destination} required />
          </label>
          <div className="field-row">
            <label className="field">
              <span>{t.planStart}</span>
              <input name="start" type="date" defaultValue="2026-08-11" required />
            </label>
            <label className="field">
              <span>{t.planEnd}</span>
              <input name="end" type="date" defaultValue="2026-08-15" required />
            </label>
          </div>
          <label className="field">
            <span>{t.planParty}</span>
            <input name="party" defaultValue={defaults.party} required />
          </label>
          <label className="field">
            <span>{t.planHome}</span>
            <input name="home" defaultValue={defaults.home} />
          </label>

          <fieldset className="field">
            <legend>{t.planPrefs}</legend>
            <div className="chip-row">
              {interests.map((item) => {
                const active = selected.includes(item)
                return (
                  <button
                    key={item}
                    type="button"
                    className={`chip${active ? ' is-active' : ''}`}
                    onClick={() => toggleInterest(item)}
                    aria-pressed={active}
                  >
                    {item}
                  </button>
                )
              })}
            </div>
          </fieldset>

          <button className="btn btn--primary btn--block" type="submit" disabled={submitting}>
            {submitting ? t.planSubmitting : t.planSubmit}
          </button>
        </form>
      </main>
    </div>
  )
}
