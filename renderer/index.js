import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import application from './reducers/reducers';
import { createStore } from 'redux';
import App from './components/App';
import {
  EXPORT_PROGRESS,
  EXPORT_CANCEL,
  EXPORT_ERROR,
  EXPORT_COMPLETE,
  SAVE_COMPLETE,
  OPEN_COMPLETE,
} from '../common/ipcevents';
import {
  closeDialogs,
  exportCancelled,
  exportProgress,
  exportError,
  exportComplete,
} from './actions';
import { ipcRenderer } from 'electron';
import connectMenu from './menu';
import connectUpdater from './updater';
import './index.css';

const store = createStore(application);

// Main events

ipcRenderer.on(EXPORT_CANCEL, () => {
  store.dispatch(closeDialogs());
  store.dispatch(exportCancelled());
});

ipcRenderer.on(EXPORT_PROGRESS, (event, status) => {
  store.dispatch(exportProgress(status));
});

ipcRenderer.on(EXPORT_ERROR, (event, message) => {
  store.dispatch(exportError(message));
});

ipcRenderer.on(EXPORT_COMPLETE, (event, exportedPath) => {
  store.dispatch(exportComplete(exportedPath));
});

// Menu

connectMenu(store);

// Auto-uodate

connectUpdater(store);

// Bootstrap main application

const root = document.createElement('div');
document.body.appendChild(root);
ReactDom.render(
  <Provider store={ store }><App /></Provider>,
  root,
);
