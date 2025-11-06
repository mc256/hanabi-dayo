import { zhCN } from './zh-CN'
import { en } from './en'
import { ja } from './ja'
import { zhHK } from './zh-HK'

export type Locale = 'zh-CN' | 'en' | 'ja' | 'zh-HK'

export const locales = {
  'zh-CN': zhCN,
  en: en,
  ja: ja,
  'zh-HK': zhHK,
} as const

export type TranslationKey = keyof typeof zhCN
export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`
}[keyof ObjectType & (string | number)]

export type I18nKey = NestedKeyOf<typeof zhCN>

// Helper function to get nested value
export function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.')
  let current: unknown = obj

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key]
    } else {
      return path // Return the key itself if not found
    }
  }

  return typeof current === 'string' ? current : path
}
