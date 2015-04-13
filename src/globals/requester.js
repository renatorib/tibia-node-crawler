/* global _: true */

var request = require('request');
var better = require('../libs/better');
var url = 'https://secure.tibia.com/';

/**
 * Requester
 */

function Requester() {
  var self = this;

  this.name = '';
  this.url = url;
  this.path = '';
  this.data = {};
  this.method = 'get';
  this.headers = {
    'User-Agent': 'request',
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  this.Parser = null;

  this.callback = function(){};

  this.callbackWrapper = function(err, res, body) {
    if(err) {
      throw new Error('Requester ' + self.name +  ' from path ' + self.url + self.path + ' failed: ' + err);
    }
    var data = self.Parser(body).parse();
    if(_.isFunction(self.callback)) {
      return self.callback(data);
    }
    return data;
  };

  return this;

}

/**
 * Requester setName
 */

Requester.prototype.setName = function(name){
  this.name = name;
  return this;
};

/**
 * Requester setUrl
 */

Requester.prototype.setUrl = function(url){
  this.url = url;
  return this;
};

/**
 * Requester setPath
 */

Requester.prototype.setPath = function(path){
  this.path = path;
  return this;
};

/**
 * Requester setData
 */

Requester.prototype.setData = function(key, value){
  this.data[key] = value;
  return this;
};

/**
 * Requester removeData
 */

Requester.prototype.removeData = function(key){
  delete this.data[key];
  this.data.splice(1,1);
  return this;
};

/**
 * Requester setDataPlain
 */

Requester.prototype.setDataPlain = function(data){
  this.data = data;
  return this;
};

/**
 * Requester setMethod
 */

Requester.prototype.setMethod = function(method){
  this.method = method;
  return this;
};

/**
 * Requester setHeader
 */

Requester.prototype.setHeader = function(key, val){
  this.headers[key] = val;
  return this;
};

/**
 * Requester removeHeader
 */

Requester.prototype.removeHeader = function(key){
  delete this.headers[key];
  this.headers.splice(1,1);
  return this;
};

/**
 * Requester setParser
 */

Requester.prototype.setParser = function(Parser){
  this.Parser = Parser;
  return this;
};

/**
 * Requester setCallback
 */

Requester.prototype.setCallback = function(callback){
  this.callback = callback;
  return this;
};

/**
 * Requester request
 */

Requester.prototype.request = function(){
  var options = {
    url: this.url + this.path,
    form: this.data,
    method: this.method.toUpperCase(),
    headers: this.headers
  };
  if(options.method === 'GET') {
    options.url = options.url + better.serialize(this.data);
    options.form = {};
  }
  //console.log(options);
  return request(options, this.callbackWrapper);
};

module.exports = Requester;
