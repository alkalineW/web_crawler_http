const { JSDOM } = require('jsdom');
// const fetch = require('node-fetch');

async function crawlPage(currentURL) {
  console.log(`${currentURL}`);
  try {
    const resp = await fetch(currentURL, { method: 'GET', mode: 'cors' });
    const HTMLdata = await resp.text();
    console.log(HTMLdata);
    // 如果 resp.status 的值大於399(超過2xx 2xx表示成功)，則print error status 並 return(stop crawling)
    if (resp.status > 399) {
      console.error(
        `error in fetch with status code:${resp.status} on page:${currentURL}`
      );
      return;
    }
    // ensure response get HTML back
    const contentType = await resp.headers.get('content-type');
    if (!contentType.includes('text/html')) {
      console.error(
        `none HTML response, content-type:${contentType} on page:${currentURL}`
      );
    }
    // if (resp.headers. !== 'html') {

    // }
  } catch (error) {
    console.error(`error in fetch:${error.message} , on page: ${currentURL}`);
  }
  // getUrlsfromHTML(HTMLdata);
}

function getUrlsfromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll('a'); // NodeList
  // for .. of (iteriable object)
  for (link of linkElements) {
    // if baseURL excist and not equals to empty string and first alphabet of link ==='/'
    if (baseURL && baseURL !== '' && link.href.slice(0, 1) === '/') {
      // relative url
      try {
        // check if link.href is invalid
        const urlObj = new URL(`${baseURL}${link.href}`);
        urls.push(urlObj.href);
      } catch (error) {
        console.log(`error wwith relative url:${error.message}`);
      }
    } else {
      // absolute url
      try {
        const urlObj = new URL(link.href);
        urls.push(urlObj.href);
      } catch (error) {
        console.log(`error wwith absolute url:${error.message}`);
      }
    }
  }
  return urls;
}

function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (urlString.length > 0 && urlString.slice(-1) === '/') {
    // console.log(hostPath.slice(0, hostPath.length - 1));
    return hostPath.slice(0, hostPath.length - 1);
  } else {
    return hostPath;
  }
}

// export
module.exports = {
  crawlPage,
  normalizeURL,
  getUrlsfromHTML,
};
