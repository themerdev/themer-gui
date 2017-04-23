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

export const getBestForeground = (option1, option2, background) => {
  const op1 = Color(option1);
  const op2 = Color(option2);
  const bg = Color(background);
  if (op1.contrast(bg) > op2.contrast(bg)) {
    return op1.hex();
  }
  else {
    return op2.hex();
  }
}
