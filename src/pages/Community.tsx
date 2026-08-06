import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { moments as seedMoments, type Moment } from '../data/community'
import { useReveal } from '../hooks/useReveal'

export default function Community() {
  const rootRef = useReveal()
  const [items, setItems] = useState(seedMoments)
  const [liked, setLiked] = useState<Record<string, boolean>>({})
  const [composerOpen, setComposerOpen] = useState(false)

  const totalJoy = useMemo(
    () => items.reduce((sum, item) => sum + item.likes, 0),
    [items],
  )

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

  function onShare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const joy = String(data.get('joy') || '').trim()
    const place = String(data.get('place') || '').trim()
    const weatherTruth = String(data.get('weatherTruth') || '').trim()
    if (!joy || !place) return

    const fresh: Moment = {
      id: `local-${Date.now()}`,
      author: '我',
      from: '刚刚分享',
      place,
      when: '此刻',
      weatherTruth: weatherTruth || '按自己核对过的实况出发',
      joy,
      tip: String(data.get('tip') || '').trim() || '把真实感受留给后来的同行人。',
      likes: 1,
      replies: 0,
      image:
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1400&q=80',
      imageAlt: '旅途公路与远山',
      tripLink: '/trip/xian',
    }

    setItems((list) => [fresh, ...list])
    setLiked((prev) => ({ ...prev, [fresh.id]: true }))
    setComposerOpen(false)
    event.currentTarget.reset()
  }

  return (
    <div className="page page--plain" ref={rootRef}>
      <header className="topnav topnav--solid">
        <Link to="/" className="brand">
          <span className="brand__mark">真程</span>
          <span className="brand__en">Real Travel</span>
        </Link>
        <nav className="topnav__links">
          <Link to="/trip/xian">示例行程</Link>
          <Link to="/plan">规划</Link>
          <button
            type="button"
            className="btn btn--small btn--primary"
            onClick={() => setComposerOpen(true)}
          >
            分享快乐
          </button>
        </nav>
      </header>

      <main className="community">
        <section className="community__intro reveal">
          <p className="eyebrow">足迹广场</p>
          <h1>把路上的快乐，留给下一个出发的人。</h1>
          <p>
            真程不只生成行程，也希望成为值得信任的交互平台：用实况做决策，用亲历分享传递安心与喜悦。
            目前已有 {items.length} 段足迹，累计 {totalJoy} 次共鸣。
          </p>
          <div className="community__actions">
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => setComposerOpen(true)}
            >
              写下我的快乐
            </button>
            <Link className="btn btn--ghost-dark" to="/plan">
              先生成一趟行程
            </Link>
          </div>
        </section>

        <section className="moment-feed" aria-label="足迹动态">
          {items.map((moment) => (
            <article className="moment reveal" key={moment.id}>
              <div className="moment__media">
                <img src={moment.image} alt={moment.imageAlt} loading="lazy" />
              </div>
              <div className="moment__body">
                <div className="moment__meta">
                  <strong>{moment.author}</strong>
                  <span>
                    {moment.from} · {moment.place}
                  </span>
                  <span>{moment.when}</span>
                </div>
                <p className="moment__truth">{moment.weatherTruth}</p>
                <p className="moment__joy">{moment.joy}</p>
                <p className="moment__tip">可带走：{moment.tip}</p>
                <div className="moment__bar">
                  <button
                    type="button"
                    className={`moment__like${liked[moment.id] ? ' is-on' : ''}`}
                    onClick={() => toggleLike(moment.id)}
                    aria-pressed={Boolean(liked[moment.id])}
                  >
                    共鸣 {moment.likes}
                  </button>
                  <span>回应 {moment.replies}</span>
                  {moment.tripLink && (
                    <Link className="text-link" to={moment.tripLink}>
                      查看关联行程
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
              <h2 id="composer-title">分享一段真实的快乐</h2>
              <button type="button" onClick={() => setComposerOpen(false)} aria-label="关闭">
                关闭
              </button>
            </div>
            <p className="composer__hint">
              欢迎分享亲历感受。请尽量附上你核对过的天气/交通判断，帮助后来者建立信任。
            </p>
            <label className="field">
              <span>地点</span>
              <input name="place" placeholder="例如：西安 · 大唐不夜城" required />
            </label>
            <label className="field">
              <span>实况判断（可选）</span>
              <input name="weatherTruth" placeholder="例如：预报小雨，夜景仍值得去" />
            </label>
            <label className="field">
              <span>我想分享的快乐</span>
              <textarea
                name="joy"
                rows={4}
                placeholder="那一刻发生了什么？为什么值得留下？"
                required
              />
            </label>
            <label className="field">
              <span>给后来者的一句提示（可选）</span>
              <input name="tip" placeholder="例如：天黑后再去，雨中灯光更美" />
            </label>
            <button className="btn btn--primary btn--block" type="submit">
              发布到足迹广场
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
