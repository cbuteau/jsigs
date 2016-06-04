
# JSIGS

## Badges/Status

Travis

npm

Coveralls?? we need to get istanbul running with testem.

npm big badge

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

jsigs.validateFunction = function(value, parameterCount) {}

jsigs.validateArray = function(array, typeCode) {}

jsigs.validate = function(object, signature) {}

jsigs.mergeAndReturn = function(object, defaults) {}
```

## Technology

I used the following packages...
* [jasmine](http://jasmine.github.io/) for node testing.
* [Testem](https://github.com/testem/testem) for browser testing...(I never got karma off the ground).
* [Handlebars](http://handlebarsjs.com/) for merging javascript source files.
* [Cmder](http://cmder.net) for command line execution.
* [Atom](https://atom.io/) for code editing.

I program on a Windows 10 box so if you find a bug specific to platform I will try to enlist you.
