const Papa = require('papaparse');

const parseFile = (url) =>
  new Promise((resolve) => {
    Papa.parse(url, {
      download: true,
      header: true,
      complete: (results) => {
        resolve(results.data);
      },
    });
  });

export async function fetchParsedData(url) {
  const parsedData = await parseFile(url);
  return parsedData;
}
