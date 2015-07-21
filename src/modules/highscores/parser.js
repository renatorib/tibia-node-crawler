var better = require('../../libs/better');
var Highscores = moduleManager.loadObject('highscores');

/**
 * Foo Parser
 */

module.exports = function(body){
  var HighscoresParser;

  HighscoresParser = new Parser(body)

    .setData(new Highscores())

    .setParser(function(){
      var self = this;
      var $ = this.$;

      if($('h2:contains("Ranking for")').length === 0){
        this.setError('Could not find world');
        return;
      }

      var keys = [];
      $('b:contains("Rank")').closest('table').find('tr').each(function(index){
        if(index == 0){
          $(this).find('td').each(function(){
            keys.push($(this).text());
          });
        }
        else if(index == 1) { } // empty tr, thanks cip
        else {
          var row = {};
          $(this).find('td').each(function(index){
            var key = better.key(keys[index]);
            var value = better.value($(this).text());
            if(key == 'rank'){
              value = better.int($(this).text());
            }
            row[key] = value;
          });
          self.data.highscores.push(row);
        }
      });

    });

  return HighscoresParser;
}
