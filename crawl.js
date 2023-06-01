function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;

  console.log(urlObj);
  if (urlString.length > 0 && urlString.slice(-1) === '/') {
    console.log(hostPath.length - 1);
    console.log(hostPath.slice(0, hostPath.length - 1));
    return hostPath.slice(0, hostPath.length - 1);
  } else {
    return hostPath;
  }
}

// export
module.exports = {
  normalizeURL,
};
