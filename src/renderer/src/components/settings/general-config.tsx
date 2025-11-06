import React, { useState } from 'react'
import SettingCard from '../base/base-setting-card'
import SettingItem from '../base/base-setting-item'
import { Button, Input, Select, SelectItem, Switch, Tab, Tabs, Tooltip } from '@heroui/react'
import { BiCopy } from 'react-icons/bi'
import useSWR from 'swr'
import {
  checkAutoRun,
  copyEnv,
  disableAutoRun,
  enableAutoRun,
  relaunchApp,
  startNetworkDetection,
  stopNetworkDetection
} from '@renderer/utils/ipc'
import { useAppConfig } from '@renderer/hooks/use-app-config'
import { useLanguage } from '@renderer/hooks/use-language'
import { platform } from '@renderer/utils/init'
import { IoIosHelpCircle } from 'react-icons/io'
import EditableList from '../base/base-list-editor'
import ConfirmModal from '../base/base-confirm'

const GeneralConfig: React.FC = () => {
  const { data: enable, mutate: mutateEnable } = useSWR('checkAutoRun', checkAutoRun)
  const { appConfig, patchAppConfig } = useAppConfig()
  const { locale, setLanguage, t } = useLanguage()
  const {
    silentStart = false,
    autoQuitWithoutCore = false,
    autoQuitWithoutCoreDelay = 60,
    envType = [platform === 'win32' ? 'powershell' : 'bash'],
    autoCheckUpdate,
    updateChannel = 'stable',
    networkDetection = false,
    networkDetectionBypass = ['VMware', 'vEthernet'],
    networkDetectionInterval = 10,
    disableGPU = false,
    disableAnimation = false
  } = appConfig || {}

  const [bypass, setBypass] = useState(networkDetectionBypass)
  const [interval, setInterval] = useState(networkDetectionInterval)
  const [showRestartConfirm, setShowRestartConfirm] = useState(false)
  const [pendingDisableGPU, setPendingDisableGPU] = useState(disableGPU)

  return (
    <>
      {showRestartConfirm && (
        <ConfirmModal
          title={t('确定要重启应用吗？', 'Are you sure you want to restart the app?')}
          description={
            <div>
              <p>{t('修改 GPU 加速设置需要重启应用才能生效', 'Changing GPU acceleration settings requires restarting the app to take effect')}</p>
            </div>
          }
          confirmText={t('重启', 'Restart')}
          cancelText={t('取消', 'Cancel')}
          onChange={(open) => {
            if (!open) {
              setPendingDisableGPU(disableGPU)
            }
            setShowRestartConfirm(open)
          }}
          onConfirm={async () => {
            await patchAppConfig({ disableGPU: pendingDisableGPU })
            if (!pendingDisableGPU) {
              await patchAppConfig({ disableAnimation: false })
            }
            await relaunchApp()
          }}
        />
      )}
      <SettingCard>
        <SettingItem title={t('开机自启', 'Start on Boot')} divider>
          <Switch
            size="sm"
            isSelected={enable}
            onValueChange={async (v) => {
              try {
                if (v) {
                  await enableAutoRun()
                } else {
                  await disableAutoRun()
                }
              } catch (e) {
                alert(e)
              } finally {
                mutateEnable()
              }
            }}
          />
        </SettingItem>
        <SettingItem title={t('settings.general.language')} divider>
          <Select
            size="sm"
            className="w-[150px]"
            selectedKeys={[locale]}
            onChange={async (e) => {
              const newLang = e.target.value as 'en' | 'zh-CN' | 'ja' | 'zh-HK'
              await patchAppConfig({ language: newLang })
              await setLanguage(newLang)
            }}
          >
            <SelectItem key="zh-CN">简体中文</SelectItem>
            <SelectItem key="zh-HK">繁體中文</SelectItem>
            <SelectItem key="en">English</SelectItem>
            <SelectItem key="ja">日本語</SelectItem>
          </Select>
        </SettingItem>
        <SettingItem title={t('静默启动', 'Silent Start')} divider>
          <Switch
            size="sm"
            isSelected={silentStart}
            onValueChange={(v) => {
              patchAppConfig({ silentStart: v })
            }}
          />
        </SettingItem>
        <SettingItem title={t('自动检查更新', 'Auto Check Update')} divider>
          <Switch
            size="sm"
            isSelected={autoCheckUpdate}
            onValueChange={(v) => {
              patchAppConfig({ autoCheckUpdate: v })
            }}
          />
        </SettingItem>
        <SettingItem title={t('更新通道', 'Update Channel')} divider>
          <Tabs
            size="sm"
            color="primary"
            selectedKey={updateChannel}
            onSelectionChange={async (v) => {
              patchAppConfig({ updateChannel: v as 'stable' | 'beta' })
            }}
          >
            <Tab key="stable" title={t('正式版', 'Stable')} />
            <Tab key="beta" title={t('测试版', 'Beta')} />
          </Tabs>
        </SettingItem>
        <SettingItem
          title={t('自动开启轻量模式', 'Auto Enable Light Mode')}
          actions={
            <Tooltip content={t('关闭窗口指定时间后自动进入轻量模式', 'Automatically enter light mode after closing the window for a specified time')}>
              <Button isIconOnly size="sm" variant="light">
                <IoIosHelpCircle className="text-lg" />
              </Button>
            </Tooltip>
          }
          divider
        >
          <Switch
            size="sm"
            isSelected={autoQuitWithoutCore}
            onValueChange={(v) => {
              patchAppConfig({ autoQuitWithoutCore: v })
            }}
          />
        </SettingItem>
        {autoQuitWithoutCore && (
          <SettingItem title={t('自动开启轻量模式延时', 'Light Mode Delay')} divider>
            <Input
              size="sm"
              className="w-[100px]"
              type="number"
              endContent={t('秒', 'sec')}
              value={autoQuitWithoutCoreDelay.toString()}
              onValueChange={async (v: string) => {
                let num = parseInt(v)
                if (isNaN(num)) num = 5
                if (num < 5) num = 5
                await patchAppConfig({ autoQuitWithoutCoreDelay: num })
              }}
            />
          </SettingItem>
        )}
        <SettingItem
          title={t('复制环境变量类型', 'Copy Environment Variables Type')}
          actions={envType.map((type) => (
            <Button
              key={type}
              title={type}
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => copyEnv(type)}
            >
              <BiCopy className="text-lg" />
            </Button>
          ))}
          divider
        >
          <Select
            classNames={{ trigger: 'data-[hover=true]:bg-default-200' }}
            className="w-[150px]"
            size="sm"
            selectionMode="multiple"
            selectedKeys={new Set(envType)}
            disallowEmptySelection={true}
            onSelectionChange={async (v) => {
              try {
                await patchAppConfig({
                  envType: Array.from(v) as ('bash' | 'cmd' | 'powershell')[]
                })
              } catch (e) {
                alert(e)
              }
            }}
          >
            <SelectItem key="bash">Bash</SelectItem>
            <SelectItem key="cmd">CMD</SelectItem>
            <SelectItem key="powershell">PowerShell</SelectItem>
            <SelectItem key="nushell">NuShell</SelectItem>
          </Select>
        </SettingItem>
        <SettingItem
          title={t('禁用 GPU 加速', 'Disable GPU Acceleration')}
          actions={
            <Tooltip content={t('开启后，应用将禁用 GPU 加速，可能会提高稳定性，但会降低性能', 'When enabled, the app will disable GPU acceleration, which may improve stability but reduce performance')}>
              <Button isIconOnly size="sm" variant="light">
                <IoIosHelpCircle className="text-lg" />
              </Button>
            </Tooltip>
          }
          divider
        >
          <Switch
            size="sm"
            isSelected={pendingDisableGPU}
            onValueChange={(v) => {
              setPendingDisableGPU(v)
              setShowRestartConfirm(true)
            }}
          />
        </SettingItem>
        <SettingItem
          title={t('禁用动画', 'Disable Animation')}
          actions={
            <Tooltip content={t('开启后，应用将减轻绝大部分动画效果，可能会提高性能', 'When enabled, the app will reduce most animation effects, which may improve performance')}>
              <Button isIconOnly size="sm" variant="light">
                <IoIosHelpCircle className="text-lg" />
              </Button>
            </Tooltip>
          }
          divider
        >
          <Switch
            size="sm"
            isSelected={disableAnimation}
            onValueChange={(v) => {
              patchAppConfig({ disableAnimation: v })
            }}
          />
        </SettingItem>
        <SettingItem
          title={t('断网时停止内核', 'Stop Core on Network Disconnection')}
          actions={
            <Tooltip content={t('开启后，应用会在检测到网络断开时自动停止内核，并在网络恢复后自动重启内核', 'When enabled, the app will automatically stop the core when network disconnection is detected and restart it when the network is restored')}>
              <Button isIconOnly size="sm" variant="light">
                <IoIosHelpCircle className="text-lg" />
              </Button>
            </Tooltip>
          }
          divider={networkDetection}
        >
          <Switch
            size="sm"
            isSelected={networkDetection}
            onValueChange={(v) => {
              patchAppConfig({ networkDetection: v })
              if (v) {
                startNetworkDetection()
              } else {
                stopNetworkDetection()
              }
            }}
          />
        </SettingItem>
        {networkDetection && (
          <>
            <SettingItem
              title={t('断网检测间隔', 'Network Detection Interval')}
              actions={
                <Tooltip content={t('设置断网检测的间隔时间，单位为秒', 'Set the interval time for network detection, in seconds')}>
                  <Button isIconOnly size="sm" variant="light">
                    <IoIosHelpCircle className="text-lg" />
                  </Button>
                </Tooltip>
              }
              divider
            >
              <div className="flex">
                {interval !== networkDetectionInterval && (
                  <Button
                    size="sm"
                    color="primary"
                    className="mr-2"
                    onPress={async () => {
                      await patchAppConfig({ networkDetectionInterval: interval })
                      await startNetworkDetection()
                    }}
                  >
                    {t('确认', 'Confirm')}
                  </Button>
                )}
                <Input
                  size="sm"
                  type="number"
                  className="w-[100px]"
                  value={interval.toString()}
                  min={1}
                  onValueChange={(v) => {
                    setInterval(parseInt(v))
                  }}
                />
              </div>
            </SettingItem>
            <SettingItem title={t('绕过检测的接口', 'Bypass Detection Interfaces')}>
              {bypass.length != networkDetectionBypass.length && (
                <Button
                  size="sm"
                  color="primary"
                  onPress={async () => {
                    await patchAppConfig({ networkDetectionBypass: bypass })
                    await startNetworkDetection()
                  }}
                >
                  {t('确认', 'Confirm')}
                </Button>
              )}
            </SettingItem>
            <EditableList
              items={bypass}
              onChange={(list) => setBypass(list as string[])}
              divider={false}
            />
          </>
        )}
      </SettingCard>
    </>
  )
}

export default GeneralConfig
