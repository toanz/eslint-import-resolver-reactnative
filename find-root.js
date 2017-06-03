var path = require("path");
var fs = require("fs");

function findRoot(start) {
  start = start || module.parent.filename;
  if (typeof start === "string") {
    if (start[start.length - 1] !== path.sep) {
      start += path.sep;
    }
    start = start.split(path.sep);
  }
  if (!start.length) {
    throw new Error(".eslintrc.js not found in path");
  }
  start.pop();
  var dir = start.join(path.sep);
  try {
    fs.statSync(path.join(dir, ".eslintrc.js"));
    return dir;
  } catch (e) {}
  return findRoot(start);
}

module.exports = findRoot;
