/* global moduleManager: true */
/* global Parser: true */

var better = require('../../libs/better');
var World = moduleManager.loadObject('world');

/**
 * World Parser
 */

module.exports = function(body){
  var WorldParser;

  WorldParser = new Parser(body)

    .setData(new World())

    .setParser(function(){
      var self = this;
      var $ = this.$;

      var wrap = function(key) {
        return $('div.Text:contains("' + key + '")').closest('.TableContainer').find('.InnerTableContainer table');
      };

      wrap('World Information')
        .find('tr')
        .each(function() {
          var td = $(this).find('td');
          var key = better.key($(td[0]).text());
          var value = better.value($(td[1]).text());

          switch(key){
            case 'status':
              self.data.world.online = value === 'Online';
            break;
            case 'playersOnline':
              value = better.int(value);
            break;
            case 'worldQuestTitles':
              value = value.split(', ');
            break;
            case 'onlineRecord':
              value = {
                players: value.match(/[0-9]+/g)[0],
                on: value.match(/\(.+\)/g)[0].replace('on ', '')
                      .replace(')', '')
                      .replace('(', '')
              };
            break;
            case 'pvPType':
              key = 'pvpType';
            break;
          }

          self.data.world[key] = value;
        });

      wrap('Players Online')
        .find('tr:nth-child(n+2)')
        .each(function() {
          var td = $(this).find('td');
          var player = {
            name: better.value($(td[0]).text()),
            level: better.int($(td[1]).text()),
            vocation: better.value($(td[2]).text())
          };

          self.data.playersOnline.push(player);
        });

    });

  return WorldParser;
};
