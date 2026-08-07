import { useEffect, useMemo, useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import SiteChrome from '../components/SiteChrome'
import { moments as seedMoments, type Moment } from '../data/community'
import { api, apiConfigured, type ApiMoment } from '../services/api'
import { useReveal } from '../hooks/useReveal'
import { useLang } from '../i18n'

const fallbackImage =
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1400&q=80'

function fromApi(row: ApiMoment): Moment {
  return {
    id: row.id,
    author: row.author,
    from: 'community.fromApi',
    place: row.place,
    when: new Date(row.createdAt).toLocaleDateString('zh-CN'),
    weatherTruth: row.weatherTruth,
    joy: row.joy,
    tip: row.tip,
    likes: row.likes,
    replies: 0,
    image: fallbackImage,
    imageAlt: 'community.imageAlt',
    tripLink: '/trip/xian',
  }
}

export default function Community() {
  const { t } = useLang()
  const [items, setItems] = useState(seedMoments)
  const [source, setSource] = useState<'demo' | 'api'>('demo')
  const rootRef = useReveal([items.length])
  const [liked, setLiked] = useState<Record<string, boolean>>({})
  const [composerOpen, setComposerOpen] = useState(false)

  const totalJoy = useMemo(
    () => items.reduce((sum, item) => sum + item.likes, 0),
    [items],
  )

  useEffect(() => {
    if (!apiConfigured) return
    let cancelled = false

    api
      .listMoments()
      .then((rows) => {
        if (cancelled || !rows.length) return
        setItems(rows.map(fromApi))
        setSource('api')
      })
      .catch(() => {
        /* keep bundled demo data when the private API is unavailable */
      })

    return () => {
      cancelled = true
    }
  }, [])

  function toggleLike(id: string) {
    setLiked((prev) => {
      const next = !prev[id]
      setItems((list) =>
        list.map((item) =>
          item.id === id
            ? { ...item, likes: item.likes + (next ? 1 : -1) }
            : item,
        ),
      )
      return { ...prev, [id]: next }
    })
  }

  async function onShare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const joy = String(data.get('joy') || '').trim()
    const place = String(data.get('place') || '').trim()
    const weatherTruth = String(data.get('weatherTruth') || '').trim()
    const tip = String(data.get('tip') || '').trim()
    if (!joy || !place) return

    let published: Moment | null = null

    if (apiConfigured) {
      try {
        const row = await api.createMoment({
          author: 'community.me',
          place,
          joy,
          ...(weatherTruth ? { weatherTruth } : {}),
          ...(tip ? { tip } : {}),
        })
        published = { ...fromApi(row), from: 'community.justShared' }
        setSource('api')
      } catch {
        published = null
      }
    }

    if (!published) {
      published = {
        id: `local-${Date.now()}`,
        author: 'community.me',
        from: 'community.justShared',
        place,
        when: 'community.nowLabel',
        weatherTruth: weatherTruth || 'community.defaultTruth',
        joy,
        tip: tip || 'community.defaultTip',
        likes: 1,
        replies: 0,
        image: fallbackImage,
        imageAlt: 'community.imageAlt',
        tripLink: '/trip/xian',
      }
    }

    const fresh = published
    setItems((list) => [fresh, ...list])
    setLiked((prev) => ({ ...prev, [fresh.id]: true }))
    setComposerOpen(false)
    form.reset()
  }

  return (
    <div className="page page--plain" ref={rootRef}>
      <SiteChrome cta={{ to: '/plan', label: 'nav.plan' }} />

      <main className="community">
        <section className="community__intro reveal">
          <p className="eyebrow">
            {t('community.eyebrow')}
            <span className="pill" style={{ marginLeft: '0.6rem' }}>
              {source === 'api' ? t('trip.source.api') : t('trip.source.demo')}
            </span>
          </p>
          <h1>{t('community.title')}</h1>
          <p>
            {t('community.intro')
              .replace('{count}', String(items.length))
              .replace('{total}', String(totalJoy))}
          </p>
          <div className="community__actions">
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => setComposerOpen(true)}
            >
              {t('community.share')}
            </button>
            <Link className="btn btn--ghost-dark" to="/plan">
              {t('community.planFirst')}
            </Link>
          </div>
        </section>

        <section className="moment-feed" aria-label={t('community.feedLabel')}>
          {items.map((moment, index) => (
            <article
              className={`moment${moment.id.startsWith('local-') ? '' : ' reveal'}${index < 2 || moment.id.startsWith('local-') ? ' is-visible' : ''}`}
              key={moment.id}
              style={{ '--i': Math.min(index, 4) } as CSSProperties}
            >
              <div className="moment__media">
                <img src={moment.image} alt={t(moment.imageAlt)} loading="lazy" />
              </div>
              <div className="moment__body">
                <div className="moment__meta">
                  <strong>{t(moment.author)}</strong>
                  <span>
                    {t(moment.from)} · {moment.place}
                  </span>
                  <span>{t(moment.when)}</span>
                </div>
                {moment.weatherTruth && (
                  <p className="moment__truth">{t('community.moment.truth')}{t(moment.weatherTruth)}</p>
                )}
                <p className="moment__joy">{moment.joy}</p>
                {moment.tip && <p className="moment__tip">{t('community.moment.label')}{t(moment.tip)}</p>}
                <div className="moment__bar">
                  <button
                    type="button"
                    className={`moment__like${liked[moment.id] ? ' is-on' : ''}`}
                    onClick={() => toggleLike(moment.id)}
                    aria-pressed={Boolean(liked[moment.id])}
                  >
                    {t('community.resonate')} {moment.likes}
                  </button>
                  <span>{t('community.reply')} {moment.replies}</span>
                  {moment.tripLink && (
                    <Link className="text-link" to={moment.tripLink}>
                      {t('community.seeTrip')}
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>

      {composerOpen && (
        <div className="composer" role="dialog" aria-modal="true" aria-labelledby="composer-title">
          <form className="composer__panel" onSubmit={onShare}>
            <div className="composer__head">
              <h2 id="composer-title">{t('composer.title')}</h2>
              <button type="button" onClick={() => setComposerOpen(false)} aria-label={t('composer.close')}>
                {t('composer.close')}
              </button>
            </div>
            <p className="composer__hint">
              {t('composer.hint')}
            </p>
            <label className="field">
              <span>{t('composer.place')}</span>
              <input name="place" placeholder={t('composer.placeHint')} required />
            </label>
            <label className="field">
              <span>{t('composer.truth')}</span>
              <input name="weatherTruth" placeholder={t('composer.truthHint')} />
            </label>
            <label className="field">
              <span>{t('composer.joy')}</span>
              <textarea
                name="joy"
                rows={4}
                placeholder={t('composer.joyHint')}
                required
              />
            </label>
            <label className="field">
              <span>{t('composer.tip')}</span>
              <input name="tip" placeholder={t('composer.tipHint')} />
            </label>
            <button className="btn btn--primary btn--block" type="submit">
              {t('composer.submit')}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
