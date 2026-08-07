import { useEffect, useId, useRef, useState } from 'react'
import { LOCALES, useI18n, type Locale } from '../i18n'

export default function LanguageSwitcher() {
  const { locale, setLocale, t, locales } = useI18n()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const listId = useId()
  const current = locales.find((item) => item.id === locale) ?? LOCALES[0]

  useEffect(() => {
    if (!open) return
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  function choose(next: Locale) {
    setLocale(next)
    setOpen(false)
  }

  return (
    <div className={`lang-switch${open ? ' is-open' : ''}`} ref={rootRef}>
      <button
        type="button"
        className="lang-switch__btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={t.langMenu}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="lang-switch__short">{current.short}</span>
        <span className="lang-switch__chev" aria-hidden="true" />
      </button>
      {open && (
        <ul className="lang-switch__menu" role="listbox" id={listId} aria-label={t.langMenu}>
          {locales.map((item) => (
            <li key={item.id} role="option" aria-selected={item.id === locale}>
              <button
                type="button"
                className={item.id === locale ? 'is-active' : undefined}
                onClick={() => choose(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
