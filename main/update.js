const { ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');
const {
  CHECK_FOR_UPDATES,
  UPDATE_READY,
  PERFORM_UPDATE,
} = require('../common/ipcevents.js');

exports.bootstrap = () => {
  ipcMain.on(CHECK_FOR_UPDATES, (event) => {
    autoUpdater.on('update-downloaded', () => {
      event.sender.send(UPDATE_READY);
    });
    autoUpdater.checkForUpdates();
  });
  ipcMain.on(PERFORM_UPDATE, () => {
    autoUpdater.quitAndInstall();
  });
};
