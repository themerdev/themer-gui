import { exportOptionsReducer } from './exportoptions';
import { setExportOption } from '../actions';

describe('exportOptionsReducer', () => {
  it('should initialize to no options set', () => {
    const defaultState = exportOptionsReducer(undefined, {});
    expect(Object.values(defaultState).some(Boolean)).toBe(false);
  });
  it('should properly set an option', () => {
    const initialState = {
      iterm: false,
      hyper: false,
      terminal: false,
    };
    const expected = {
      ...initialState,
      hyper: true,
    };
    expect(exportOptionsReducer(initialState, setExportOption('hyper', true))).toEqual(expected);
  });
});
