# Tibia Node Crawler [![Code Climate](https://codeclimate.com/github/tibialand/tibia-node-crawler/badges/gpa.svg)](https://codeclimate.com/github/tibialand/tibia-node-crawler)
A node.js crawler module to get tibia.com parsed data, like character data, world data, highscores data and more.  

## Why?
Simple, tibia doesn't have a public api.  
If you work in CipSoft, read it out loud: **WE NEED AN API**  
Thanks!

## Install via npm
```
npm install tibia-node-crawler --save
```

## Basic Usage
```js
var tibia = require('tibia-node-crawler');

tibia.character('Hallsiny', function(data){
  console.log(data.character);
  console.log(data.character.level);
  console.log(data.achievements);
  console.log(data.deaths);
  //etc
  console.log(data);
});

```

## API Reference

### Summary

* [character()](#character)
  * [Character Object](#character-object)
* [world()](#world)
  * [World Object](#world-object)
* [highscores()](#highscores)
  * [Highscores Object](#highscores-object)

### **character()**
```js
tibia.character(name, callback)
```
#### Callback
```js
callback = function(data){}
```
`data` is a instance of **Character Object**.

#### Character Object

##### Properties

`data.character` *since `0.1.0`*
> Object with character info like level, vocation, world, residence, comment, etc.

`data.achievements` *since `0.1.0`*  
> Array with character achievements

`data.deaths` *since `0.1.0`*
> Array with character deaths

`data.account`  *since `0.1.0`*  
> Object with character account info, like created date, loyalty title, etc.

`data.characters`  *since `0.1.0`*  
> Array with others characters from account (only if account isn't hide by owner)

##### Methods
> No methods

#### Example

```js
tibia.character('Hallsiny', function(data){
	console.log(data.character.world); //Fidera
	console.log(data.account.created); //Dec 03 2008, 21:48:54 CET
}
```


### **world()**
```js
tibia.world(world, callback)
```
#### Callback
```js
callback = function(data){}
```
`data` is a instance of **World Object**.

#### World Object

##### Properties

`data.world` *since `0.1.1`*  
> Object with world info like status, location, pvp type, etc.

`data.playersOnline` *since `0.1.1`*  
> Array with objects of players online in world.  
> Each player is an object with name, level and vocation properties.

##### Methods

`data.isPlayerOnline(name)` *since `0.1.1`*  
> Check if player is online  

`data.getPlayerBy(by, value)` *since `0.1.1`*  
> Get first player with conditions. For more players, see filterPlayersBy  
> Example: `data.getPlayerBy('name', 'Hallsiny').level`

`data.filterPlayersBy(by, value)` *since `0.1.1`*  
> Filter playersOnline by name, level, vocation  
> `value` must be string or array.  
> Example: `data.filterPlayersBy('vocation', 'None')`
> Or: `data.filterPlayersBy('vocation', ['Knight', 'Elite Knight'])`  

`data.sortPlayersByAsc(by)` *since `0.1.1`*  
> ASC Sort playersOnline by name, level, vocation  
> Example: `data.sortPlayersByAsc('level')`  

`data.sortPlayersByDesc(by)` *since `0.1.1`*  
> DESC Sort playersOnline by name, level, vocation  
> Example: `data.sortPlayersByDesc('level')`  


#### Example

```js
tibia.world('Fidera', function(data){
	console.log(data.world.pvpType); // Optional PVP
  console.log(data.world.worldQuestTitles); // ['Bewitched', ...]
	console.log(data.playersOnline); // [{}, {}, ...]
	console.log(data.isPlayerOnline('Hallsiny')); // true or false
  console.log(data.filterPlayersBy('vocation', ['Knight', 'Elite Knight'])); // [{}, {}, ...]
}
```


### **highscores()**
```js
tibia.highscores(world, skill, page, callback)
```
> skill can be experience, magic, shielding, distance, sword, club, axe, first, fishing, achievements or loyalty  
> page starts at 0 and goes up to 11 (0 = \#1 to \#25, 1 = \#26 to \#50, ..., 11 = \#276 to \#300)

#### Callback
```js
callback = function(data){}
```
`data` is a instance of **Highscores Object**.

#### Highscores Object

##### Properties

`data.highscores` *since `0.1.3`*  
> Array with objects of players in highscore list.  
> Each player is an object with rank, name and level/points/title depending on the skill.  

##### Methods

`data.getByRank(number)` *since `0.1.3`*  
> Get player by rank number  
> Example: `data.getByRank(1)`  
> Example usage case: find player from nth position  
> → return Object, or undefined if does not found  

`data.getByName(name)` *since `0.1.3`*  
> Get player by player name  
> Example: `data.getByName('Kharsek')`  
> Example usage case: discover someone's rank position.  
> → return Object, or undefined if does not found  

#### Example

```js
tibia.highscores('Fidera', 'experience', 0, function(data){
	console.log(data.highscores); // Array
	console.log(data.getByRank(1).name); // Nini (until now)
	console.log(data.getByRank(1).level); // 750 (until now)
}
```

```js
tibia.highscores('Fidera', 'magic', 11, function(data){
	console.log(data.highscores);
	console.log(data.getByRank(300).name);
}
```

## Contributing

If you like to contribute, you can create new modules with this grunt task:
```
grunt create-module:modulename
```
It will scaffold some modules files for you:
```
modules/
└── modulename/
    ├── requester.js
    ├── parser.js
    └── object.js
```
Create a new branch named 'mod-modulename' and do a pull request.

### Modules

#### requester.js

> This file is responsible for the request to the tibia.com page, and retrieve your html content.

This is a character requester:
```js
var better = alias.require('@libs/better');
module.exports = function(name, callback){
  var CharacterRequester;

  CharacterRequester = new Requester()
    .setName('Character')
    .setPath('community/')
    .setData('subtopic', 'characters')
    .setData('name', better.url(name))
    .setParser(moduleManager.loadParser('character'))
    .setCallback(callback)
    .request();
}
```
`better` is a small lib to treat the data.  
`.setName()` set name, is optional, only for debug/errors purpose  
`.setPath()` set request path: tibia.com/community/  
`.setData()` set new query string: ?subtopic=characters, and &name=name  
`.setParser()` set parser that will handle with html contents  
`.setCallback()` set a callback passed from user
`.request()` execute the request

#### parser.js

> This file is responsible for the parse the html content from requester. We use cheerio to scrap the html.

This is a character parser:
```js
var better = alias.require('@libs/better');
var Character = moduleManager.loadObject('character');

module.exports = function(body){
  var CharacterParser;

  CharacterParser = new Parser(body)
    .setData(new Character())
    .setParser(function(){
	  var self = this;
      var $ = this.$;

	  // data extraction
      // to see full file go to src/modules/character/parser.js

	});

  return CharacterParser;
}
```

`Character` is a object.js from character module  
`.setData()` set a instance of object.js, which means that callback will return this object  
`.setParser()` here go a function that handle with a data extraction from returned html. this.$ is a cheerio instance, jquery-like: this.$('#el').text(), will extract the text from element #el, like jQuery.  

#### object.js

> This file is responsible for object that callback will return

This is a character object:
```js
function Character(){
  this.character = {};
  this.achievements = [];
  this.deaths = [];
  this.account = {};
  this.characters = [];
}

module.exports = Character;
```

Nothing special here. Its a normal object.  
As coding standard, methods **must be prototyped** like this:  

```js
function MyObject(){
  this.myProperty: {},
  // ...
}

MyObject.prototype.myMethod = function(arg1, arg2){
  // ...
}

module.exports = MyObject;
```

## License: MIT

Copyright © 2015 Renato Ribeiro <ola@rena.to>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
