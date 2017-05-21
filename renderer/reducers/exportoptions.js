import { SET_EXPORT_OPTION } from '../actions';

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

export const exportOptionsReducer = (state = defaultExportOptions, action) => {
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
