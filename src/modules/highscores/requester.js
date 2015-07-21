/**
 * Highscores Requester
 */

module.exports = function(world, skill, page, callback){
  var HighscoresRequester;

  HighscoresRequester = new Requester()
    .setName('Highscores')
    .setPath('community/')
    .setData('subtopic', 'highscores')
    .setData('world', world)
    .setData('list', skill)
    .setData('page', page)
    .setParser(moduleManager.loadParser('highscores'))
    .setCallback(callback)
    .request();
}
