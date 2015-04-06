function World(){
  this.world = {};
  this.playersOnline = [];
}

/**
 * .isPlayerOnline()
 */

World.prototype.isPlayerOnline = function(name){
  return _.any(this.playersOnline, 'name', name);
}

/**
 * .getPlayerBy()
 */

World.prototype.getPlayerBy = function(by, value){
  return _.find(this.playersOnline, by, value) || false;
}

/**
 * .getPlayersByVoc()
 */

World.prototype.filterPlayersBy = function(by, value){
  value = _.isArray(value) ? value : [value];
  return _.filterArray(this.playersOnline, by, value) || false;
}

/**
 * .sortPlayersBy()
 */

World.prototype.sortPlayersBy = function(by){
  by = _.isArray(by) ? by : [by];
  return _.sortByAll(this.playersOnline, by) || false;
}

/**
 * .sortPlayersDescBy()
 */

World.prototype.sortPlayersByDesc = function(by){
  return this.sortPayerBy(by).reverse();
}

module.exports = World;
