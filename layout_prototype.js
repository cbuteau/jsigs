  var optionsSignature = {
    enable_logging: false,
    props: true,
  };

  var defaultOptions = {
    enable_logging: false,
    props: false,
  };

  jsigs.CODES = TYPECODES;

  jsigs.DEFAULTS = DEFAULTS;

  jsigs.prototype = {
    getTypeCode: function(value) {
      return getTypeCode(value);
    },
    isTypeCode: function(value, typecode) {
      var computed = getTypeCode(value);
      return computed === typecode;
    },
    typeCodeToString: function(typecode) {
      return typeCodeToString(typecode);
    }
  }


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

  jsigs.iterateIfValid = function(list, childSig, callback) {
    if (validateListData(list, childSig)) {
      iterate(list, callback);
    }
  }

  jsigs.TypeBuilder = function() {
    this._instance = Math.random();
    this.data = {};
  }

  jsigs.TypeBuilder.prototype.addItem = function(name, typeCode) {
      this.data[name] = getDefaultFromTypeCode(typeCode);
  };

  jsigs.TypeBuilder.prototype.addFunction  = function(name, parameters) {
    if ((parameters === undefined) || (parameters === 0)) {
      this.data[name] = DEFAULTS.FUNCTION;
    } else if (parameters === 1) {
      this.data[name] = DEFAULTS.FUNCTIONS[1];
    } else if (parameters === 2) {
      this.data[name] = DEFAULTS.FUNCTIONS[2];
    } else if (parameters === 3) {
      this.data[name] = DEFAULTS.FUNCTIONS[3];
    }
  };

  jsigs.TypeBuilder.prototype.build = function() {
    var sig = {};
    var keys = Object.keys(this.data);
    var that = this;
    iterate(keys, function(key) {
      var sub = that.data[key];
      if (sub instanceof jsigs.TypeBuilder) {
        sig[key] = sub.build();
      } else {
        sig[key] = sub;
      }
    });
    return sig;
    //return this.data;
  };

  jsigs.TypeBuilder.prototype._getDataKeys = function() {
    return Object.keys(this.data);
  };

  jsigs.TypeBuilder.prototype.dump = function(array) {
    var keys = this._getDataKeys();
    var that = this;
    iterate(keys, function(key) {
      var item = that.data[key];
      var typeCode = getTypeCode(item);
      if (typeCode === TYPECODES.OBJECT || typeCode === TYPECODES.COMPLEX) {
        // recurse...

      } else {
        // turn into string and append..

      }
      array.push(typeCodeToString(getTypeCode(item)));
      console.log(typeCodeToString(getTypeCode(item)));
    });
  };

  jsigs.TypeBuilder.prototype.addSub = function(name) {
    var sub = new jsigs.TypeBuilder();
    this.data[name] = sub;
    return sub;
  }
