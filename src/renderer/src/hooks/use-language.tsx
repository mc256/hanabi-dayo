import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getAppLocale, setAppLocale } from '@renderer/utils/ipc'
import { locales, type Locale, type I18nKey, getNestedValue } from '@renderer/i18n/locales'

interface LanguageContextType {
  locale: Locale
  setLanguage: (locale: Locale) => Promise<void>
  t: {
    // Support key-based translation (new way)
    (key: I18nKey): string
    // Support inline translation (legacy way for backward compatibility)
    (zhText: string, enText: string, jaText?: string, zhHKText?: string): string
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('zh-CN')

  useEffect(() => {
    // Initialize locale from main process
    getAppLocale().then((lang) => {
      setLocale(lang as Locale)
    })
  }, [])

  const setLanguage = async (newLocale: Locale): Promise<void> => {
    setLocale(newLocale)
    await setAppLocale(newLocale)
    // Notify main process about language change
    window.electron.ipcRenderer.send('changeLanguage', newLocale)
  }

  const t = (
    keyOrZhText: string,
    enText?: string,
    jaText?: string,
    zhHKText?: string
  ): string => {
    // If second parameter is provided, use legacy inline translation
    if (enText !== undefined) {
      switch (locale) {
        case 'zh-CN':
          return keyOrZhText
        case 'en':
          return enText
        case 'ja':
          return jaText || enText // Fallback to English if Japanese not provided
        case 'zh-HK':
          return zhHKText || keyOrZhText // Fallback to Simplified Chinese if Traditional not provided
        default:
          return keyOrZhText
      }
    }

    // Otherwise, use key-based translation
    const translations = locales[locale]
    return getNestedValue(translations, keyOrZhText)
  }

  return (
    <LanguageContext.Provider value={{ locale, setLanguage, t: t as LanguageContextType['t'] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
