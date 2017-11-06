import { fromPairs } from 'lodash';
import { distribute, getOrDefault } from '../helpers/color';
import { COLOR_CHANGE, PREFILL_WITH_COLOR_SET, DISTRIBUTE_SHADES } from '../actions';

export const defaultColorSet = {
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

/////////////
// Helpers //
/////////////

const distributeColorSet = colorSet => {
  if (colorSet.shade0 && colorSet.shade7) {
    return {
      ...colorSet,
      ...fromPairs(distribute(colorSet.shade0, colorSet.shade7).map((hex, i) => [`shade${i+1}`, hex])),
    };
  }
};

const areAllParseable = inputtedColors => inputtedColors.every(inputtedColor => !!getOrDefault(inputtedColor));

const isColorSetComplete = colorSet => areAllParseable(Object.values(colorSet));

const areShadesDistributable = colorSet => areAllParseable([
  colorSet.shade0,
  colorSet.shade7,
]);

const hasIntermediateShades = colorSet => [
  colorSet.shade1,
  colorSet.shade2,
  colorSet.shade3,
  colorSet.shade4,
  colorSet.shade5,
  colorSet.shade6,
].some(Boolean);

/////////////
// Reducer //
/////////////

export const colorSetsReducer = (state = defaultColorSet, action) => {
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
          ...defaultColorSet.dark,
          ...action.colorSet.dark,
        },
        light: {
          ...defaultColorSet.light,
          ...action.colorSet.light,
        },
      };
    case DISTRIBUTE_SHADES:
      return {
        dark: {
          ...state.dark,
          ...distributeColorSet(state.dark),
        },
        light: {
          ...state.light,
          ...distributeColorSet(state.light),
        },
      };
    default:
      return state;
  }
};

///////////////
// Selectors //
///////////////

export const isDarkColorSetComplete = state => isColorSetComplete(state.dark);
export const isLightColorSetComplete = state => isColorSetComplete(state.light);

export const hasAnyColorValues = state => [
  ...Object.values(state.dark),
  ...Object.values(state.light),
].some(Boolean);

export const areDarkShadesDistributable = state => areShadesDistributable(state.dark);
export const areLightShadesDistributable = state => areShadesDistributable(state.light);

export const hasDarkIntermediateShades = state => hasIntermediateShades(state.dark);
export const hasLightIntermediateShades = state => hasIntermediateShades(state.light);
