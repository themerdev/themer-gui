import { PREFILL_COLOR_SET_SELECTION_CHANGE } from '../actions';

const defaultPrefillColorSetSelection = null;

export const prefillColorSetSelectionReducer = (state = defaultPrefillColorSetSelection, action) => {
  switch (action.type) {
    case PREFILL_COLOR_SET_SELECTION_CHANGE:
      return action.selection;
    default:
      return state;
  }
};
