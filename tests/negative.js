var isBrowser = true;
// require exists in NodeJs
if (typeof require === 'function')
{
  var jsigs = require('../jsigs');
  isBrowser = false;
}

var matcher = {
  toThrowContains: function() {
    return {
      compare: function(actual, expected) {
        var exception;
        var result = {};

        try {
          actual();
        } catch (e) {
          exception = e;
        }

        if (exception) {
          var msg = exception.message;

          if (msg.indexOf(expected) !== -1) {
            result.pass = true;
          } else {
            result.pass = false;
            result.message = enquote(msg) + ' did not contain ' + enquote(expected);
          }
        }

        return result;
      }
    };
  }
};

/* istanbul ignore next */
function enquote(str) {
  return '\'' + str + '\'';
}

describe('Negative testing means more coverage.', function() {

  beforeEach(function() {
    if (isBrowser) {
      // Testem uses jasmine 1 from CDN
      this.addMatchers(matcher);
    } else {
      jasmine.addMatchers(matcher);
    }
  });

  it ('sig NULL', function() {
    var signature = null;

    var object = {
      fieldOne: false,
      fieldTwo: 0,
      fieldThree: 21.9,
      fieldFour: /* istanbul ignore next */ function() {},
      fieldFive: /* istanbul ignore next */ function(data){},
      fieldSix: /* istanbul ignore next */ function(params, options) {},
    };

    expect(function() {
      var newobj = jsigs.mergeAndReturn(object, signature);
    }).toThrowContains('cannot be null or undefined');
  });

  it ('sig undefined', function() {
    var signature;

    var object = {
      fieldOne: false,
      fieldTwo: 0,
      fieldThree: 21.9,
      fieldFour: /* istanbul ignore next */ function() {},
      fieldFive: /* istanbul ignore next */ function(data){},
      fieldSix: /* istanbul ignore next */ function(params, options) {},
    };

    expect(function() {
      var newobj = jsigs.mergeAndReturn(object, signature);
    }).toThrowContains('cannot be null or undefined');

  });
});
