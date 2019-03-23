import React from 'react';
import path from 'path';
import { connect } from 'react-redux';
import classnames from 'classnames';
import ColorSet from './ColorSet';
import Dialogs from './Dialogs';
import UpdateNotifier from './UpdateNotifier';
import css from './App.css';
import DeprecationNotice from './DeprecationNotice';

const App = ({ isDialogOpen, title, isFocusMode }) => (
  <section className={ css.gui }>
    <div className={ classnames(
      css.titleBar, {
        [css.focusMode]: isFocusMode,
        [css.hidden]: isDialogOpen,
      }
    ) }>{ title }</div>
    <div className={ classnames(css.mainUiLayer, { [css.obscured]: isDialogOpen }) }>
      <div className={ css.colorSetContainer }>
        <ColorSet />
        <ColorSet light={ true } />
      </div>
      <DeprecationNotice />
      <UpdateNotifier />
    </div>
    <Dialogs />
  </section>
);

const mapStateToProps = state => ({
  isDialogOpen: Object.values(state.dialogsVisibility).some(v => v),
  title: !!state.filePath ? path.basename(state.filePath, '.thmr') : 'New Theme',
  isFocusMode: Object.values(state.focusMode).some(v => v),
});

export default connect(
  mapStateToProps,
)(App);
