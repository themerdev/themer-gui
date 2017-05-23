import { getOrDefault, getBestForeground } from './color';

test('getOrDefault', () => {
  expect(getOrDefault('#eee', null)).toBe('#EEEEEE');
  expect(getOrDefault('red', null)).toBe('#FF0000');
  expect(getOrDefault('not a color', true)).toBe(true);
  expect(getOrDefault('', true)).toBe(true);
});

test('getBestForeground', () => {
  expect(getBestForeground('#ccc', '#333', '#000')).toBe('#CCCCCC');
  expect(getBestForeground('#ccc', '#333', '#fff')).toBe('#333333');
});
