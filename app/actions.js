// Actions

export const COLOR_CHANGE = 'COLOR_CHANGE';
export const FOCUS_MODE_TOGGLE = 'FOCUS_MODE_TOGGLE ';

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
