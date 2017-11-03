import { SET_SHOW_TIPS_ON_STARTUP, SET_SHOW_OVERWRITE_SHADES_WARNING } from '../actions';

export const defaultPreferences = {
  showTipsOnStartup: true,
  showOverwriteShadesWarning: true,
};

export const preferencesReducer = (state = defaultPreferences, action) => {
  switch (action.type) {
    case SET_SHOW_TIPS_ON_STARTUP:
      return {
        ...state,
        showTipsOnStartup: action.show,
      };
    case SET_SHOW_OVERWRITE_SHADES_WARNING:
      return {
        ...state,
        showOverwriteShadesWarning: action.show,
      };
    default:
      return state;
  }
};
