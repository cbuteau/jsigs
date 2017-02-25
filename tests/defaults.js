/*global require,describe,it */
'use strict';

// require exists in NodeJs
if (typeof require === 'function')
{
  var jsigs = require('../jsigs');
}

describe('Defaults...', function() {
  it ('Boolean', function() {
    var test = jsigs.getTypeCode(jsigs.DEFAULTS.BOOLEAN);
    expect(test).toBe(jsigs.CODES.BOOLEAN);
  });

  it ('Number', function() {
    var test = jsigs.getTypeCode(jsigs.DEFAULTS.NUMBER);
    expect(test).toBe(jsigs.CODES.NUMBER);
  });

  it ('String', function() {
    var test = jsigs.getTypeCode(jsigs.DEFAULTS.STRING);
    expect(test).toBe(jsigs.CODES.STRING);
  });

  it ('Function 0', function() {
    var test = jsigs.getTypeCode(jsigs.DEFAULTS.FUNCTION);
    expect(test).toBe(jsigs.CODES.FUNCTION);
  });
  it ('Function 1', function() {
    var test = jsigs.getTypeCode(jsigs.DEFAULTS.FUNCTIONS[1]);
    expect(test).toBe(jsigs.CODES.FUNCTION);
  });

  it ('Function 2', function() {
    var test = jsigs.getTypeCode(jsigs.DEFAULTS.FUNCTIONS[2]);
    expect(test).toBe(jsigs.CODES.FUNCTION);
});

it ('Function 3', function() {
  var test = jsigs.getTypeCode(jsigs.DEFAULTS.FUNCTIONS[3]);
  expect(test).toBe(jsigs.CODES.FUNCTION);
});


  it ('Object', function() {
    var test = jsigs.getTypeCode(jsigs.DEFAULTS.OBJECT);
    expect(test).toBe(jsigs.CODES.OBJECT);
  });

  it('UNdefined', function() {
    var test = jsigs.getTypeCode(jsigs.DEFAULTS.UNDEFINED);
    expect(test).toBe(jsigs.CODES.UNDEFINED);
  });

  it ('Null', function() {
    var test = jsigs.getTypeCode(jsigs.DEFAULTS.NULL);
    expect(test).toBe(jsigs.CODES.NULL);
  });

  it ('Date', function() {
    var test = jsigs.getTypeCode(jsigs.DEFAULTS.DATE);
    expect(test).toBe(jsigs.CODES.DATE);
  });

  it ('Array', function() {
    var test = jsigs.getTypeCode(jsigs.DEFAULTS.ARRAY);
    expect(test).toBe(jsigs.CODES.ARRAY);
  });

  it ('Complex', function() {
    var test = jsigs.getTypeCode(jsigs.DEFAULTS.COMPLEX);
    expect(test).toBe(jsigs.CODES.COMPLEX);
  });

  it ('Regex', function() {
    var test = jsigs.getTypeCode(jsigs.DEFAULTS.REGEX);
    expect(test).toBe(jsigs.CODES.REGEX);
  });

  it ('sig', function() {
    var signature = {
      fieldOne: true,
      fieldTwo: 10,
      fieldThree: 3.14,
      fieldFour: [],
      callbacks: {
        onConnect: /* istanbul ignore next */ function() {},
        onDisconnect: /* istanbul ignore next */ function(err) {},
        onData: /* istanbul ignore next */ function(data, err) {},
        onCustomize: /* istanbul ignore next */ function(field, options, data) {}
      }
    };

    var object = {
      fieldOne: jsigs.DEFAULTS.BOOLEAN,
      fieldTwo: jsigs.DEFAULTS.NUMBER,
      fieldThree: jsigs.DEFAULTS.NUMBER,
      fieldFour: jsigs.DEFAULTS.ARRAY,
      callbacks: {
        onConnect: jsigs.DEFAULTS.FUNCTION,
        onDisconnect: jsigs.DEFAULTS.FUNCTIONS[1],
        onData: jsigs.DEFAULTS.FUNCTIONS[2],
        onCustomize: jsigs.DEFAULTS.FUNCTIONS[3]
      }
    };

    expect(function() {
      jsigs.validate(object, signature);
    }).not.toThrow();
  });

});
