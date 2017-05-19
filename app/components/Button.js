import React from 'react';
import classnames from 'classnames';
import css from './Button.css';

export default ({ primary = false, plain = false, noSpace = false, disabled, onClick, children }) => (
  <button
    className={
      classnames(
        css.button,
        {
          [css.primary]: primary,
          [css.plain]: plain,
          [css.noSpace]: noSpace,
        }
      )
    }
    onClick={ onClick }
    disabled={ disabled }
  >
    { children }
  </button>
);
