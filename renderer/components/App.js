import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import ColorSet from './ColorSet';
import Dialogs from './Dialogs';
import Menu from './Menu';
import css from './App.css';

const App = ({ dialogOpen }) => (
  <section className={ css.gui }>
    <div className={ classnames(css.mainUiLayer, { [css.obscured]: dialogOpen }) }>
      <div className={ css.colorSetContainer }>
        <ColorSet />
        <ColorSet light={ true } />
      </div>
      <Menu />
    </div>
    <Dialogs />
  </section>
);

const mapStateToProps = state => ({
  dialogOpen: Object.values(state.dialogsVisibility).some(v => v),
});

export default connect(
  mapStateToProps,
)(App);
