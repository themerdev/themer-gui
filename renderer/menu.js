import { ipcRenderer, remote } from 'electron';
import {
  exportDialogOpen,
  helpDialogOpen,
  prefillDialogOpen,
} from './actions';
import {
  EXPORT_COLORS_REQUEST,
  SAVE_REQUEST,
  SAVE_AS_REQUEST,
  SAVE_COMPLETE,
} from '../common/ipcevents';
import { getOrDefault } from './helpers/color';
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
          label: `Save${hasFilePath ? '...' : ''}`,
          accelerator: 'CmdOrCtrl+S',
          click () {
            const { filePath, ...data } = state;
            ipcRenderer.send(SAVE_REQUEST, filePath, data);
          }
        },
        {
          label: 'Save As...',
          accelerator: 'CmdOrCtrl+Shift+S',
          click () {
            const { filePath, ...data } = state;
            ipcRenderer.send(SAVE_AS_REQUEST, data);
          }
        },
        // TODO: add open here.
        {
          label: 'Prefill With Built-in Color Set...',
          accelerator: 'CmdOrCtrl+Shift+O',
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
          label: 'Show Help...',
          enabled: !isDialogOpen,
          click () { store.dispatch(helpDialogOpen()); },
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
