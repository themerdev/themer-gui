import { remote } from 'electron';
const { app, dialog } = remote;

export default () => new Promise((resolve, reject) => {
  dialog.showMessageBox(
    remote.getCurrentWindow(),
    {
      type: 'warning',
      buttons: ['Cancel', 'OK'],
      title: 'Overwrite shades?',
      message: 'This action will overwrite shades 1 through 6 of your color set(s), and cannot be undone. Are you sure you want to proceed?',
      // checkboxLabel: 'Do not ask me again',
    },
    (idx, checked) => {
      if (idx === 1) {
        resolve();
      }
      else {
        reject();
      }
    },
  );
});
