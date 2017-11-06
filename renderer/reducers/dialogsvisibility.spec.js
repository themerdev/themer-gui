import { dialogsVisibilityReducer, isDialogOpen } from './dialogsvisibility';
import {
  tipsDialogOpen,
  exportDialogOpen,
  exportProgressDialogOpen,
  prefillDialogOpen,
  helpDialogOpen,
  closeDialogs,
} from '../actions';

describe('dialogs visibility', () => {
  it('should initialize to all dialogs closed', () => {
    expect(dialogsVisibilityReducer(undefined, {})).toMatchSnapshot();
  });
  it('should open the tips dialog', () => {
    expect(dialogsVisibilityReducer(undefined, tipsDialogOpen())).toMatchSnapshot();
  });
  it('should open the export dialog', () => {
    expect(dialogsVisibilityReducer(undefined, exportDialogOpen())).toMatchSnapshot();
  });
  it('should open the export progress dialog', () => {
    expect(dialogsVisibilityReducer(undefined, exportProgressDialogOpen())).toMatchSnapshot();
  });
  it('should open the prefill dialog', () => {
    expect(dialogsVisibilityReducer(undefined, prefillDialogOpen())).toMatchSnapshot();
  });
  it('should open the help dialog', () => {
    expect(dialogsVisibilityReducer(undefined, helpDialogOpen())).toMatchSnapshot();
  });
  it('should close all dialogs', () => {
    const initialState = {
      export: true,
      tips: false,
      exportProgress: true,
      help: false,
    };
    expect(dialogsVisibilityReducer(initialState, closeDialogs())).toMatchSnapshot();
  });
  it('should know when any dialog is open', () => {
    expect(isDialogOpen({ export: false, tips: false })).toBe(false);
    expect(isDialogOpen({ export: true, tips: false })).toBe(true);
  });
});
