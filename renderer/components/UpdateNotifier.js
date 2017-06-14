import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import { PERFORM_UPDATE } from '../../common/ipcevents';
import Emoji from './Emoji';
import css from './UpdateNotifier.css';

const UpdateNotifier = ({ isUpdateAvailable }) => (
  <CSSTransitionGroup
    transitionName={{
      appear: css.updateNotifierAppear,
      appearActive: css.updateNotifierAppearActive,
      enter: css.updateNotifierEnter,
      enterActive: css.updateNotifierEnterActive,
      leave: css.updateNotifierLeave,
      leaveActive: css.updateNotifierLeaveActive,
    }}
    transitionAppear
    transitionAppearTimeout={ 400 }
    transitionEnterTimeout={ 400 }
    transitionLeaveTimeout={ 200 }
  >
    { isUpdateAvailable ? (
      <div
        className={ css.updateNotifier }
        onClick={ () => ipcRenderer.send(PERFORM_UPDATE) }
      >
        <Emoji emoji="📣" right />
        There is an update available. Click to restart and install.
      </div>
    ) : null }
  </CSSTransitionGroup>
);

const mapStateToProps = state => ({
  isUpdateAvailable: state.update.available,
});

export default connect(
  mapStateToProps,
  null,
)(UpdateNotifier);
