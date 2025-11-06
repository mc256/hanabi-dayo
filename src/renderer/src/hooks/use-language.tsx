import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getAppLocale, setAppLocale } from '@renderer/utils/ipc'

type Locale = 'en' | 'zh-CN'

interface LanguageContextType {
  locale: Locale
  setLanguage: (locale: Locale) => Promise<void>
  t: (zhText: string, enText: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('zh-CN')

  useEffect(() => {
    // Initialize locale from main process
    getAppLocale().then((lang) => {
      setLocale(lang)
    })
  }, [])

  const setLanguage = async (newLocale: Locale): Promise<void> => {
    setLocale(newLocale)
    await setAppLocale(newLocale)
    // Notify main process about language change
    window.electron.ipcRenderer.send('changeLanguage', newLocale)
  }

  const t = (zhText: string, enText: string): string => {
    return locale === 'zh-CN' ? zhText : enText
  }

  return (
    <LanguageContext.Provider value={{ locale, setLanguage, t }}>
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
