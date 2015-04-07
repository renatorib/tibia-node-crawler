var @@Module = moduleManager.loadObject('@@module');

/**
 * @@Module Parser
 */

module.exports = function(body){
  var @@ModuleParser;

  @@ModuleParser = new Parser(body)

    .setData(new @@Module())

    .setParser(function(){
      var self = this;
      var $ = this.$;

    });

  return @@ModuleParser;
}
