import React, { useEffect, useState, useRef } from 'react'
import SettingCard from '../base/base-setting-card'
import SettingItem from '../base/base-setting-item'
import { Button, Select, SelectItem, Switch, Tab, Tabs, Tooltip } from '@heroui/react'
import { BiSolidFileImport } from 'react-icons/bi'
import {
  applyTheme,
  closeFloatingWindow,
  closeTrayIcon,
  fetchThemes,
  getFilePath,
  importThemes,
  relaunchApp,
  readImageFileDataURL,
  resolveThemes,
  setDockVisible,
  showFloatingWindow,
  showTrayIcon,
  startMonitor,
  updateTrayIcon,
  writeTheme
} from '@renderer/utils/ipc'
import { useAppConfig } from '@renderer/hooks/use-app-config'
import { useLanguage } from '@renderer/hooks/use-language'
import { platform } from '@renderer/utils/init'
import { useTheme } from 'next-themes'
import { IoIosHelpCircle, IoMdCloudDownload } from 'react-icons/io'
import { MdEditDocument } from 'react-icons/md'
import CSSEditorModal from './css-editor-modal'
import TrayIconCropModal from './tray-icon-crop-modal'
import { notify } from '@renderer/utils/notification'

const rasterTrayIconPattern = /\.(png|jpe?g|webp)$/i

