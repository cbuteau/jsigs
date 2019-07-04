/*global require,describe,it */
'use strict';

// require exists in NodeJs
if (typeof require === 'function')
{
  var jsigs = require('../jsigs');
}

describe('Defaults...', function() {
  it ('Iterate 1', function() {
    var list = [ 1492, 10.3, 3.14, 10, 888, 1942 ];
    var childSig = jsigs.DEFAULTS.NUMBER;

    var newlist = [];

    jsigs.iterateIfValid(list, childSig, function(item) {
      newlist.push(item);
    });

    expect(newlist).toEqual(list);

  //  expect(jsigs.validateListData(list, childSig)).toBe(true);

  });


  it ('Iterate strings', function() {
    var list = [ 'So the', 'other day', 'I was cleaning my belly button', 'and', 'I', 'found', 'youth'];
    var childSig = jsigs.DEFAULTS.STRING;
    var concat = '';

    jsigs.iterateIfValid(list, childSig, function(item) {
      concat = concat + item + ' ';
    });

    expect(concat).toBe('So the other day I was cleaning my belly button and I found youth ');

  });

});
