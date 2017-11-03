import Color from 'color';
import { memoize, range } from 'lodash';

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

export const distribute = (color1, color2, count = 8) => {
  const [r1, g1, b1] = Color(color1).rgb().array();
  const [r2, g2, b2] = Color(color2).rgb().array();
  const rInterval = (r2 - r1) / (count - 1);
  const gInterval = (g2 - g1) / (count - 1);
  const bInterval = (b2 - b1) / (count - 1);
  return range(1, count-1)
    .map(i => [
      Math.round(r1 + rInterval * i),
      Math.round(g1 + gInterval * i),
      Math.round(b1 + bInterval * i),
    ])
    .map(Color.rgb)
    .map(c => c.hex());
};
