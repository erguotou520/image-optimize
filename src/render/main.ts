import { createApp } from 'vue'
import App from './App'
import './main.css'

// vite 使用 esm 编译 import, electron 及 node.js 内置模块用 require 形式
const { ipcRenderer } = require('electron')
const ipc: Electron.IpcRenderer = ipcRenderer

ipc.send('store:set', { key: 'foo.bar', value: '👩' })
ipc.invoke('store:get', 'foo').then((res: string) => {
  console.log(res)
})
ipc.send('store:delete', 'foo')
ipc.invoke('store:get', 'foo').then((res: string) => {
  console.log(res)
})

const app = createApp(App as any)

app.mount('#app')
