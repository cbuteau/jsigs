// require exists in NodeJs
if (typeof require === 'function')
{
  var jsigs = require('../jsigs');
}

describe('Tests of nested objects', function() {
  it ('basic', function() {
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

  it ('function mismatch', function() {
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
      fieldOne: false,
      fieldTwo: 0,
      fieldThree: 21.9,
      fieldFour: [],
      callbacks: {
        onConnect: /* istanbul ignore next */ function(param1) {},
        onDisconnect: /* istanbul ignore next */ function(err) {},
        onData: /* istanbul ignore next */ function(data, err) {},
        onCustomize: /* istanbul ignore next */ function(field, options, data) {}
      }
    }

      expect(function() {
        jsigs.validate(object, signature);
      }).toThrow();

  });

  it ('Deeply nested', function() {
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
      },
      customize: {
        headers: [],
        debugging: {
          level: 0,
          throws: true,
        }
      }
    };

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
      },
      customize: {
        headers: ["Tree", "Modified", "Owned"],
        debugging: {
          level: 0,
          throws: true,
        }
      }
    };

    expect(function() {
      jsigs.validate(object, signature);
    }).not.toThrow();

  });


    it ('Merge with depth', function() {
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
        },
        customize: {
          headers: [],
          debugging: {
            level: 0,
            throws: true,
            santa: 'Kris Kringle'
          }
        }
      };

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
        },
        customize: {
          headers: ["Tree", "Modified", "Owned"],
          debugging: {
            level: 0,
            throws: true,
          }
        }
      };

      var newObj = jsigs.mergeAndReturn(object, signature);

      expect(newObj.customize.debugging.santa).toBe('Kris Kringle');

    });


});
