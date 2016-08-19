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
