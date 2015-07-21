/**
 * Highscores Object
 */

function Highscores(){
  this.highscores = [];
}

/**
 * .getByRank()
 */

Highscores.prototype.getByRank = function(number){
  return _.find(this.highscores, {'rank': number});
};

/**
 * .getByName()
 */

Highscores.prototype.getByName = function(name){
  return _.find(this.highscores, {'name': name});
};

module.exports = Highscores;
