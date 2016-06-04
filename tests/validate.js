// require exists in NodeJs
if (typeof require === 'function')
{
  var jsigs = require('../jsigs');
}


/* istanbul ignore next */
function enquote(str) {
  return '\'' + str + '\'';
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


describe('validate...', function() {

  beforeEach(function() {
    jasmine.addMatchers(matcher);
  });


  it ('Basic', function() {
    var signature = {
      fieldOne: true,
      fieldTwo: 10,
      fieldThree: 3.14,
      // we are ignoring these because they are never called and are testing the module.
      fieldFour: /* istanbul ignore next */ function () {},
      fieldFive: /* istanbul ignore next */ function(data){},
      fieldSix: /* istanbul ignore next */ function(params, options) {},
      fieldSeven: /* istanbul ignore next */ function(params, options, suboptions) {},
    };

    var obj3 = {
      fieldOne: false,
      fieldTwo: 0,
      fieldThree: 21.9,
      fieldFour: /* istanbul ignore next */ function() {},
      fieldFive: /* istanbul ignore next */ function(data){},
      fieldSix: /* istanbul ignore next */ function(params, options) {},
      fieldSeven: /* istanbul ignore next */ function(params, options, suboptions) {},
    };


    var options = {
      enable_logging: true,
      props: true,
      detail: false
    };

    expect( function() {
        jsigs.validate(signature, obj3);//, options);
    }).not.toThrow();

  });

  it ('Complex', function() {
    var signature = {
      fieldOne: true,
      fieldTwo: 10,
      fieldThree: 3.14,
      fieldFour: /* istanbul ignore next */ function () {},
      fieldFive: /* istanbul ignore next */ function(data){},
      fieldSix: /* istanbul ignore next */ function(params, options) {},
      fieldSeven: /* istanbul ignore next */ function(params, options, suboptions) {}
    };

    var obj3 = {
      fieldOne: undefined,
      fieldTwo: 0,
      fieldThree: 21.9,
      fieldFour:/* istanbul ignore next */ function() {},
      fieldFive:/* istanbul ignore next */ function(data){},
      fieldSix:/* istanbul ignore next */ function(params, options) {},
      fieldSeven:/* istanbul ignore next */ function(params, options, suboptions) {}
    };

    expect( function() {
        jsigs.validate(signature, obj3);
    }).toThrowContains('fieldOne');

  });

  it ('NULL sig', function() {
    var obj3 = {
      fieldOne: undefined,
      fieldTwo: 0,
      fieldThree: 21.9,
      fieldFour:/* istanbul ignore next */ function() {},
      fieldFive:/* istanbul ignore next */ function(data){},
      fieldSix:/* istanbul ignore next */ function(params, options) {},
      fieldSeven:/* istanbul ignore next */ function(params, options, suboptions) {},
    };

    expect( function() {
        jsigs.validate(obj3, null);
    }).toThrowContains('Signature is null or undefined');

  });

  it ('NULL obj', function() {
    var signature = {
      fieldOne: true,
      fieldTwo: 10,
      fieldThree: 3.14,
      fieldFour: /* istanbul ignore next */ function () {},
      fieldFive: /* istanbul ignore next */ function(data){},
      fieldSix: /* istanbul ignore next */ function(params, options) {},
      fieldSeven: /* istanbul ignore next */ function(params, options, suboptions) {},
    };

    var obj3 = {
      fieldOne: undefined,
      fieldTwo: 0,
      fieldThree: 21.9,
      fieldFour: /* istanbul ignore next */ function() {},
      fieldFive: /* istanbul ignore next */ function(data){},
      fieldSix: /* istanbul ignore next */ function(params, options) {},
      fieldSeven: /* istanbul ignore next */ function(params, options, suboptions) {},
    };

    expect( function() {
        jsigs.validate(null, signature);
    }).toThrowContains('Object is null or undefined');

  });

});
