import { ipcRenderer } from 'electron';
import {
  CHECK_FOR_UPDATES,
  UPDATE_READY,
} from '../common/ipcevents';
import { updateReady } from './actions';

export default store => {
  ipcRenderer.on(UPDATE_READY, () => {
    store.dispatch(updateReady());
  });
  ipcRenderer.send(CHECK_FOR_UPDATES);
};
