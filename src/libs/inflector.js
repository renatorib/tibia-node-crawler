var inflector = {};

/**
 * Inflector parseKey
 * Transform a bad formated string in a good key name
 */

inflector.camelCase = function(value){
  return value
    .replace(':', '')
    .replace(String.fromCharCode(160), ' ')
    .replace(/^([A-Z])|[\s-_](\w)/g, function(match, p1, p2, offset) {
        if (p2) return p2.toUpperCase();
        return p1.toLowerCase();
    });
}

module.exports = inflector;
