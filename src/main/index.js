import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/picio.png?asset'
const fs = require('fs') // 引入 fs 模块

function createWindow(windowType, goUrl) {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    // transparent: true,
    // backgroundColor: '#00000000',
    width: 1280,
    height: 720,
    minHeight: 700,
    minWidth: 1060,
    frame: false,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      webSecurity: true
    },
    icon: join(__dirname, '../../resources/picio.png'),
    ...(windowType === 'secondary' && {
      title: '二级窗口'
      // parent: (() => {
      //   const focused = BrowserWindow.getFocusedWindow()
      //   console.log('当前焦点窗口:', focused?.id ?? '无')
      //   return focused || BrowserWindow.getAllWindows().find(w => w.isMainWindow);
      // })()
    })
  })
  // Load the secondary window if it's a secondary window, otherwise load the main window
  if (windowType === 'secondary') {
    // mainWindow.loadFile(join(__dirname, '../../src/renderer/sec.html'))
    mainWindow.loadURL('http://localhost:5173/' + goUrl)
  } else {
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
      mainWindow.webContents.openDevTools()
    } else {
      mainWindow.loadURL('http://localhost:5173/' + goUrl)
    }
  }

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
  mainWindow.webContents.openDevTools()
  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  // if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
  //   mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  // } else {
  //   mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  // }
}

ipcMain.on('window-control', (event, action) => {
  const win = BrowserWindow.getFocusedWindow()
  if (!win) {
    console.log('No focused window for action:', action)
    return
  }
  console.log('Handling window control:', action)

  switch (action) {
    case 'minimize':
      win.minimize()
      break
    case 'toggle-maximize':
      win.isMaximized() ? win.unmaximize() : win.maximize()
      break
    case 'close':
      win.close()
      break
  }
})

ipcMain.on('create-child-window', (event, { windowType, goUrl }) => {
  createWindow(windowType, goUrl)
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

const { dialog } = require('electron')

ipcMain.handle('show-open-dialog', async () => {
  return await dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] })
})

ipcMain.handle('read-file', (event, { path }) => {
  try {
    return fs.readFileSync(path, 'utf-8')
  } catch (error) {
    throw new Error(`文件读取失败: ${error.message}`)
  }
})

ipcMain.handle('write-file', (event, { path, data }) => {
  fs.writeFile(path, data, (err) => {
    if (err) throw err
  })
})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
