import { SET_EXPORT_OPTION } from '../actions';

const defaultExportOptions = {
  alfred: false,
  hyper: false,
  iterm: false,
  terminal: false,
  atomSyntax: false,
  sublimeText: false,
  vim: false,
  vimLightline: false,
  vsCode: false,
  xcode: false,
  wallpaperBlockWave: false,
  wallpaperOctagon: false,
  wallpaperTriangles: false,
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
