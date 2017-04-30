import { combineReducers } from 'redux';
import { COLOR_CHANGE, FOCUS_MODE_TOGGLE } from './actions';

const defaultColorSets = {
  dark: {
    shade0: '',
    shade1: '',
    shade2: '',
    shade3: '',
    shade4: '',
    shade5: '',
    shade6: '',
    shade7: '',
    accent0: '',
    accent1: '',
    accent2: '',
    accent3: '',
    accent4: '',
    accent5: '',
    accent6: '',
    accent7: '',
  },
  light: {
    shade0: '',
    shade1: '',
    shade2: '',
    shade3: '',
    shade4: '',
    shade5: '',
    shade6: '',
    shade7: '',
    accent0: '',
    accent1: '',
    accent2: '',
    accent3: '',
    accent4: '',
    accent5: '',
    accent6: '',
    accent7: '',
  },
};

const colorSetsReducer = (state = defaultColorSets, action) => {
  switch (action.type) {
    case COLOR_CHANGE:
      const { colorSetKey, colorKey, value } = action;
      const ret = {
        ...state,
        [colorSetKey]: {
          ...state[colorSetKey],
          [colorKey]: value,
        },
      };
      return ret;
    default:
      return state;
  }
};

const defaultFocusMode = {
  dark: false,
  light: false,
};

const focusModeReducer = (state = defaultFocusMode, action) => {
  switch (action.type) {
    case FOCUS_MODE_TOGGLE:
      const key = action.isLight ? 'light' : 'dark';
      return {
        ...state,
        [key]: !state[key],
      };
    default:
      return state;
  }
};

export default combineReducers({
  colorSets: colorSetsReducer,
  focusMode: focusModeReducer,
});