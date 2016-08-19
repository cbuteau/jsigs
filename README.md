
# JSIGS

## Badges/Status

Travis

[![Build Status](https://travis-ci.org/cbuteau/jsigs.svg?branch=master)](https://travis-ci.org/cbuteau/jsigs)



npm Version

[![npm version](http://img.shields.io/npm/v/jsigs.svg?style=flat)](https://npmjs.org/package/jsigs "View this project on npm")

Coveralls?? we need to get istanbul running with testem.

npm big badge

[![NPM](https://nodei.co/npm/jsigs.png)](https://nodei.co/npm/jsigs/)

## Concept

Coming from a strongly typed language I wanted to learn and know the typing in javascript.  So I wrote the code to interpret it and made it available.
I also never liked that the [typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof) operator led to string compare.

Finally I liked how you could just write an object inline in javascript and I saw that the best way to convey the signature of the object.

## History

This is my first released node module [param-signatures](https://www.npmjs.com/package/param-signatures).

I put together my first node module with tests and uploaded it but it did not draw any use.

When I investigated changing it into a js library for the web it looked like a complete rewrite so I started a new repository.

## API

In the browser a global jsigs is loaded.
In node you require('jsigs'); and then use it.

```javascript
jsigs.CODES = {
  BOOLEAN: 0,
  NUMBER: 1,
  STRING: 2,
  FUNCTION: 3,
  OBJECT: 4,
  UNDEFINED: 5,
  NULL: 6,
  DATE: 7,
  ARRAY: 8  
},
jsigs.getTypeCode = function(value) {}

jsigs.isTypeCode = function(value, typeCode) {}

jsigs.typeCodeToString = function(typeCode) {}

jsigs.validateFunction = function(value, parameterCount) {}

jsigs.validateArray = function(array, typeCode) {}

jsigs.validate = function(object, signature) {}

jsigs.mergeAndReturn = function(object, defaults) {}

jsigs.validateListData = function(list, childSig) {}
```

### CODES

An enum or lookup of all the int values that represent the basic types in Javascript.  This is because an int compare is one of the fastest hardware operation.

```javascript
jsigs.CODES = {
  BOOLEAN: 0,
  NUMBER: 1,
  STRING: 2,
  FUNCTION: 3,
  OBJECT: 4,
  UNDEFINED: 5,
  NULL: 6,
  DATE: 7,
  ARRAY: 8  
}
```


### getTypeCode

Returns a typecode that will match one of the code in jsig.CODES.

```javascript
// Usage
var options = {};
var typeCode = jsigs.getTypeCode(options);
if (typeCode === jsigs.CODES.OBJECT) {
  doWork(options);
}
```
### isTypeCode

Returns a boolean if the typecode provided matches the value.

```javascript
// Usage
var options = {};
if (jsigs.isTypeCode(options, jsigs.CODES.OBJECT)) {
  doWork(options);
}
```

### typeCodeToString

Converts an integer typecode into a string.

```javascript
// Usage
function exposedApiCall(options) {
  var typeCode = jsigs.getTypeCode(options);
  if (typeCode !== jsgigs.CODES.OBJECT) {
    throw new Error('I need an ' + jsigs.typeCodeToString(jsigs.CODES.OBJECT) + ' and you passed me a ' + jsigs.typeCodeToString(typeCode));
  }
}
```

### validateFunction

Returns a boolean if the value passed is a function and if the parameter counts match.

```javascript
// Usage
function specialFunction(parameters) {
  if (parameters.onComplete  && jsigs.validateFunction(parameters.onComplete, 2)) {
    var result = doWork();
    parameters.onComplete(0, result);
  }
}
```

### validateArray

Returns a boolean (True if successful; False otherwise) if the value passsed in is a list and all its members are the typeCode parameter passed in.

```javascript
// Usage
function doSomethingCrazy(parameters) {
  if (jsigs.validateArray(parameters,jsigs.CODES.STRING)) {
    processStrings(parameters);
  }
}
```

### validate

Throws an exception if the object passed does not match the signature object passed.

```javascript
// Usage
function doWorkWithComplexOptions(params, options) {
  // this throws if options does not have these 3 members with their types.
  jsigs.validate(options, {
    log: false,
    nesting: 10,
    context: 'A string'
  });

  if (options.log) {
    console.log('Options passed', options);
  }
}
```

### mergeAndReturn

Returns the original object if the signature matches or merges in the defaults provided in the signature.

```javascript

function doWork(parameters, options) {
  var defaults = {
    verbose: false,
    onComplete: function(e) {}
  };

  var finalOpts = jsgis.mergeAndReturn(options, defaults);
  // finalOpts will have the orignal value for verbose passed in
  // and the default empty callback function

  if (finalOpts.verbose) {
    console.log('options to use', finalOpts);
  }

  finalOpts.onComplete(10);
}

doWork({ one:1, two:2, three: 3}, {
  verbose: true,
});

```

### validateListData

Returns a boolean indicating if all the data in the array matches the child signature passed.

```javascript
// Usage

var array = [
  { important: true, value: 3.14, name: 'Little PI' },
  { important: true, value: 2.718, name: 'Euler\'s Number' },
  { important: true, value: 299792458, name: 'Speed of Light' },
  { important: false, value: 115, name: 'Days until my birthday' },
];

var childSig = {
  important: false, // boolean
  value: 10, // NUMBER
  name: 'A name' //STRING
}

if (jsigs.validateList(array, childSig)) {
  array.forEach(function((item) {
    console.log(item.name);
    console.log('Important? ' + item.important);
    console.log('Times 2', item.value * 2);
  });
}

```

## Technology

I used the following packages...
* [jasmine](http://jasmine.github.io/) for node testing.
* [Testem](https://github.com/testem/testem) for browser testing...(I never got karma off the ground).
* [Handlebars](http://handlebarsjs.com/) for merging javascript source files.
* [Cmder](http://cmder.net) for command line execution.
* [Atom](https://atom.io/) for code editing.

I program on a Windows 10 box so if you find a bug specific to platform I will try to enlist you.

## TODO

* Minimize with version jsigs.1.0.0.min.js

* Get testem runnign with istanbul [linky](https://github.com/testem/testem/tree/master/examples/coverage_istanbul)
[issue linky](https://github.com/testem/testem/issues/229)

* Try to get node coverage and combine them.
[linky](https://github.com/gotwarlost/istanbul/issues/97)

*
