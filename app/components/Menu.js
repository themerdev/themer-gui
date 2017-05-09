import React from 'react';
import Button from './Button';
import { connect } from 'react-redux';
import { exportDialogOpen, helpDialogOpen } from '../actions';
import css from './Menu.css';

const Menu = ({ onExportClick, onHelpClick }) => (
  <div className={ css.container }>
    <Button
      plain
      onClick={ onHelpClick }
    >Help</Button>
    <Button
      primary
      onClick={ onExportClick }
    >Export...</Button>
  </div>
);

const mapDispatchToProps = dispatch => ({
  onExportClick: () => {
    dispatch(exportDialogOpen());
  },
  onHelpClick: () => {
    dispatch(helpDialogOpen());
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(Menu);
