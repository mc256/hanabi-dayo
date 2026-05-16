# 国际化 (i18n) 使用指南

## 概述

本项目现在支持四种语言：
- 简体中文 (zh-CN)
- 繁体中文 (zh-HK) 
- English (en)
- 日本語 (ja)

## 使用方法

### 方式一：键值对方式（推荐用于新代码）

1. 在 `src/renderer/src/i18n/locales/` 目录下的语言文件中添加翻译键：

```typescript
// zh-CN.ts
export const zhCN = {
  common: {
    save: '保存',
    cancel: '取消',
  },
  settings: {
    general: {
      language: '语言 / Language',
    }
  }
}

// en.ts
export const en = {
  common: {
    save: 'Save',
    cancel: 'Cancel',
  },
  settings: {
    general: {
      language: 'Language / 语言',
    }
  }
}
```

2. 在组件中使用：

```tsx
import { useLanguage } from '@renderer/hooks/use-language'

function MyComponent() {
  const { t } = useLanguage()
  
  return (
    <Button>{t('common.save')}</Button>
    <h1>{t('settings.general.language')}</h1>
  )
}
```

**优点：**
- 所有翻译集中管理
- 易于维护和查找
- TypeScript 类型提示
- 支持所有语言，包括日语和繁体中文

### 方式二：内联方式（用于已有代码兼容）

为了向后兼容，仍然支持旧的内联方式：

```tsx
import { useLanguage } from '@renderer/hooks/use-language'

function MyComponent() {
  const { t } = useLanguage()
  
  // 两个参数（简体中文、英文）
  return <Button>{t('保存', 'Save')}</Button>
  
  // 四个参数（简体中文、英文、日语、繁体中文）
  return <Button>{t('保存', 'Save', '保存', '儲存')}</Button>
}
```

**自动回退机制：**
- 如果没有提供日语翻译，会回退到英文
- 如果没有提供繁体中文翻译，会回退到简体中文

## 迁移指南

### 将现有代码迁移到键值对方式

1. 找到所有 `t('中文', 'English')` 的调用
2. 在 locales 文件中添加对应的翻译键
3. 更新组件代码使用新的键名

**示例：**

之前：
```tsx
<SettingItem title={t('语言 / Language', 'Language / 语言')} />
```

之后：
```tsx
// 1. 在 zh-CN.ts 中添加
settings: {
  general: {
    language: '语言 / Language'
  }
}

// 2. 在 en.ts 中添加
settings: {
  general: {
    language: 'Language / 语言'
  }
}

// 3. 更新组件
<SettingItem title={t('settings.general.language')} />
```

## 语言文件结构

```
src/renderer/src/i18n/locales/
├── index.ts         # 导出所有语言和辅助函数
├── zh-CN.ts         # 简体中文翻译
├── en.ts            # 英文翻译
├── ja.ts            # 日语翻译
└── zh-HK.ts         # 繁体中文翻译
```

## 添加新的翻译

1. 在 `zh-CN.ts` 中添加新的键值对
2. 在其他语言文件（`en.ts`, `ja.ts`, `zh-HK.ts`）中添加对应的翻译
3. 在组件中使用 `t('your.new.key')`

## 注意事项

- 键名使用点号分隔，支持嵌套结构
- 保持所有语言文件的结构一致
- 优先使用键值对方式，内联方式仅用于兼容
- 如果翻译缺失，会显示键名本身
