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

  var log = emptyLog;

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

    /* istanbul ignore next */
    return TYPECODES.UNMAPPED;
  };

  function typeCodeToString(typeCode) {
    /* istanbul ignore else */
    if (TYPECODES.STRING === typeCode) {
      return 'String';
    }
    else if (TYPECODES.OBJECT === typeCode) {
      return 'Object';
    }
    else if (TYPECODES.UNDEFINED === typeCode) {
      return 'Undefined';
    }
    else if (TYPECODES.NULL === typeCode) {
      return 'NULL';
    }
    else if (TYPECODES.NUMBER === typeCode) {
      return 'Number';
    }
    else if (TYPECODES.BOOLEAN === typeCode) {
      return 'Boolean';
    }
    else if (TYPECODES.FUNCTION === typeCode) {
      return 'Function';
    }
    else if (TYPECODES.DATE === typeCode) {
      return 'Date';
    }
    else if (TYPECODES.ARRAY === typeCode) {
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

  function validateArray(array, typeCode) {
    var type = getTypeCode(array);
    var matchCounter = 0;
    if (type === TYPECODES.ARRAY) {
      for (var i = 0; i < array.length; i++) {
        var item = array[i];
        var itemType = getTypeCode(item);
        if (itemType === typeCode) {
          matchCounter++;
        }
      }
      return (matchCounter === array.length);
    } else {
      return false;
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
          log('Types match ...' + typeCodeToString(sigType));
        }
        //console.log('Types match ...' + matchers.typeCodeToString(sigType));
        // types match...custom handlign by type.
        if (sigType === TYPECODES.OBJECT) {
          validateObjects(sigProp, objProp, errorList, options);
        }
        else if (sigType === TYPECODES.FUNCTION) {
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
      var type = getTypeCode(val);
      if (type === TYPECODES.OBJECT) {
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


function throwIfErrors(errorList) {
  if (errorList.length > 0) {
    var fullString = '';
    for (var i = 0; i < errorList.length; i++) {
      var err = errorList[i];
      fullString += err + '\n';
    }
    throw new Error(fullString);
  }
}

function validateListData(list, childSig) {
  if (isNullOrUndefined(list) || isNullOrUndefined(childSig)) {
    throw Error('What makes you think you don\'t pass parameters');
  }

  var type = getTypeCode(childSig);
  var errors = [];
  var matchCount = 0;


  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    if (type === TYPECODES.OBJECT) {
      errors = [];
      validateObjectProperties('root', item, childSig, errors, {});
      if (errors.length === 0) {
        matchCount++;
      }
    } else {
      var itemtype = getTypeCode(item);
      if (itemtype === type) {
        matchCount++;
      }
    }
  }

  return matchCount === list.length;
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

  jsigs.typeCodeToString = function(typeCode) {
    return typeCodeToString(typeCode);
  };

  jsigs.validateFunction = function(functionObject, paramCount) {
    var computed = getTypeCode(functionObject);
    return (computed === TYPECODES.FUNCTION) && (functionObject.length === paramCount);
  };

  jsigs.validateArray = function(array, typeCode) {
    return validateArray(array, typeCode);
  };

  jsigs.validate = function(obj, sig, options) {
    var errors = [];

    // Dogfooding the mechanism to decide on the options to use.
    //var opts = mergeObjects(options, optionsSignature);
    var optsTemp = jsigs.mergeAndReturn(options, defaultOptions);
    var opts = optsTemp;

    if (opts.enable_logging) {
      log = console.log;
    }
    else {
      log = emptyLog;
    }

    validateObjects(obj, sig, errors, opts);
    throwIfErrors(errors);
  }

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

  jsigs.validateListData = function(list, childSig) {
    return validateListData(list, childSig);
  }


})();
