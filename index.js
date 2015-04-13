/* global _: true */
/* global moduleManager: true */

// Module Manager
global.moduleManager = require('./src/globals/module_manager');

// Parser
global.Parser = require('./src/globals/parser');

// Requester
global.Requester = require('./src/globals/requester');

// Lodash
global._ = require('lodash');

_.mixin({
  'filterArray': function(collection, property, values) {
    return _.filter(collection, function(item) {
      return _.contains(values, item[property]);
    });
  }
});

// Exports
module.exports = moduleManager.exportAll();
