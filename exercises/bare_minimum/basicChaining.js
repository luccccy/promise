/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var db = Promise.promisifyAll(require('./promiseConstructor.js'));
var qw = require('./promisification.js');


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return db.pluckFirstLineFromFileAsync(readFilePath)
    .then((username) => {
      return qw.getGitHubProfileAsync(username);
    })
    .then((response) => {
      response = JSON.stringify(response);
      return new Promise((resolve, reject) => {
        fs.writeFile(writeFilePath, response, (err) => {
          if (err) {
            reject(err);
            return;
          } else {
            resolve();
          }
        });
      });
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
