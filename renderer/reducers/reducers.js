import { combineReducers } from 'redux';

import { colorSetsReducer } from './colorsets';
import { focusModeReducer } from './focusmode';
import { dialogsVisibilityReducer } from './dialogsvisibility';
import { exportOptionsReducer } from './exportoptions';
import { exportProgressReducer } from './exportprogress';
import { prefillColorSetSelectionReducer } from './prefillcolorsetselection';
import { filePathReducer } from './filepath';

export default combineReducers({
  colorSets: colorSetsReducer,
  focusMode: focusModeReducer,
  dialogsVisibility: dialogsVisibilityReducer,
  exportOptions: exportOptionsReducer,
  exportProgress: exportProgressReducer,
  prefillColorSetSelection: prefillColorSetSelectionReducer,
  filePath: filePathReducer,
});
