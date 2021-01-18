/**
 * electron 主文件
 */
import { join } from 'path'
import { app, BrowserWindow } from 'electron'

let win: BrowserWindow | null = null

const isDev = process.env.NODE_ENV === 'development'

class createWin {
  // 创建浏览器窗口
  constructor() {
    win = new BrowserWindow({
      width: 480,
      height: 360,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
      }
    })

    const URL = isDev
      ? `http://localhost:9987` // vite 启动的服务器地址
      : `file://${join(__dirname, '../../dist/render/index.html')}` // vite 构建后的静态文件地址

    win.loadURL(URL)
    if (isDev) {
      win.once('ready-to-show', () => {
        ;(win as BrowserWindow).webContents.openDevTools()
      })
    }
  }
}

app.whenReady().then(() => new createWin())

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    new createWin()
  }
})
