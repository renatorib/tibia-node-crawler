var better = alias.require('@libs/better');

/**
 * Character Parser
 */

module.exports = function(body){
  var WorldParser;

  WorldParser = new Parser(body)

    .setData({
      world: {},
      playersOnline: []
    })

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
          var value = $(td[1]).text().trim();

          switch(key){
            case 'status':
              self.data.world['online'] = value === 'Online';
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
              }
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
            name: $(td[0]).text().trim(),
            level: better.int($(td[1]).text()),
            vocation: $(td[2]).text().trim()
          };

          self.data.playersOnline.push(player);
        });

    });

  return WorldParser;
}
