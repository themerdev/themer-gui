import { combineReducers } from 'redux';
import {
  COLOR_CHANGE,
  FOCUS_MODE_TOGGLE,
  EXPORT_DIALOG_OPEN,
  HELP_DIALOG_OPEN,
  CLOSE_DIALOGS,
  SET_EXPORT_OPTION,
  EXPORT_PROGRESS_DIALOG_OPEN,
  EXPORT_CANCELLED,
  EXPORT_PROGRESS,
  EXPORT_ERROR,
  EXPORT_COMPLETE,
} from './actions';
import {
  NOT_STARTED,
  IN_PROGRESS,
  COMPLETE_ERROR,
  COMPLETE_SUCCESS,
} from './helpers/exportProgressStates';

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

const defaultDialogsVisibility = {
  export: false,
  help: false,
  exportProgress: false,
};

const dialogsVisibilityReducer = (state = defaultDialogsVisibility, action) => {
  switch (action.type) {
    case EXPORT_DIALOG_OPEN:
      return {
        ...state,
        export: true,
      };
    case HELP_DIALOG_OPEN:
      return {
        ...state,
        help: true,
      };
    case EXPORT_PROGRESS_DIALOG_OPEN:
      return {
        ...state,
        exportProgress: true,
      };
    case CLOSE_DIALOGS:
      return Object.keys(state).reduce((reduced, key) => ({ ...reduced, [key]: false }), {});
    default:
      return state;
  }
};

const defaultExportOptions = {
  hyper: false,
  iterm: false,
  terminal: false,
  atomSyntax: false,
  sublimeText: false,
  vim: false,
  vimLightline: false,
  wallpaperBlockWave: false,
  wallpaperOctagon: false,
  slack: false,
};

const exportOptionsReducer = (state = defaultExportOptions, action) => {
  switch (action.type) {
    case SET_EXPORT_OPTION:
      return {
        ...state,
        [action.option]: action.value,
      };
    default:
      return state;
  }
};

const defaultExportProgress = {
  status: '',
  state: NOT_STARTED,
  exportedPath: null,
};

const exportProgressReducer = (state = defaultExportProgress, action) => {
  switch (action.type) {
    case EXPORT_CANCELLED:
      return defaultExportProgress;
    case EXPORT_PROGRESS:
      return {
        ...defaultExportProgress,
        status: action.status,
        state: IN_PROGRESS,
      };
    case EXPORT_ERROR:
      return {
        ...defaultExportProgress,
        status: `${action.message} 😞`,
        state: COMPLETE_ERROR,
      };
    case EXPORT_COMPLETE:
      return {
        status: `Your themes have been exported to ${action.exportedPath} 🎉`,
        state: COMPLETE_SUCCESS,
        exportedPath: action.exportedPath,
      };
    default:
      return state;
  }
};

export default combineReducers({
  colorSets: colorSetsReducer,
  focusMode: focusModeReducer,
  dialogsVisibility: dialogsVisibilityReducer,
  exportOptions: exportOptionsReducer,
  exportProgress: exportProgressReducer,
});
