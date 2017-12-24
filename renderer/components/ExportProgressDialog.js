import React from 'react';
import { connect } from 'react-redux';
import { shell } from 'electron';
import { External } from './Icons';
import Button from './Button';
import Emoji from './Emoji';
import { closeDialogs, exportReset } from '../actions';
import { COMPLETE_ERROR, COMPLETE_SUCCESS } from '../helpers/exportProgressStates';
import css from './ExportProgressDialog.css';
import {
  options,
  optionName,
  optionInstructionsUrl,
} from '../helpers/options';

const ExportProgressDialog = ({
  exportProgress,
  exportOptions,
  closeAndReset,
}) => {
  const outputsWithInstructions = Object.entries(exportOptions)
    .filter(([option, selected]) => selected)
    .map(([option, selected]) => option)
    .filter(option => option in options);
  return (
    <div className={ css.wrapper }>
      { exportProgress.status }
      { exportProgress.state === COMPLETE_ERROR ? (<Emoji emoji="😞" />) : null }
      { exportProgress.state === COMPLETE_SUCCESS ? (<Emoji emoji="🎉" />) : null }
      { exportProgress.state === COMPLETE_ERROR ? (
        <div className={ css.buttonContainer }>
          <Button onClick={ closeAndReset }>Close</Button>
          <Button primary onClick={ () => shell.openExternal('https://github.com/mjswensen/themer/issues/new') }>
            Log a bug
            <External />
          </Button>
        </div>
      ) : null }
      { exportProgress.state === COMPLETE_SUCCESS && outputsWithInstructions.length > 0 ? (
        <div className={ css.instructionsContainer }>
          Installation instructions:
          <ul>
            { outputsWithInstructions.map(option => (
              <li key={ option }>
                <Button
                  plain
                  noSpace
                  onClick={ () => shell.openExternal(optionInstructionsUrl(option)) }
                >
                  { optionName(option) }
                  <External />
                </Button>
              </li>
            )) }
          </ul>
        </div>
      ) : null }
      { exportProgress.state === COMPLETE_SUCCESS ? (
        <div className={ css.buttonContainer }>
          <Button onClick={ closeAndReset }>Done</Button>
          <Button primary onClick={ () => shell.showItemInFolder(exportProgress.exportedPath) }>Show exported files</Button>
        </div>
      ) : null }
    </div>
  );
};

const mapStateToProps = state => ({
  exportProgress: state.exportProgress,
  exportOptions: state.exportOptions,
});
const mapDispatchToProps = dispatch => ({
  closeAndReset: () => {
    dispatch(closeDialogs());
    dispatch(exportReset());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExportProgressDialog);
