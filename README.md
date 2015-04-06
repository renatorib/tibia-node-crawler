# Install
```
npm install tibia-node-crawler --save
```

# Basic Usage
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

# API

## character
```
tibia.character(name, callback)
```

## world
```
tibia.world(world, callback)
```
