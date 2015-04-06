// Alias
var _alias = require('require-alias');
var aliasSettings = {
    aliases: {
        '@root': './src/',
        '@libs': './src/libs/',
        '@globals': './src/globals/',
        '@modules': './src/modules/'
    }
}
global.alias = new _alias(aliasSettings);

// Module Manager
global.moduleManager = alias.require('@globals/module_manager');

// Parser
global.Parser = alias.require('@globals/parser');

// Requester
global.Requester = alias.require('@globals/requester');

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
