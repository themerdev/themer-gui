import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import css from './Dialog.css';

export default ({ children }) => (
  <CSSTransitionGroup
    transitionName={{
      appear: css.slideAppear,
      appearActive: css.slideAppearActive,
      enter: css.slideEnter,
      enterActive: css.slideEnterActive,
      leave: css.slideLeave,
      leaveActive: css.slideLeaveActive,
    }}
    transitionAppear
    transitionAppearTimeout={ 400 }
    transitionEnterTimeout={ 400 }
    transitionLeaveTimeout={ 100 }
  >
    { children }
  </CSSTransitionGroup>
);
