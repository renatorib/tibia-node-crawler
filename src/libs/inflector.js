var inflector = {};

/**
 * Inflector camelCase
 */

inflector.camelCase = function(value){
  return value
    .replace(/^([A-Z])|[\s-_](\w)/g, function(match, p1, p2, offset) {
        if (p2) return p2.toUpperCase();
        return p1.toLowerCase();
    });
}

module.exports = inflector;
