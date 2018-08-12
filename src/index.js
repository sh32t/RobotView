/**************************************
 * 初期設定（モジュールの読み込み）
 **************************************/
// Electronのモジュール
const electron = require("electron");
// アプリケーションをコントロールするモジュール
const app = electron.app;
// ウィンドウを作成するモジュール
const BrowserWindow = electron.BrowserWindow;

/**************************************
 * 画面起動処理
 **************************************/
// メインウィンドウはガベージコレクションされないようにグローバル宣言
let mainWindow;
// Electronの初期化完了後に実行
app.on("ready", () => {

    // ブラウザを作成
    mainWindow = new BrowserWindow({ width: 1050, height: 540, useContentSize: true });
    // 初期表示でトップ画面を表示
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    // ウィンドウが閉じられたらアプリも終了
    mainWindow.on("closed", () => {
        mainWindow = null;
    });
});

/**************************************
 * アプリケーション終了処理
 **************************************/
// 全てのウィンドウが閉じたら終了
app.on("window-all-closed", () => {
    if (process.platform != "darwin") {
        app.quit();
    }
});

/**************************************
 * イベント処理
 **************************************/
const { ipcMain } = require("electron")
const child_process = require("child_process")
// 通信処理
ipcMain.on("client", (event) => {
    let proc = child_process.spawn("python", ["src/py/client.py"]);
    proc.stdout.on("data", (data) => {
        console.log(data.toString());
        event.sender.send("client", data.toString());
    });
    proc.stderr.on("data", (data) => {
        console.log(data.toString());
    });
});

// サーバー起動（テスト用）
ipcMain.on("server", (event) => {
    let proc = child_process.spawn("python", ["src/py/server.py"]);
    proc.stdout.on("data", (data) => {
        console.log(data.toString());
    });
    proc.stderr.on("data", (data) => {
        console.log(data.toString());
    });
});
