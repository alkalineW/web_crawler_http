const { crawlPage } = require('./crawl.js');
<<<<<<< HEAD
=======
const { printReport } = require('./report.js');
>>>>>>> redo-and-finished
async function main() {
  /*
    process.argv return a array
    process.argv[0] => process.execPath(name of program)
    process.argv[1] => path of javascript being executed 
    the remaining elements will be any additional command-line arguments(其他的值就是從command line傳入的值)
    */
  if (process.argv.length < 3) {
    console.log('no website provided');
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console.log('too many command line args');
    process.exit(1);
  }
  // for (data of process.argv) {
  //   console.log(`${data}`);
  // }
  const baseURL = process.argv[2];

  console.log('start crawling');

/* 
use baseURL for currentURL, empty object as parameter
宣告 pages(object type) 來裝整個 crawlPage function return的內容
*/
  const pages = await crawlPage(baseURL, baseURL, {});
  printReport(pages);
}

main();
