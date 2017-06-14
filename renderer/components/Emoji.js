import React from 'react';
import classnames from 'classnames';
import css from './Emoji.css';

export default ({ emoji, right = false }) => (
  <span className={ classnames(css.emoji, { [css.right]: right }) }>{ emoji }</span>
);
