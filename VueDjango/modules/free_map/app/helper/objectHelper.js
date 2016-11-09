var uuid = require('uuid');
var objectHelper = {};

objectHelper.isArray = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
};

objectHelper.getQueryString = function(s, name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = s.match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};

objectHelper.undefinedOrNull = function(value) {
  return (typeof value === "undefined") || (value === null) || (value === "");
};

objectHelper.extend = function(destination, source) {
    var key;
    if (typeof destination === 'object' && typeof source === 'object') {
        for (key in source) {
            if (source.hasOwnProperty(key)) {
                destination[key] = source[key];
            }
        }
    }
    return destination;
};

objectHelper.addEvent = function (obj, type, fn, scope) {
    if (!obj) {
        return;
    }
    scope = scope || obj;
    var wrappedFn;
    if (obj.addEventListener) {
        wrappedFn = function (e) {
            fn.call(scope, e);
        };
        obj.addEventListener(type, wrappedFn, false);
    } else if (obj.attachEvent) {
        wrappedFn = function () {
            var e = window.event;
            e.target = e.target || e.srcElement;
            e.preventDefault = function () {
                window.event.returnValue = false;
            };
            fn.call(scope, e);
        };
        obj.attachEvent('on' + type, wrappedFn);
    }
};

objectHelper.generateID = function(){
    return uuid.v4()
}

module.exports = objectHelper;