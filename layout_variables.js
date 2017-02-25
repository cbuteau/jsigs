
  var TYPECODES = {
    BOOLEAN: 0,
    NUMBER: 1,
    STRING: 2,
    FUNCTION: 3,
    OBJECT: 4,
    UNDEFINED: 5,
    NULL: 6,
    DATE: 7,
    ARRAY: 8,
    COMPLEX: 9,
    REGEX: 10,
  }

  Object.freeze(TYPECODES);

  var STRINGS = {
    BOOLEAN: 'Boolean',
    NUMBER: 'Number',
    STRING: 'String',
    FUNCTION: 'Function',
    OBJECT: 'Object',
    UNDEFINED: 'Undefined',
    NULL: 'NULL',
    DATE: 'Date',
    ARRAY: 'Array',
    COMPLEX: 'Complex',
    REGEX: 'RegEx'
  }

  Object.freeze(STRINGS);

  function Base() {
    this.id = Math.random();
  }

  Base.prototype.getId = function() {
    return this.id;
  };

  function Derived() {
  }

  Derived.prototype = Base.prototype;


  var DEFAULTS = {
    BOOLEAN: false,
    NUMBER: 3.14,
    STRING: '',
    FUNCTION: function() {},
    FUNCTIONS: {
      '1': function(param) {},
      '2': function(param1, param2) {},
      '3': function(param1, param2, param3) {}
    },
    OBJECT: {},
    UNDEFINED: undefined,
    NULL: null,
    DATE: new Date(),
    ARRAY: [],
    COMPLEX: new Derived(),
    REGEX: /^\s/
  }

  var INVALID_INDEX = -1;

  var log = emptyLog;
