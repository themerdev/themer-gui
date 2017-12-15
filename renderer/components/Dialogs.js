import React from 'react';
import classnames from 'classnames';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import ExportDialog from './ExportDialog';
import ExportProgressDialog from './ExportProgressDialog';
import PrefillDialog from './PrefillDialog';
import TipsDialog from './TipsDialog';
import HelpDialog from './HelpDialog';
import { IN_PROGRESS } from '../helpers/exportProgressStates';
import css from './Dialogs.css';

const overlayId = 'overlay';

const Dialogs = ({ currentDialog }) => (
  <TransitionGroup>
    { currentDialog ? (
      <CSSTransition
        key={ currentDialog }
        classNames={{
          appear: css.dialogAppear,
          appearActive: css.dialogAppearActive,
          enter: css.dialogEnter,
          enterActive: css.dialogEnterActive,
          exit: css.dialogExit,
          exitActive: css.dialogExitActive,
        }}
        appear
        timeout={{
          enter: 400,
          exit: 200,
        }}
      >
        <div
          id={ overlayId }
          key="overlay"
          className={ css.overlay }
        >
          { currentDialog === 'tips' ? (
            <TipsDialog key="tips-dialog" />
          ) : null }
          { currentDialog === 'export' ? (
            <ExportDialog key="export-dialog" />
          ) : null }
          { currentDialog === 'exportProgress' ? (
            <ExportProgressDialog key="export-progress-dialog" />
          ) : null }
          { currentDialog === 'prefill' ? (
            <PrefillDialog key="prefill-dialog" />
          ) : null }
          { currentDialog === 'help' ? (
            <HelpDialog key="help-dialog" />
          ) : null }
        </div>
      </CSSTransition>
    ) : null }
  </TransitionGroup>
);

const mapStateToProps = state => ({
  currentDialog: Object.keys(state.dialogsVisibility).find(key => state.dialogsVisibility[key]),
});

export default connect(
  mapStateToProps,
  null,
)(Dialogs);
