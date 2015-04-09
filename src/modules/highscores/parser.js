var Highscores = moduleManager.loadObject('highscores');

/**
 * Foo Parser
 */

module.exports = function(body){
  var HighscoresParser;

  HighscoresParser = new Parser(body)

    .setData(new Foo())

    .setParser(function(){
      var self = this;
      var $ = this.$;

    });

  return HighscoresParser;
}
