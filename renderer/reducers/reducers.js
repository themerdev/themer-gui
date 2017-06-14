import { combineReducers } from 'redux';

import { colorSetsReducer } from './colorsets';
import { focusModeReducer } from './focusmode';
import { dialogsVisibilityReducer } from './dialogsvisibility';
import { exportOptionsReducer } from './exportoptions';
import { exportProgressReducer } from './exportprogress';
import { prefillColorSetSelectionReducer } from './prefillcolorsetselection';
import { filePathReducer } from './filepath';
import { updateReducer } from './update';

import { OPEN_COMPLETE, RESET_STATE  } from '../actions';

const reducers = combineReducers({
  colorSets: colorSetsReducer,
  focusMode: focusModeReducer,
  dialogsVisibility: dialogsVisibilityReducer,
  exportOptions: exportOptionsReducer,
  exportProgress: exportProgressReducer,
  prefillColorSetSelection: prefillColorSetSelectionReducer,
  filePath: filePathReducer,
  update: updateReducer,
});

export default (state = {}, action) => {
  switch (action.type) {
    case OPEN_COMPLETE:
      return {
        filePath: action.fileData.filePath,
        ...action.fileData.contents,
      };
    case RESET_STATE:
      return reducers({}, action);
    default:
      return reducers(state, action);
  }
}
