/**
 * Highscores Requester
 */

module.exports = function(bar, callback){
  var HighscoresRequester;

  HighscoresRequester = new Requester()
    .setName('Highscores')
    .setPath('community/')
    .setData('subtopic', 'foo')
    .setData('foo', bar)
    .setParser(moduleManager.loadParser('highscores'))
    .setCallback(callback)
    .request();
}
