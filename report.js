function printReport(pages) {
  console.log('--------');
  console.log('REPORT:');
  console.log('--------');
  const sortedPages = sortPages(pages);
  // iterate all pages(array-like)
  for (const page of sortedPages) {
    const url = page[0];
    const hitTimes = page[1];
    console.log(`${url}  hit-times:${hitTimes}`);
  }
}

function sortPages(pageObj) {
  const pagesArray = Object.entries(pageObj);
  pagesArray.sort((a, b) => {
    aHits = a[1];
    bHits = b[1];
    return b[1] - a[1]; // from big hitTimes to small hitTimes
  });
  return pagesArray;
}

module.exports = {
  sortPages,
  printReport,
};
/*
 // 對 pages (array of objects)進行排序 / b-a => 從大排到小(降幂)
  // 詳情請見 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#sorting_array_of_objects
*/
