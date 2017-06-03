import { SAVE_COMPLETE } from '../actions';

const defaultFilePath = null;

export const filePathReducer = (state = defaultFilePath, action) => {
  switch (action.type) {
    case SAVE_COMPLETE:
      return action.filePath;
    default:
      return state;
  }
};
