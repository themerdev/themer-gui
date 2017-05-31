const { app, BrowserWindow } = require('electron');

const path = require('path');
const url = require('url');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1400,
    minWidth: 550,
    height: 1000,
    title: 'Themer',
    titleBarStyle: 'hidden-inset',
    webPreferences: {
      experimentalFeatures: true,
    },
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '..', 'dist', 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

require('./export.js').bootstrap(mainWindow);
