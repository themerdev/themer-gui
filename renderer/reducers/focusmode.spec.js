import { focusModeReducer } from './focusmode';
import { focusModeToggle } from '../actions';

describe('focusModeReducer', () => {
  it('should initialize with neither color set in focus mode', () => {
    expect(focusModeReducer(undefined, {})).toMatchSnapshot();
  });
  it('should toggle focus mode appropriately', () => {
    expect(focusModeReducer(undefined, focusModeToggle(false)).dark).toMatchSnapshot();
    expect(focusModeReducer(undefined, focusModeToggle(true)).dark).toMatchSnapshot();
  });
});
