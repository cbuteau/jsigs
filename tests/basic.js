
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
});
