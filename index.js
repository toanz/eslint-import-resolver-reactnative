var findRoot = require('./find-root');
var nodeResolver = require('eslint-import-resolver-node');
var path = require('path');

var log = require('debug')('eslint-plugin-import:resolver:reactnative');

function pluginSettings(settings) {
  return Object.assign(
    {
      extensions: ['.js', '.json', '.android.js', '.ios.js'],
    },
    settings
  );
}

exports.interfaceVersion = 2;

exports.resolve = function (source, file, userSettings) {
  log('Resolving:', source, 'from:', file);
  
  var settings = pluginSettings(userSettings);
  
  try {
    var appRoot = findRoot(file);
    var package = require(path.join(appRoot, 'package.json'));
    if (package.name && source.startsWith('@')) {
        var absSource = path.join(appRoot, source.replace('@', ''));
        return nodeResolver.resolve(absSource, file, settings);
      
    }
  } catch (err) {
    log('Error:', err);
    log('Fall back to eslint-import-resolver-node');
  }

  return nodeResolver.resolve(source, file, settings);
};