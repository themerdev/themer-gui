import React from 'react';
import classnames from 'classnames';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { connect } from 'react-redux';
import { closeDialogs } from '../actions';
import css from './Dialogs.css';

const Dialogs = ({
  isDialogShown,
  onOverlayClick,
}) => (
  <CSSTransitionGroup
    transitionName={{
      appear: css.fadeAppear,
      appearActive: css.fadeAppearActive,
      enter: css.fadeEnter,
      enterActive: css.fadeEnterActive,
      leave: css.fadeLeave,
      leaveActive: css.fadeLeaveActive,
    }}
    transitionAppear
    transitionAppearTimeout={ 500 }
    transitionEnterTimeout={ 500 }
    transitionLeaveTimeout={ 100 }
  >
    { isDialogShown ? (
      <div
        key="overlay"
        className={ css.overlay }
        onClick={ onOverlayClick }
      >
        hello, world.
      </div>
    ) : null }
  </CSSTransitionGroup>
);

const mapStateToProps = state => ({
  isDialogShown: Object.values(state.dialogsVisibility).some(v => v),
});
const mapDispatchToProps = dispatch => ({
  onOverlayClick: () => {
    dispatch(closeDialogs());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dialogs);
