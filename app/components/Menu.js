import React from 'react';
import Button from './Button';
import { connect } from 'react-redux';
import { getOrDefault } from '../helpers/color';
import { exportDialogOpen, helpDialogOpen } from '../actions';
import css from './Menu.css';

const Menu = ({ darkCompleted, lightCompleted, onExportClick, onHelpClick }) => (
  <div className={ css.container }>
    <Button
      plain
      onClick={ onHelpClick }
    >Help</Button>
    <Button
      primary
      disabled={ !(darkCompleted || lightCompleted) }
      onClick={ onExportClick }
    >{ getExportButtonMessaging(darkCompleted, lightCompleted) }</Button>
  </div>
);

const getExportButtonMessaging = (darkCompleted, lightCompleted) => {
  if (darkCompleted && lightCompleted) {
    return 'Export dark/light themes...';
  }
  else if (darkCompleted) {
    return 'Export dark themes...';
  }
  else if (lightCompleted) {
    return 'Export light themes...';
  }
  else {
    return 'Export themes...';
  }
};

const areAllParseable = inputtedColors => inputtedColors.every(inputtedColor => !!getOrDefault(inputtedColor));

const mapStateToProps = state => ({
  darkCompleted: areAllParseable(Object.values(state.colorSets.dark)),
  lightCompleted: areAllParseable(Object.values(state.colorSets.light)),
});
const mapDispatchToProps = dispatch => ({
  onExportClick: () => {
    dispatch(exportDialogOpen());
  },
  onHelpClick: () => {
    dispatch(helpDialogOpen());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
