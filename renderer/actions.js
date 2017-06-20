// Actions

export const COLOR_CHANGE = 'COLOR_CHANGE';
export const FOCUS_MODE_TOGGLE = 'FOCUS_MODE_TOGGLE ';
export const EXPORT_DIALOG_OPEN = 'EXPORT_DIALOG_OPEN';
export const TIPS_DIALOG_OPEN = 'TIPS_DIALOG_OPEN';
export const CLOSE_DIALOGS = 'CLOSE_DIALOGS';
export const SET_EXPORT_OPTION = 'SET_EXPORT_OPTION';
export const EXPORT_PROGRESS_DIALOG_OPEN = 'EXPORT_PROGRESS_DIALOG_OPEN';
export const EXPORT_CANCELLED = 'EXPORT_CANCELLED';
export const EXPORT_PROGRESS = 'EXPORT_PROGRESS';
export const EXPORT_ERROR = 'EXPORT_ERROR';
export const EXPORT_COMPLETE = 'EXPORT_COMPLETE';
export const EXPORT_RESET = 'EXPORT_RESET';
export const PREFILL_DIALOG_OPEN = 'PREFILL_DIALOG_OPEN';
export const PREFILL_COLOR_SET_SELECTION_CHANGE = 'PREFILL_COLOR_SET_SELECTION_CHANGE';
export const PREFILL_WITH_COLOR_SET = 'PREFILL_WITH_COLOR_SET';
export const SAVE_COMPLETE = 'SAVE_COMPLETE';
export const OPEN_COMPLETE = 'OPEN_COMPLETE';
export const RESET_STATE = 'RESET_STATE';
export const UPDATE_READY = 'UPDATE_READY';
export const NEXT_TIP = 'NEXT_TIP';
export const PREVIOUS_TIP = 'PREVIOUS_TIP';

// Action generators

export const colorChange = (colorSetKey, colorKey, value) => ({
  type: COLOR_CHANGE,
  colorSetKey,
  colorKey,
  value,
});

export const focusModeToggle = (isLight) => ({
  type: FOCUS_MODE_TOGGLE,
  isLight,
});

export const exportDialogOpen = () => ({
  type: EXPORT_DIALOG_OPEN,
});

export const tipsDialogOpen = () => ({
  type: TIPS_DIALOG_OPEN,
});

export const closeDialogs = () => ({
  type: CLOSE_DIALOGS,
});

export const setExportOption = (option, value) => ({
  type: SET_EXPORT_OPTION,
  option,
  value,
});

export const exportProgressDialogOpen = () => ({
  type: EXPORT_PROGRESS_DIALOG_OPEN,
});

export const exportCancelled = () => ({
  type: EXPORT_CANCELLED,
});

export const exportProgress = (status) => ({
  type: EXPORT_PROGRESS,
  status,
});

export const exportError = (message) => ({
  type: EXPORT_ERROR,
  message,
});

export const exportComplete = (exportedPath) => ({
  type: EXPORT_COMPLETE,
  exportedPath,
});

export const exportReset = () => ({
  type: EXPORT_RESET,
});

export const prefillDialogOpen = () => ({
  type: PREFILL_DIALOG_OPEN,
});

export const prefillColorSetSelectionChange = (selection) => ({
  type: PREFILL_COLOR_SET_SELECTION_CHANGE,
  selection,
});

export const prefillWithColorSet = (colorSet) => ({
  type: PREFILL_WITH_COLOR_SET,
  colorSet,
});

export const saveComplete = (filePath) => ({
  type: SAVE_COMPLETE,
  filePath,
});

export const openComplete = (fileData) => ({
  type: OPEN_COMPLETE,
  fileData,
});

export const resetState = () => ({
  type: RESET_STATE,
});

export const updateReady = () => ({
  type: UPDATE_READY,
});

export const nextTip = () => ({
  type: NEXT_TIP,
});

export const previousTip = () => ({
  type: PREVIOUS_TIP,
});
