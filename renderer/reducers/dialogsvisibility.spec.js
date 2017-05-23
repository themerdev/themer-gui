import { dialogsVisibilityReducer } from './dialogsvisibility';
import {
  helpDialogOpen,
  exportDialogOpen,
  exportProgressDialogOpen,
  closeDialogs,
} from '../actions';

describe('dialogsVisibilityReducer', () => {
  it('should initialize to all dialogs closed', () => {
    expect(dialogsVisibilityReducer(undefined, {})).toMatchSnapshot();
  });
  it('should open the help dialog', () => {
    expect(dialogsVisibilityReducer(undefined, helpDialogOpen())).toMatchSnapshot();
  });
  it('should open the export dialog', () => {
    expect(dialogsVisibilityReducer(undefined, exportDialogOpen())).toMatchSnapshot();
  });
  it('should open the export progress dialog', () => {
    expect(dialogsVisibilityReducer(undefined, exportProgressDialogOpen())).toMatchSnapshot();
  });
  it('should close all dialogs', () => {
    const initialState = {
      export: true,
      help: false,
      exportProgress: true,
    };
    expect(dialogsVisibilityReducer(initialState, closeDialogs())).toMatchSnapshot();
  });
});
