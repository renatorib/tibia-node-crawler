/* global _: true */

var better = {};

/**
 * Better key
 * Transform a bad formated string in a good key name
 */

better.key = function(value){
  value = value
    .replace(String.fromCharCode(58), '')
    .replace(String.fromCharCode(160), String.fromCharCode(32));
  return _.camelCase(value);
};

/**
 * Better value
 * Transform a bad formated string in a good value name
 */

better.value = function(value){
  return value
    .replace(String.fromCharCode(160), String.fromCharCode(32))
    .trim();
};

/**
 * Better int
 * Transform string in int
 */

better.int = function(value){
  value = value.match(/[0-9]+/g);
  if(_.isArray(value) && value.length > 1) {
    value.join('');
  }
  if(_.isArray(value) && value.length === 1) {
    value = value[0];
  }
  return parseInt(value);
};

/**
 * Better url
 * Urlify string
 */

better.url = function(value){
  return value
    .replace(' ', '+')
    .replace('%20', '+')
    .replace('%2B', '+');
};

/**
 * Better serialize
 * Serialize object
 */

better.serialize = function(obj){
  var serialized = Object.keys(obj)
    .reduce(function(a, k){
      a.push(k + '=' + encodeURIComponent(obj[k]));
      return a;
    },[])
    .join('&');
  return '?' + serialized.replace('%2B', '+');
};

/**
 * Better deathBy
 * Transform deathBy list into array
 */

better.deathBy = function(value){
  return value
    .match(/\D+/g)[1]
    .replace('by an')
    .replace('by a', '')
    .replace('by', '')
    .replace('.', '')
    .replace(' and ',', ')
    .trim()
    .split(', ');
};


module.exports = better;
