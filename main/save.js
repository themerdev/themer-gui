const { app, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const {
  SAVE_REQUEST,
  SAVE_AS_REQUEST,
  SAVE_COMPLETE,
  SAVE_ERRORED,
} = require('../common/ipcevents.js');

const defaultBasename = 'Untitled';
const ext = 'themer'; // TODO: get from package.json
const defaultFilename = `${defaultBasename}.${ext}`;

const isModified = (filePath, contents) => new Promise((resolve, reject) => {
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

exports.bootstrap = (browserWindow) => {

  ipcMain.on(SAVE_REQUEST, (event, filePath, data) => {
    const contents = JSON.stringify(data);
    if (filePath) {
      writeFile(filePath, contents)
        .then(pathWritten => event.sender.send(SAVE_COMPLETE, pathWritten))
        .catch(e => e && event.sender.send(SAVE_ERROR, e));
    }
    else {
      promptForFilePath(browserWindow)
        .then(filePath => writeFile(filePath, contents))
        .then(pathWritten => event.sender.send(SAVE_COMPLETE, pathWritten))
        .catch(e => e && event.sender.send(SAVE_ERROR, e));
    }
  });

  ipcMain.on(SAVE_AS_REQUEST, (event, data) => {
    const contents = JSON.stringify(data);
    promptForFilePath(browserWindow)
      .then(filePath => writeFile(filePath, contents))
      .then(pathWritten => event.sender.send(SAVE_COMPLETE, pathWritten))
      .catch(e => e && event.sender.send(SAVE_ERROR, e));
  });

};
