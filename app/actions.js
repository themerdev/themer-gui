// Actions

export const COLOR_CHANGE = 'COLOR_CHANGE';

// Action generators

export const colorChange = (colorSetKey, colorKey, value) => ({
  type: COLOR_CHANGE,
  colorSetKey,
  colorKey,
  value,
});
