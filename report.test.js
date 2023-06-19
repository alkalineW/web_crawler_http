const { sortPages } = require('./report.js');
const { test, expect } = require('@jest/globals');

test('sort pages test', () => {
  const input = {
    'https://wagslane.dev/blog': 3,
    'https://wagslane.dev': 6,
    'https://wagslane.dev/path': 2,
  };
  const actual = sortPages(input);
  const expected = [
    ['https://wagslane.dev', 6],
    ['https://wagslane.dev/blog', 3],
    ['https://wagslane.dev/path', 2],
  ];
  expect(actual).toEqual(expected);
});

// https://wagslane.dev/
