import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import SiteChrome from '../components/SiteChrome'
import { api, apiConfigured } from '../services/api'
import { useLang } from '../i18n'

const interestKeys = [
  'plan.interests.museum',
  'plan.interests.nature',
  'plan.interests.food',
  'plan.interests.family',
  'plan.interests.easy',
  'plan.interests.night',
] as const

export default function Plan() {
  const { t } = useLang()
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string[]>([interestKeys[0], interestKeys[3], interestKeys[2]])
  const [submitting, setSubmitting] = useState(false)

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
      <SiteChrome cta={{ to: '/trip/xian', label: 'nav.preview' }} />

      <main className="plan">
        <div className="plan__intro">
          <p className="eyebrow">{t('plan.eyebrow')}</p>
          <h1>{t('plan.title')}</h1>
          <p>{t('plan.subtitle')}</p>
        </div>

        <form className="plan-form" onSubmit={onSubmit}>
          <label className="field">
            <span>{t('plan.origin')}</span>
            <input name="origin" defaultValue="深圳" required />
          </label>
          <label className="field">
            <span>{t('plan.destination')}</span>
            <input name="destination" defaultValue="西安" required />
          </label>
          <div className="field-row">
            <label className="field">
              <span>{t('plan.startDate')}</span>
              <input name="start" type="date" defaultValue="2026-08-11" required />
            </label>
            <label className="field">
              <span>{t('plan.endDate')}</span>
              <input name="end" type="date" defaultValue="2026-08-15" required />
            </label>
          </div>
          <label className="field">
            <span>{t('plan.party')}</span>
            <input name="party" defaultValue="两大一小（12岁）" required />
          </label>
          <label className="field">
            <span>{t('plan.homeStop')}</span>
            <input name="home" defaultValue="宿松东 / 当晚到家" />
          </label>

          <fieldset className="field">
            <legend>{t('plan.interests')}</legend>
            <div className="chip-row">
              {interestKeys.map((key) => {
                const active = selected.includes(key)
                return (
                  <button
                    key={key}
                    type="button"
                    className={`chip${active ? ' is-active' : ''}`}
                    onClick={() => toggleInterest(key)}
                    aria-pressed={active}
                  >
                    {t(key)}
                  </button>
                )
              })}
            </div>
          </fieldset>

          <button className="btn btn--primary btn--block" type="submit" disabled={submitting}>
            {submitting ? t('plan.submitting') : t('plan.submit')}
          </button>
        </form>
      </main>
    </div>
  )
}
