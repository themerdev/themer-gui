import React from 'react';
import css from './Emoji.css';

export default ({ emoji }) => (
  <span className={ css.emoji }>{ emoji }</span>
);
