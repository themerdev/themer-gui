import React from 'react';
import path from 'path';
import { connect } from 'react-redux';
import classnames from 'classnames';
import ColorSet from './ColorSet';
import Dialogs from './Dialogs';
import css from './App.css';

const App = ({ dialogOpen, title }) => (
  <section className={ css.gui }>
    <div className={ css.titleBar }>{ title }</div>
    <div className={ classnames(css.mainUiLayer, { [css.obscured]: dialogOpen }) }>
      <div className={ css.colorSetContainer }>
        <ColorSet />
        <ColorSet light={ true } />
      </div>
    </div>
    <Dialogs />
  </section>
);

const mapStateToProps = state => ({
  dialogOpen: Object.values(state.dialogsVisibility).some(v => v),
  title: !!state.filePath ? path.basename(state.filePath, '.themer') : 'New Theme', // TODO: get ext from package.json
});

export default connect(
  mapStateToProps,
)(App);
