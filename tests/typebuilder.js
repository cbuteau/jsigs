/*global require,describe,it */
'use strict';

// require exists in NodeJs
if (typeof require === 'function')
{
  var jsigs = require('../jsigs');
}

describe('Typebbuilder...', function() {
  it ('First one', function() {
    var builder = new jsigs.TypeBuilder();

    builder.addItem('fieldOne', jsigs.CODES.BOOLEAN);
    builder.addItem('fieldTwo', jsigs.CODES.NUMBER);
    builder.addItem('fieldThree', jsigs.CODES.NUMBER);
    builder.addItem('fieldFour', jsigs.CODES.ARRAY);

    var subprop = builder.addSub('callbacks');

    subprop.addFunction('onConnect');
    subprop.addFunction('onDisconnect', 1);
    subprop.addFunction('onData', 2);
    subprop.addFunction('onCustomize', 3);

    var signature = builder.build();

    var object = {
      fieldOne: false,
      fieldTwo: 0,
      fieldThree: 21.9,
      fieldFour: [],
      callbacks: {
        onConnect: /* istanbul ignore next */ function() {},
        onDisconnect: /* istanbul ignore next */ function(err) {},
        onData: /* istanbul ignore next */ function(data, err) {},
        onCustomize: /* istanbul ignore next */ function(field, options, data) {}
      }
    };


        expect(function() {
          jsigs.validate(object, signature);
        }).not.toThrow();
  });


  it ('Iterate strings', function() {
    var stuff = [];

    var builder = new jsigs.TypeBuilder();

    builder.addItem('fieldOne', jsigs.CODES.BOOLEAN);
    builder.addItem('fieldTwo', jsigs.CODES.NUMBER);
    builder.addItem('fieldThree', jsigs.CODES.NUMBER);
    builder.addItem('fieldFour', jsigs.CODES.ARRAY);

    var subprop = builder.addSub('callbacks');

    subprop.addFunction('onConnect');
    subprop.addFunction('onDisconnect', 1);
    subprop.addFunction('onData', 2);
    subprop.addFunction('onCustomize', 3);

    var valid = [
      'Boolean',
      'Number',
      'Number',
      'Array',
      'Complex'
    ];

    builder.dump(stuff);

    expect(stuff).toEqual(valid);

    // We need to make this logic more nested
    //expect(true).toBe(false);
  });

});
