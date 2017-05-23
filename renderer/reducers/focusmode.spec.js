import { focusModeReducer } from './focusmode';
import { focusModeToggle } from '../actions';

describe('focusModeReducer', () => {
  it('should initialize with neither color set in focus mode', () => {
    const defaultState = focusModeReducer(undefined, {});
    expect(Object.values(defaultState).some(v => v)).toBe(false);
  });
  it('should toggle focus mode appropriately', () => {
    expect(focusModeReducer(undefined, focusModeToggle(false)).dark).toBe(true);
    expect(focusModeReducer(undefined, focusModeToggle(true)).dark).toBe(false);
  });
});
