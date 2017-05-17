import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import application from './reducers';
import { createStore } from 'redux';
import App from './components/App';
import {
  EXPORT_PROGRESS,
  EXPORT_CANCEL,
  EXPORT_ERROR,
  EXPORT_COMPLETE,
} from '../ipcevents';
import {
  closeDialogs,
  exportCancelled,
} from './actions';
import { ipcRenderer } from 'electron';
import './index.css';

const root = document.createElement('div');
document.body.appendChild(root);

const store = createStore(application);

ipcRenderer.on(EXPORT_CANCEL, () => {
  store.dispatch(closeDialogs());
  store.dispatch(exportCancelled());
});

ReactDom.render(
  <Provider store={ store }><App /></Provider>,
  root,
);
