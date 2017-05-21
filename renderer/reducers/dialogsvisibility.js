import {
  HELP_DIALOG_OPEN,
  EXPORT_DIALOG_OPEN,
  EXPORT_PROGRESS_DIALOG_OPEN,
  CLOSE_DIALOGS,
} from '../actions';

const defaultDialogsVisibility = {
  export: false,
  help: false,
  exportProgress: false,
};

export const dialogsVisibilityReducer = (state = defaultDialogsVisibility, action) => {
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
