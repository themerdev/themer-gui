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
  if (process.env.NODE_ENV !== 'development') {
    ipcRenderer.send(CHECK_FOR_UPDATES);
  }
};
