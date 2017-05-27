import { remote } from 'electron';
import {
  exportDialogOpen,
  helpDialogOpen,
} from './actions';
import { getOrDefault } from './helpers/color';
const { app, Menu } = remote;

const areAllParseable = inputtedColors => inputtedColors.every(inputtedColor => !!getOrDefault(inputtedColor));

const getExportThemesLabel = (darkCompleted, lightCompleted) => {
  if (darkCompleted && !lightCompleted) {
    return 'Export Themes (Dark Only)...';
  }
  else if (lightCompleted && !darkCompleted) {
    return 'Export Themes (Light Only)...';
  }
  else {
    return 'Export Themes...';
  }
};

const setMenu = store => {

  const state = store.getState();
  const darkCompleted = areAllParseable(Object.values(state.colorSets.dark));
  const lightCompleted = areAllParseable(Object.values(state.colorSets.light));

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
          label: getExportThemesLabel(darkCompleted, lightCompleted),
          accelerator: 'CmdOrCtrl+E',
          enabled: darkCompleted || lightCompleted,
          click () { store.dispatch(exportDialogOpen()); },
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
