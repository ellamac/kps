const Papa = require('papaparse');

export const parseFile = (url) =>
  new Promise((resolve) => {
    Papa.parse(url, {
      download: true,
      header: true,
      complete: (results) => {
        resolve(results.data);
      },
    });
  });

export const fetchParsedData = async (url) => {
  const parsedData = await parseFile(url);
  return parsedData;
};
