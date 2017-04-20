import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import application from './reducers';
import { createStore } from 'redux';
import App from './components/App';

const root = document.createElement('div');
document.body.appendChild(root);

const store = createStore(application);

ReactDom.render(
  <Provider store={ store }><App /></Provider>,
  root,
);
