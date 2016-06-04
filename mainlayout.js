'use strict';
(function(){
  var root = typeof self == 'object' && self.self === self && self ||
              typeof global == 'object' && global.global === global && global ||
              this;
  var previous_jsigs = root.jsigs;

  var jsigs = function(obj) {
    if (obj instanceof jsigs) return obj;
    if (!(this instanceof jsigs)) return new jsigs(obj);
    this.jsigs_wrapped = obj;
  };

  // Export for NodeJs
  if (typeof exports !== 'undefined' && !exports.nodeType) {
    if (typeof module != 'undefined' && !module.nodeType && module.exports) {
      exports = module.exports = jsigs;
    }
    exports.jsigs = jsigs;
  } else {
    root.jsigs = jsigs;
  }
  {{{variables}}}
  {{{functions}}}

  {{{prototype}}}

})();
