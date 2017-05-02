import React from 'react';
import classnames from 'classnames';
import css from './Button.css';

export default ({ primary = false, disabled, onClick, children }) => (
  <button
    className={ classnames(css.button, { [css.primary]: primary }) }
    onClick={ onClick }
    disabled={ disabled }
  >
    { children }
  </button>
);
