import { colorSetsReducer } from './colorsets';
import { colorChange, prefillWithColorSet, distributeShades } from '../actions';

describe('colorSetsReducer', () => {
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
        shade0: '#000000',
        shade1: '',
        shade2: '',
        shade3: '',
        shade4: '',
        shade5: '',
        shade6: '',
        shade7: '#ffffff',
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
        shade0: '#ffffff',
        shade1: '',
        shade2: '',
        shade3: '',
        shade4: '',
        shade5: '',
        shade6: '',
        shade7: '#000000',
        accent0: '',
        accent1: '',
        accent2: '',
        accent3: '',
        accent4: '',
        accent5: '',
        accent6: '',
        accent7: '',
      },
    }, distributeShades());
    expect(distributedState).toMatchSnapshot();
  });
});
