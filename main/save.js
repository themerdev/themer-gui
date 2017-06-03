const { app, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const {
  SAVE_REQUEST,
  SAVE_AS_REQUEST,
  SAVE_COMPLETE,
} = require('../common/ipcevents.js');

const defaultBasename = 'Untitled';
const ext = 'themer';
const defaultFilename = `${defaultBasename}.${ext}`;

const isModified = (filePath, contents) => new Promise((resolve, reject) => { // TODO: this may need to move into the main process. Where the logic maybe should be.
  fs.readFile(filePath, 'utf8', (err, writtenData) => {
    if (err) { reject(err); }
    else {
      try { resolve(_.isEqual(JSON.parse(writtenData), JSON.parse(contents))); }
      catch(e) { reject(e); }
    }
  });
});

const promptForFilePath = browserWindow => new Promise((resolve, reject) => {
  dialog.showSaveDialog(
    browserWindow,
    { defaultPath: path.join(app.getPath('home'), defaultFilename) },
    userSavePath => {
      if (userSavePath) { resolve(userSavePath); }
      else { reject(); }
    }
  );
});

const writeFile = (filePath, contents) => new Promise((resolve, reject) => {
  fs.writeFile(filePath, contents, err => {
    if (err) { reject(err); }
    else { resolve(filePath); }
  });
});

const openFile = filePath => new Promise((resolve, reject) => {
  reject('TODO not yet implemented');
});

const showErrorDialog = message => {
  dialog.showErrorBox('Save Error', message);
}

exports.bootstrap = (browserWindow) => {

  ipcMain.on(SAVE_REQUEST, (event, filePath, data) => {
    writeFile(filePath, JSON.stringify(data))
      .then(pathWritten => event.sender.send(SAVE_COMPLETE, pathWritten))
      .catch(e => e.message && showErrorDialog(e.message));
  });

  ipcMain.on(SAVE_AS_REQUEST, (event, data) => {
    promptForFilePath(browserWindow)
      .then(filePath => writeFile(filePath, JSON.stringify(data)))
      .then(pathWritten => event.sender.send(SAVE_COMPLETE, pathWritten))
      .catch(e => e.message && showErrorDialog(e.message));
  });

};
