const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

let win

function createWindow () {

    win = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 720,
    minHeight: 480,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadURL(
      isDev ? 'http://localhost:3000/' : `file://${path.join(__dirname, './build/index.html')}`
  )

  win.setMenu(null)

  win.on('closed', ()=> win = null)

  win.on('maximize', ()=> {
    win.webContents.send('maximized')
  })

  win.on('unmaximize', ()=> {
    win.webContents.send('unmaximized')
  })
}

ipcMain.handle('minimize-event', ()=> {
  win.minimize()
})

ipcMain.handle('maximize-event', ()=> {
  win.maximize()
})

ipcMain.handle('unmaximize-event', ()=> {
  win.unmaximize()
})

ipcMain.handle('close-event', ()=> {
  app.quit()
})

app.on('browser-window-focus', ()=> {
  win.webContents.send('focused')
})

app.on('browser-window-blur', ()=> {
  win.webContents.send('blurred')
})

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {

  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {

  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})