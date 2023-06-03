const { normalizeURL, getUrlsfromHTML } = require('./crawl.js');
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

test('get URLs from HTML', () => {
  const inputHTMLBody = `<html>
    <body>
    <a href="https://boot.dev/path" target="_blank">boot dev</a>
    <a href="https://developer.mozilla.org/" target="_blank">mdn</a>
    <body/>
    </html>`;
  const inputBaseURL = '';
  const actual = getUrlsfromHTML(inputHTMLBody, inputBaseURL);
  const expected = ['https://boot.dev/path', 'https://developer.mozilla.org/'];
  expect(actual).toEqual(expected);
});

test('get URLs from HTML relative', () => {
  const inputHTMLBody = `<html>
    <body>
    <a href="/path" target="_self">path</a>
    <a href="/blog/single.html" target="_self">single blog</a>
    <body/>
    </html>`;
  const inputBaseURL = 'https://boot.dev';
  const actual = getUrlsfromHTML(inputHTMLBody, inputBaseURL);
  const expected = [
    'https://boot.dev/path',
    'https://boot.dev/blog/single.html',
  ];
  expect(actual).toEqual(expected);
});

test('get URLs invalid', () => {
  const inputHTMLBody = `<html>
    <body>
    <a href="invalid" >invalid</a>
    <a href="wrong" >wrong</a>
    <body/>
    </html>`;
  const inputBaseURL = '';
  const actual = getUrlsfromHTML(inputHTMLBody, inputBaseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
