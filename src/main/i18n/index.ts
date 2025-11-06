import { en, TranslationKeys } from './locales/en'
import { zhCN } from './locales/zh-CN'
import { app } from 'electron'

type Locale = 'en' | 'zh-CN'

const translations = {
  en,
  'zh-CN': zhCN
}

let currentLocale: Locale = 'zh-CN'

/**
 * Initialize i18n with the system locale or user preference
 */
export function initI18n(preferredLocale?: Locale): void {
  if (preferredLocale && preferredLocale in translations) {
    currentLocale = preferredLocale
    return
  }

  const systemLocale = app.getLocale()
  
  // Map system locale to supported locale
  if (systemLocale.startsWith('zh')) {
    currentLocale = 'zh-CN'
  } else {
    currentLocale = 'en'
  }
}

/**
 * Get the current locale
 */
export function getLocale(): Locale {
  return currentLocale
}

/**
 * Set the locale
 */
export function setLocale(locale: Locale): void {
  if (locale in translations) {
    currentLocale = locale
  }
}

/**
 * Translate a key to the current locale
 */
export function t(key: TranslationKeys, params?: Record<string, string | number>): string {
  let text: string = translations[currentLocale][key] || translations.en[key] || key
  
  // Replace parameters if provided
  if (params) {
    Object.keys(params).forEach((param) => {
      text = text.replace(new RegExp(`\\{${param}\\}`, 'g'), String(params[param]))
    })
  }
  
  return text
}

// Export everything
export type { TranslationKeys, Locale }
