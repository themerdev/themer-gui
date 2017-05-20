import React from 'react';
import { connect } from 'react-redux';
import { shell } from 'electron';
import { External } from './Icons';
import Button from './Button';
import Emoji from './Emoji';
import { closeDialogs } from '../actions';
import { COMPLETE_ERROR, COMPLETE_SUCCESS } from '../helpers/exportProgressStates';
import css from './ExportProgressDialog.css';

const ExportProgressDialog = ({
  status,
  state,
  exportedPath,
  closeDialogs,
}) => (
  <div>
    { status }
    { state === COMPLETE_ERROR ? (<Emoji emoji="😞" />) : null }
    { state === COMPLETE_SUCCESS ? (<Emoji emoji="🎉" />) : null }
    { state === COMPLETE_ERROR ? (
      <div className={ css.buttonContainer }>
        <Button onClick={ closeDialogs }>Close</Button>
        <Button primary onClick={ () => shell.openExternal('https://github.com/mjswensen/themer/issues/new') }>
          Log a bug
          <External />
        </Button>
      </div>
    ) : null }
    { state === COMPLETE_SUCCESS ? (
      <div className={ css.buttonContainer }>
        <Button onClick={ closeDialogs }>Close</Button>
        <Button primary onClick={ () => shell.showItemInFolder(exportedPath) }>Show exported files</Button>
      </div>
    ) : null }
  </div>
);

const mapStateToProps = state => state.exportProgress;
const mapDispatchToProps = { closeDialogs };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExportProgressDialog);
