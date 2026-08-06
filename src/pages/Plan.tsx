import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api, apiConfigured } from '../services/api'

const interests = ['博物馆', '自然风光', '美食', '亲子友好', '少走路', '夜景'] as const

export default function Plan() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string[]>(['博物馆', '亲子友好', '美食'])
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
      <header className="topnav topnav--solid">
        <Link to="/" className="brand">
          <span className="brand__mark">真程</span>
          <span className="brand__en">Real Travel</span>
        </Link>
        <nav className="topnav__links">
          <Link to="/community">足迹广场</Link>
          <Link className="text-link" to="/trip/xian">
            先看示例
          </Link>
        </nav>
      </header>

      <main className="plan">
        <div className="plan__intro">
          <p className="eyebrow">新建行程</p>
          <h1>告诉我们约束，剩下的交给实况与 AI。</h1>
          <p>
            先收集出发地、日期和同行人。演示阶段会生成「深圳 → 西安家庭游」完整路书，并展示天气 /
            交通如何影响建议。
          </p>
        </div>

        <form className="plan-form" onSubmit={onSubmit}>
          <label className="field">
            <span>出发地</span>
            <input name="origin" defaultValue="深圳" required />
          </label>
          <label className="field">
            <span>目的地</span>
            <input name="destination" defaultValue="西安" required />
          </label>
          <div className="field-row">
            <label className="field">
              <span>出发日期</span>
              <input name="start" type="date" defaultValue="2026-08-11" required />
            </label>
            <label className="field">
              <span>返回日期</span>
              <input name="end" type="date" defaultValue="2026-08-15" required />
            </label>
          </div>
          <label className="field">
            <span>同行人</span>
            <input name="party" defaultValue="两大一小（12岁）" required />
          </label>
          <label className="field">
            <span>返程落脚点（可选）</span>
            <input name="home" defaultValue="宿松东 / 当晚到家" />
          </label>

          <fieldset className="field">
            <legend>偏好</legend>
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
            {submitting ? '正在结合天气与交通生成…' : '生成动态行程'}
          </button>
        </form>
      </main>
    </div>
  )
}
