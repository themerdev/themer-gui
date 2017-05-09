// Actions

export const COLOR_CHANGE = 'COLOR_CHANGE';
export const FOCUS_MODE_TOGGLE = 'FOCUS_MODE_TOGGLE ';
export const EXPORT_DIALOG_OPEN = 'EXPORT_DIALOG_OPEN';
export const HELP_DIALOG_OPEN = 'HELP_DIALOG_OPEN';
export const CLOSE_DIALOGS = 'CLOSE_DIALOGS';

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

export const helpDialogOpen = () => ({
  type: HELP_DIALOG_OPEN,
});

export const closeDialogs = () => ({
  type: CLOSE_DIALOGS,
});
