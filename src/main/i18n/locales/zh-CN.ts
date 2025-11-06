export const zhCN = {
  // Core Manager
  'core.userCancelled': '用户取消操作',
  'core.userCancelledDetected': '用户已取消',
  'core.controllerListenError': '控制器监听错误',
  'core.startError': '内核启动出错',
  'core.tunStartFailure': '虚拟网卡启动失败，前往内核设置页尝试手动授予内核权限',
  
  // Profile
  'profile.empty': '空白订阅',
  'profile.certFingerprintMismatch': '证书指纹不匹配',
  'profile.proxyConnectFailed': '代理连接失败，状态码',
  'profile.networkResetTimeout': '网络连接被重置或超时',
  'profile.certExpired': '服务器证书已过期',
  'profile.certVerifyFailed': '无法验证服务器证书',
  'profile.certValidationFailed': '证书验证失败',
  'profile.requestFailed': '请求失败',
  'profile.parseError': '订阅格式错误，无法解析为有效的配置文件',
  'profile.notFound': '订阅配置未找到',
  'profile.remoteFile': '远程文件',
  'profile.localFile': '本地文件',
  'profile.emptyUrl': '订阅地址为空',
  
  // Override
  'override.notFound': '覆写配置未找到',
  'override.remoteFile': '远程文件',
  'override.localFile': '本地文件',
  'override.emptyUrl': '覆写地址为空',
  
  // Elevation
  'elevation.windowsFailed': 'Windows 提权执行失败',
  'elevation.linuxFailed': 'Linux 提权执行失败',
  'elevation.macosFailed': 'macOS 提权执行失败',
  
  // Encryption
  'encryption.invalidFormat': '无效的加密格式',
  
  // Dirs
  'dirs.sysPathInvalid': '系统内核路径无效或不存在',
  'dirs.sysPathNotSet': '系统内核路径未设置',
  'dirs.corePathError': '内核路径错误',
  
  // Service Manager
  'service.keyManagerNotInit': '密钥管理器未初始化，请先调用 initKeyManager',
  'service.initFailed': '服务初始化失败',
  'service.installFailed': '服务安装失败',
  'service.uninstallFailed': '服务卸载失败',
  'service.startFailed': '服务启动失败',
  'service.stopFailed': '服务停止失败',
  'service.restartFailed': '服务重启失败',
  'service.notInstalled': '服务可能未安装',
  
  // System Proxy
  'sysproxy.serviceNotInstalled': '服务可能未安装',
  
  // Misc
  'misc.selectSubscriptionFile': '选择订阅文件',
  
  // Sub-Store Server
  'server.downloadFailed': '下载 Sub-Store 文件失败',
  
  // Theme
  'theme.default': '默认',
  
  // Shortcut
  'shortcut.sysProxyEnabled': '系统代理已开启',
  'shortcut.sysProxyDisabled': '系统代理已关闭',
  'shortcut.tunEnabled': '虚拟网卡已开启',
  'shortcut.tunDisabled': '虚拟网卡已关闭',
  'shortcut.ruleMode': '已切换至规则模式',
  'shortcut.globalMode': '已切换至全局模式',
  'shortcut.directMode': '已切换至直连模式',
  
  // Tray
  'tray.retest': '重新测试',
  'tray.showWindow': '显示窗口',
  'tray.showFloating': '显示悬浮窗',
  'tray.hideFloating': '关闭悬浮窗',
  'tray.systemProxy': '系统代理',
  'tray.virtualNetworkCard': '虚拟网卡',
  'tray.outboundMode': '出站模式',
  'tray.outboundMode.rule': '规则',
  'tray.outboundMode.global': '全局',
  'tray.outboundMode.direct': '直连',
  'tray.ruleMode': '规则模式',
  'tray.globalMode': '全局模式',
  'tray.directMode': '直连模式',
  'tray.subscriptionConfig': '订阅配置',
  'tray.openDirectory': '打开目录',
  'tray.appDirectory': '应用目录',
  'tray.workDirectory': '工作目录',
  'tray.coreDirectory': '内核目录',
  'tray.logDirectory': '日志目录',
  'tray.copyEnvVars': '复制环境变量',
  'tray.lightMode': '轻量模式',
  'tray.restartApp': '重启应用',
  'tray.quitApp': '退出应用',
  'tray.popupMenu': '弹出菜单',
  
  // Menu
  'menu.about': '关于',
  'menu.hide': '隐藏',
  'menu.hideOthers': '隐藏其他',
  'menu.showAll': '显示全部',
  'menu.lightMode': '轻量模式',
  'menu.restartApp': '重启应用',
  'menu.quitApp': '退出应用',
  'menu.edit': '编辑',
  'menu.undo': '撤销',
  'menu.redo': '重做',
  'menu.cut': '剪切',
  'menu.copy': '复制',
  'menu.paste': '粘贴',
  'menu.selectAll': '全选',
  
  // Main Index
  'main.adminRequired': '首次启动请以管理员权限运行',
  'main.initFailed': '应用初始化失败',
  'main.coreStartError': '内核启动出错',
  'main.subscriptionImportSuccess': '订阅导入成功',
  'main.subscriptionImportFailed': '订阅导入失败',
  'main.overrideImportSuccess': '覆写导入成功',
  'main.overrideImportFailed': '覆写导入失败',
  'main.missingUrlParam': '缺少参数 url',
  
  // Comments
  'comment.neverTakeOver': '从不接管状态恢复',
  'comment.downloadBackendFiles': '下载后端文件',
  'comment.downloadFrontendFiles': '下载前端文件',
  'comment.createTempDir': '创建临时目录',
  'comment.unzipToTemp': '先解压到临时目录',
  'comment.ensureTargetDirExists': '确保目标目录存在并清空',
  'comment.moveDistContents': '将 dist 目录中的内容移动到目标目录',
  'comment.cleanupTempDir': '清理临时目录',
  'comment.avoidErrorCreatingTray': '避免出错时无法创建托盘菜单'
} as const
