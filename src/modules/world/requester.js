/* global Requester: true */
/* global moduleManager: true */

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