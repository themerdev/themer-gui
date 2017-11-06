import { combineReducers } from 'redux';

import * as colorSets from './colorsets';
import { focusModeReducer } from './focusmode';
import * as dialogsVisibility from './dialogsvisibility';
import { exportOptionsReducer } from './exportoptions';
import { exportProgressReducer } from './exportprogress';
import { prefillColorSetSelectionReducer } from './prefillcolorsetselection';
import { filePathReducer } from './filepath';
import { updateReducer } from './update';
import { tipsReducer } from './tips';
import { preferencesReducer } from './preferences';

import { OPEN_COMPLETE, RESET_STATE  } from '../actions';

const reducers = combineReducers({
  colorSets: colorSets.colorSetsReducer,
  focusMode: focusModeReducer,
  dialogsVisibility: dialogsVisibility.dialogsVisibilityReducer,
  exportOptions: exportOptionsReducer,
  exportProgress: exportProgressReducer,
  prefillColorSetSelection: prefillColorSetSelectionReducer,
  filePath: filePathReducer,
  update: updateReducer,
  tips: tipsReducer,
  preferences: preferencesReducer,
});

//////////////////
// Main reducer //
//////////////////

export default (state = {}, action) => {
  switch (action.type) {
    case OPEN_COMPLETE:
      return {
        ...state,
        filePath: action.fileData.filePath,
        ...action.fileData.contents,
      };
    case RESET_STATE:
      return reducers({}, action);
    default:
      return reducers(state, action);
  }
}

///////////////
// Selectors //
///////////////

export const isDarkColorSetComplete = state => colorSets.isDarkColorSetComplete(state.colorSets);
export const isLightColorSetComplete = state => colorSets.isLightColorSetComplete(state.colorSets);
export const hasAnyColorValues = state => colorSets.hasAnyColorValues(state.colorSets);
export const areDarkShadesDistributable = state => colorSets.areDarkShadesDistributable(state.colorSets);
export const areLightShadesDistributable = state => colorSets.areLightShadesDistributable(state.colorSets);
export const hasDarkIntermediateShades = state => colorSets.hasDarkIntermediateShades(state.colorSets);
export const hasLightIntermediateShades = state => colorSets.hasLightIntermediateShades(state.colorSets);

export const isDialogOpen = state => dialogsVisibility.isDialogOpen(state.dialogsVisibility);
