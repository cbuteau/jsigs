// require exists in NodeJs
if (typeof require === 'function')
{
  var jsigs = require('../jsigs');
}

describe('Cover validateFunction...', function() {
  it ('0', function() {
    expect(jsigs.validateFunction(function(){}, 0)).toBe(true);
    expect(jsigs.validateFunction(function(param1){}, 0)).toBe(false);
    expect(jsigs.validateFunction(function(param1, param2){}, 0)).toBe(false);
  });

  it ('1', function() {
    expect(jsigs.validateFunction(function(param1){}, 1)).toBe(true);
    expect(jsigs.validateFunction(function(param1, param2){}, 1)).toBe(false);
    expect(jsigs.validateFunction(function(param1, param2, param3){}, 1)).toBe(false);
  });

  it ('2', function() {
    expect(jsigs.validateFunction(function(param1, param2){}, 2)).toBe(true);
    expect(jsigs.validateFunction(function(param1, param2, param3){}, 2)).toBe(false);
    expect(jsigs.validateFunction(function(param1, param2, param3, param4){}, 2)).toBe(false);
  });

  it ('3', function() {
    expect(jsigs.validateFunction(function(param1, param2, param3){}, 3)).toBe(true);
    expect(jsigs.validateFunction(function(param1, param2, param3, param4){}, 3)).toBe(false);
    expect(jsigs.validateFunction(function(param1, param2, param3, param4, param5){}, 3)).toBe(false);
    expect(jsigs.validateFunction(function(param1, param2, param3, param4, param5, param6){}, 3)).toBe(false);
  });

  it ('4', function() {
    expect(jsigs.validateFunction(function(param1, param2, param3, param4){}, 4)).toBe(true);
    expect(jsigs.validateFunction(function(param1, param2, param3, param4, param5){}, 4)).toBe(false);
    expect(jsigs.validateFunction(function(param1, param2, param3, param4, param5, param6){}, 4)).toBe(false);
  });
})
