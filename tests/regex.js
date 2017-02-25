'use strict';

// require exists in NodeJs
if (typeof require === 'function')
{
  var jsigs = require('../jsigs');
}

describe('getTypeCode(value) === TYPECODES.COMPLEX...', function() {
  it('Simplest', function() {
    var test = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    //var test = new Derived();
    expect(test.test('something@domain.com')).toBe(true);
    var tc = jsigs.getTypeCode(test);
    expect(tc).toBe(jsigs.CODES.REGEX);
  });

  it ('StringTest', function() {
    var test = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    test.test('something@domain.com');
  // \^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$\;
    var tc = jsigs.getTypeCode(test);
    expect(jsigs.typeCodeToString(tc)).toBe('RegEx');
  });
});
