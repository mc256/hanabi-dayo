import React from 'react'
import SettingCard from '../base/base-setting-card'
import SettingItem from '../base/base-setting-item'
import { RadioGroup, Radio } from '@heroui/react'
import { useAppConfig } from '@renderer/hooks/use-app-config'
import { useLanguage } from '@renderer/hooks/use-language'

const SiderConfig: React.FC = () => {
  const { appConfig, patchAppConfig } = useAppConfig()
  const { t } = useLanguage()
  
  const titleMap = {
    sysproxyCardStatus: t('系统代理', 'System Proxy'),
    tunCardStatus: t('虚拟网卡', 'TUN'),
    profileCardStatus: t('订阅管理', 'Subscriptions'),
    proxyCardStatus: t('代理组', 'Proxy Groups'),
    ruleCardStatus: t('规则', 'Rules'),
    resourceCardStatus: t('外部资源', 'Resources'),
    overrideCardStatus: t('覆写', 'Overrides'),
    connectionCardStatus: t('连接', 'Connections'),
    mihomoCoreCardStatus: t('内核', 'Core'),
    dnsCardStatus: 'DNS',
    sniffCardStatus: t('域名嗅探', 'Sniffing'),
    logCardStatus: t('日志', 'Logs'),
    substoreCardStatus: 'Sub-Store'
  }
  
  const {
    sysproxyCardStatus = 'col-span-1',
    tunCardStatus = 'col-span-1',
    profileCardStatus = 'col-span-2',
    proxyCardStatus = 'col-span-2',
    ruleCardStatus = 'col-span-1',
    resourceCardStatus = 'col-span-1',
    overrideCardStatus = 'col-span-1',
    connectionCardStatus = 'col-span-2',
    mihomoCoreCardStatus = 'col-span-2',
    dnsCardStatus = 'col-span-1',
    sniffCardStatus = 'col-span-1',
    logCardStatus = 'col-span-1',
    substoreCardStatus = 'col-span-1'
  } = appConfig || {}

  const cardStatus = {
    sysproxyCardStatus,
    tunCardStatus,
    profileCardStatus,
    proxyCardStatus,
    ruleCardStatus,
    resourceCardStatus,
    overrideCardStatus,
    connectionCardStatus,
    mihomoCoreCardStatus,
    dnsCardStatus,
    sniffCardStatus,
    logCardStatus,
    substoreCardStatus
  }

  return (
    <SettingCard title={t('侧边栏设置', 'Sidebar Settings')}>
      {Object.keys(cardStatus).map((key, index, array) => {
        return (
          <SettingItem title={titleMap[key]} key={key} divider={index !== array.length - 1}>
            <RadioGroup
              orientation="horizontal"
              value={cardStatus[key]}
              onValueChange={(v) => {
                patchAppConfig({ [key]: v as CardStatus })
              }}
            >
              <Radio value="col-span-2">{t('大', 'Large')}</Radio>
              <Radio value="col-span-1">{t('小', 'Small')}</Radio>
              <Radio value="hidden">{t('隐藏', 'Hidden')}</Radio>
            </RadioGroup>
          </SettingItem>
        )
      })}
    </SettingCard>
  )
}

export default SiderConfig
