/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('needle');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = (filePath, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      callback(err);
    } else {
      content = content.toString().split('\n');
      callback(null, content[0]);
    }
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = (url, callback) => {
  request.get(url, (err, response) => {
    if (err) {
      callback(err);
    } else {
      callback(null, response.statusCode);
    }
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
