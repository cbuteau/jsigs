//jslint node
// require exists in NodeJs
if (typeof require === 'function')
{
  var jsigs = require('../jsigs');
}

describe('The list data function...orignally in an unpublished project.', function() {
  describe('Parameters', function() {
    it ('Undefined list', function() {
      var list;
      var childSig = 20;

      expect(
        function() {
          jsigs.validateListData(list, childSig);
        }
        ).toThrow();
    });

    it ('undefined child sig', function() {
      var list = [];
      var childSig;

      expect(function() {
        jsigs.validateListData(list, childSig)
      }).toThrow();
    });

    it ('null list', function() {
      var list = null;
      var childSig = { prop: 10 };

      expect(function() {
        jsigs.validateListData(list, childSig);
      }).toThrow();
    });

    it ('null childSig', function() {
      var list = [];
      var childSig = null;

      expect(function() {
        jsigs.validateListData(list, childSig);
      }).toThrow();
    });
  });

  describe('Positives', function() {
    it ('Booleans', function() {
      var list = [ true, false, true, true, false, false ];
      var childSig = false;

      expect(jsigs.validateListData(list, childSig)).toBe(true);
    });

    it ('Numbers', function() {
      var list = [ 1492, 10.3, 3.14, 10, 888, 1942 ];
      var childSig = 10;

      expect(jsigs.validateListData(list, childSig)).toBe(true);
    });

    it ('Strings', function() {
      //expect(true).toBe(false);
      var list = [ 'The', 'quick', 'brown', 'fox', 'jumped', 'over', 'the', 'sleeping', 'dog' ];
      var childSig = 'string';

      expect(jsigs.validateListData(list, childSig)).toBe(true);
    });

    it ('functions', function() {
      var list = [
        function() {},
        function() {},
        function() {},
        function() {},
      ];
      var childSig = function() {};

      expect(jsigs.validateListData(list, childSig)).toBe(true);
      //expect(true).toBe(false);
    });

    it ('dates', function() {
      var list = [
        new Date(),
        new Date('2016-03-02T18:22:34Z'),
        new Date(12,25,0001),

      ];
      var childSig = new Date();

      expect(jsigs.validateListData(list, childSig)).toBe(true);
      //expect(true).toBe(false);
    });

    it ('simple objects', function() {
      var list = [
        { name: 'Columbus Journey', type: 0, when: new Date(1492, 2, 3)},
        { name: 'Declaration', type: 1, when: new Date(1776, 6, 4)},
        { name: 'Joshua', type: 10, when: new Date(4, 12, 25)}
       ];
      var childSig = { name: '', type: 10, when: new Date() };

      expect(jsigs.validateListData(list, childSig)).toBe(true);
    });
  });

  describe('negatives', function() {
    it ('One wrong', function() {
      var list = [ true, false, true, true, 10, false ];
      var childSig = false;

      expect(jsigs.validateListData(list, childSig)).toBe(false);
    });

    it ('None right', function() {
      var list = [ true, false, true, true, false, false ];
      var childSig = 10;

      expect(jsigs.validateListData(list, childSig)).toBe(false);
    });

    it ('A null in the midst', function() {
      var list = [ true, false, true, true, false, null ];
      var childSig = false;

      expect(jsigs.validateListData(list, childSig)).toBe(false);
    });
  });
});
