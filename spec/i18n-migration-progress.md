# i18n Port Progress (post-upstream-merge)

After the upstream sync (PR #4), upstream's Chinese-only UI replaced most of
the fork's previously-i18n'd renderer. This tracks re-applying the bilingual
i18n system across the merged UI.

## Approach

- Use the inline form: `t('中文', 'English')` via `const { t } = useLanguage()`
  (`@renderer/hooks/use-language`). No locale-file edits required.
- Per file: add the `useLanguage` import + `const { t } = useLanguage()`, then
  wrap every hardcoded Chinese UI string. Keep upstream's `compatKey` props.
- Verify with `pnpm typecheck` after each batch.

## Scope

- ~66 renderer `.tsx` files contain hardcoded Chinese (~871 lines).
- 13 files already use `useLanguage` (fork-original i18n that survived).

## Done

- [x] `components/settings/appearance-confis.tsx` — 26 strings

## Remaining (prioritized — highest-traffic first)

### Settings (high visibility)
- [ ] `components/settings/general-config.tsx`
- [ ] `components/settings/actions.tsx`
- [ ] `components/settings/advanced-settings.tsx`
- [ ] `components/settings/sider-config.tsx`
- [ ] `components/settings/webdav-config.tsx`
- [ ] `components/settings/shortcut-config.tsx`
- [ ] `pages/settings.tsx`

### Pages
- [ ] `pages/mihomo.tsx`, `pages/dns.tsx`, `pages/syspeoxy.tsx`, `pages/profiles.tsx`,
      `pages/connections.tsx`, `pages/rules.tsx`, `pages/proxies.tsx`,
      `pages/override.tsx`, `pages/sniffer.tsx`, `pages/tun.tsx`, `pages/logs.tsx`

### Components
- [ ] `components/proxies/proxy-setting-drawer.tsx`
- [ ] `components/connections/connection-detail-modal.tsx`
- [ ] `components/mihomo/{permission-modal,service-modal,port-setting,log-setting}.tsx`
- [ ] `components/dns/advanced-dns-setting.tsx`
- [ ] `components/profiles/{edit-info-modal,edit-file-modal,profile-setting-drawer}.tsx`
- [ ] `components/base/base-editor.tsx` and remaining `base/` components
- [ ] remaining `resources/`, `sider/`, `updater/` components

Run `grep -rlP '[\x{4e00}-\x{9fff}]' --include='*.tsx' src/renderer/src` for the
live remaining list.
