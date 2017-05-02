import React from 'react';
import ColorSet from './ColorSet';
import Dialogs from './Dialogs';
import Menu from './Menu';
import css from './App.css';

export default () => (
  <section className={ css.gui }>
    <div className={ css.colorSetContainer }>
      <ColorSet />
      <ColorSet light={ true } />
    </div>
    <Menu />
    <Dialogs />
  </section>
);
