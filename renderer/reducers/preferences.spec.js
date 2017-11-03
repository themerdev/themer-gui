import { preferencesReducer } from './preferences';
import { setShowTipsOnStartup, setShowOverwriteShadesWarning } from '../actions';

describe('preferencesReducer', () => {
  it('should initialize with showing tips on startup', () => {
    expect(preferencesReducer(undefined, {}).showTipsOnStartup).toBe(true);
  });
  it('should toggle showing tips on startup appropriately', () => {
    expect(preferencesReducer(undefined, setShowTipsOnStartup(false))).toMatchSnapshot();
    expect(preferencesReducer(undefined, setShowTipsOnStartup(true))).toMatchSnapshot();
  });
  it('should initialize with showing overwrite shades warning', () => {
    expect(preferencesReducer(undefined, {}).showOverwriteShadesWarning).toBe(true);
  });
  it('should toggle showing overwrite shades warning appropriately', () => {
    expect(preferencesReducer(undefined, setShowOverwriteShadesWarning(false))).toMatchSnapshot();
    expect(preferencesReducer(undefined, setShowOverwriteShadesWarning(true))).toMatchSnapshot();
  });
});
