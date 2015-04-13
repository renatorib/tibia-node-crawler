/* global moduleManager: true */
/* global Parser: true */

var better = require('../../libs/better');
var Character = moduleManager.loadObject('character');

/**
 * Character Parser
 */

module.exports = function(body){
  var CharacterParser;

  CharacterParser = new Parser(body)

    .setData(new Character())

    .setParser(function(){
      var self = this;
      var $ = this.$;

      if($('b:contains("Could not find character")').length === 1){
        this.setError('Could not find character');
        return;
      }

      var wrap = function(key) {
        return $('b:contains("' + key + '")').closest('table');
      };

      wrap('Character Information')
        .find('tr:nth-child(n+2)')
        .each(function() {
          var td = $(this).find('td');
          var key = better.key($(td[0]).text());
          var value = $(td[1]).text().trim();

          switch(key) {
            case 'achievementPoints':
            case 'level':
              value = better.int(value);
            break;
          }

          self.data.character[key] = value;
        });

      wrap('Account Achievements')
        .find('tr:nth-child(n+2)')
        .each(function() {
          var td = $(this).find('td');
          var achievement = {
            grade: $(td[0]).length,
            name: $(td[1]).text().trim(),
            secret: $(td[2]).find('img').length === 1
          };

          if(achievement.name !== '') {
            self.data.achievements.push(achievement);
          }
        });

      wrap('Character Deaths')
        .find('tr:nth-child(n+2)')
        .each(function() {
          var td = $(this).find('td');
          var death = {
            date: $(td[0]).text(),
            level: better.int($(td[1]).text()),
            by: better.deathBy($(td[1]).text())
          };

          self.data.deaths.push(death);
        });

      wrap('Account Information')
        .find('tr:nth-child(n+2)')
        .each(function() {
          var td = $(this).find('td');
          var key = better.key($(td[0]).text());
          var value = $(td[1]).text().trim();

          self.data.account[key] = value;
        });

      wrap('Characters')
        .find('tr:nth-child(n+3)')
        .each(function() {
          var td = $(this).find('td');
          var character = {
            name: $(td[3]).find('input[type=hidden]').val(),
            world: $(td[1]).text(),
            online: $(td[2]).text() === 'online'
          };

          self.data.characters.push(character);
        });

    });

  return CharacterParser;
};
