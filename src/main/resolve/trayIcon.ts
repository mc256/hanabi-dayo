import { nativeImage, NativeImage } from 'electron'
import { tray } from './tray'
import { getControledMihomoConfig } from '../config'
import trayRule from '../../../resources/tray-rule.png?asset'
import trayGlobal from '../../../resources/tray-global.png?asset'
import trayDirect from '../../../resources/tray-direct.png?asset'

const modeIcons: Record<string, NativeImage> = {}
let lastMode: string = ''

export async function initLinuxTrayIcon(): Promise<void> {
  if (process.platform !== 'linux') return

  modeIcons['rule'] = nativeImage.createFromPath(trayRule)
  modeIcons['global'] = nativeImage.createFromPath(trayGlobal)
  modeIcons['direct'] = nativeImage.createFromPath(trayDirect)

  const { mode = 'rule' } = await getControledMihomoConfig()
  lastMode = mode
  const icon = modeIcons[mode]
  if (icon) tray?.setImage(icon)
}

export function updateLinuxTrayIcon(mode: string): void {
  if (process.platform !== 'linux') return
  if (mode === lastMode) return

  lastMode = mode
  const icon = modeIcons[mode]
  if (icon) tray?.setImage(icon)
}

export function destroyLinuxTrayIcon(): void {
  lastMode = ''
}
