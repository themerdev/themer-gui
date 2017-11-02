import { getOrDefault, getBestForeground, distribute } from './color';

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

test('distribute', () => {
  expect(distribute('#000000', '#070707')).toEqual([
    '#000000',
    '#010101',
    '#020202',
    '#030303',
    '#040404',
    '#050505',
    '#060606',
    '#070707',
  ]);
  expect(distribute('#000034', '#000042')).toEqual([
    '#000034',
    '#000036',
    '#000038',
    '#00003A',
    '#00003C',
    '#00003E',
    '#000040',
    '#000042',
  ]);
});
