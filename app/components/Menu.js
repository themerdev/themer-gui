import React from 'react';
import Button from './Button';
import { connect } from 'react-redux';
import { exportDialogOpen } from '../actions';
import css from './Menu.css';

const Menu = ({ onExportClick }) => (
  <div className={ css.container }>
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
});

export default connect(
  null,
  mapDispatchToProps,
)(Menu);
