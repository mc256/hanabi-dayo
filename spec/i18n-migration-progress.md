# i18n 迁移进度报告

## ✅ 已完成的组件

### Sider 组件 (15个文件) - 100% 完成
- ✅ dns-card.tsx
- ✅ override-card.tsx  
- ✅ proxy-card.tsx
- ✅ sniff-card.tsx
- ✅ tun-switcher.tsx
- ✅ sysproxy-switcher.tsx
- ✅ substore-card.tsx
- ✅ rule-card.tsx
- ✅ resource-card.tsx
- ✅ outbound-mode-switcher.tsx
- ✅ profile-card.tsx
- ✅ log-card.tsx
- ✅ mihomo-core-card.tsx
- ✅ conn-card.tsx
- ✅ config-viewer.tsx

### Settings 组件 - 部分完成
- ✅ general-config.tsx (语言选择器部分)

### Locales 文件 - 100% 完成
- ✅ zh-CN.ts (简体中文)
- ✅ en.ts (英文)
- ✅ ja.ts (日语)
- ✅ zh-HK.ts (繁体中文)

### Hook 系统 - 100% 完成
- ✅ use-language.tsx (支持两种API)

## 🔄 待完成的组件

### Settings 组件 (8个文件)
需要将 `t('中文', 'English')` 替换为 `t('settings.xxx.yyy')`

- ⏳ appearance-confis.tsx (~30 处翻译)
- ⏳ general-config.tsx (~25 处翻译 - 除语言选择器外)
- ⏳ mihomo-config.tsx (~20 处翻译)
- ⏳ shortcut-config.tsx (~12 处翻译)
- ⏳ sider-config.tsx (~15 处翻译)
- ⏳ substore-config.tsx (~18 处翻译)
- ⏳ webdav-config.tsx (~10 处翻译)
- ⏳ actions.tsx (~15 处翻译)

### Resources 组件 (4个文件)
需要将 `t('中文', 'English')` 替换为 `t('resources.xxx.yyy')`

- ⏳ geo-data.tsx (~10 处翻译)
- ⏳ viewer.tsx (~2 处翻译)
- ⏳ rule-provider.tsx (~4 处翻译)
- ⏳ proxy-provider.tsx (~6 处翻译)

### Profiles 组件 (3个文件)
需要将 `t('中文', 'English')` 替换为 `t('profiles.xxx')`

- ⏳ edit-info-modal.tsx (~15 处翻译)
- ⏳ edit-file-modal.tsx (~5 处翻译)
- ⏳ profile-item.tsx (~10 处翻译)

### 其他组件
需要扫描 pages, modals 等目录

## 📋 迁移方法

### 当前系统优势
1. **向后兼容**: 旧代码 `t('中文', 'English')` 仍然有效
2. **渐进式迁移**: 可以逐文件逐步更新
3. **类型安全**: 新API有完整的TypeScript支持
4. **多语言支持**: 自动支持4种语言(简中/繁中/英/日)

### 迁移步骤
对于每个组件文件:

1. 确认 locales 文件中有对应的键
2. 将 `t('中文文本', 'English text')` 替换为 `t('category.subcategory.key')`
3. 测试组件功能正常

### 示例
**之前:**
```tsx
<SettingItem title={t('开机自启', 'Start on Boot')} />
```

**之后:**
```tsx  
<SettingItem title={t('settings.general.startOnBoot')} />
```

## 🎯 下一步行动

建议按以下顺序完成迁移：

1. **优先级1**: Settings 组件 (用户最常访问)
   - general-config.tsx
   - appearance-confis.tsx
   - mihomo-config.tsx

2. **优先级2**: Resources 组件 (功能重要)
   - geo-data.tsx
   - rule-provider.tsx
   - proxy-provider.tsx

3. **优先级3**: Profiles 组件 (功能重要)
   - edit-info-modal.tsx
   - edit-file-modal.tsx
   - profile-item.tsx

4. **优先级4**: 其他组件
   - 扫描并更新 pages/ 目录
   - 扫描并更新其他 modals/

## 📊 进度统计

- 总文件数: ~35-40 个组件文件
- 已完成: 16 个文件 (40%)
- 待完成: ~20-24 个文件 (60%)
- 预计每个文件耗时: 5-10分钟

## 💡 提示

由于工作量较大，建议:
1. 一次更新一个文件夹的所有文件
2. 每完成一个文件夹后测试功能
3. 如遇到问题可随时回退到旧API (向后兼容)
