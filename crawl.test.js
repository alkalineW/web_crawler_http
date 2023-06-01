const { normalizeURL } = require('./crawl.js');
// extract test / expect method from jest
const { test, expect } = require('@jest/globals');

/* 
jest 內的test function 
第一個 parameter 為 test 的內容名稱
第二個為 function
*/
test('url strip protocol', () => {
  const input = 'https://boot.dev/path';
  const actual = normalizeURL(input);
  const expected = 'boot.dev/path';
  expect(actual).toEqual(expected);
});

test('url strip trailing slash', () => {
  const input = 'https://boot.dev/path/';
  const actual = normalizeURL(input);
  const expected = 'boot.dev/path';
  expect(actual).toEqual(expected);
});

test('url strip capital', () => {
  const input = 'https://BOOT.dev/path/';
  const actual = normalizeURL(input);
  const expected = 'boot.dev/path';
  expect(actual).toEqual(expected);
});

test('url strip http', () => {
  const input = 'http://BOOT.dev/path/';
  const actual = normalizeURL(input);
  const expected = 'boot.dev/path';
  expect(actual).toEqual(expected);
});
