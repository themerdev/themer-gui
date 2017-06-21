import { preferencesReducer } from './preferences';
import { setShowTipsOnStartup } from '../actions';

describe('preferencesReducer', () => {
  it('should initialize with showing tips on startup', () => {
    expect(preferencesReducer(undefined, {}).showTipsOnStartup).toBe(true);
  });
  it('should toggle showing tips on startup appropriately', () => {
    expect(preferencesReducer(undefined, setShowTipsOnStartup(false))).toMatchSnapshot();
    expect(preferencesReducer(undefined, setShowTipsOnStartup(true))).toMatchSnapshot();
  });
});
