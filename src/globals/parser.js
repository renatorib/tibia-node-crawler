var cheerio = require('cheerio');

/**
 * Parser
 */

function Parser(body){
  this.$ = cheerio.load(body, { lowerCaseTags: true, lowerCaseAttributeNames: true });
  this.data = null;
  this.parser = null;
  this.error = false;
}

/**
 * Parser setData
 * Set data to Parser
 */

Parser.prototype.setData = function(data){
  this.data = data;
  return this;
};

/**
 * Parser setParser
 * Set a parser function to Parser
 */

Parser.prototype.setParser = function(parser){
  this.parser = parser;
  return this;
};

/**
 * Parser setError
 * Set a error message to Parser
 */

Parser.prototype.setError = function(error){
  this.error = error;
  return this;
};

/**
 * Parser parse
 * Execute parser function and return data
 */

Parser.prototype.parse = function(){
  this.parser();
  if(this.error) {
    this.data.error = this.error;
  }
  return this.data;
};

module.exports = Parser;
