import { colorSetsReducer } from './colorsets';
import { colorChange, prefillWithColorSet } from '../actions';

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
});
