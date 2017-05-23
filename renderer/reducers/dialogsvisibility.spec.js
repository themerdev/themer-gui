import { dialogsVisibilityReducer } from './dialogsvisibility';
import {
  helpDialogOpen,
  exportDialogOpen,
  exportProgressDialogOpen,
  closeDialogs,
} from '../actions';

describe('dialogsVisibilityReducer', () => {
  it('should initialize to all dialogs closed', () => {
    const defaultState = dialogsVisibilityReducer(undefined, {});
    expect(Object.values(defaultState).some(Boolean)).toBe(false);
  });
  it('should open the help dialog', () => {
    const newState = dialogsVisibilityReducer(undefined, helpDialogOpen());
    expect(newState.help).toBe(true);
  });
  it('should open the export dialog', () => {
    const newState = dialogsVisibilityReducer(undefined, exportDialogOpen());
    expect(newState.export).toBe(true);
  });
  it('should open the export progress dialog', () => {
    const newState = dialogsVisibilityReducer(undefined, exportProgressDialogOpen());
    expect(newState.exportProgress).toBe(true);
  });
  it('should close all dialogs', () => {
    const initialState = {
      export: true,
      help: false,
      exportProgress: false,
    };
    const expected = {
      ...initialState,
      export: false,
    };
    expect(dialogsVisibilityReducer(initialState, closeDialogs())).toEqual(expected);
  });
});
