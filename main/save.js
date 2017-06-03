const { app, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const {
  SAVE_REQUEST,
  SAVE_AS_REQUEST,
  SAVE_COMPLETE,
  SAVE_ERRORED,
} = require('../common/ipcevents.js');

const defaultBasename = 'Untitled';
const ext = 'themer'; // TODO: get from package.json
const defaultFilename = `${defaultBasename}.${ext}`;

// const isModified = (filePath, contents) => {};
// 
// const save = (filePath, contents) => {
//   fs.writeFile(filePath, contents);
//   // TODO: or, send it back first, wait for state to get set, and then write the file with the new handle as part of the state.
//   // START HERE: ^ this is probably the right way to do it.
// };
// 
// const saveAs = (browserWindow, contents) => {
//   dialog.showSaveDialog(
//     browserWindow,
//     {
//       title: 'Save As...', // TODO: try without
//       defaultPath: path.join(app.getPath('home'), defaultFilename),
//     },
//     (userSavePath) => {
//       save(userSavePath, contents);
//       // TODO: send back userSavePath
//     }
//   );
// };
// 
// const open = (filePath) => {
//   // If there are changes, ask to save current buffer, with option not to.
//   // If there are no changes (empty new buffer or unmodified buffer with file handle)
//   // open and set file handle.
// };

////////////////
// NEW API BELOW
//////////////////

const isModified = (filePath, contents) => new Promise((resolve, reject) => {
  reject('TODO not yet implemented');
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
    if (filePath) { // TODO: move all these into methods
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

  // ipcMain.on(SAVE_REQUEST, (event, state) => {
  //   const filePath = state.filePath;
  //   const applicationState = Object.assign({}, state);
  //   delete applicationState.filePath;
  //   // TODO: replace above with below line once webpack/babel are set up for main process, too
  //   // const { filePath, ...applicationState } = state;
  //   if (!filePath) {
  //     saveAs(browserWindow, JSON.stringify(applicationState));
  //   }
  //   else {
  //     save(filePath, JSON.stringify(applicationState));
  //   }
  // });
  // ipcMain.on(SAVE_AS_REQUEST, (event, state) => {
  //   saveAs(browserWindow, JSON.stringify(state));
  // });
};
