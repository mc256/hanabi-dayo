export const en = {
  // Core Manager
  'core.userCancelled': 'User cancelled operation',
  'core.userCancelledDetected': 'user cancelled',
  'core.controllerListenError': 'Controller listen error',
  'core.startError': 'Core startup error',
  'core.tunStartFailure': 'Virtual network card startup failed, go to core settings page to manually grant core permissions',
  
  // Profile
  'profile.empty': 'Empty Subscription',
  'profile.certFingerprintMismatch': 'Certificate fingerprint mismatch',
  'profile.proxyConnectFailed': 'Proxy connection failed, status code',
  'profile.networkResetTimeout': 'Network connection reset or timeout',
  'profile.certExpired': 'Server certificate expired',
  'profile.certVerifyFailed': 'Unable to verify server certificate',
  'profile.certValidationFailed': 'Certificate validation failed',
  'profile.requestFailed': 'Request failed',
  'profile.parseError': 'Subscription format error, unable to parse as valid configuration file',
  'profile.notFound': 'Profile not found',
  'profile.remoteFile': 'Remote File',
  'profile.localFile': 'Local File',
  'profile.emptyUrl': 'Subscription URL is empty',
  
  // Override
  'override.notFound': 'Override not found',
  'override.remoteFile': 'Remote File',
  'override.localFile': 'Local File',
  'override.emptyUrl': 'Override URL is empty',
  
  // Elevation
  'elevation.windowsFailed': 'Windows privilege escalation failed',
  'elevation.linuxFailed': 'Linux privilege escalation failed',
  'elevation.macosFailed': 'macOS privilege escalation failed',
  
  // Encryption
  'encryption.invalidFormat': 'Invalid encryption format',
  
  // Dirs
  'dirs.sysPathInvalid': 'System core path is invalid or does not exist',
  'dirs.sysPathNotSet': 'System core path not set',
  'dirs.corePathError': 'Core path error',
  
  // Service Manager
  'service.keyManagerNotInit': 'Key manager not initialized, please call initKeyManager first',
  'service.initFailed': 'Service initialization failed',
  'service.installFailed': 'Service installation failed',
  'service.uninstallFailed': 'Service uninstallation failed',
  'service.startFailed': 'Service startup failed',
  'service.stopFailed': 'Service stop failed',
  'service.restartFailed': 'Service restart failed',
  'service.notInstalled': 'Service may not be installed',
  
  // System Proxy
  'sysproxy.serviceNotInstalled': 'Service may not be installed',
  
  // Misc
  'misc.selectSubscriptionFile': 'Select Subscription File',
  
  // Sub-Store Server
  'server.downloadFailed': 'Failed to download Sub-Store files',
  
  // Theme
  'theme.default': 'Default',
  
  // Shortcut
  'shortcut.sysProxyEnabled': 'System proxy enabled',
  'shortcut.sysProxyDisabled': 'System proxy disabled',
  'shortcut.tunEnabled': 'Virtual network card enabled',
  'shortcut.tunDisabled': 'Virtual network card disabled',
  'shortcut.ruleMode': 'Switched to rule mode',
  'shortcut.globalMode': 'Switched to global mode',
  'shortcut.directMode': 'Switched to direct mode',
  
  // Tray
  'tray.retest': 'Retest',
  'tray.showWindow': 'Show Window',
  'tray.showFloating': 'Show Floating Window',
  'tray.hideFloating': 'Hide Floating Window',
  'tray.systemProxy': 'System Proxy',
  'tray.virtualNetworkCard': 'Virtual Network Card',
  'tray.outboundMode': 'Outbound Mode',
  'tray.outboundMode.rule': 'Rule',
  'tray.outboundMode.global': 'Global',
  'tray.outboundMode.direct': 'Direct',
  'tray.ruleMode': 'Rule Mode',
  'tray.globalMode': 'Global Mode',
  'tray.directMode': 'Direct Mode',
  'tray.subscriptionConfig': 'Subscription Config',
  'tray.openDirectory': 'Open Directory',
  'tray.appDirectory': 'App Directory',
  'tray.workDirectory': 'Work Directory',
  'tray.coreDirectory': 'Core Directory',
  'tray.logDirectory': 'Log Directory',
  'tray.copyEnvVars': 'Copy Environment Variables',
  'tray.lightMode': 'Light Mode',
  'tray.restartApp': 'Restart Application',
  'tray.quitApp': 'Quit Application',
  'tray.popupMenu': 'Popup Menu',
  
  // Menu
  'menu.about': 'About',
  'menu.hide': 'Hide',
  'menu.hideOthers': 'Hide Others',
  'menu.showAll': 'Show All',
  'menu.lightMode': 'Light Mode',
  'menu.restartApp': 'Restart Application',
  'menu.quitApp': 'Quit Application',
  'menu.edit': 'Edit',
  'menu.undo': 'Undo',
  'menu.redo': 'Redo',
  'menu.cut': 'Cut',
  'menu.copy': 'Copy',
  'menu.paste': 'Paste',
  'menu.selectAll': 'Select All',
  
  // Main Index
  'main.adminRequired': 'Please run with administrator privileges on first launch',
  'main.initFailed': 'Application initialization failed',
  'main.coreStartError': 'Core startup error',
  'main.subscriptionImportSuccess': 'Subscription imported successfully',
  'main.subscriptionImportFailed': 'Subscription import failed',
  'main.overrideImportSuccess': 'Override imported successfully',
  'main.overrideImportFailed': 'Override import failed',
  'main.missingUrlParam': 'Missing parameter: url',
  
  // Comments
  'comment.neverTakeOver': 'Never take over status recovery',
  'comment.downloadBackendFiles': 'Download backend files',
  'comment.downloadFrontendFiles': 'Download frontend files',
  'comment.createTempDir': 'Create temporary directory',
  'comment.unzipToTemp': 'Unzip to temporary directory first',
  'comment.ensureTargetDirExists': 'Ensure target directory exists and is empty',
  'comment.moveDistContents': 'Move contents from dist directory to target directory',
  'comment.cleanupTempDir': 'Cleanup temporary directory',
  'comment.avoidErrorCreatingTray': 'Avoid errors when creating tray menu'
} as const

export type TranslationKeys = keyof typeof en
