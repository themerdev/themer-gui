import { dialog, ipcRenderer, remote } from 'electron';
import fs from 'fs';
import {
  exportDialogOpen,
  tipsDialogOpen,
  prefillDialogOpen,
  saveComplete,
  openComplete,
  resetState,
  helpDialogOpen,
  distributeShades,
} from './actions';
import { EXPORT_COLORS_REQUEST } from '../common/ipcevents';
import {
  isDarkColorSetComplete,
  isLightColorSetComplete,
  hasAnyColorValues,
  areDarkShadesDistributable,
  areLightShadesDistributable,
  hasDarkIntermediateShades,
  hasLightIntermediateShades,
  isDialogOpen,
} from './reducers/reducers';
import {
  isModified,
  save,
  saveAs,
  open,
  promptForIntentToSave,
  showErrorIfError,
} from './helpers/filesystem';
import overwriteShadesWarning from './helpers/overwriteShadesWarning';
const { app, Menu } = remote;

const getExportThemesLabel = (darkCompleted, lightCompleted) => {
  if (darkCompleted && !lightCompleted) {
    return 'Export Colors && Themes (Dark Only)...';
  }
  else if (lightCompleted && !darkCompleted) {
    return 'Export Colors && Themes (Light Only)...';
  }
  else {
    return 'Export Colors && Themes...';
  }
};

const getExportColorsLabel = (darkCompleted, lightCompleted) => {
  if (darkCompleted && !lightCompleted) {
    return 'Export Colors (Dark Only)...';
  }
  else if (lightCompleted && !darkCompleted) {
    return 'Export Colors (Light Only)...';
  }
  else {
    return 'Export Colors...';
  }
};

