import React from 'react';
import classnames from 'classnames';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { connect } from 'react-redux';
import { closeDialogs } from '../actions';
import HelpDialog from './HelpDialog';
import css from './Dialogs.css';

const overlayId = 'overlay';

const Dialogs = ({
  currentDialog,
  onOverlayClick,
}) => (
  <CSSTransitionGroup
    transitionName={{
      appear: css.dialogAppear,
      appearActive: css.dialogAppearActive,
      enter: css.dialogEnter,
      enterActive: css.dialogEnterActive,
      leave: css.dialogLeave,
      leaveActive: css.dialogLeaveActive,
    }}
    transitionAppear
    transitionAppearTimeout={ 400 }
    transitionEnterTimeout={ 400 }
    transitionLeaveTimeout={ 200 }
  >
    { currentDialog ? (
      <div
        id={ overlayId }
        key="overlay"
        className={ css.overlay }
        onClick={ onOverlayClick }
      >
        { currentDialog === 'help' ? (
          <HelpDialog key="help-dialog" />
        ) : null }
      </div>
    ) : null }
  </CSSTransitionGroup>
);

const mapStateToProps = state => ({
  currentDialog: Object.keys(state.dialogsVisibility).find(key => state.dialogsVisibility[key]),
});
const mapDispatchToProps = dispatch => ({
  onOverlayClick: (evt) => {
    if (evt.target.id === overlayId) {
      dispatch(closeDialogs());
    }
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dialogs);
