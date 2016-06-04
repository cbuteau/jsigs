// require exists in NodeJs
if (typeof require === 'function')
{
  var jsigs = require('../jsigs');
}

describe('isTypeCode Testing...', function() {
  it ('Boolean', function() {
    expect(jsigs.isTypeCode(true, jsigs.CODES.BOOLEAN)).toBe(true);
    expect(jsigs.isTypeCode(false, jsigs.CODES.BOOLEAN)).toBe(true);
  });

  it ('Undefined', function() {
    var test;
    expect(jsigs.isTypeCode(test, jsigs.CODES.UNDEFINED)).toBe(true);
  });

  it ('null', function() {
    var test = null;
    expect(jsigs.isTypeCode(test, jsigs.CODES.NULL)).toBe(true);
  });

  it ('Date', function() {
    expect(jsigs.isTypeCode(new Date(), jsigs.CODES.DATE)).toBe(true);
  });

  it ('String', function() {
    expect(jsigs.isTypeCode('The quick brown fox takes a shit...', jsigs.CODES.STRING)).toBe(true);
  });

  it ('Number', function() {
    expect(jsigs.isTypeCode(Math.PI, jsigs.CODES.NUMBER)).toBe(true);
    expect(jsigs.isTypeCode(42, jsigs.CODES.NUMBER)).toBe(true);
  });

  it ('Object', function() {
    var test =
    expect(jsigs.isTypeCode({}, jsigs.CODES.OBJECT)).toBe(true);
  });
});
