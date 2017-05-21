import {
  EXPORT_CANCELLED,
  EXPORT_PROGRESS,
  EXPORT_ERROR,
  EXPORT_COMPLETE,
  EXPORT_RESET,
} from '../actions';
import {
  NOT_STARTED,
  IN_PROGRESS,
  COMPLETE_ERROR,
  COMPLETE_SUCCESS,
} from '../helpers/exportProgressStates';

const defaultExportProgress = {
  status: '',
  state: NOT_STARTED,
  exportedPath: null,
};

export const exportProgressReducer = (state = defaultExportProgress, action) => {
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
        status: action.message,
        state: COMPLETE_ERROR,
      };
    case EXPORT_COMPLETE:
      return {
        status: `Your themes have been exported to ${action.exportedPath}`,
        state: COMPLETE_SUCCESS,
        exportedPath: action.exportedPath,
      };
    case EXPORT_RESET:
      return defaultExportProgress;
    default:
      return state;
  }
};
