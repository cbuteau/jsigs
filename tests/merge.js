// require exists in NodeJs
if (typeof require === 'function')
{
  var jsigs = require('../jsigs');
}

describe('All your merge belong to us.', function() {
  it ('first', function() {
    var signature = {
      fieldOne: true,
      fieldTwo: 10,
      fieldThree: 3.14,
      fieldFour: /* istanbul ignore next */ function () {},
      fieldFive:/* istanbul ignore next */ function(data){},
      fieldSix: /* istanbul ignore next */ function(params, options) {},
      fieldSeven: /* istanbul ignore next */ function(params, options, suboptions) {},
    };

    var object = {
      fieldOne: false,
      fieldTwo: 0,
      fieldThree: 21.9,
      fieldFour: /* istanbul ignore next */ function() {},
      fieldFive: /* istanbul ignore next */ function(data){},
      fieldSix: /* istanbul ignore next */ function(params, options) {},
    };

    var newobj = jsigs.mergeAndReturn(object, signature);

    expect(newobj).not.toBeNull();

    var keys = Object.keys(newobj);
    expect(keys.length).toBe(7);

  });

  it ('less than', function() {
    var signature = {
      fieldOne: true,
      fieldTwo: 10,
      fieldThree: 3.14,
      fieldFour: /* istanbul ignore next */ function () {},
    };

    var object = {
      fieldOne: false,
      fieldTwo: 0,
      fieldThree: 21.9,
      fieldFour: /* istanbul ignore next */ function() {},
      fieldFive: /* istanbul ignore next */ function(data){},
      fieldSix: /* istanbul ignore next */ function(params, options) {},
    };

    var newobj = jsigs.mergeAndReturn(object, signature);

    expect(newobj).not.toBeNull();

    var keys = Object.keys(newobj);
    expect(keys.length).toBe(4);
  });

  it ('Missing prop', function() {
    var signature = {
      fieldOne: true,
      fieldTwo: 10,
      fieldThree: 3.14,
      fieldFour: /* istanbul ignore next */ function () {},
      fieldSeven: {
        subFieldOne: true,
        subFieldTwo: 100.001,
        subFieldThree: {
          ReallyDeep: 'Really Deep',
          AndReallyNested: {
            superDeep: 'Troy',
            superNested: 2.71828
          },
        }
      }
    };

    var object = {
      fieldOne: false,
      fieldTwo: 0,
      fieldThree: 21.9,
      fieldFour: /* istanbul ignore next */ function() {},
      fieldFive: /* istanbul ignore next */ function(data){},
      fieldSix: /* istanbul ignore next */ function(params, options) {},
    };

    var newobj = jsigs.mergeAndReturn(object, signature);

    expect(newobj).not.toBeNull();

    var keys = Object.keys(newobj);
    expect(keys.length).toBe(5);

    var keysSub = Object.keys(newobj.fieldSeven);
    expect(keysSub.length).toBe(3);
  });

  it ('Big and hairy', function() {
    var signature = {
      fieldOne: true,
      fieldTwo: 10,
      fieldThree: 3.14,
      fieldFour: /* istanbul ignore next */ function () {},
      fieldSeven: {
        subFieldOne: true,
        subFieldTwo: 100.001,
        subFieldThree: {
          ReallyDeep: 'Really Deep',
          AndReallyNested: {
            superDeep: 'Troy',
            superNested: 2.71828
          },
        }
      },
      fieldEight: {
        subFieldThree: [],
        subFieldFour: '',
        subFieldFive: 13,
      },
      fieldNine: {
        subFieldSix: 1,
        subFieldSeven: '',
        subFieldEight: /* istanbul ignore next */ function() {}
      }
    };

    var object = {
      fieldOne: false,
      fieldTwo: 0,
      fieldThree: 21.9,
      fieldFour: /* istanbul ignore next */ function() {},
      fieldFive: /* istanbul ignore next */ function(data){},
      fieldSix: /* istanbul ignore next */ function(params, options) {},
    };

    var newobj = jsigs.mergeAndReturn(object, signature);

    expect(newobj).not.toBeNull();

    var keys = Object.keys(newobj);
    expect(keys.length).toBe(7);

    var keysSub = Object.keys(newobj.fieldSeven);
    expect(keysSub.length).toBe(3);

    var typeCode = jsigs.getTypeCode(newobj.fieldEight.subFieldThree);
    expect(typeCode).toBe(jsigs.CODES.ARRAY);
  });
});
