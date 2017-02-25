'use strict';

// require exists in NodeJs
if (typeof require === 'function')
{
  var jsigs = require('../jsigs');
}

function Base(){
  this.id = Math.random();
}

Base.prototype.getId = function() {
  return this.id;
};

function Derived() {
  Base.call(this);
}

Derived.prototype = Base.prototype;

describe('getTypeCode(value) === TYPECODES.COMPLEX...', function() {
  it('Simplest', function() {
    var test = new Derived();
    var tc = jsigs.getTypeCode(test);
    expect(tc).toBe(jsigs.CODES.COMPLEX);
  });

  it ('StringTest', function() {
    var test = new Derived();
    test.getId();
    var tc = jsigs.getTypeCode(test);
    expect(jsigs.typeCodeToString(tc)).toBe('Complex');
  });
});
