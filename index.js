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
global.moduleManager = alias.require('@globals/module_manager');
global.Parser = alias.require('@globals/parser');
global.Requester = alias.require('@globals/requester');

module.exports = moduleManager.exportAll();
