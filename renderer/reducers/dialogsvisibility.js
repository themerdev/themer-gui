import {
  TIPS_DIALOG_OPEN,
  EXPORT_DIALOG_OPEN,
  EXPORT_PROGRESS_DIALOG_OPEN,
  CLOSE_DIALOGS,
  PREFILL_DIALOG_OPEN,
  HELP_DIALOG_OPEN,
} from '../actions';

const defaultDialogsVisibility = {
  export: false,
  tips: false,
  exportProgress: false,
  help: false,
};

export const dialogsVisibilityReducer = (state = defaultDialogsVisibility, action) => {
  switch (action.type) {
    case EXPORT_DIALOG_OPEN:
      return {
        ...state,
        export: true,
      };
    case TIPS_DIALOG_OPEN:
      return {
        ...state,
        tips: true,
      };
    case EXPORT_PROGRESS_DIALOG_OPEN:
      return {
        ...state,
        exportProgress: true,
      };
    case PREFILL_DIALOG_OPEN:
      return {
        ...state,
        prefill: true,
      };
    case HELP_DIALOG_OPEN:
      return {
        ...state,
        help: true,
      };
    case CLOSE_DIALOGS:
      return Object.keys(state).reduce((reduced, key) => ({ ...reduced, [key]: false }), {});
    default:
      return state;
  }
};
