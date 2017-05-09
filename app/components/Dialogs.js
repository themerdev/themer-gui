import React from 'react';
import classnames from 'classnames';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { connect } from 'react-redux';
import { closeDialogs } from '../actions';
import HelpDialog from './HelpDialog';
import css from './Dialogs.css';

const Dialogs = ({
  currentDialog,
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
    transitionAppearTimeout={ 400 }
    transitionEnterTimeout={ 400 }
    transitionLeaveTimeout={ 100 }
  >
    { currentDialog ? (
      <div
        key="overlay"
        className={ css.overlay }
        onClick={ onOverlayClick }
      >
        { currentDialog === 'help' ? (
          <HelpDialog />
        ) : null }
      </div>
    ) : null }
  </CSSTransitionGroup>
);

const mapStateToProps = state => ({
  currentDialog: Object.keys(state.dialogsVisibility).find(key => state.dialogsVisibility[key]),
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
