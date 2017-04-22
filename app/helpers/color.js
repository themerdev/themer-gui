import Color from 'color';

export const getOrDefault = (maybeColor, defaultColor) => {
  try {
    if (maybeColor === '') { throw new Error(); }
    return Color(maybeColor).hex();
  }
  catch (e) {
    return defaultColor;
  }
}
