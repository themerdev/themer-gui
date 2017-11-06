import {
  defaultColorSet,
  colorSetsReducer,
  isDarkColorSetComplete,
  isLightColorSetComplete,
  hasAnyColorValues,
  areDarkShadesDistributable,
  areLightShadesDistributable,
  hasDarkIntermediateShades,
  hasLightIntermediateShades,
} from './colorsets';
import { colorChange, prefillWithColorSet, distributeShades } from '../actions';

describe('color sets', () => {
  it('should initialize with all required keys and empty values', () => {
    expect(colorSetsReducer(undefined, {})).toMatchSnapshot();
  });
  it('should properly update colors', () => {
    const state0 = colorSetsReducer(undefined, {});
    const state1 = colorSetsReducer(state0, colorChange('dark', 'shade2', '#555'));
    const state2 = colorSetsReducer(state1, colorChange('light', 'accent0', 'red'));
    expect(state2).toMatchSnapshot();
  });
  it('should support setting the color set all at once', () => {
    const initialState = colorSetsReducer(undefined, colorChange('light', 'accent0', 'red'));
    const prefilledState = colorSetsReducer(initialState, prefillWithColorSet({ dark: { shade0: '#222' }}));
    expect(prefilledState).toMatchSnapshot();
  });
  it('should support distributing shades', () => {
    const noOpState = colorSetsReducer(undefined, distributeShades());
    expect(noOpState).toMatchSnapshot();
    const distributedState = colorSetsReducer({
      dark: {
        ...defaultColorSet.dark,
        shade0: '#000000',
        shade7: '#ffffff',
      },
      light: {
        ...defaultColorSet.light,
        shade0: '#ffffff',
        shade7: '#000000',
      },
    }, distributeShades());
    expect(distributedState).toMatchSnapshot();
  });
  it('should be able to tell if a color set is complete', () => {
    const state = {
      dark: {
        shade0: '#000000',
        shade1: '#000000',
        shade2: '#000000',
        shade3: '#000000',
        shade4: '#000000',
        shade5: '#000000',
        shade6: '#000000',
        shade7: '#000000',
        accent0: '#000000',
        accent1: '#000000',
        accent2: '#000000',
        accent3: '#000000',
        accent4: '#000000',
        accent5: '#000000',
        accent6: '#000000',
        accent7: '#000000',
      },
      light: {
        ...defaultColorSet.light,
        shade0: '#ffffff',
        shade1: '#ffffff',
        shade5: '#ffffff',
        accent2: '#ffffff',
        accent6: '#ffffff',
        accent7: '#ffffff',
      },
    };
    expect(isDarkColorSetComplete(state)).toBe(true);
    expect(isLightColorSetComplete(state)).toBe(false);
  });
  it('should be able to tell if any values exist in either colors set', () => {
    expect(hasAnyColorValues(defaultColorSet)).toBe(false);
    expect(hasAnyColorValues({
      ...defaultColorSet,
      dark: {
        ...defaultColorSet.dark,
        shade3: '#ccc',
      },
    })).toBe(true);
  });
  it('should be able to tell if the color set shades are distributable', () => {
    const state = {
      ...defaultColorSet,
      dark: {
        ...defaultColorSet.dark,
        shade0: '#000',
        shade7: '#fff',
      },
    };
    expect(areDarkShadesDistributable(state)).toBe(true);
    expect(areLightShadesDistributable(state)).toBe(false);
  });
  it('should be able to tell if there are any shades between 0 and 7', () => {
    const state = {
      ...defaultColorSet,
      dark: {
        ...defaultColorSet.dark,
        shade3: '#000',
      },
    };
    expect(hasDarkIntermediateShades(state)).toBe(true);
    expect(hasLightIntermediateShades(state)).toBe(false);
  });
});