const AppearanceConfig: React.FC = () => {
  const { t } = useLanguage()
  const { appConfig, patchAppConfig } = useAppConfig()
  const [customThemes, setCustomThemes] = useState<{ key: string; label: string }[]>()
  const [openCSSEditor, setOpenCSSEditor] = useState(false)
  const [trayIconCropDataURL, setTrayIconCropDataURL] = useState('')
  const [fetching, setFetching] = useState(false)
  const { setTheme } = useTheme()
  const {
    useDockIcon = true,
    showTraffic = false,
    proxyInTray = true,
    trayProxyDelayLayout = 'auto',
    customTrayIcon = '',
    disableTray = false,
    showFloatingWindow: showFloating = false,
    spinFloatingIcon = true,
    useWindowFrame = false,
    showUpdateButtonAfterNotification = true,
    customTheme = 'default.css',
    appTheme = 'system'
  } = appConfig || {}
  const [localShowFloating, setLocalShowFloating] = useState(showFloating)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    resolveThemes().then((themes) => {
      setCustomThemes(themes)
    })
  }, [])

  useEffect(() => {
    return (): void => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <>
      {openCSSEditor && (
        <CSSEditorModal
          theme={customTheme}
          onCancel={() => setOpenCSSEditor(false)}
          onConfirm={async (css: string) => {
            await writeTheme(customTheme, css)
            await applyTheme(customTheme)
            setOpenCSSEditor(false)
          }}
        />
      )}
      {trayIconCropDataURL && (
        <TrayIconCropModal
          imageDataURL={trayIconCropDataURL}
          onCancel={() => setTrayIconCropDataURL('')}
          onConfirm={async (dataURL) => {
            await patchAppConfig({ customTrayIcon: dataURL })
            setTrayIconCropDataURL('')
            await updateTrayIcon()
          }}
        />
      )}
      <SettingCard header={t('外观设置', 'Appearance')}>
        <SettingItem
          compatKey="legacy"
          title={t('显示悬浮窗', 'Show floating window')}
          actions={
            <Tooltip
              content={t(
                '未禁用GPU加速的情况下，悬浮窗可能会导致应用崩溃',
                'Without disabling GPU acceleration, the floating window may crash the app'
              )}
            >
              <Button isIconOnly size="sm" variant="light">
                <IoIosHelpCircle className="text-lg" />
              </Button>
            </Tooltip>
          }
          divider
        >
          <Switch
            size="sm"
            isSelected={localShowFloating}
            onValueChange={async (v) => {
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
                timeoutRef.current = null
              }

              setLocalShowFloating(v)
              if (v) {
                await showFloatingWindow()
                timeoutRef.current = setTimeout(async () => {
                  await patchAppConfig({ showFloatingWindow: v })
                  timeoutRef.current = null
                }, 1000)
              } else {
                patchAppConfig({ showFloatingWindow: v })
                await closeFloatingWindow()
              }
            }}
          />
        </SettingItem>
        {localShowFloating && (
          <>
            <SettingItem
              compatKey="legacy"
              title={t('根据网速旋转悬浮窗图标', 'Spin floating icon by network speed')}
              divider
            >
              <Switch
                size="sm"
                isSelected={spinFloatingIcon}
                onValueChange={async (v) => {
                  await patchAppConfig({ spinFloatingIcon: v })
                  window.electron.ipcRenderer.send('updateFloatingWindow')
                }}
              />
            </SettingItem>
            <SettingItem
              compatKey="legacy"
              title={t('禁用托盘图标', 'Disable tray icon')}
              divider
            >
              <Switch
                size="sm"
                isSelected={disableTray}
                onValueChange={async (v) => {
                  await patchAppConfig({ disableTray: v })
                  if (v) {
                    closeTrayIcon()
                  } else {
                    showTrayIcon()
                  }
                }}
              />
            </SettingItem>
          </>
        )}
        {!disableTray && (
          <SettingItem
            compatKey="legacy"
            title={t('自定义托盘图标', 'Custom tray icon')}
            actions={
              <Tooltip
                content={t(
                  '设置后托盘将始终使用此图标；PNG、JPG、WebP 会先裁剪后保存。',
                  'Once set, the tray always uses this icon; PNG, JPG and WebP are cropped before saving.'
                )}
              >
                <Button isIconOnly size="sm" variant="light">
                  <IoIosHelpCircle className="text-lg" />
                </Button>
              </Tooltip>
            }
            divider
          >
            <div className="flex min-w-0 max-w-[65%] items-center justify-end gap-2">
              {customTrayIcon && (
                <span className="truncate text-xs text-default-500">
                  {customTrayIcon.startsWith('data:image/')
                    ? t('已储存裁剪图标', 'Saved cropped icon')
                    : customTrayIcon}
                </span>
              )}
              <Button
                size="sm"
                variant="flat"
                onPress={async () => {
                  const files = await getFilePath(
                    ['png', 'jpg', 'jpeg', 'webp', 'ico', 'icns'],
                    t('选择托盘图标', 'Select tray icon'),
                    t('托盘图标', 'Tray icon')
                  )
                  if (!files?.[0]) return
                  if (rasterTrayIconPattern.test(files[0])) {
                    setTrayIconCropDataURL(await readImageFileDataURL(files[0]))
                    return
                  }
                  await patchAppConfig({ customTrayIcon: files[0] })
                  await updateTrayIcon()
                }}
              >
                {customTrayIcon ? t('更换图标', 'Change icon') : t('选择图标', 'Select icon')}
              </Button>
              {customTrayIcon && (
                <Button
                  size="sm"
                  variant="light"
                  onPress={async () => {
                    await patchAppConfig({ customTrayIcon: '' })
                    await updateTrayIcon()
                  }}
                >
                  {t('恢复默认', 'Restore default')}
                </Button>
              )}
            </div>
          </SettingItem>
        )}
        {platform !== 'linux' && (
          <>
            <SettingItem
              compatKey="legacy"
              title={t('托盘菜单显示节点信息', 'Show node info in tray menu')}
              divider
            >
              <Switch
                size="sm"
                isSelected={proxyInTray}
                onValueChange={async (v) => {
                  await patchAppConfig({ proxyInTray: v })
                }}
              />
            </SettingItem>
            {proxyInTray && (
              <SettingItem
                compatKey="legacy"
                title={t('托盘菜单节点延迟显示方式', 'Tray menu node delay layout')}
                divider
              >
                <Tabs
                  size="sm"
                  color="primary"
                  selectedKey={trayProxyDelayLayout}
                  onSelectionChange={async (v) => {
                    await patchAppConfig({
                      trayProxyDelayLayout: v as 'same-line' | 'new-line'
                    })
                    window.electron.ipcRenderer.send('updateTrayMenu')
                  }}
                >
                  <Tab key="same-line" title={t('同一行', 'Same line')} />
                  <Tab key="new-line" title={t('换行', 'New line')} />
                </Tabs>
              </SettingItem>
            )}
            <SettingItem
              compatKey="legacy"
              title={
                platform === 'win32'
                  ? t('任务栏显示网速信息', 'Show network speed in taskbar')
                  : t('状态栏显示网速信息', 'Show network speed in status bar')
              }
              divider
            >
              <Switch
                size="sm"
                isSelected={showTraffic}
                onValueChange={async (v) => {
                  await patchAppConfig({ showTraffic: v })
                  await startMonitor()
                }}
              />
            </SettingItem>
          </>
        )}
        {platform === 'darwin' && (
          <>
            <SettingItem
              compatKey="legacy"
              title={t('显示 Dock 图标', 'Show Dock icon')}
              divider
            >
              <Switch
                size="sm"
                isSelected={useDockIcon}
                onValueChange={async (v) => {
                  await patchAppConfig({ useDockIcon: v })
                  setDockVisible(v)
                }}
              />
            </SettingItem>
          </>
        )}
        <SettingItem
          compatKey="legacy"
          title={t('使用系统标题栏', 'Use system title bar')}
          divider
        >
          <Switch
            size="sm"
            isSelected={useWindowFrame}
            onValueChange={async (v) => {
              await patchAppConfig({ useWindowFrame: v })
              await relaunchApp()
            }}
          />
        </SettingItem>
        <SettingItem compatKey="legacy" title={t('更新按钮', 'Update button')} divider>
          <Switch
            size="sm"
            isSelected={showUpdateButtonAfterNotification}
            onValueChange={(v) => {
              patchAppConfig({ showUpdateButtonAfterNotification: v })
            }}
          />
        </SettingItem>
        <SettingItem compatKey="legacy" title={t('背景色', 'Background color')} divider>
          <Tabs
            size="sm"
            color="primary"
            selectedKey={appTheme}
            onSelectionChange={(key) => {
              setTheme(key.toString())
              patchAppConfig({ appTheme: key as AppTheme })
            }}
          >
            <Tab key="system" title={t('自动', 'Auto')} />
            <Tab key="dark" title={t('深色', 'Dark')} />
            <Tab key="light" title={t('浅色', 'Light')} />
          </Tabs>
        </SettingItem>
        <SettingItem
          compatKey="legacy"
          title={t('主题', 'Theme')}
          actions={
            <>
              <Button
                size="sm"
                isLoading={fetching}
                isIconOnly
                variant="light"
                onPress={async () => {
                  setFetching(true)
                  try {
                    await fetchThemes()
                    setCustomThemes(await resolveThemes())
                  } catch (e) {
                    notify(e, { variant: 'danger' })
                  } finally {
                    setFetching(false)
                  }
                }}
              >
                <IoMdCloudDownload className="text-lg" />
              </Button>
              <Button
                size="sm"
                isIconOnly
                variant="light"
                onPress={async () => {
                  const files = await getFilePath(['css'])
                  if (!files) return
                  try {
                    await importThemes(files)
                    setCustomThemes(await resolveThemes())
                  } catch (e) {
                    notify(e, { variant: 'danger' })
                  }
                }}
              >
                <BiSolidFileImport className="text-lg" />
              </Button>
              <Button
                size="sm"
                isIconOnly
                variant="light"
                onPress={async () => {
                  setOpenCSSEditor(true)
                }}
              >
                <MdEditDocument className="text-lg" />
              </Button>
            </>
          }
        >
          {customThemes && (
            <Select
              aria-label={t('自定义主题', 'Custom theme')}
              classNames={{ trigger: 'data-[hover=true]:bg-default-200' }}
              className="w-[60%]"
              size="sm"
              selectedKeys={new Set([customTheme])}
              disallowEmptySelection={true}
              onSelectionChange={async (v) => {
                try {
                  await patchAppConfig({ customTheme: v.currentKey as string })
                } catch (e) {
                  notify(e, { variant: 'danger' })
                }
              }}
            >
              {customThemes.map((theme) => (
                <SelectItem key={theme.key}>{theme.label}</SelectItem>
              ))}
            </Select>
          )}
        </SettingItem>
      </SettingCard>
    </>
  )
}

export default AppearanceConfig
