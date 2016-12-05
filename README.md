RN-Storage [![CircleCI](https://circleci.com/gh/ali322/rn-storage.svg?style=svg)](https://circleci.com/gh/ali322/rn-storage) [![npm version](https://badge.fury.io/js/rn-storage.svg)](https://badge.fury.io/js/rn-storage)
===
[![NPM](https://nodei.co/npm/rn-storage.png)](https://nodei.co/npm/rn-storage/)

React-Native AsyncStorage wrapper

Install
===

```javascript
npm install rn-storage --save
```

Useage
===

```javascript
let storage = new Storage()
storage.registerSchema(["example"])

//mount to global namespace for all the scene component
global.storage = storage

var exampleEntity = storage.entity("example")

exampleEntity.findAll().then(ret=>{
    //your bussiness code come here
})
```

more instructions refer to [API](./API.md)


## Todo

- fix some unknow bugs
- add more api documents


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)