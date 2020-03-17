const { app, BrowserWindow, nativeImage } = require('electron')
require('./js/card-data.js')

app.disableHardwareAcceleration()

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 500,
    height: 500,
    // frame: false,
    // alwaysOnTop: true,
    // skipTaskbar: false,
    // transparent: true,
    webPreferences: {
      nodeIntegration: true,
    }
  })

  win.setPosition(2600, 400)

  // and load the index.html of the app.
  win.loadFile('index.html')
  // win.loadFile('html/region-window.html')

  // Open the DevTools.
  win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
    app.quit()
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
