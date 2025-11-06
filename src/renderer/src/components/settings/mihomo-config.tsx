import React, { useState } from 'react'
import SettingCard from '../base/base-setting-card'
import SettingItem from '../base/base-setting-item'
import { Button, Input, Select, SelectItem, Switch, Tab, Tabs, Tooltip } from '@heroui/react'
import { useAppConfig } from '@renderer/hooks/use-app-config'
import { useLanguage } from '@renderer/hooks/use-language'
import debounce from '@renderer/utils/debounce'
import {
  getGistUrl,
  getUserAgent,
  patchControledMihomoConfig,
  restartCore
} from '@renderer/utils/ipc'
import { MdDeleteForever } from 'react-icons/md'
import { BiCopy } from 'react-icons/bi'
import { IoIosHelpCircle } from 'react-icons/io'
import { platform } from '@renderer/utils/init'

const MihomoConfig: React.FC = () => {
  const { appConfig, patchAppConfig } = useAppConfig()
  const { t } = useLanguage()
  const {
    diffWorkDir = false,
    controlDns = true,
    controlSniff = true,
    delayTestConcurrency,
    delayTestTimeout,
    githubToken = '',
    autoCloseConnection = true,
    pauseSSID = [],
    delayTestUrl,
    userAgent,
    mihomoCpuPriority = 'PRIORITY_NORMAL',
    proxyCols = 'auto',
    groupDisplayLayout = 'single',
    proxyDisplayLayout = 'double'
  } = appConfig || {}
  const [url, setUrl] = useState(delayTestUrl)
  const [pauseSSIDInput, setPauseSSIDInput] = useState(pauseSSID)
  const setUrlDebounce = debounce((v: string) => {
    patchAppConfig({ delayTestUrl: v })
  }, 500)
  const [ua, setUa] = useState(userAgent)
  const setUaDebounce = debounce((v: string) => {
    patchAppConfig({ userAgent: v })
  }, 500)

  const [defaultUserAgent, setDefaultUserAgent] = useState<string>('')
  if (!defaultUserAgent) {
    getUserAgent().then((ua) => {
      setDefaultUserAgent(ua)
    })
  }

  return (
    <SettingCard title={t('订阅与代理组设置', 'Subscription & Proxy Group Settings')}>
      <SettingItem title={t('订阅拉取 UA', 'Subscription User Agent')} divider>
        <Input
          size="sm"
          className="w-[60%]"
          value={ua}
          placeholder={`${t('默认', 'Default')} ${defaultUserAgent}`}
          onValueChange={(v) => {
            setUa(v)
            setUaDebounce(v)
          }}
        ></Input>
      </SettingItem>
      <SettingItem title={t('延迟测试地址', 'Delay Test URL')} divider>
        <Input
          size="sm"
          className="w-[60%]"
          value={url}
          placeholder={`${t('默认', 'Default')} https://www.gstatic.com/generate_204`}
          onValueChange={(v) => {
            setUrl(v)
            setUrlDebounce(v)
          }}
        ></Input>
      </SettingItem>
      <SettingItem title={t('延迟测试并发数量', 'Delay Test Concurrency')} divider>
        <Input
          type="number"
          size="sm"
          className="w-[60%]"
          value={delayTestConcurrency?.toString()}
          placeholder={`${t('默认', 'Default')} 50`}
          onValueChange={(v) => {
            patchAppConfig({ delayTestConcurrency: parseInt(v) })
          }}
        />
      </SettingItem>
      <SettingItem title={t('延迟测试超时时间', 'Delay Test Timeout')} divider>
        <Input
          type="number"
          size="sm"
          className="w-[60%]"
          value={delayTestTimeout?.toString()}
          placeholder={`${t('默认', 'Default')} 5000`}
          onValueChange={(v) => {
            patchAppConfig({ delayTestTimeout: parseInt(v) })
          }}
        />
      </SettingItem>
      <SettingItem
        title={t('同步运行时配置到 Gist', 'Sync Runtime Config to Gist')}
        actions={
          <Button
            title={t('复制 Gist URL', 'Copy Gist URL')}
            isIconOnly
            size="sm"
            variant="light"
            onPress={async () => {
              try {
                const url = await getGistUrl()
                if (url !== '') {
                  await navigator.clipboard.writeText(`${url}/raw/sparkle.yaml`)
                }
              } catch (e) {
                alert(e)
              }
            }}
          >
            <BiCopy className="text-lg" />
          </Button>
        }
        divider
      >
        <Input
          type="password"
          size="sm"
          className="w-[60%]"
          value={githubToken}
          placeholder="GitHub Token"
          onValueChange={(v) => {
            patchAppConfig({ githubToken: v })
          }}
        />
      </SettingItem>
      <SettingItem title={t('代理节点展示列数', 'Proxy Columns')} divider>
        <Select
          classNames={{ trigger: 'data-[hover=true]:bg-default-200' }}
          className="w-[150px]"
          size="sm"
          selectedKeys={new Set([proxyCols])}
          disallowEmptySelection={true}
          onSelectionChange={async (v) => {
            await patchAppConfig({ proxyCols: v.currentKey as 'auto' | '1' | '2' | '3' | '4' })
          }}
        >
          <SelectItem key="auto">{t('自动', 'Auto')}</SelectItem>
          <SelectItem key="1">{t('一列', 'One Column')}</SelectItem>
          <SelectItem key="2">{t('两列', 'Two Columns')}</SelectItem>
          <SelectItem key="3">{t('三列', 'Three Columns')}</SelectItem>
          <SelectItem key="4">{t('四列', 'Four Columns')}</SelectItem>
        </Select>
      </SettingItem>
      <SettingItem title={t('代理组详细信息', 'Group Display Layout')} divider>
        <Tabs
          size="sm"
          color="primary"
          selectedKey={groupDisplayLayout}
          onSelectionChange={async (v) => {
            await patchAppConfig({
              groupDisplayLayout: v as 'hidden' | 'single' | 'double'
            })
          }}
        >
          <Tab key="hidden" title={t('隐藏', 'Hidden')} />
          <Tab key="single" title={t('单行', 'Single')} />
          <Tab key="double" title={t('双行', 'Double')} />
        </Tabs>
      </SettingItem>
      <SettingItem title={t('代理节点详细信息', 'Proxy Display Layout')} divider>
        <Tabs
          size="sm"
          color="primary"
          selectedKey={proxyDisplayLayout}
          onSelectionChange={async (v) => {
            await patchAppConfig({
              proxyDisplayLayout: v as 'hidden' | 'single' | 'double'
            })
          }}
        >
          <Tab key="hidden" title={t('隐藏', 'Hidden')} />
          <Tab key="single" title={t('单行', 'Single')} />
          <Tab key="double" title={t('双行', 'Double')} />
        </Tabs>
      </SettingItem>
      {platform === 'win32' && (
        <SettingItem title={t('内核进程优先级', 'Core Process Priority')} divider>
          <Select
            classNames={{ trigger: 'data-[hover=true]:bg-default-200' }}
            className="w-[150px]"
            size="sm"
            selectedKeys={new Set([mihomoCpuPriority])}
            disallowEmptySelection={true}
            onSelectionChange={async (v) => {
              try {
                await patchAppConfig({
                  mihomoCpuPriority: v.currentKey as Priority
                })
                await restartCore()
              } catch (e) {
                alert(e)
              }
            }}
          >
            <SelectItem key="PRIORITY_HIGHEST">{t('实时', 'Realtime')}</SelectItem>
            <SelectItem key="PRIORITY_HIGH">{t('高', 'High')}</SelectItem>
            <SelectItem key="PRIORITY_ABOVE_NORMAL">{t('高于正常', 'Above Normal')}</SelectItem>
            <SelectItem key="PRIORITY_NORMAL">{t('正常', 'Normal')}</SelectItem>
            <SelectItem key="PRIORITY_BELOW_NORMAL">{t('低于正常', 'Below Normal')}</SelectItem>
            <SelectItem key="PRIORITY_LOW">{t('低', 'Low')}</SelectItem>
          </Select>
        </SettingItem>
      )}
      <SettingItem
        title={t('为不同订阅分别指定工作目录', 'Separate Work Directory for Each Subscription')}
        actions={
          <Tooltip content={t('开启后可以避免不同订阅中存在相同代理组名时无法分别保存选择的节点', 'When enabled, it prevents conflicts when different subscriptions have the same proxy group name')}>
            <Button isIconOnly size="sm" variant="light">
              <IoIosHelpCircle className="text-lg" />
            </Button>
          </Tooltip>
        }
        divider
      >
        <Switch
          size="sm"
          isSelected={diffWorkDir}
          onValueChange={async (v) => {
            try {
              await patchAppConfig({ diffWorkDir: v })
              await restartCore()
            } catch (e) {
              alert(e)
            }
          }}
        />
      </SettingItem>
      <SettingItem title={t('接管 DNS 设置', 'Control DNS Settings')} divider>
        <Switch
          size="sm"
          isSelected={controlDns}
          onValueChange={async (v) => {
            try {
              await patchAppConfig({ controlDns: v })
              await patchControledMihomoConfig({})
              await restartCore()
            } catch (e) {
              alert(e)
            }
          }}
        />
      </SettingItem>
      <SettingItem title={t('接管域名嗅探设置', 'Control Domain Sniffing')} divider>
        <Switch
          size="sm"
          isSelected={controlSniff}
          onValueChange={async (v) => {
            try {
              await patchAppConfig({ controlSniff: v })
              await patchControledMihomoConfig({})
              await restartCore()
            } catch (e) {
              alert(e)
            }
          }}
        />
      </SettingItem>
      <SettingItem title={t('自动断开连接', 'Auto Close Connection')} divider>
        <Switch
          size="sm"
          isSelected={autoCloseConnection}
          onValueChange={(v) => {
            patchAppConfig({ autoCloseConnection: v })
          }}
        />
      </SettingItem>
      <SettingItem title={t('在特定的 WiFi SSID 下直连', 'Direct Connection for Specific WiFi SSID')}>
        {pauseSSIDInput.join('') !== pauseSSID.join('') && (
          <Button
            size="sm"
            color="primary"
            onPress={() => {
              patchAppConfig({ pauseSSID: pauseSSIDInput })
            }}
          >
            {t('确认', 'Confirm')}
          </Button>
        )}
      </SettingItem>
      <div className="flex flex-col items-stretch mt-2">
        {[...pauseSSIDInput, ''].map((ssid, index) => {
          return (
            <div key={index} className="flex mb-2">
              <Input
                size="sm"
                fullWidth
                placeholder="SSID"
                value={ssid || ''}
                onValueChange={(v) => {
                  if (index === pauseSSIDInput.length) {
                    setPauseSSIDInput([...pauseSSIDInput, v])
                  } else {
                    setPauseSSIDInput(pauseSSIDInput.map((a, i) => (i === index ? v : a)))
                  }
                }}
              />
              {index < pauseSSIDInput.length && (
                <Button
                  className="ml-2"
                  size="sm"
                  variant="flat"
                  color="warning"
                  onPress={() => setPauseSSIDInput(pauseSSIDInput.filter((_, i) => i !== index))}
                >
                  <MdDeleteForever className="text-lg" />
                </Button>
              )}
            </div>
          )
        })}
      </div>
    </SettingCard>
  )
}

export default MihomoConfig
