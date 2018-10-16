import { remote } from 'electron';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
const { app, dialog } = remote;

const defaultBasename = 'Untitled';
const ext = 'thmr';
const defaultFilename = `${defaultBasename}.${ext}`;

const allowedKeys = ['colorSets', 'exportOptions'];
const sanitize = data => _.pickBy(data, (v, k) => allowedKeys.includes(k));

const promptForWriteFilePath = browserWindow => new Promise((resolve, reject) => {
  dialog.showSaveDialog(
    browserWindow,
    { defaultPath: path.join(app.getPath('home'), defaultFilename) },
    userSavePath => {
      if (userSavePath) { resolve(userSavePath); }
      else { reject(); }
    }
  );
});

const writeFile = (filePath, data) => new Promise((resolve, reject) => {
  fs.writeFile(filePath, JSON.stringify(sanitize(data)), err => {
    if (err) { reject(err); }
    else { resolve(filePath); }
  });
});

const promptForReadFilePath = browserWindow => new Promise((resolve, reject) => {
  dialog.showOpenDialog(
    browserWindow,
    {
      filters: [{ name: 'Themer Theme', extensions: [ext, 'js'] }],
      properties: ['openFile'],
    },
    userOpenFilePaths => {
      if (userOpenFilePaths) {
        resolve(userOpenFilePaths[0]);
      }
      else { reject(); }
    }
  );
});

const readFile = filePath => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf8', (err, json) => {
    if (err) { reject(err); }
    else {
      resolve({
        filePath,
        contents: sanitize(JSON.parse(json))
      });
    }
  });
});

const requireFile = filePath => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf8', (err, json) => {
    if (err) { reject(err); }
    else {
      const colorSets = Function('return ' + json.replace('exports.colors = ', ''))()
      resolve({
        filePath,
        contents: { colorSets }
      });
    }
  });
})

const showErrorDialog = message => {
  dialog.showErrorBox('Save Error', message);
}

////////////////
// Public API //
////////////////

export const promptForIntentToSave = () => new Promise((resolve, reject) => {
  dialog.showMessageBox(
    remote.getCurrentWindow(),
    {
      type: 'question',
      message: 'Would you like to save your current changes?',
      buttons: ['Cancel', 'Save', 'Don\'t Save'],
    },
    responseIdx => {
      switch (responseIdx) {
        case 0:
          reject();
          break;
        case 1:
          resolve(true);
          break;
        case 2:
          resolve(false);
          break;
      }
    },
  );
});

export const isModified = (filePath, data) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf8', (err, writtenData) => {
    if (err) { reject(err); }
    else {
      try { resolve(!_.isEqual(sanitize(JSON.parse(writtenData)), sanitize(data))); }
      catch(e) { reject(e); }
    }
  });
});
export const isImportModified = (filePath, data) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf8', (err, writtenData) => {
    if (err) { reject(err); }
    else {
      const colorSets = Function('return ' + writtenData.replace('exports.colors = ', ''))()
      try { resolve(!_.isEqual(colorSets, data.colorSets)); }
      catch(e) { reject(e); }
    }
  });
});

export const save = (filePath, data) =>
  writeFile(filePath, data);

export const saveAs = (data) =>
  promptForWriteFilePath(remote.getCurrentWindow())
    .then(filePath => writeFile(filePath, data));

export const open = () =>
  promptForReadFilePath(remote.getCurrentWindow())
    .then(readFile);
  
export const importColors = () =>
    promptForReadFilePath(remote.getCurrentWindow())
      .then(requireFile);

export const showErrorIfError = error => {
  if (error && error.message) {
    showErrorDialog(error.message);
  }
}
