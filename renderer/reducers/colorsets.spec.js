import { colorSetsReducer } from './colorsets';
import { colorChange } from '../actions';

describe('colorSetsReducer', () => {

  it('should initialize with all required keys', () => {
    const defaultState = colorSetsReducer(undefined, {});
    const requiredKeys = [
      'shade0',
      'shade1',
      'shade2',
      'shade3',
      'shade4',
      'shade5',
      'shade6',
      'shade7',
      'accent0',
      'accent1',
      'accent2',
      'accent3',
      'accent4',
      'accent5',
      'accent6',
      'accent7',
    ];
    expect(Object.keys(defaultState.dark)).toEqual(requiredKeys);
    expect(Object.keys(defaultState.light)).toEqual(requiredKeys);
  });

  it('should initialize with empty values', () => {
    const defaultState = colorSetsReducer(undefined, {});
    const allValues = [
      ...Object.values(defaultState.dark),
      ...Object.values(defaultState.light),
    ];
    expect(allValues.every(v => v === '')).toBe(true);
  });

  it('should properly update a given color', () => {
    const initialState = {
      dark: {
        shade0: '#333',
        shade1: '',
        shade2: '',
        shade3: '',
        shade4: '',
        shade5: '',
        shade6: '',
        shade7: '',
        accent0: 'red',
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
    const expected = {
      dark: {
        ...initialState.dark,
        shade2: '#555',
      },
      light: initialState.light,
    };
    expect(colorSetsReducer(initialState, colorChange('dark', 'shade2', '#555'))).toEqual(expected);
  });
});
