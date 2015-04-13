/* global Requester: true */
/* global moduleManager: true */

var better = require('../../libs/better');

/**
 * Character Requester
 */

module.exports = function(name, callback){
  var CharacterRequester;

  CharacterRequester = new Requester()
    .setName('Character')
    .setPath('community/')
    .setData('subtopic', 'characters')
    .setData('name', better.url(name))
    .setParser(moduleManager.loadParser('character'))
    .setCallback(callback)
    .request();
};
