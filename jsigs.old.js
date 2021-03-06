'use strict';
(function(){
  var root = typeof self == 'object' && self.self === self && self ||
              typeof global == 'object' && global.global === global && global ||
              this;
  var previous_jsigs = root.jsigs;

  var jsigs = function(obj) {
    if (obj instanceof jsigs) return obj;
    if (!(this instanceof jsigs)) return new tc(obj);
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

  var TYPECODES = {
    BOOLEAN: 0,
    NUMBER: 1,
    STRING: 2,
    FUNCTION: 3,
    OBJECT: 4,
    UNDEFINED: 5,
    NULL: 6,
    DATE: 7,
    ARRAY: 8
  }

  var INVALID_INDEX = -1;

  function getTypeCode(value) {
    // Simple tests and then duck typign to disern the value.
    if (value === undefined) {
      return TYPECODES.UNDEFINED;
    }
    if (value === null) {
      return TYPECODES.NULL;
    }
    if ((value === true) || (value === false)) {
      return TYPECODES.BOOLEAN;
    }
    if (value.apply && value.call && value.bind) {
      return TYPECODES.FUNCTION;
    }
    if (value.getDay && value.getYear && value.getMonth && value.getHours && value.getMinutes && value.getSeconds) {
      return TYPECODES.DATE;
    }
    if (value.toString && value.valueOf && value.toPrecision) {
      return TYPECODES.NUMBER;
    }
    if (value.trim && value.indexOf && value.toLowerCase && value.toUpperCase) {
      return TYPECODES.STRING;
    }
    if (value.map && value.indexOf && value.push && value.slice) {
      return TYPECODES.ARRAY;
    }
    if (value.isPrototypeOf && value.hasOwnProperty && value.toString) {
      return TYPECODES.OBJECT;
    }

    return TYPECODES.UNMAPPED;
  };

  function typeCodeToString(typeCode) {
    /* istanbul ignore else */
    if (typecodes.STRING === typeCode) {
      return 'String';
    }
    else if (typecodes.OBJECT === typeCode) {
      return 'Object';
    }
    else if (typecodes.UNDEFINED === typeCode) {
      return 'Undefined';
    }
    else if (typecodes.NULL === typeCode) {
      return 'NULL';
    }
    else if (typecodes.NUMBER === typeCode) {
      return 'Number';
    }
    else if (typecodes.BOOLEAN === typeCode) {
      return 'Boolean';
    }
    else if (typecodes.FUNCTION === typeCode) {
      return 'Function';
    }
    else if (typecodes.DATE === typeCode) {
      return 'Date';
    }
    else if (typecodes.ARRAY === typeCode) {
      return 'Array';
    }
  }


  function formatTypeOf(name, propObj, propSig, typeObj, typeSig) {
    var format = 'Prop \"' + name + '\" is type ' + typeof(propObj);
    format += ' while the signature is ' + typeof(propSig);
    format += ' and we think sig=' + typeCodeToString(typeSig) + ' obj=' +  typeCodeToString(typeObj);
    return format;
  }


  function isNullOrUndefined(objectToTest) {
    if ((objectToTest === null) || (objectToTest === undefined)) {
      return true;
    }

    return false;
  }

  function validateObjects(obj, sig, errorList, options) {
    // possibly check the typecode for null or undefined...
    if (isNullOrUndefined(obj)) {
      errorList.push('Object is null or undefined');
      return;
    }

    if (isNullOrUndefined(sig)) {
      errorList.push('Signature is null or undefined');
      return;
    }

    var rootSigType = getTypeCode(sig);
    var rootObjType = getTypeCode(obj);

    if (rootSigType === rootObjType) {
      // hurray
      if (rootSigType === TYPECODES.OBJECT) {
        validateObjectProperties('root', obj, sig, errorList, options);
      } else if (rootSigType === TYPECODES.FUNCTION) {
        validateFunctionSignatures('root', obj, sig, errorList, options);
      }
    } else {
      var errorType = formatTypeOf('root', obj, sig, rootObjType, rootSigType);
      errorList.push(errorType);
    }
  }


  function validateObjectProperties(name, obj, sig, errorList, options) {
    var keys = Object.keys(sig);
    var keysObj = Object.keys(obj);

    if (keys.length !== keysObj.length) {
      var mismatchError = 'Objects do not have the same list of properties.';
      errorList.push(mismatchError);
      return;
    }

    for (var idx = 0; idx < keys.length; idx++) {
      var propName = keys[idx];

      if (options.enable_logging) {
        log('BEGIN propName=' + propName);
      }

      var sigProp = sig[propName];
      var objProp = obj[propName];

      var sigType = getTypeCode(sigProp);
      var objType = getTypeCode(objProp);


      if (sigType === objType) {
        if (options.props) {
          log('Types match ...' + matchers.typeCodeToString(sigType));
        }
        //console.log('Types match ...' + matchers.typeCodeToString(sigType));
        // types match...custom handlign by type.
        if (sigType === matchers.TYPECODES.OBJECT) {
          validateObjects(sigProp, objProp, errorList, options);
        }
        else if (sigType === matchers.TYPECODES.FUNCTION) {
          //console.log('before valid sigs opts');
          //console.log(options);
          validateFunctionSignatures(propName, sigProp, objProp, errorList, options);
        }
      }
      else {
        var errorType = formatTypeOf(propName, objProp, sigProp, objType, sigType);
        errorList.push(errorType);
      }


      if (options.enable_logging) {
        log('END propName=' + propName);
      }
    }
  }

  function validateFunctionSignatures(name, propObj, propSig, errorList, options) {

    //console.log('in func sig opts=' + options);
    if (propObj.length === propSig.length) {
      // awesome.
      log('Function parameters length match');
      if (options.props) {
        log('sig.length=' + propSig.length + ' obj.length=' + propObj.length);
      }
    }
    else {
      var funcError = 'Prop \'' + name + '\' has ' + propObj.length + ' parameters while the signature has ' + propSig.length + ' parameters';
      errorList.push(funcError);
    }
  }

  function emptyLog(data) {
  }

  function cloneObj(obj) {
    var newobj = {};
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
      var prop = keys[i];
      var val = obj[prop];
      var type = matchers.getTypeCode(val);
      if (type === matchers.TYPECODES.OBJECT) {
        newobj[prop] = cloneObj(val);
      }
      newobj[prop] = val;
    }

    return newobj;
  }

  function getComparison(objFieldArray, sigFieldArray) {
    var comparison = {
      matches: [],
      missing: [],
      extra: []
    };

    for (var i = 0; i < sigFieldArray.length; i++) {
      var val = sigFieldArray[i];
      if (objFieldArray.indexOf(val) === INVALID_INDEX) {
        comparison.missing.push(val);
      } else {
        comparison.matches.push(val);
      }
    }

    for (var j = 0; j < objFieldArray.length; j++) {
      var valO = objFieldArray[j];
      if (sigFieldArray.indexOf(valO) === INVALID_INDEX) {
        comparison.extra.push(valO);
      }
    }

    return comparison;
  }

  function mergeObjects(obj, sig, options) {
    var typeSig = getTypeCode(sig);
    var typeObj = getTypeCode(obj);

    //console.log('sig=%d obj=%d', typeSig, typeObj);

    if ((typeSig === TYPECODES.OBJECT) && (typeObj === TYPECODES.OBJECT)) {
      var keysSig = Object.keys(sig);
      var keysObj = Object.keys(obj);

      var comp = getComparison(keysObj, keysSig);

      // make a new object every time.
      var newObj = {};

      for (var i = 0; i < comp.missing.length; i++) {
        var propName = comp.missing[i];
        var sigData = sig[propName];
        var sigType = getTypeCode(sigData);
        if (sigType === TYPECODES.OBJECT) {
          newObj[propName] = cloneObj(sigData);
        } else {
          newObj[propName] = sigData;
        }
      }

      for (var j = 0; j < comp.matches.length; j++) {
          propName = comp.matches[j];
          var objData = obj[propName];

          var objType = getTypeCode(objData);
          if (objType === TYPECODES.OBJECT) {
            var sigData = sig[propName];
            newObj[propName] = mergeObjects(objData, sigData, options);
            //newObj[propName] = cloneObj(objData);
          } else {
            newObj[propName] = objData;
          }
      }

      return newObj;
    } else {
      // for now...we will get smarter once testing single types.
      return sig;
    }
  }


  var optionsSignature = {
    enable_logging: false,
    props: true,
  };

  var defaultOptions = {
    enable_logging: false,
    props: false,
  };



  jsigs.CODES = TYPECODES;

  jsigs.getTypeCode = function(value) {
    return getTypeCode(value);
  };

  jsigs.isTypeCode = function(value, typecode) {
    var computed = getTypeCode(value);
    return computed === typecode;
  };

  jsigs.validateFunction = function(functionObject, paramCount) {
    var computed = getTypeCode(value);
    return (computed === TYPECODES.FUNCTION) && (functionObject.length === paramCount);
  };

  jsigs.mergeAndReturn = function(obj, sig) {
    // make empty object
    if (isNullOrUndefined(obj)) {
        obj = {};
    }

    if (isNullOrUndefined(sig)) {
        throw new Error('signature/default cannot be null or undefined');
    }

    var errors = [];
    validateObjects(obj, sig, errors, defaultOptions);
    if (errors.length === 0) {
      return obj;
    } else {
      return mergeObjects(obj, sig);
    }
  }

})();
