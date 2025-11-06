export const zhHK = {
  // Core Manager
  'core.userCancelled': '使用者取消操作',
  'core.userCancelledDetected': '使用者已取消',
  'core.controllerListenError': '控制器監聽錯誤',
  'core.startError': '核心啟動出錯',
  'core.tunStartFailure': '虛擬網卡啟動失敗，前往核心設定頁嘗試手動授予核心權限',
  
  // Profile
  'profile.empty': '空白訂閱',
  'profile.certFingerprintMismatch': '憑證指紋不符',
  'profile.proxyConnectFailed': '代理連接失敗，狀態碼',
  'profile.networkResetTimeout': '網路連接被重設或逾時',
  'profile.certExpired': '伺服器憑證已過期',
  'profile.certVerifyFailed': '無法驗證伺服器憑證',
  'profile.certValidationFailed': '憑證驗證失敗',
  'profile.requestFailed': '請求失敗',
  'profile.parseError': '訂閱格式錯誤，無法解析為有效的設定檔',
  'profile.notFound': '訂閱設定未找到',
  'profile.remoteFile': '遠端檔案',
  'profile.localFile': '本機檔案',
  'profile.emptyUrl': '訂閱位址為空',
  
  // Override
  'override.notFound': '覆寫設定未找到',
  'override.remoteFile': '遠端檔案',
  'override.localFile': '本機檔案',
  'override.emptyUrl': '覆寫位址為空',
  
  // Elevation
  'elevation.windowsFailed': 'Windows 提權執行失敗',
  'elevation.linuxFailed': 'Linux 提權執行失敗',
  'elevation.macosFailed': 'macOS 提權執行失敗',
  
  // Encryption
  'encryption.invalidFormat': '無效的加密格式',
  
  // Dirs
  'dirs.sysPathInvalid': '系統核心路徑無效或不存在',
  'dirs.sysPathNotSet': '系統核心路徑未設定',
  'dirs.corePathError': '核心路徑錯誤',
  
  // Service Manager
  'service.keyManagerNotInit': '金鑰管理器未初始化，請先呼叫 initKeyManager',
  'service.initFailed': '服務初始化失敗',
  'service.installFailed': '服務安裝失敗',
  'service.uninstallFailed': '服務解除安裝失敗',
  'service.startFailed': '服務啟動失敗',
  'service.stopFailed': '服務停止失敗',
  'service.restartFailed': '服務重啟失敗',
  'service.notInstalled': '服務可能未安裝',
  
  // System Proxy
  'sysproxy.serviceNotInstalled': '服務可能未安裝',
  
  // Misc
  'misc.selectSubscriptionFile': '選擇訂閱檔案',
  
  // Sub-Store Server
  'server.downloadFailed': '下載 Sub-Store 檔案失敗',
  
  // Theme
  'theme.default': '預設',
  
  // Shortcut
  'shortcut.sysProxyEnabled': '系統代理已開啟',
  'shortcut.sysProxyDisabled': '系統代理已關閉',
  'shortcut.tunEnabled': '虛擬網卡已開啟',
  'shortcut.tunDisabled': '虛擬網卡已關閉',
  'shortcut.ruleMode': '已切換至規則模式',
  'shortcut.globalMode': '已切換至全域模式',
  'shortcut.directMode': '已切換至直連模式',
  
  // Tray
  'tray.retest': '重新測試',
  'tray.showWindow': '顯示視窗',
  'tray.showFloating': '顯示懸浮視窗',
  'tray.hideFloating': '關閉懸浮視窗',
  'tray.systemProxy': '系統代理',
  'tray.virtualNetworkCard': '虛擬網卡',
  'tray.outboundMode': '出站模式',
  'tray.outboundMode.rule': '規則',
  'tray.outboundMode.global': '全域',
  'tray.outboundMode.direct': '直連',
  'tray.ruleMode': '規則模式',
  'tray.globalMode': '全域模式',
  'tray.directMode': '直連模式',
  'tray.subscriptionConfig': '訂閱設定',
  'tray.openDirectory': '開啟目錄',
  'tray.appDirectory': '應用程式目錄',
  'tray.workDirectory': '工作目錄',
  'tray.coreDirectory': '核心目錄',
  'tray.logDirectory': '日誌目錄',
  'tray.copyEnvVars': '複製環境變數',
  'tray.lightMode': '輕量模式',
  'tray.restartApp': '重啟應用程式',
  'tray.quitApp': '結束應用程式',
  'tray.popupMenu': '彈出選單',
  
  // Menu
  'menu.about': '關於',
  'menu.hide': '隱藏',
  'menu.hideOthers': '隱藏其他',
  'menu.showAll': '顯示全部',
  'menu.lightMode': '輕量模式',
  'menu.restartApp': '重啟應用程式',
  'menu.quitApp': '結束應用程式',
  'menu.edit': '編輯',
  'menu.undo': '復原',
  'menu.redo': '重做',
  'menu.cut': '剪下',
  'menu.copy': '複製',
  'menu.paste': '貼上',
  'menu.selectAll': '全選',
  
  // Main Index
  'main.adminRequired': '首次啟動請以管理員權限執行',
  'main.initFailed': '應用程式初始化失敗',
  'main.coreStartError': '核心啟動出錯',
  'main.subscriptionImportSuccess': '訂閱匯入成功',
  'main.subscriptionImportFailed': '訂閱匯入失敗',
  'main.overrideImportSuccess': '覆寫匯入成功',
  'main.overrideImportFailed': '覆寫匯入失敗',
  'main.missingUrlParam': '缺少參數 url',
  
  // Comments
  'comment.neverTakeOver': '從不接管狀態恢復',
  'comment.downloadBackendFiles': '下載後端檔案',
  'comment.downloadFrontendFiles': '下載前端檔案',
  'comment.createTempDir': '建立暫存目錄',
  'comment.unzipToTemp': '先解壓縮到暫存目錄',
  'comment.ensureTargetDirExists': '確保目標目錄存在並清空',
  'comment.moveDistContents': '將 dist 目錄中的內容移動到目標目錄',
  'comment.cleanupTempDir': '清理暫存目錄',
  'comment.avoidErrorCreatingTray': '避免出錯時無法建立系統匣選單'
} as const

export type TranslationKeys = keyof typeof zhHK
