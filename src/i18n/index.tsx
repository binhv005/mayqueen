import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { vi } from './vi'
import { en } from './en'

export type Lang = 'vi' | 'en'
export type Localized = { vi: string; en: string }
export type Key = keyof typeof vi

const dicts: Record<Lang, Record<Key, string>> = { vi, en }
const STORAGE_KEY = 'mq_lang'

interface I18nValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: Key, vars?: Record<string, string | number>) => string
  /** Pick the current-language string from a bilingual field */
  tr: (v: Localized) => string
  money: (n: number) => string
  date: (iso: string) => string
}

const I18nContext = createContext<I18nValue | null>(null)

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'vi' || saved === 'en') return saved
  } catch {
    /* storage unavailable */
  }
  return 'vi'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* ignore */
    }
  }, [])

  const value = useMemo<I18nValue>(() => {
    const locale = lang === 'vi' ? 'vi-VN' : 'en-US'
    return {
      lang,
      setLang,
      t: (key, vars) => {
        let s = dicts[lang][key] ?? key
        if (vars) for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, String(v))
        return s
      },
      tr: (v) => v[lang],
      money: (n) => new Intl.NumberFormat(locale, { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(n),
      date: (iso) => new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(new Date(iso)),
    }
  }, [lang, setLang])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider')
  return ctx
}
