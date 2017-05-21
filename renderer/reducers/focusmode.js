import { FOCUS_MODE_TOGGLE } from '../actions';

const defaultFocusMode = {
  dark: false,
  light: false,
};

export const focusModeReducer = (state = defaultFocusMode, action) => {
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
