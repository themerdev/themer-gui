import React from 'react';
import ColorSet from './ColorSet';
import css from './App.css';

export default () => (
  <section className={ css.gui }>
    <div className={ css.colorSetContainer }>
      <ColorSet />
      <ColorSet light={ true } />
    </div>
  </section>
);
