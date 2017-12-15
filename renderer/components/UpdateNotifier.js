import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import { PERFORM_UPDATE } from '../../common/ipcevents';
import Emoji from './Emoji';
import css from './UpdateNotifier.css';

const UpdateNotifier = ({ isUpdateAvailable }) => (
  <TransitionGroup>
    { isUpdateAvailable ? (
      <CSSTransition
        key="update-notifier"
        classNames={{
          appear: css.updateNotifierAppear,
          appearActive: css.updateNotifierAppearActive,
          enter: css.updateNotifierEnter,
          enterActive: css.updateNotifierEnterActive,
          exit: css.updateNotifierExit,
          exitActive: css.updateNotifierExitActive,
        }}
        appear
        timeout={{
          enter: 400,
          exit: 200,
        }}
      >
        <div
          className={ css.updateNotifier }
          onClick={ () => ipcRenderer.send(PERFORM_UPDATE) }
        >
          <Emoji emoji="📣" right />
          There is an update available. Click to restart and install.
        </div>
      </CSSTransition>
    ) : null }
  </TransitionGroup>
);

const mapStateToProps = state => ({
  isUpdateAvailable: state.update.available,
});

export default connect(
  mapStateToProps,
  null,
)(UpdateNotifier);
