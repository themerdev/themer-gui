import { SET_SHOW_TIPS_ON_STARTUP } from '../actions';

export const defaultPreferences = {
  showTipsOnStartup: true,
};

export const preferencesReducer = (state = defaultPreferences, action) => {
  switch (action.type) {
    case SET_SHOW_TIPS_ON_STARTUP:
      return {
        ...state,
        showTipsOnStartup: action.show,
      };
    default:
      return state;
  }
};
