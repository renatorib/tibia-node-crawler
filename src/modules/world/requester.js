/* global alias: true */
/* global moduleManager: true */

var better = alias.require('@libs/better');

/**
 * World Requester
 */

module.exports = function(world, callback){
  var WorldRequester;

  WorldRequester = new Requester()
    .setName('World')
    .setPath('community/')
    .setData('subtopic', 'worlds')
    .setData('world', world)
    .setParser(moduleManager.loadParser('world'))
    .setCallback(callback)
    .request();
};