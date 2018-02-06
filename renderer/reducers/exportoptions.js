import { SET_EXPORT_OPTION } from '../actions';

const defaultExportOptions = {
  alfred: false,
  chrome: false,
  hyper: false,
  iterm: false,
  terminal: false,
  atomSyntax: false,
  atomUi: false,
  sublimeText: false,
  vim: false,
  vimLightline: false,
  vsCode: false,
  xcode: false,
  bbEdit: false,
  conEmu: false,
  wallpaperBlockWave: false,
  wallpaperOctagon: false,
  wallpaperTriangles: false,
  wallpaperTrianglify: false,
  slack: false,
  cmd: false,
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
