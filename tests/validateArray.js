// require exists in NodeJs
if (typeof require === 'function')
{
  var jsigs = require('../jsigs');
}

describe('Cover validateArray...', function() {
  describe('Positives', function() {
    it ('Booleans', function() {
      var list = [
        true,
        false,
        true,
        false,
        true,
        true,
        false,
        false
      ];

      expect(jsigs.validateArray(list, jsigs.CODES.BOOLEAN)).toBe(true);
      expect(jsigs.validateArray(list, jsigs.CODES.STRING)).toBe(false);
    });

    it ('Strings', function() {
      var list = [
        'The quick brown fox',
        'jumps over the lazy dog',
        'on an early Sunday morning',
        'but afetr the sunrise'
      ];

      expect(jsigs.validateArray(list, jsigs.CODES.STRING)).toBe(true);
      expect(jsigs.validateArray(list, jsigs.CODES.ARRAY)).toBe(false);
    });

    it ('Numbers', function() {
      var list = [
        Math.PI,
        Math.E,
        1971,
        10
      ];

      expect(jsigs.validateArray(list, jsigs.CODES.NUMBER)).toBe(true);
      expect(jsigs.validateArray(list, jsigs.CODES.STRING)).toBe(false);

    });

    it ('Functions', function() {
      var list = [
        function() {},
        function(param1) {},
        function(param1, param2) {}
      ]

      expect(jsigs.validateArray(list, jsigs.CODES.FUNCTION)).toBe(true);
      expect(jsigs.validateArray(list, jsigs.CODES.STRING)).toBe(false);

    });

    it ('Objects', function() {
      var list = [
        {},
        { fieldOne: true, fieldTwo: 10 },
        { one: 1, two: 2, three: 3 }
      ]

      expect(jsigs.validateArray(list, jsigs.CODES.OBJECT)).toBe(true);
      expect(jsigs.validateArray(list, jsigs.CODES.STRING)).toBe(false);

    });

    it ('Dates', function() {
      var list = [
        new Date(),
        new Date(1971, 12, 11),
        new Date(''),
        new Date(Date.now())
      ];

      expect(jsigs.validateArray(list, jsigs.CODES.DATE)).toBe(true);
      expect(jsigs.validateArray(list, jsigs.CODES.STRING)).toBe(false);

    });

    it ('Arrays', function() {
      var list = [
        [],
        [true, false, true],
        [10,9,8,7,6,5,4,3,2,1],
        ['A', 'quick', 'brown', 'fox']
      ];

      expect(jsigs.validateArray(list, jsigs.CODES.ARRAY)).toBe(true);
      expect(jsigs.validateArray(list, jsigs.CODES.STRING)).toBe(false);

    });
  });

  describe('Negatives', function() {
    it ('Booleans', function() {
      var list = [
        true,
        false,
        true,
        false,
        true,
        true,
        false,
        'uh Oh'
      ];

      expect(jsigs.validateArray(list, jsigs.CODES.BOOLEAN)).toBe(false);

    });

    it ('Strings', function() {
      var list = [
        'The quick brown fox',
        'jumps over the lazy dog',
        'on an early Sunday morning',
        10.0000001
      ];

      expect(jsigs.validateArray(list, jsigs.CODES.STRING)).toBe(false);
    });

    it ('Numbers', function() {
      var list = [
        Math.PI,
        Math.E,
        1971,
        '10'
      ];

      expect(jsigs.validateArray(list, jsigs.CODES.NUMBER)).toBe(false);

    });

    it ('Functions', function() {
      var list = [
        function() {},
        function(param1) {},
        function(param1, param2) {},
        'Oh Noes'
      ]

      expect(jsigs.validateArray(list, jsigs.CODES.FUNCTION)).toBe(false);

    });

    it ('Objects', function() {
      var list = [
        {},
        { fieldOne: true, fieldTwo: 10 },
        { one: 1, two: 2, three: 3 },
        'For Shame'
      ]

      expect(jsigs.validateArray(list, jsigs.CODES.OBJECT)).toBe(false);

    });

    it ('Dates', function() {
      var list = [
        new Date(),
        new Date(1971, 12, 11),
        new Date(''),
        new Date(Date.now()),
        Date.now()
      ];

      expect(jsigs.validateArray(list, jsigs.CODES.DATE)).toBe(false);

    });

    it ('Arrays', function() {
      var list = [
        [],
        [true, false, true],
        [10,9,8,7,6,5,4,3,2,1],
        ['A', 'quick', 'brown', 'fox'],
        'Nope'
      ];

      expect(jsigs.validateArray(list, jsigs.CODES.ARRAY)).toBe(false);

    });

  });

});
