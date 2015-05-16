var util = require('util');
var _ = require('lodash');

function _getObjectString(obj){
    return util.inspect(obj, false, null);
}

function _log(msg) {
    console.log(_getObjectString(msg));
}

function _logError(err){
    console.error(err);
}

function _stringifyAllTheThings(obj){
    var stringedObj = (Object.prototype.toString.call(obj) === '[object Array]') ? [] : {};
    if(typeof obj === 'object'){
        _.forOwn(obj,
            function(value, key) {
                _log('***STRING_THINGS*** key: ' + key + ' value: ' + value);
                if(typeof value === 'undefined' || value == null) {
                    stringedObj[key] = null;
                } else if(typeof value === 'object'){
                    stringedObj[key] = _stringifyAllTheThings(value);
                } else {
                    stringedObj[key] = _convertDateTimeToDate(value.toString());
                }
            }
        );

        return stringedObj;
    } else {
        _logError('***STRING_THINGS*** parameter must be an object: ' + obj);
    }
}

function _convertDateTimeToDate(string) {
    // We currently only support Dates NOT DateTimes.  Treat DateTimes like Dates.
    var isDateTimeRegex = /(^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\dZ$)/;
    var removeTimeRegex = /(T\d\d:\d\d:\d\dZ)/ig;

    if (isDateTimeRegex.test(string)) {
        return string.replace(removeTimeRegex, '');
    } else {
        return string;
    }
}

module.exports = {
    logError: _logError,
    log: _log,
    toString: _getObjectString,
    stringifyAllTheThings: _stringifyAllTheThings,
    _: _
};