import { COLOR_CHANGE, PREFILL_WITH_COLOR_SET } from '../actions';

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

export const colorSetsReducer = (state = defaultColorSets, action) => {
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
    case PREFILL_WITH_COLOR_SET:
      return {
        dark: {
          ...defaultColorSets.dark,
          ...action.colorSet.dark,
        },
        light: {
          ...defaultColorSets.light,
          ...action.colorSet.light,
        },
      };
    default:
      return state;
  }
};
