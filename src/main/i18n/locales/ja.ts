export const ja = {
  // Core Manager
  'core.userCancelled': 'ユーザーが操作をキャンセルしました',
  'core.userCancelledDetected': 'ユーザーがキャンセルしました',
  'core.controllerListenError': 'コントローラーリスニングエラー',
  'core.startError': 'コア起動エラー',
  'core.tunStartFailure': '仮想ネットワークカードの起動に失敗しました。コア設定ページに移動して手動でコアに権限を付与してください',
  
  // Profile
  'profile.empty': '空のサブスクリプション',
  'profile.certFingerprintMismatch': '証明書フィンガープリントが一致しません',
  'profile.proxyConnectFailed': 'プロキシ接続に失敗しました。ステータスコード',
  'profile.networkResetTimeout': 'ネットワーク接続がリセットまたはタイムアウトしました',
  'profile.certExpired': 'サーバー証明書の有効期限が切れています',
  'profile.certVerifyFailed': 'サーバー証明書を検証できません',
  'profile.certValidationFailed': '証明書の検証に失敗しました',
  'profile.requestFailed': 'リクエストが失敗しました',
  'profile.parseError': 'サブスクリプション形式エラー、有効な設定ファイルとして解析できません',
  'profile.notFound': 'プロファイルが見つかりません',
  'profile.remoteFile': 'リモートファイル',
  'profile.localFile': 'ローカルファイル',
  'profile.emptyUrl': 'サブスクリプションURLが空です',
  
  // Override
  'override.notFound': 'オーバーライドが見つかりません',
  'override.remoteFile': 'リモートファイル',
  'override.localFile': 'ローカルファイル',
  'override.emptyUrl': 'オーバーライドURLが空です',
  
  // Elevation
  'elevation.windowsFailed': 'Windows特権昇格に失敗しました',
  'elevation.linuxFailed': 'Linux特権昇格に失敗しました',
  'elevation.macosFailed': 'macOS特権昇格に失敗しました',
  
  // Encryption
  'encryption.invalidFormat': '無効な暗号化形式',
  
  // Dirs
  'dirs.sysPathInvalid': 'システムコアパスが無効または存在しません',
  'dirs.sysPathNotSet': 'システムコアパスが設定されていません',
  'dirs.corePathError': 'コアパスエラー',
  
  // Service Manager
  'service.keyManagerNotInit': 'キーマネージャーが初期化されていません。最初にinitKeyManagerを呼び出してください',
  'service.initFailed': 'サービスの初期化に失敗しました',
  'service.installFailed': 'サービスのインストールに失敗しました',
  'service.uninstallFailed': 'サービスのアンインストールに失敗しました',
  'service.startFailed': 'サービスの起動に失敗しました',
  'service.stopFailed': 'サービスの停止に失敗しました',
  'service.restartFailed': 'サービスの再起動に失敗しました',
  'service.notInstalled': 'サービスがインストールされていない可能性があります',
  
  // System Proxy
  'sysproxy.serviceNotInstalled': 'サービスがインストールされていない可能性があります',
  
  // Misc
  'misc.selectSubscriptionFile': 'サブスクリプションファイルを選択',
  
  // Sub-Store Server
  'server.downloadFailed': 'Sub-Storeファイルのダウンロードに失敗しました',
  
  // Theme
  'theme.default': 'デフォルト',
  
  // Shortcut
  'shortcut.sysProxyEnabled': 'システムプロキシが有効になりました',
  'shortcut.sysProxyDisabled': 'システムプロキシが無効になりました',
  'shortcut.tunEnabled': '仮想ネットワークカードが有効になりました',
  'shortcut.tunDisabled': '仮想ネットワークカードが無効になりました',
  'shortcut.ruleMode': 'ルールモードに切り替えました',
  'shortcut.globalMode': 'グローバルモードに切り替えました',
  'shortcut.directMode': 'ダイレクトモードに切り替えました',
  
  // Tray
  'tray.retest': '再テスト',
  'tray.showWindow': 'ウィンドウを表示',
  'tray.showFloating': 'フローティングウィンドウを表示',
  'tray.hideFloating': 'フローティングウィンドウを非表示',
  'tray.systemProxy': 'システムプロキシ',
  'tray.virtualNetworkCard': '仮想ネットワークカード',
  'tray.outboundMode': 'アウトバウンドモード',
  'tray.outboundMode.rule': 'ルール',
  'tray.outboundMode.global': 'グローバル',
  'tray.outboundMode.direct': 'ダイレクト',
  'tray.ruleMode': 'ルールモード',
  'tray.globalMode': 'グローバルモード',
  'tray.directMode': 'ダイレクトモード',
  'tray.subscriptionConfig': 'サブスクリプション設定',
  'tray.openDirectory': 'ディレクトリを開く',
  'tray.appDirectory': 'アプリディレクトリ',
  'tray.workDirectory': '作業ディレクトリ',
  'tray.coreDirectory': 'コアディレクトリ',
  'tray.logDirectory': 'ログディレクトリ',
  'tray.copyEnvVars': '環境変数をコピー',
  'tray.lightMode': 'ライトモード',
  'tray.restartApp': 'アプリを再起動',
  'tray.quitApp': 'アプリを終了',
  'tray.popupMenu': 'ポップアップメニュー',
  
  // Menu
  'menu.about': 'について',
  'menu.hide': '非表示',
  'menu.hideOthers': '他を非表示',
  'menu.showAll': 'すべて表示',
  'menu.lightMode': 'ライトモード',
  'menu.restartApp': 'アプリを再起動',
  'menu.quitApp': 'アプリを終了',
  'menu.edit': '編集',
  'menu.undo': '取り消し',
  'menu.redo': 'やり直し',
  'menu.cut': 'カット',
  'menu.copy': 'コピー',
  'menu.paste': 'ペースト',
  'menu.selectAll': 'すべて選択',
  
  // Main Index
  'main.adminRequired': '初回起動時は管理者権限で実行してください',
  'main.initFailed': 'アプリケーションの初期化に失敗しました',
  'main.coreStartError': 'コア起動エラー',
  'main.subscriptionImportSuccess': 'サブスクリプションのインポートに成功しました',
  'main.subscriptionImportFailed': 'サブスクリプションのインポートに失敗しました',
  'main.overrideImportSuccess': 'オーバーライドのインポートに成功しました',
  'main.overrideImportFailed': 'オーバーライドのインポートに失敗しました',
  'main.missingUrlParam': 'パラメータが不足しています: url',
  
  // Comments
  'comment.neverTakeOver': 'ステータスの復元を引き継がない',
  'comment.downloadBackendFiles': 'バックエンドファイルをダウンロード',
  'comment.downloadFrontendFiles': 'フロントエンドファイルをダウンロード',
  'comment.createTempDir': '一時ディレクトリを作成',
  'comment.unzipToTemp': '最初に一時ディレクトリに解凍',
  'comment.ensureTargetDirExists': 'ターゲットディレクトリが存在し、空であることを確認',
  'comment.moveDistContents': 'distディレクトリの内容をターゲットディレクトリに移動',
  'comment.cleanupTempDir': '一時ディレクトリをクリーンアップ',
  'comment.avoidErrorCreatingTray': 'トレイメニュー作成時のエラーを回避'
} as const

export type TranslationKeys = keyof typeof ja
