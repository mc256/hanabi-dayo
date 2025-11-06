import { Button, Tooltip } from '@heroui/react'
import SettingCard from '../base/base-setting-card'
import SettingItem from '../base/base-setting-item'
import {
  checkUpdate,
  createHeapSnapshot,
  quitApp,
  quitWithoutCore,
  resetAppConfig,
  cancelUpdate
} from '@renderer/utils/ipc'
import { useState, useEffect } from 'react'
import UpdaterModal from '../updater/updater-modal'
import { version } from '@renderer/utils/init'
import { IoIosHelpCircle } from 'react-icons/io'
import { firstDriver } from '@renderer/App'
import ConfirmModal from '../base/base-confirm'
import { useLanguage } from '@renderer/hooks/use-language'

const Actions: React.FC = () => {
  const { t } = useLanguage()
  const [newVersion, setNewVersion] = useState('')
  const [changelog, setChangelog] = useState('')
  const [openUpdate, setOpenUpdate] = useState(false)
  const [checkingUpdate, setCheckingUpdate] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [updateStatus, setUpdateStatus] = useState<{
    downloading: boolean
    progress: number
    error?: string
  }>({
    downloading: false,
    progress: 0
  })

  useEffect(() => {
    const handleUpdateStatus = (
      _: Electron.IpcRendererEvent,
      status: typeof updateStatus
    ): void => {
      setUpdateStatus(status)
    }

    window.electron.ipcRenderer.on('update-status', handleUpdateStatus)

    return (): void => {
      window.electron.ipcRenderer.removeAllListeners('update-status')
    }
  }, [])

  const handleCancelUpdate = async (): Promise<void> => {
    try {
      await cancelUpdate()
      setUpdateStatus({ downloading: false, progress: 0 })
    } catch (e) {
      // ignore
    }
  }

  return (
    <>
      {openUpdate && (
        <UpdaterModal
          onClose={() => setOpenUpdate(false)}
          version={newVersion}
          changelog={changelog}
          updateStatus={updateStatus}
          onCancel={handleCancelUpdate}
        />
      )}
      {confirmOpen && (
        <ConfirmModal
          onChange={setConfirmOpen}
          title={t('确认删除配置？', 'Confirm Delete Configuration?')}
          description={
            <>
              ⚠️ {t('删除配置，', 'Delete configuration, ')}
              <span className="text-red-500">{t('操作不可撤销', 'this action cannot be undone')}</span>
            </>
          }
          confirmText={t('确认删除', 'Confirm Delete')}
          cancelText={t('取消', 'Cancel')}
          onConfirm={resetAppConfig}
        />
      )}
      <SettingCard>
        <SettingItem title={t('打开引导页面', 'Open Guide')} divider>
          <Button size="sm" onPress={() => firstDriver.drive()}>
            {t('打开引导页面', 'Open Guide')}
          </Button>
        </SettingItem>
        <SettingItem title={t('检查更新', 'Check Update')} divider>
          <Button
            size="sm"
            isLoading={checkingUpdate}
            onPress={async () => {
              try {
                setCheckingUpdate(true)
                const version = await checkUpdate()
                if (version) {
                  setNewVersion(version.version)
                  setChangelog(version.changelog)
                  setOpenUpdate(true)
                } else {
                  new window.Notification(t('当前已是最新版本', 'Already up to date'), { body: t('无需更新', 'No update needed') })
                }
              } catch (e) {
                alert(e)
              } finally {
                setCheckingUpdate(false)
              }
            }}
          >
            {t('检查更新', 'Check Update')}
          </Button>
        </SettingItem>
        <SettingItem
          title={t('重置软件', 'Reset App')}
          actions={
            <Tooltip content={t('删除所有配置，将软件恢复初始状态', 'Delete all configurations and restore the app to its initial state')}>
              <Button isIconOnly size="sm" variant="light">
                <IoIosHelpCircle className="text-lg" />
              </Button>
            </Tooltip>
          }
          divider
        >
          <Button size="sm" onPress={() => setConfirmOpen(true)}>
            {t('重置软件', 'Reset App')}
          </Button>
        </SettingItem>
        <SettingItem
          title={t('清除缓存', 'Clear Cache')}
          actions={
            <Tooltip content={t('清除软件渲染进程缓存', 'Clear renderer process cache')}>
              <Button isIconOnly size="sm" variant="light">
                <IoIosHelpCircle className="text-lg" />
              </Button>
            </Tooltip>
          }
          divider
        >
          <Button size="sm" onPress={() => localStorage.clear()}>
            {t('清除缓存', 'Clear Cache')}
          </Button>
        </SettingItem>
        <SettingItem
          title={t('创建堆快照', 'Create Heap Snapshot')}
          actions={
            <Tooltip content={t('创建主进程堆快照，用于排查内存问题', 'Create main process heap snapshot for debugging memory issues')}>
              <Button isIconOnly size="sm" variant="light">
                <IoIosHelpCircle className="text-lg" />
              </Button>
            </Tooltip>
          }
          divider
        >
          <Button size="sm" onPress={createHeapSnapshot}>
            {t('创建堆快照', 'Create Heap Snapshot')}
          </Button>
        </SettingItem>
        <SettingItem
          title={t('轻量模式', 'Light Mode')}
          actions={
            <Tooltip content={t('完全退出软件，只保留内核进程', 'Exit app completely, keep only core process')}>
              <Button isIconOnly size="sm" variant="light">
                <IoIosHelpCircle className="text-lg" />
              </Button>
            </Tooltip>
          }
          divider
        >
          <Button size="sm" onPress={quitWithoutCore}>
            {t('轻量模式', 'Light Mode')}
          </Button>
        </SettingItem>
        <SettingItem title={t('退出应用', 'Quit App')} divider>
          <Button size="sm" onPress={quitApp}>
            {t('退出应用', 'Quit App')}
          </Button>
        </SettingItem>
        <SettingItem title={t('应用版本', 'App Version')}>
          <div>v{version}</div>
        </SettingItem>
      </SettingCard>
    </>
  )
}

export default Actions
