var fs = require('fs');
var path = require('path');

/**
 * Module Manager loadParser
 * It is used to call parser in a requester
 */

exports.loadParser = function(name){
  return require('../modules/' + name + '/parser');
};

/**
 * Module Manager loadObject
 * It is used to call object in a parser
 */

exports.loadObject = function(name){
  return require('../modules/' + name + '/object');
};


/**
 * Module Manager loadRequester
 * It is used to call requester in others requesters and to export
 */

exports.loadRequester = function(name){
  return require('../modules/' + name + '/requester');
};

/**
 * Module Manager loadParser
 * It is used to exports all requesters in a object
 */

exports.exportAll = function(){
  var list = fs.readdirSync(path.resolve(__dirname + '/../modules'));
  var output = {};
  var self = this;
  list.forEach(function(name){
    var moduleContent = fs.statSync(path.resolve(__dirname + '/../modules/' + name));
    if(moduleContent.isDirectory()){
      output[name] = self.loadRequester(name);
    }
  });
  return output;
};
