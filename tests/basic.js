
// require exists in NodeJs
if (typeof require === 'function')
{
  var jsigs = require('../jsigs');
}

describe('getTypeCode...', function() {
  it ('Function', function() {
    var code = jsigs.getTypeCode(function() {});
    expect(code).toBe(jsigs.CODES.FUNCTION);
  });

  it ('Null', function() {
    var code = jsigs.getTypeCode(null);
    expect(code).toBe(jsigs.CODES.NULL);
  });

  it ('Undefined', function() {
    var code = jsigs.getTypeCode(undefined);
    expect(code).toBe(jsigs.CODES.UNDEFINED);
  });

  it ('Boolean', function() {
    var code = jsigs.getTypeCode(true);
    expect(code).toBe(jsigs.CODES.BOOLEAN);
    code = jsigs.getTypeCode(false);
    expect(code).toBe(jsigs.CODES.BOOLEAN);
  });

  it ('Number', function() {
    var code = jsigs.getTypeCode(10);
    expect(code).toBe(jsigs.CODES.NUMBER);
    code = jsigs.getTypeCode(3.14);
    expect(code).toBe(jsigs.CODES.NUMBER);
  });

  it ('Date', function() {
    var code = jsigs.getTypeCode(new Date());
    expect(code).toBe(jsigs.CODES.DATE);
  });

  it ('Array', function() {
    var code = jsigs.getTypeCode([]);
    expect(code).toBe(jsigs.CODES.ARRAY);
  });

  it ('String', function() {
    var code = jsigs.getTypeCode('Just a string');
    expect(code).toBe(jsigs.CODES.STRING);
  });

  it ('Object', function() {
    var code = jsigs.getTypeCode({ one: 'Just a string' });
    expect(code).toBe(jsigs.CODES.OBJECT);
  });

  describe('typeCodeToString...', function() {
    it ('null string', function() {
      var typeString = jsigs.typeCodeToString(jsigs.getTypeCode(null));
      expect(typeString).toBe('NULL');
    });

    it ('undefined string', function() {
      var testUndef;
      var typeString = jsigs.typeCodeToString(jsigs.getTypeCode(testUndef));
      expect(typeString).toBe('Undefined');
    });

    it ('number string', function() {
      var testNum = 10;
      var typeString = jsigs.typeCodeToString(jsigs.getTypeCode(testNum));
      expect(typeString).toBe('Number');
    });

    it ('array string', function() {
      var testArray = [10,20,30];
      var typeString = jsigs.typeCodeToString(jsigs.getTypeCode(testArray));
      expect(typeString).toBe('Array');
    });

    it ('boolean string', function() {
      var testBool = false;
      var typeString = jsigs.typeCodeToString(jsigs.getTypeCode(testBool));
      expect(typeString).toBe('Boolean');
    });

    it ('date string', function() {
      var testDate = new Date(Date.now());
      var typeString = jsigs.typeCodeToString(jsigs.getTypeCode(testDate));
      expect(typeString).toBe('Date');
    });


    it ('function string', function() {
      var testFun = /* istanbul ignore next */ function() {};
      var typeString = jsigs.typeCodeToString(jsigs.getTypeCode(testFun));
      expect(typeString).toBe('Function');
    });

    it ('String string', function() {
      var testStr = 'The quick brown fox leaped over the sleeping dog';
      var typeString = jsigs.typeCodeToString(jsigs.getTypeCode(testStr));
      expect(typeString).toBe('String');
    });

    it ('Object string', function() {
      var testParam = {};
      var typeString = jsigs.typeCodeToString(jsigs.getTypeCode(testParam));
      expect(typeString).toBe('Object');
    });

    it ('Array string', function() {
      var testParam = [];
      var typeString = jsigs.typeCodeToString(jsigs.getTypeCode(testParam));
      expect(typeString).toBe('Array');
    });

  });
});
