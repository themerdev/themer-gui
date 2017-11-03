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
import { getOrDefault } from './helpers/color';
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

const areAllParseable = inputtedColors => inputtedColors.every(inputtedColor => !!getOrDefault(inputtedColor));

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
  const darkCompleted = areAllParseable(Object.values(state.colorSets.dark));
  const lightCompleted = areAllParseable(Object.values(state.colorSets.light));
  const isDialogOpen = Object.values(state.dialogsVisibility).some(v => v);
  const hasFilePath = !!state.filePath;
  const hasColorValues = [
    ...Object.values(state.colorSets.dark),
    ...Object.values(state.colorSets.light),
  ].some(Boolean);
  const areDarkShadesDistributable = areAllParseable([state.colorSets.dark.shade0, state.colorSets.dark.shade7]);
  const shouldDarkShadesDistributeWarn = [
    state.colorSets.dark.shade1,
    state.colorSets.dark.shade2,
    state.colorSets.dark.shade3,
    state.colorSets.dark.shade4,
    state.colorSets.dark.shade5,
    state.colorSets.dark.shade6,
  ].some(Boolean);
  const areLightShadesDistributable = areAllParseable([state.colorSets.light.shade0, state.colorSets.light.shade7]);
  const shouldLightShadesDistributeWarn = [
    state.colorSets.light.shade1,
    state.colorSets.light.shade2,
    state.colorSets.light.shade3,
    state.colorSets.light.shade4,
    state.colorSets.light.shade5,
    state.colorSets.light.shade6,
  ].some(Boolean);

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
          enabled: !isDialogOpen,
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
          enabled: areDarkShadesDistributable || areLightShadesDistributable,
          accelerator: 'CmdOrCtrl+Alt+Shift+D',
          click () {
            if (shouldDarkShadesDistributeWarn || shouldLightShadesDistributeWarn) {
              overwriteShadesWarning()
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
          enabled: !isDialogOpen,
          click () { store.dispatch(tipsDialogOpen()); },
        },
        {
          label: 'Show Color Mappings...',
          enabled: !isDialogOpen,
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
