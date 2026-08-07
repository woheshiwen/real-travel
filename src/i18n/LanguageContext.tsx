import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { langs, translate, translateWith, type Lang } from './translations'

const STORAGE_KEY = 'real-travel-lang'

function detectLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && (langs as readonly string[]).includes(stored)) return stored as Lang
  } catch { /* localStorage unavailable */ }

  // Detect browser language; prefer non-Chinese for default=en
  try {
    const nav = navigator.language.toLowerCase()
    if (nav.startsWith('zh')) return 'zh'
    if (nav.startsWith('fr')) return 'fr'
    if (nav.startsWith('ja')) return 'ja'
    if (nav.startsWith('ko')) return 'ko'
  } catch { /* navigator unavailable */ }

  return 'en'
}

type Ctx = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
  tp: (key: string, params: Record<string, string | number>) => string
}

const C = createContext<Ctx | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang)

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    document.documentElement.lang = l
    try { localStorage.setItem(STORAGE_KEY, l) } catch { /* */ }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const t = useCallback((key: string) => translate(key, lang), [lang])
  const tp = useCallback(
    (key: string, params: Record<string, string | number>) => translateWith(key, lang, params),
    [lang],
  )

  return <C.Provider value={{ lang, setLang, t, tp }}>{children}</C.Provider>
}

export function useLang() {
  const ctx = useContext(C)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
