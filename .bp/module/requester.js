/**
 * @@Module Requester
 */

module.exports = function(foo, callback){
  var @@ModuleRequester;

  @@ModuleRequester = new Requester()
    .setName('@@Module')
    .setPath('community/')
    .setData('subtopic', '@@module')
    .setData('foo', foo)
    .setParser(moduleManager.loadParser('@@module'))
    .setCallback(callback)
    .request();
}
