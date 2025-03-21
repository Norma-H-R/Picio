import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  send: (channel, data) => {
    electronAPI.ipcRenderer.send(channel, data)
  },
  isChildWindow: () => {
    // 这里可以添加判断是否为子窗口的逻辑
    return false
  },
  showOpenDialog: () => {
    return electronAPI.ipcRenderer.invoke('show-open-dialog')
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electronAPI', {
      send: (channel, data) => electronAPI.ipcRenderer.send(channel, data),
      invoke: (channel, data) => electronAPI.ipcRenderer.invoke(channel, data),
      isChildWindow: api.isChildWindow,
      showOpenDialog: api.showOpenDialog
    })
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
