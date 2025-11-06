import {
  cn,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Switch,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@heroui/react'
import React, { useState } from 'react'
import SettingItem from '../base/base-setting-item'
import { useOverrideConfig } from '@renderer/hooks/use-override-config'
import { useLanguage } from '@renderer/hooks/use-language'
import { restartCore } from '@renderer/utils/ipc'
import { MdDeleteForever } from 'react-icons/md'
import { FaPlus } from 'react-icons/fa6'
import { useAppConfig } from '@renderer/hooks/use-app-config'

interface Props {
  item: ProfileItem
  updateProfileItem: (item: ProfileItem) => Promise<void>
  onClose: () => void
}

const EditInfoModal: React.FC<Props> = (props) => {
  const { t } = useLanguage()
  const { item, updateProfileItem, onClose } = props
  const { appConfig: { disableAnimation = false } = {} } = useAppConfig()
  const { overrideConfig } = useOverrideConfig()
  const { items: overrideItems = [] } = overrideConfig || {}
  const [values, setValues] = useState(item)
  const inputWidth = 'w-[400px] md:w-[400px] lg:w-[600px] xl:w-[800px]'

  const onSave = async (): Promise<void> => {
    try {
      const itemToSave = {
        ...values,
        override: values.override?.filter(
          (i) =>
            overrideItems.find((t) => t.id === i) && !overrideItems.find((t) => t.id === i)?.global
        )
      }

      await updateProfileItem(itemToSave)
      if (item.id) {
        await restartCore()
      }
      onClose()
    } catch (e) {
      alert(e)
    }
  }

  return (
    <Modal
      backdrop={disableAnimation ? 'transparent' : 'blur'}
      disableAnimation={disableAnimation}
      size="5xl"
      classNames={{
        backdrop: 'top-[48px]',
        base: 'w-[600px] md:w-[600px] lg:w-[800px] xl:w-[1024px]'
      }}
      hideCloseButton
      isOpen={true}
      onOpenChange={onClose}
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="flex app-drag">
          {item.id ? t('编辑信息', 'Edit Info') : t('导入远程配置', 'Import Remote Config')}
        </ModalHeader>
        <ModalBody>
          <SettingItem title={t('名称', 'Name')}>
            <Input
              size="sm"
              className={cn(inputWidth)}
              value={values.name}
              onValueChange={(v) => {
                setValues({ ...values, name: v })
              }}
            />
          </SettingItem>
          {values.type === 'remote' && (
            <>
              <SettingItem title={t('订阅地址', 'Subscription URL')}>
                <Input
                  size="sm"
                  className={cn(inputWidth)}
                  value={values.url}
                  onValueChange={(v) => {
                    setValues({ ...values, url: v })
                  }}
                />
              </SettingItem>
              <SettingItem title={t('证书指纹', 'Certificate Fingerprint')}>
                <Input
                  size="sm"
                  className={cn(inputWidth)}
                  value={values.fingerprint ?? ''}
                  onValueChange={(v) => {
                    setValues({ ...values, fingerprint: v.trim() || undefined })
                  }}
                />
              </SettingItem>
              <SettingItem title={t('指定 UA', 'User Agent')}>
                <Input
                  size="sm"
                  className={cn(inputWidth)}
                  value={values.ua ?? ''}
                  onValueChange={(v) => {
                    setValues({ ...values, ua: v.trim() || undefined })
                  }}
                />
              </SettingItem>
              <SettingItem title={t('验证订阅格式', 'Verify Subscription Format')}>
                <Switch
                  size="sm"
                  isSelected={values.verify ?? false}
                  onValueChange={(v) => {
                    setValues({ ...values, verify: v })
                  }}
                />
              </SettingItem>
              <SettingItem title={t('使用代理更新', 'Update via Proxy')}>
                <Switch
                  size="sm"
                  isSelected={values.useProxy ?? false}
                  onValueChange={(v) => {
                    setValues({ ...values, useProxy: v })
                  }}
                />
              </SettingItem>
              <SettingItem title={t('更新间隔（分钟）', 'Update Interval (minutes)')}>
                <Input
                  size="sm"
                  type="number"
                  className={cn(inputWidth)}
                  value={values.interval?.toString() ?? ''}
                  onValueChange={(v) => {
                    setValues({ ...values, interval: parseInt(v) })
                  }}
                  disabled={values.locked}
                />
              </SettingItem>
            </>
          )}
          <SettingItem title={t('覆写', 'Override')}>
            <div>
              {overrideItems
                .filter((i) => i.global)
                .map((i) => {
                  return (
                    <div className="flex mb-2" key={i.id}>
                      <Button disabled fullWidth variant="flat" size="sm">
                        {i.name} {t('(全局)', '(Global)')}
                      </Button>
                    </div>
                  )
                })}
              {values.override?.map((i) => {
                if (!overrideItems.find((t) => t.id === i)) return null
                if (overrideItems.find((t) => t.id === i)?.global) return null
                return (
                  <div className="flex mb-2" key={i}>
                    <Button disabled fullWidth variant="flat" size="sm">
                      {overrideItems.find((t) => t.id === i)?.name}
                    </Button>
                    <Button
                      color="warning"
                      variant="flat"
                      className="ml-2"
                      size="sm"
                      onPress={() => {
                        setValues({
                          ...values,
                          override: values.override?.filter((t) => t !== i)
                        })
                      }}
                    >
                      <MdDeleteForever className="text-lg" />
                    </Button>
                  </div>
                )
              })}
              <Dropdown>
                <DropdownTrigger>
                  <Button fullWidth size="sm" variant="flat" color="default">
                    <FaPlus />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  emptyContent={t('没有可用的覆写', 'No available overrides')}
                  onAction={(key) => {
                    setValues({
                      ...values,
                      override: Array.from(values.override || []).concat(key.toString())
                    })
                  }}
                >
                  {overrideItems
                    .filter((i) => !values.override?.includes(i.id) && !i.global)
                    .map((i) => (
                      <DropdownItem key={i.id}>{i.name}</DropdownItem>
                    ))}
                </DropdownMenu>
              </Dropdown>
            </div>
          </SettingItem>
        </ModalBody>
        <ModalFooter>
          <Button size="sm" variant="light" onPress={onClose}>
            {t('取消', 'Cancel')}
          </Button>
          <Button size="sm" color="primary" onPress={onSave}>
            {item.id ? t('保存', 'Save') : t('导入', 'Import')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EditInfoModal