const setMenu = store => {

  const state = store.getState();
  const darkCompleted = isDarkColorSetComplete(state);
  const lightCompleted = isLightColorSetComplete(state);
  const dialogOpen = isDialogOpen(state);
  const hasFilePath = !!state.filePath;
  const hasColorValues = hasAnyColorValues(state);
  const darkShadesDistributable = areDarkShadesDistributable(state);
  const lightShadesDistributable = areLightShadesDistributable(state);
  const shouldDarkShadesDistributeWarn = darkShadesDistributable && state.preferences.showOverwriteShadesWarning && hasDarkIntermediateShades(state);
  const shouldLightShadesDistributeWarn = lightShadesDistributable && state.preferences.showOverwriteShadesWarning && hasLightIntermediateShades(state);

  const template = [
    process.platform === 'darwin' ? {
      label: app.getName(),
      submenu: [
        {role: 'about'},
        {type: 'separator'},
        {role: 'services', submenu: []},
        {type: 'separator'},
        {role: 'hide'},
        {role: 'hideothers'},
        {role: 'unhide'},
        {type: 'separator'},
        {role: 'quit'},
      ],
    } : undefined,
    {
      label: 'File',
      submenu: [
        {
          label: 'New',
          accelerator: 'CmdOrCtrl+N',
          click () {
            const { filePath, ...data } = state;
            if (hasFilePath) {
              isModified(filePath, data)
                .then(modified => {
                  if (modified) {
                    // There was a file path, and were modifications; prompting for save.
                    promptForIntentToSave()
                      .then(wouldLikeToSave => {
                        if (wouldLikeToSave) {
                          return save(filePath, data)
                            .then(pathWritten => store.dispatch(saveComplete(pathWritten)));
                        }
                        else { return Promise.resolve(); }
                      })
                      .then(() => store.dispatch(resetState()))
                      .catch(showErrorIfError);
                  }
                  else {
                    // There was a file path, but no modifications; resetting state.
                    store.dispatch(resetState());
                  }
                });
            }
            else {
              if (hasColorValues) {
                // No file path, but has color values; prompting for save as.
                promptForIntentToSave()
                  .then(wouldLikeToSave => {
                    if (wouldLikeToSave) {
                      return saveAs(data)
                        .then(pathWritten => store.dispatch(saveComplete(pathWritten)));
                    }
                    else { return Promise.resolve(); }
                  })
                  .then(() => store.dispatch(resetState()))
                  .catch(showErrorIfError);
              }
              else {
                // No file path, but no values; resetting state.
                store.dispatch(resetState());
              }
            }
          },
        },
        {
          label: `Save${!hasFilePath ? '...' : ''}`,
          accelerator: 'CmdOrCtrl+S',
          click () {
            const { filePath, ...data } = state;
            if (!!filePath) {
              save(filePath, data).then(pathWritten => store.dispatch(saveComplete(pathWritten)));
            }
            else {
              saveAs(data).then(pathWritten => store.dispatch(saveComplete(pathWritten)));
            }
          },
        },
        {
          label: 'Save As...',
          accelerator: 'CmdOrCtrl+Shift+S',
          click () {
            const { filePath, ...data } = state;
            saveAs(data).then(pathWritten => store.dispatch(saveComplete(pathWritten)));
          },
        },
        {
          label: 'Open...',
          accelerator: 'CmdOrCtrl+O',
          click() {
            const { filePath, ...data } = state;
            if (hasFilePath) {
              isModified(filePath, data)
                .then(modified => {
                  if (modified) {
                    // There was a file path, and were modifications; prompting for save.
                    promptForIntentToSave()
                      .then(wouldLikeToSave => {
                        if (wouldLikeToSave) {
                          return save(filePath, data)
                            .then(pathWritten => store.dispatch(saveComplete(pathWritten)));
                        }
                        else { return Promise.resolve(); }
                      })
                      .then(open)
                      .then(fileData => store.dispatch(openComplete(fileData)))
                      .catch(showErrorIfError);
                  }
                  else {
                    // There was a file path, but no modifications; opening.
                    open()
                      .then(fileData => store.dispatch(openComplete(fileData)))
                      .catch(showErrorIfError);
                  }
                });
            }
            else {
              if (hasColorValues) {
                // No file path, but has color values; prompting for save as.
                promptForIntentToSave()
                  .then(wouldLikeToSave => {
                    if (wouldLikeToSave) {
                      return saveAs(data)
                        .then(pathWritten => store.dispatch(saveComplete(pathWritten)));
                    }
                    else { return Promise.resolve(); }
                  })
                  .then(open)
                  .then(fileData => store.dispatch(openComplete(fileData)))
                  .catch(showErrorIfError);
              }
              else {
                // No file path, but no values; opening.
                open()
                  .then(fileData => store.dispatch(openComplete(fileData)))
                  .catch(showErrorIfError);
              }
            }
          },
        },
        {
          label: 'Prefill With Built-in Color Set...',
          accelerator: 'CmdOrCtrl+Shift+O',
          enabled: !dialogOpen,
          click () { store.dispatch(prefillDialogOpen()); },
        },
        {type: 'separator'},
        {
          label: getExportThemesLabel(darkCompleted, lightCompleted),
          accelerator: 'CmdOrCtrl+E',
          enabled: darkCompleted || lightCompleted,
          click () { store.dispatch(exportDialogOpen()); },
        },
        {
          label: getExportColorsLabel(darkCompleted, lightCompleted),
          accelerator: 'CmdOrCtrl+Shift+E',
          enabled: darkCompleted || lightCompleted,
          click () { ipcRenderer.send(EXPORT_COLORS_REQUEST, state.colorSets); },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'delete' },
        { role: 'selectall' },
        { type: 'separator' },
        {
          label: 'Distribute Shades',
          enabled: darkShadesDistributable || lightShadesDistributable,
          accelerator: 'CmdOrCtrl+Alt+Shift+D',
          click () {
            if (shouldDarkShadesDistributeWarn || shouldLightShadesDistributeWarn) {
              overwriteShadesWarning(store)
                .then(() => {
                  store.dispatch(distributeShades());
                })
                .catch(() => {});
            }
            else {
              store.dispatch(distributeShades());
            }
          },
        },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    {
      role: 'window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' },
      ],
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Show Tips...',
          enabled: !dialogOpen,
          click () { store.dispatch(tipsDialogOpen()); },
        },
        {
          label: 'Show Color Mappings...',
          enabled: !dialogOpen,
          click() { store.dispatch(helpDialogOpen()); },
        },
      ],
    },
  ].filter(Boolean);
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
};

export default store => {
  setMenu(store);
  store.subscribe(() => setMenu(store));
};
