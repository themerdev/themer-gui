import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeDialogs } from '../actions';

const ExportProgressDialog = ({ status, state }) => (
  <div>{ status }</div>
);

const mapStateToProps = state => state.exportProgress;

export default connect(
  mapStateToProps,
  null,
)(ExportProgressDialog);
