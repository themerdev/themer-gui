import Color from 'color';
import { memoize } from 'lodash';

export const getOrDefault = memoize((maybeColor, fallback) => {
  try {
    if (maybeColor === '') { throw new Error(); }
    return Color(maybeColor).hex();
  }
  catch (e) {
    return fallback;
  }
}, (maybeColor, fallback) => `${maybeColor}:${fallback}`);

export const getBestForeground = memoize((option1, option2, background) => {
  const op1 = Color(option1);
  const op2 = Color(option2);
  const bg = Color(background);
  if (op1.contrast(bg) > op2.contrast(bg)) {
    return op1.hex();
  }
  else {
    return op2.hex();
  }
}, (option1, option2, background) => `${option1}:${option2}:${background}`);
