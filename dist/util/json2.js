"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//  json2.js
//  2017-06-12
//  Public Domain.
//  NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

//  USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
//  NOT CONTROL.

//  This file creates a global JSON object containing two methods: stringify
//  and parse. This file provides the ES5 JSON capability to ES3 systems.
//  If a project might run on IE8 or earlier, then this file should be included.
//  This file does nothing on ES5 systems.

//      JSON.stringify(value, replacer, space)
//          value       any JavaScript value, usually an object or array.
//          replacer    an optional parameter that determines how object
//                      values are stringified for objects. It can be a
//                      function or an array of strings.
//          space       an optional parameter that specifies the indentation
//                      of nested structures. If it is omitted, the text will
//                      be packed without extra whitespace. If it is a number,
//                      it will specify the number of spaces to indent at each
//                      level. If it is a string (such as "\t" or "&nbsp;"),
//                      it contains the characters used to indent at each level.
//          This method produces a JSON text from a JavaScript value.
//          When an object value is found, if the object contains a toJSON
//          method, its toJSON method will be called and the result will be
//          stringified. A toJSON method does not serialize: it returns the
//          value represented by the name/value pair that should be serialized,
//          or undefined if nothing should be serialized. The toJSON method
//          will be passed the key associated with the value, and this will be
//          bound to the value.

//          For example, this would serialize Dates as ISO strings.

//              Date.prototype.toJSON = function (key) {
//                  function f(n) {
//                      // Format integers to have at least two digits.
//                      return (n < 10)
//                          ? "0" + n
//                          : n;
//                  }
//                  return this.getUTCFullYear()   + "-" +
//                       f(this.getUTCMonth() + 1) + "-" +
//                       f(this.getUTCDate())      + "T" +
//                       f(this.getUTCHours())     + ":" +
//                       f(this.getUTCMinutes())   + ":" +
//                       f(this.getUTCSeconds())   + "Z";
//              };

//          You can provide an optional replacer method. It will be passed the
//          key and value of each member, with this bound to the containing
//          object. The value that is returned from your method will be
//          serialized. If your method returns undefined, then the member will
//          be excluded from the serialization.

//          If the replacer parameter is an array of strings, then it will be
//          used to select the members to be serialized. It filters the results
//          such that only members with keys listed in the replacer array are
//          stringified.

//          Values that do not have JSON representations, such as undefined or
//          functions, will not be serialized. Such values in objects will be
//          dropped; in arrays they will be replaced with null. You can use
//          a replacer function to replace those with JSON values.

//          JSON.stringify(undefined) returns undefined.

//          The optional space parameter produces a stringification of the
//          value that is filled with line breaks and indentation to make it
//          easier to read.

//          If the space parameter is a non-empty string, then that string will
//          be used for indentation. If the space parameter is a number, then
//          the indentation will be that many spaces.

//          Example:

//          text = JSON.stringify(["e", {pluribus: "unum"}]);
//          // text is '["e",{"pluribus":"unum"}]'

//          text = JSON.stringify(["e", {pluribus: "unum"}], null, "\t");
//          // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

//          text = JSON.stringify([new Date()], function (key, value) {
//              return this[key] instanceof Date
//                  ? "Date(" + this[key] + ")"
//                  : value;
//          });
//          // text is '["Date(---current time---)"]'

//      JSON.parse(text, reviver)
//          This method parses a JSON text to produce an object or array.
//          It can throw a SyntaxError exception.

//          The optional reviver parameter is a function that can filter and
//          transform the results. It receives each of the keys and values,
//          and its return value is used instead of the original value.
//          If it returns what it received, then the structure is not modified.
//          If it returns undefined then the member is deleted.

//          Example:

//          // Parse the text. Values that look like ISO date strings will
//          // be converted to Date objects.

//          myData = JSON.parse(text, function (key, value) {
//              var a;
//              if (typeof value === "string") {
//                  a =
//   /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
//                  if (a) {
//                      return new Date(Date.UTC(
//                         +a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]
//                      ));
//                  }
//                  return value;
//              }
//          });

//          myData = JSON.parse(
//              "[\"Date(09/09/2001)\"]",
//              function (key, value) {
//                  var d;
//                  if (
//                      typeof value === "string"
//                      && value.slice(0, 5) === "Date("
//                      && value.slice(-1) === ")"
//                  ) {
//                      d = new Date(value.slice(5, -1));
//                      if (d) {
//                          return d;
//                      }
//                  }
//                  return value;
//              }
//          );

//  This is a reference implementation. You are free to copy, modify, or
//  redistribute.

/*jslint
    eval, for, this
*/

/*property
    JSON, apply, call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/

// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if ((typeof JSON === "undefined" ? "undefined" : _typeof(JSON)) !== "object") {
  JSON = {};
}

(function () {
  "use strict";

  var rx_one = /^[\],:{}\s]*$/;
  var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
  var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
  var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
  var rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
  var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

  function f(n) {
    // Format integers to have at least two digits.
    return n < 10 ? "0" + n : n;
  }

  function this_value() {
    return this.valueOf();
  }

  if (typeof Date.prototype.toJSON !== "function") {

    Date.prototype.toJSON = function () {

      return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null;
    };

    Boolean.prototype.toJSON = this_value;
    Number.prototype.toJSON = this_value;
    String.prototype.toJSON = this_value;
  }

  var gap;
  var indent;
  var meta;
  var rep;

  function quote(string) {

    // If the string contains no control characters, no quote characters, and no
    // backslash characters, then we can safely slap some quotes around it.
    // Otherwise we must also replace the offending characters with safe escape
    // sequences.

    rx_escapable.lastIndex = 0;
    return rx_escapable.test(string) ? "\"" + string.replace(rx_escapable, function (a) {
      var c = meta[a];
      return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
    }) + "\"" : "\"" + string + "\"";
  }

  function str(key, holder) {

    // Produce a string from holder[key].

    var i; // The loop counter.
    var k; // The member key.
    var v; // The member value.
    var length;
    var mind = gap;
    var partial;
    var value = holder[key];

    // If the value has a toJSON method, call it to obtain a replacement value.

    if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && typeof value.toJSON === "function") {
      value = value.toJSON(key);
    }

    // If we were called with a replacer function, then call the replacer to
    // obtain a replacement value.

    if (typeof rep === "function") {
      value = rep.call(holder, key, value);
    }

    // What happens next depends on the value's type.

    switch (typeof value === "undefined" ? "undefined" : _typeof(value)) {
      case "string":
        return quote(value);

      case "number":

        // JSON numbers must be finite. Encode non-finite numbers as null.

        return isFinite(value) ? String(value) : "null";

      case "boolean":
      case "null":

        // If the value is a boolean or null, convert it to a string. Note:
        // typeof null does not produce "null". The case is included here in
        // the remote chance that this gets fixed someday.

        return String(value);

      // If the type is "object", we might be dealing with an object or an array or
      // null.

      case "object":

        // Due to a specification blunder in ECMAScript, typeof null is "object",
        // so watch out for that case.

        if (!value) {
          return "null";
        }

        // Make an array to hold the partial results of stringifying this object value.

        gap += indent;
        partial = [];

        // Is the value an array?

        if (Object.prototype.toString.apply(value) === "[object Array]") {

          // The value is an array. Stringify every element. Use null as a placeholder
          // for non-JSON values.

          length = value.length;
          for (i = 0; i < length; i += 1) {
            partial[i] = str(i, value) || "null";
          }

          // Join all of the elements together, separated with commas, and wrap them in
          // brackets.

          v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
          gap = mind;
          return v;
        }

        // If the replacer is an array, use it to select the members to be stringified.

        if (rep && (typeof rep === "undefined" ? "undefined" : _typeof(rep)) === "object") {
          length = rep.length;
          for (i = 0; i < length; i += 1) {
            if (typeof rep[i] === "string") {
              k = rep[i];
              v = str(k, value);
              if (v) {
                partial.push(quote(k) + (gap ? ": " : ":") + v);
              }
            }
          }
        } else {

          // Otherwise, iterate through all of the keys in the object.

          for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k)) {
              v = str(k, value);
              if (v) {
                partial.push(quote(k) + (gap ? ": " : ":") + v);
              }
            }
          }
        }

        // Join all of the member texts together, separated with commas,
        // and wrap them in braces.

        v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
        gap = mind;
        return v;
    }
  }

  // If the JSON object does not yet have a stringify method, give it one.

  if (typeof JSON.stringify !== "function") {
    meta = { // table of character substitutions
      "\b": "\\b",
      "\t": "\\t",
      "\n": "\\n",
      "\f": "\\f",
      "\r": "\\r",
      "\"": "\\\"",
      "\\": "\\\\"
    };
    JSON.stringify = function (value, replacer, space) {

      // The stringify method takes a value and an optional replacer, and an optional
      // space parameter, and returns a JSON text. The replacer can be a function
      // that can replace values, or an array of strings that will select the keys.
      // A default replacer method can be provided. Use of the space parameter can
      // produce text that is more easily readable.

      var i;
      gap = "";
      indent = "";

      // If the space parameter is a number, make an indent string containing that
      // many spaces.

      if (typeof space === "number") {
        for (i = 0; i < space; i += 1) {
          indent += " ";
        }

        // If the space parameter is a string, it will be used as the indent string.
      } else if (typeof space === "string") {
        indent = space;
      }

      // If there is a replacer, it must be a function or an array.
      // Otherwise, throw an error.

      rep = replacer;
      if (replacer && typeof replacer !== "function" && ((typeof replacer === "undefined" ? "undefined" : _typeof(replacer)) !== "object" || typeof replacer.length !== "number")) {
        throw new Error("JSON.stringify");
      }

      // Make a fake root object containing our value under the key of "".
      // Return the result of stringifying the value.

      return str("", { "": value });
    };
  }

  // If the JSON object does not yet have a parse method, give it one.

  if (typeof JSON.parse !== "function") {
    JSON.parse = function (text, reviver) {

      // The parse method takes a text and an optional reviver function, and returns
      // a JavaScript value if the text is a valid JSON text.

      var j;

      function walk(holder, key) {

        // The walk method is used to recursively walk the resulting structure so
        // that modifications can be made.

        var k;
        var v;
        var value = holder[key];
        if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object") {
          for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k)) {
              v = walk(value, k);
              if (v !== undefined) {
                value[k] = v;
              } else {
                delete value[k];
              }
            }
          }
        }
        return reviver.call(holder, key, value);
      }

      // Parsing happens in four stages. In the first stage, we replace certain
      // Unicode characters with escape sequences. JavaScript handles many characters
      // incorrectly, either silently deleting them, or treating them as line endings.

      text = String(text);
      rx_dangerous.lastIndex = 0;
      if (rx_dangerous.test(text)) {
        text = text.replace(rx_dangerous, function (a) {
          return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        });
      }

      // In the second stage, we run the text against regular expressions that look
      // for non-JSON patterns. We are especially concerned with "()" and "new"
      // because they can cause invocation, and "=" because it can cause mutation.
      // But just to be safe, we want to reject all unexpected forms.

      // We split the second stage into 4 regexp operations in order to work around
      // crippling inefficiencies in IE's and Safari's regexp engines. First we
      // replace the JSON backslash pairs with "@" (a non-JSON character). Second, we
      // replace all simple value tokens with "]" characters. Third, we delete all
      // open brackets that follow a colon or comma or that begin the text. Finally,
      // we look to see that the remaining characters are only whitespace or "]" or
      // "," or ":" or "{" or "}". If that is so, then the text is safe for eval.

      if (rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, ""))) {

        // In the third stage we use the eval function to compile the text into a
        // JavaScript structure. The "{" operator is subject to a syntactic ambiguity
        // in JavaScript: it can begin a block or an object literal. We wrap the text
        // in parens to eliminate the ambiguity.

        j = eval("(" + text + ")");

        // In the optional fourth stage, we recursively walk the new structure, passing
        // each name/value pair to a reviver function for possible transformation.

        return typeof reviver === "function" ? walk({ "": j }, "") : j;
      }

      // If the text is not JSON parseable, then a SyntaxError is thrown.

      throw new SyntaxError("JSON.parse");
    };
  }
})();

/**
 *
 * json转字符串
 */
function stringToJson(data) {
  return JSON.parse(data);
}
/**
 *字符串转json
 */
function jsonToString(data) {
  return JSON.stringify(data);
}
/**
 *map转换为json
 */
function mapToJson(map) {
  return JSON.stringify(strMapToObj(map));
}
/**
 *json转换为map
 */
function jsonToMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}

/**
 *map转化为对象（map所有键都是字符串，可以将其转换为对象）
 */
function strMapToObj(strMap) {
  var obj = Object.create(null);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = strMap[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref = _step.value;

      var _ref2 = _slicedToArray(_ref, 2);

      var k = _ref2[0];
      var v = _ref2[1];

      obj[k] = v;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return obj;
}

/**
 *对象转换为Map
 */
function objToStrMap(obj) {
  var strMap = new Map();
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = Object.keys(obj)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var k = _step2.value;

      strMap.set(k, obj[k]);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return strMap;
}

// 转为unicode 编码
function encodeUnicode(str) {
  var res = [];
  for (var i = 0; i < str.length; i++) {
    res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
  }
  return "\\u" + res.join("\\u");
}

// 解码
function decodeUnicode(str) {
  str = str.replace(/\\/g, "%");
  return unescape(str);
}

module.exports = {

  encodeUnicode: encodeUnicode,
  decodeUnicode: decodeUnicode,

  Parse: stringToJson,
  stringToJson: stringToJson,
  jsonToString: jsonToString,
  mapToJson: mapToJson,
  jsonToMap: jsonToMap,
  strMapToObj: strMapToObj,
  objToStrMap: objToStrMap
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzb24yLmpzIl0sIm5hbWVzIjpbIkpTT04iLCJyeF9vbmUiLCJyeF90d28iLCJyeF90aHJlZSIsInJ4X2ZvdXIiLCJyeF9lc2NhcGFibGUiLCJyeF9kYW5nZXJvdXMiLCJmIiwibiIsInRoaXNfdmFsdWUiLCJ2YWx1ZU9mIiwiRGF0ZSIsInByb3RvdHlwZSIsInRvSlNPTiIsImlzRmluaXRlIiwiZ2V0VVRDRnVsbFllYXIiLCJnZXRVVENNb250aCIsImdldFVUQ0RhdGUiLCJnZXRVVENIb3VycyIsImdldFVUQ01pbnV0ZXMiLCJnZXRVVENTZWNvbmRzIiwiQm9vbGVhbiIsIk51bWJlciIsIlN0cmluZyIsImdhcCIsImluZGVudCIsIm1ldGEiLCJyZXAiLCJxdW90ZSIsInN0cmluZyIsImxhc3RJbmRleCIsInRlc3QiLCJyZXBsYWNlIiwiYSIsImMiLCJjaGFyQ29kZUF0IiwidG9TdHJpbmciLCJzbGljZSIsInN0ciIsImtleSIsImhvbGRlciIsImkiLCJrIiwidiIsImxlbmd0aCIsIm1pbmQiLCJwYXJ0aWFsIiwidmFsdWUiLCJjYWxsIiwiT2JqZWN0IiwiYXBwbHkiLCJqb2luIiwicHVzaCIsImhhc093blByb3BlcnR5Iiwic3RyaW5naWZ5IiwicmVwbGFjZXIiLCJzcGFjZSIsIkVycm9yIiwicGFyc2UiLCJ0ZXh0IiwicmV2aXZlciIsImoiLCJ3YWxrIiwidW5kZWZpbmVkIiwiZXZhbCIsIlN5bnRheEVycm9yIiwic3RyaW5nVG9Kc29uIiwiZGF0YSIsImpzb25Ub1N0cmluZyIsIm1hcFRvSnNvbiIsIm1hcCIsInN0ck1hcFRvT2JqIiwianNvblRvTWFwIiwianNvblN0ciIsIm9ialRvU3RyTWFwIiwic3RyTWFwIiwib2JqIiwiY3JlYXRlIiwiTWFwIiwia2V5cyIsInNldCIsImVuY29kZVVuaWNvZGUiLCJyZXMiLCJkZWNvZGVVbmljb2RlIiwidW5lc2NhcGUiLCJtb2R1bGUiLCJleHBvcnRzIiwiUGFyc2UiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFB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Q0Q7O0FBR0QrQyxPQUFPQyxPQUFQLEdBQWlCOztBQUVmTCxpQkFBY0EsYUFGQztBQUdmRSxpQkFBY0EsYUFIQzs7QUFLZkksU0FBUXJCLFlBTE87QUFNZkEsZ0JBQWNBLFlBTkM7QUFPZkUsZ0JBQWFBLFlBUEU7QUFRZkMsYUFBVUEsU0FSSztBQVNmRyxhQUFVQSxTQVRLO0FBVWZELGVBQVlBLFdBVkc7QUFXZkcsZUFBWUE7QUFYRyxDQUFqQiIsImZpbGUiOiJqc29uMi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vICBqc29uMi5qc1xuLy8gIDIwMTctMDYtMTJcbi8vICBQdWJsaWMgRG9tYWluLlxuLy8gIE5PIFdBUlJBTlRZIEVYUFJFU1NFRCBPUiBJTVBMSUVELiBVU0UgQVQgWU9VUiBPV04gUklTSy5cblxuLy8gIFVTRSBZT1VSIE9XTiBDT1BZLiBJVCBJUyBFWFRSRU1FTFkgVU5XSVNFIFRPIExPQUQgQ09ERSBGUk9NIFNFUlZFUlMgWU9VIERPXG4vLyAgTk9UIENPTlRST0wuXG5cbi8vICBUaGlzIGZpbGUgY3JlYXRlcyBhIGdsb2JhbCBKU09OIG9iamVjdCBjb250YWluaW5nIHR3byBtZXRob2RzOiBzdHJpbmdpZnlcbi8vICBhbmQgcGFyc2UuIFRoaXMgZmlsZSBwcm92aWRlcyB0aGUgRVM1IEpTT04gY2FwYWJpbGl0eSB0byBFUzMgc3lzdGVtcy5cbi8vICBJZiBhIHByb2plY3QgbWlnaHQgcnVuIG9uIElFOCBvciBlYXJsaWVyLCB0aGVuIHRoaXMgZmlsZSBzaG91bGQgYmUgaW5jbHVkZWQuXG4vLyAgVGhpcyBmaWxlIGRvZXMgbm90aGluZyBvbiBFUzUgc3lzdGVtcy5cblxuLy8gICAgICBKU09OLnN0cmluZ2lmeSh2YWx1ZSwgcmVwbGFjZXIsIHNwYWNlKVxuLy8gICAgICAgICAgdmFsdWUgICAgICAgYW55IEphdmFTY3JpcHQgdmFsdWUsIHVzdWFsbHkgYW4gb2JqZWN0IG9yIGFycmF5LlxuLy8gICAgICAgICAgcmVwbGFjZXIgICAgYW4gb3B0aW9uYWwgcGFyYW1ldGVyIHRoYXQgZGV0ZXJtaW5lcyBob3cgb2JqZWN0XG4vLyAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXMgYXJlIHN0cmluZ2lmaWVkIGZvciBvYmplY3RzLiBJdCBjYW4gYmUgYVxuLy8gICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gb3IgYW4gYXJyYXkgb2Ygc3RyaW5ncy5cbi8vICAgICAgICAgIHNwYWNlICAgICAgIGFuIG9wdGlvbmFsIHBhcmFtZXRlciB0aGF0IHNwZWNpZmllcyB0aGUgaW5kZW50YXRpb25cbi8vICAgICAgICAgICAgICAgICAgICAgIG9mIG5lc3RlZCBzdHJ1Y3R1cmVzLiBJZiBpdCBpcyBvbWl0dGVkLCB0aGUgdGV4dCB3aWxsXG4vLyAgICAgICAgICAgICAgICAgICAgICBiZSBwYWNrZWQgd2l0aG91dCBleHRyYSB3aGl0ZXNwYWNlLiBJZiBpdCBpcyBhIG51bWJlcixcbi8vICAgICAgICAgICAgICAgICAgICAgIGl0IHdpbGwgc3BlY2lmeSB0aGUgbnVtYmVyIG9mIHNwYWNlcyB0byBpbmRlbnQgYXQgZWFjaFxuLy8gICAgICAgICAgICAgICAgICAgICAgbGV2ZWwuIElmIGl0IGlzIGEgc3RyaW5nIChzdWNoIGFzIFwiXFx0XCIgb3IgXCImbmJzcDtcIiksXG4vLyAgICAgICAgICAgICAgICAgICAgICBpdCBjb250YWlucyB0aGUgY2hhcmFjdGVycyB1c2VkIHRvIGluZGVudCBhdCBlYWNoIGxldmVsLlxuLy8gICAgICAgICAgVGhpcyBtZXRob2QgcHJvZHVjZXMgYSBKU09OIHRleHQgZnJvbSBhIEphdmFTY3JpcHQgdmFsdWUuXG4vLyAgICAgICAgICBXaGVuIGFuIG9iamVjdCB2YWx1ZSBpcyBmb3VuZCwgaWYgdGhlIG9iamVjdCBjb250YWlucyBhIHRvSlNPTlxuLy8gICAgICAgICAgbWV0aG9kLCBpdHMgdG9KU09OIG1ldGhvZCB3aWxsIGJlIGNhbGxlZCBhbmQgdGhlIHJlc3VsdCB3aWxsIGJlXG4vLyAgICAgICAgICBzdHJpbmdpZmllZC4gQSB0b0pTT04gbWV0aG9kIGRvZXMgbm90IHNlcmlhbGl6ZTogaXQgcmV0dXJucyB0aGVcbi8vICAgICAgICAgIHZhbHVlIHJlcHJlc2VudGVkIGJ5IHRoZSBuYW1lL3ZhbHVlIHBhaXIgdGhhdCBzaG91bGQgYmUgc2VyaWFsaXplZCxcbi8vICAgICAgICAgIG9yIHVuZGVmaW5lZCBpZiBub3RoaW5nIHNob3VsZCBiZSBzZXJpYWxpemVkLiBUaGUgdG9KU09OIG1ldGhvZFxuLy8gICAgICAgICAgd2lsbCBiZSBwYXNzZWQgdGhlIGtleSBhc3NvY2lhdGVkIHdpdGggdGhlIHZhbHVlLCBhbmQgdGhpcyB3aWxsIGJlXG4vLyAgICAgICAgICBib3VuZCB0byB0aGUgdmFsdWUuXG5cbi8vICAgICAgICAgIEZvciBleGFtcGxlLCB0aGlzIHdvdWxkIHNlcmlhbGl6ZSBEYXRlcyBhcyBJU08gc3RyaW5ncy5cblxuLy8gICAgICAgICAgICAgIERhdGUucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIChrZXkpIHtcbi8vICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gZihuKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAvLyBGb3JtYXQgaW50ZWdlcnMgdG8gaGF2ZSBhdCBsZWFzdCB0d28gZGlnaXRzLlxuLy8gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChuIDwgMTApXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcIjBcIiArIG5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICA6IG47XG4vLyAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VVRDRnVsbFllYXIoKSAgICsgXCItXCIgK1xuLy8gICAgICAgICAgICAgICAgICAgICAgIGYodGhpcy5nZXRVVENNb250aCgpICsgMSkgKyBcIi1cIiArXG4vLyAgICAgICAgICAgICAgICAgICAgICAgZih0aGlzLmdldFVUQ0RhdGUoKSkgICAgICArIFwiVFwiICtcbi8vICAgICAgICAgICAgICAgICAgICAgICBmKHRoaXMuZ2V0VVRDSG91cnMoKSkgICAgICsgXCI6XCIgK1xuLy8gICAgICAgICAgICAgICAgICAgICAgIGYodGhpcy5nZXRVVENNaW51dGVzKCkpICAgKyBcIjpcIiArXG4vLyAgICAgICAgICAgICAgICAgICAgICAgZih0aGlzLmdldFVUQ1NlY29uZHMoKSkgICArIFwiWlwiO1xuLy8gICAgICAgICAgICAgIH07XG5cbi8vICAgICAgICAgIFlvdSBjYW4gcHJvdmlkZSBhbiBvcHRpb25hbCByZXBsYWNlciBtZXRob2QuIEl0IHdpbGwgYmUgcGFzc2VkIHRoZVxuLy8gICAgICAgICAga2V5IGFuZCB2YWx1ZSBvZiBlYWNoIG1lbWJlciwgd2l0aCB0aGlzIGJvdW5kIHRvIHRoZSBjb250YWluaW5nXG4vLyAgICAgICAgICBvYmplY3QuIFRoZSB2YWx1ZSB0aGF0IGlzIHJldHVybmVkIGZyb20geW91ciBtZXRob2Qgd2lsbCBiZVxuLy8gICAgICAgICAgc2VyaWFsaXplZC4gSWYgeW91ciBtZXRob2QgcmV0dXJucyB1bmRlZmluZWQsIHRoZW4gdGhlIG1lbWJlciB3aWxsXG4vLyAgICAgICAgICBiZSBleGNsdWRlZCBmcm9tIHRoZSBzZXJpYWxpemF0aW9uLlxuXG4vLyAgICAgICAgICBJZiB0aGUgcmVwbGFjZXIgcGFyYW1ldGVyIGlzIGFuIGFycmF5IG9mIHN0cmluZ3MsIHRoZW4gaXQgd2lsbCBiZVxuLy8gICAgICAgICAgdXNlZCB0byBzZWxlY3QgdGhlIG1lbWJlcnMgdG8gYmUgc2VyaWFsaXplZC4gSXQgZmlsdGVycyB0aGUgcmVzdWx0c1xuLy8gICAgICAgICAgc3VjaCB0aGF0IG9ubHkgbWVtYmVycyB3aXRoIGtleXMgbGlzdGVkIGluIHRoZSByZXBsYWNlciBhcnJheSBhcmVcbi8vICAgICAgICAgIHN0cmluZ2lmaWVkLlxuXG4vLyAgICAgICAgICBWYWx1ZXMgdGhhdCBkbyBub3QgaGF2ZSBKU09OIHJlcHJlc2VudGF0aW9ucywgc3VjaCBhcyB1bmRlZmluZWQgb3Jcbi8vICAgICAgICAgIGZ1bmN0aW9ucywgd2lsbCBub3QgYmUgc2VyaWFsaXplZC4gU3VjaCB2YWx1ZXMgaW4gb2JqZWN0cyB3aWxsIGJlXG4vLyAgICAgICAgICBkcm9wcGVkOyBpbiBhcnJheXMgdGhleSB3aWxsIGJlIHJlcGxhY2VkIHdpdGggbnVsbC4gWW91IGNhbiB1c2Vcbi8vICAgICAgICAgIGEgcmVwbGFjZXIgZnVuY3Rpb24gdG8gcmVwbGFjZSB0aG9zZSB3aXRoIEpTT04gdmFsdWVzLlxuXG4vLyAgICAgICAgICBKU09OLnN0cmluZ2lmeSh1bmRlZmluZWQpIHJldHVybnMgdW5kZWZpbmVkLlxuXG4vLyAgICAgICAgICBUaGUgb3B0aW9uYWwgc3BhY2UgcGFyYW1ldGVyIHByb2R1Y2VzIGEgc3RyaW5naWZpY2F0aW9uIG9mIHRoZVxuLy8gICAgICAgICAgdmFsdWUgdGhhdCBpcyBmaWxsZWQgd2l0aCBsaW5lIGJyZWFrcyBhbmQgaW5kZW50YXRpb24gdG8gbWFrZSBpdFxuLy8gICAgICAgICAgZWFzaWVyIHRvIHJlYWQuXG5cbi8vICAgICAgICAgIElmIHRoZSBzcGFjZSBwYXJhbWV0ZXIgaXMgYSBub24tZW1wdHkgc3RyaW5nLCB0aGVuIHRoYXQgc3RyaW5nIHdpbGxcbi8vICAgICAgICAgIGJlIHVzZWQgZm9yIGluZGVudGF0aW9uLiBJZiB0aGUgc3BhY2UgcGFyYW1ldGVyIGlzIGEgbnVtYmVyLCB0aGVuXG4vLyAgICAgICAgICB0aGUgaW5kZW50YXRpb24gd2lsbCBiZSB0aGF0IG1hbnkgc3BhY2VzLlxuXG4vLyAgICAgICAgICBFeGFtcGxlOlxuXG4vLyAgICAgICAgICB0ZXh0ID0gSlNPTi5zdHJpbmdpZnkoW1wiZVwiLCB7cGx1cmlidXM6IFwidW51bVwifV0pO1xuLy8gICAgICAgICAgLy8gdGV4dCBpcyAnW1wiZVwiLHtcInBsdXJpYnVzXCI6XCJ1bnVtXCJ9XSdcblxuLy8gICAgICAgICAgdGV4dCA9IEpTT04uc3RyaW5naWZ5KFtcImVcIiwge3BsdXJpYnVzOiBcInVudW1cIn1dLCBudWxsLCBcIlxcdFwiKTtcbi8vICAgICAgICAgIC8vIHRleHQgaXMgJ1tcXG5cXHRcImVcIixcXG5cXHR7XFxuXFx0XFx0XCJwbHVyaWJ1c1wiOiBcInVudW1cIlxcblxcdH1cXG5dJ1xuXG4vLyAgICAgICAgICB0ZXh0ID0gSlNPTi5zdHJpbmdpZnkoW25ldyBEYXRlKCldLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuLy8gICAgICAgICAgICAgIHJldHVybiB0aGlzW2tleV0gaW5zdGFuY2VvZiBEYXRlXG4vLyAgICAgICAgICAgICAgICAgID8gXCJEYXRlKFwiICsgdGhpc1trZXldICsgXCIpXCJcbi8vICAgICAgICAgICAgICAgICAgOiB2YWx1ZTtcbi8vICAgICAgICAgIH0pO1xuLy8gICAgICAgICAgLy8gdGV4dCBpcyAnW1wiRGF0ZSgtLS1jdXJyZW50IHRpbWUtLS0pXCJdJ1xuXG4vLyAgICAgIEpTT04ucGFyc2UodGV4dCwgcmV2aXZlcilcbi8vICAgICAgICAgIFRoaXMgbWV0aG9kIHBhcnNlcyBhIEpTT04gdGV4dCB0byBwcm9kdWNlIGFuIG9iamVjdCBvciBhcnJheS5cbi8vICAgICAgICAgIEl0IGNhbiB0aHJvdyBhIFN5bnRheEVycm9yIGV4Y2VwdGlvbi5cblxuLy8gICAgICAgICAgVGhlIG9wdGlvbmFsIHJldml2ZXIgcGFyYW1ldGVyIGlzIGEgZnVuY3Rpb24gdGhhdCBjYW4gZmlsdGVyIGFuZFxuLy8gICAgICAgICAgdHJhbnNmb3JtIHRoZSByZXN1bHRzLiBJdCByZWNlaXZlcyBlYWNoIG9mIHRoZSBrZXlzIGFuZCB2YWx1ZXMsXG4vLyAgICAgICAgICBhbmQgaXRzIHJldHVybiB2YWx1ZSBpcyB1c2VkIGluc3RlYWQgb2YgdGhlIG9yaWdpbmFsIHZhbHVlLlxuLy8gICAgICAgICAgSWYgaXQgcmV0dXJucyB3aGF0IGl0IHJlY2VpdmVkLCB0aGVuIHRoZSBzdHJ1Y3R1cmUgaXMgbm90IG1vZGlmaWVkLlxuLy8gICAgICAgICAgSWYgaXQgcmV0dXJucyB1bmRlZmluZWQgdGhlbiB0aGUgbWVtYmVyIGlzIGRlbGV0ZWQuXG5cbi8vICAgICAgICAgIEV4YW1wbGU6XG5cbi8vICAgICAgICAgIC8vIFBhcnNlIHRoZSB0ZXh0LiBWYWx1ZXMgdGhhdCBsb29rIGxpa2UgSVNPIGRhdGUgc3RyaW5ncyB3aWxsXG4vLyAgICAgICAgICAvLyBiZSBjb252ZXJ0ZWQgdG8gRGF0ZSBvYmplY3RzLlxuXG4vLyAgICAgICAgICBteURhdGEgPSBKU09OLnBhcnNlKHRleHQsIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4vLyAgICAgICAgICAgICAgdmFyIGE7XG4vLyAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuLy8gICAgICAgICAgICAgICAgICBhID1cbi8vICAgL14oXFxkezR9KS0oXFxkezJ9KS0oXFxkezJ9KVQoXFxkezJ9KTooXFxkezJ9KTooXFxkezJ9KD86XFwuXFxkKik/KVokLy5leGVjKHZhbHVlKTtcbi8vICAgICAgICAgICAgICAgICAgaWYgKGEpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQyhcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICthWzFdLCArYVsyXSAtIDEsICthWzNdLCArYVs0XSwgK2FbNV0sICthWzZdXG4vLyAgICAgICAgICAgICAgICAgICAgICApKTtcbi8vICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4vLyAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgIG15RGF0YSA9IEpTT04ucGFyc2UoXG4vLyAgICAgICAgICAgICAgXCJbXFxcIkRhdGUoMDkvMDkvMjAwMSlcXFwiXVwiLFxuLy8gICAgICAgICAgICAgIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4vLyAgICAgICAgICAgICAgICAgIHZhciBkO1xuLy8gICAgICAgICAgICAgICAgICBpZiAoXG4vLyAgICAgICAgICAgICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCJcbi8vICAgICAgICAgICAgICAgICAgICAgICYmIHZhbHVlLnNsaWNlKDAsIDUpID09PSBcIkRhdGUoXCJcbi8vICAgICAgICAgICAgICAgICAgICAgICYmIHZhbHVlLnNsaWNlKC0xKSA9PT0gXCIpXCJcbi8vICAgICAgICAgICAgICAgICAgKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICBkID0gbmV3IERhdGUodmFsdWUuc2xpY2UoNSwgLTEpKTtcbi8vICAgICAgICAgICAgICAgICAgICAgIGlmIChkKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQ7XG4vLyAgICAgICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuLy8gICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICk7XG5cbi8vICBUaGlzIGlzIGEgcmVmZXJlbmNlIGltcGxlbWVudGF0aW9uLiBZb3UgYXJlIGZyZWUgdG8gY29weSwgbW9kaWZ5LCBvclxuLy8gIHJlZGlzdHJpYnV0ZS5cblxuLypqc2xpbnRcbiAgICBldmFsLCBmb3IsIHRoaXNcbiovXG5cbi8qcHJvcGVydHlcbiAgICBKU09OLCBhcHBseSwgY2FsbCwgY2hhckNvZGVBdCwgZ2V0VVRDRGF0ZSwgZ2V0VVRDRnVsbFllYXIsIGdldFVUQ0hvdXJzLFxuICAgIGdldFVUQ01pbnV0ZXMsIGdldFVUQ01vbnRoLCBnZXRVVENTZWNvbmRzLCBoYXNPd25Qcm9wZXJ0eSwgam9pbixcbiAgICBsYXN0SW5kZXgsIGxlbmd0aCwgcGFyc2UsIHByb3RvdHlwZSwgcHVzaCwgcmVwbGFjZSwgc2xpY2UsIHN0cmluZ2lmeSxcbiAgICB0ZXN0LCB0b0pTT04sIHRvU3RyaW5nLCB2YWx1ZU9mXG4qL1xuXG5cbi8vIENyZWF0ZSBhIEpTT04gb2JqZWN0IG9ubHkgaWYgb25lIGRvZXMgbm90IGFscmVhZHkgZXhpc3QuIFdlIGNyZWF0ZSB0aGVcbi8vIG1ldGhvZHMgaW4gYSBjbG9zdXJlIHRvIGF2b2lkIGNyZWF0aW5nIGdsb2JhbCB2YXJpYWJsZXMuXG5cbmlmICh0eXBlb2YgSlNPTiAhPT0gXCJvYmplY3RcIikge1xuICBKU09OID0ge307XG59XG5cbihmdW5jdGlvbiAoKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciByeF9vbmUgPSAvXltcXF0sOnt9XFxzXSokLztcbiAgdmFyIHJ4X3R3byA9IC9cXFxcKD86W1wiXFxcXFxcL2JmbnJ0XXx1WzAtOWEtZkEtRl17NH0pL2c7XG4gIHZhciByeF90aHJlZSA9IC9cIlteXCJcXFxcXFxuXFxyXSpcInx0cnVlfGZhbHNlfG51bGx8LT9cXGQrKD86XFwuXFxkKik/KD86W2VFXVsrXFwtXT9cXGQrKT8vZztcbiAgdmFyIHJ4X2ZvdXIgPSAvKD86Xnw6fCwpKD86XFxzKlxcWykrL2c7XG4gIHZhciByeF9lc2NhcGFibGUgPSAvW1xcXFxcIlxcdTAwMDAtXFx1MDAxZlxcdTAwN2YtXFx1MDA5ZlxcdTAwYWRcXHUwNjAwLVxcdTA2MDRcXHUwNzBmXFx1MTdiNFxcdTE3YjVcXHUyMDBjLVxcdTIwMGZcXHUyMDI4LVxcdTIwMmZcXHUyMDYwLVxcdTIwNmZcXHVmZWZmXFx1ZmZmMC1cXHVmZmZmXS9nO1xuICB2YXIgcnhfZGFuZ2Vyb3VzID0gL1tcXHUwMDAwXFx1MDBhZFxcdTA2MDAtXFx1MDYwNFxcdTA3MGZcXHUxN2I0XFx1MTdiNVxcdTIwMGMtXFx1MjAwZlxcdTIwMjgtXFx1MjAyZlxcdTIwNjAtXFx1MjA2ZlxcdWZlZmZcXHVmZmYwLVxcdWZmZmZdL2c7XG5cbiAgZnVuY3Rpb24gZihuKSB7XG4gICAgLy8gRm9ybWF0IGludGVnZXJzIHRvIGhhdmUgYXQgbGVhc3QgdHdvIGRpZ2l0cy5cbiAgICByZXR1cm4gKG4gPCAxMClcbiAgICAgID8gXCIwXCIgKyBuXG4gICAgICA6IG47XG4gIH1cblxuICBmdW5jdGlvbiB0aGlzX3ZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLnZhbHVlT2YoKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgRGF0ZS5wcm90b3R5cGUudG9KU09OICE9PSBcImZ1bmN0aW9uXCIpIHtcblxuICAgIERhdGUucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgcmV0dXJuIGlzRmluaXRlKHRoaXMudmFsdWVPZigpKVxuICAgICAgICA/IChcbiAgICAgICAgICB0aGlzLmdldFVUQ0Z1bGxZZWFyKClcbiAgICAgICAgICArIFwiLVwiXG4gICAgICAgICAgKyBmKHRoaXMuZ2V0VVRDTW9udGgoKSArIDEpXG4gICAgICAgICAgKyBcIi1cIlxuICAgICAgICAgICsgZih0aGlzLmdldFVUQ0RhdGUoKSlcbiAgICAgICAgICArIFwiVFwiXG4gICAgICAgICAgKyBmKHRoaXMuZ2V0VVRDSG91cnMoKSlcbiAgICAgICAgICArIFwiOlwiXG4gICAgICAgICAgKyBmKHRoaXMuZ2V0VVRDTWludXRlcygpKVxuICAgICAgICAgICsgXCI6XCJcbiAgICAgICAgICArIGYodGhpcy5nZXRVVENTZWNvbmRzKCkpXG4gICAgICAgICAgKyBcIlpcIlxuICAgICAgICApXG4gICAgICAgIDogbnVsbDtcbiAgICB9O1xuXG4gICAgQm9vbGVhbi5wcm90b3R5cGUudG9KU09OID0gdGhpc192YWx1ZTtcbiAgICBOdW1iZXIucHJvdG90eXBlLnRvSlNPTiA9IHRoaXNfdmFsdWU7XG4gICAgU3RyaW5nLnByb3RvdHlwZS50b0pTT04gPSB0aGlzX3ZhbHVlO1xuICB9XG5cbiAgdmFyIGdhcDtcbiAgdmFyIGluZGVudDtcbiAgdmFyIG1ldGE7XG4gIHZhciByZXA7XG5cblxuICBmdW5jdGlvbiBxdW90ZShzdHJpbmcpIHtcblxuLy8gSWYgdGhlIHN0cmluZyBjb250YWlucyBubyBjb250cm9sIGNoYXJhY3RlcnMsIG5vIHF1b3RlIGNoYXJhY3RlcnMsIGFuZCBub1xuLy8gYmFja3NsYXNoIGNoYXJhY3RlcnMsIHRoZW4gd2UgY2FuIHNhZmVseSBzbGFwIHNvbWUgcXVvdGVzIGFyb3VuZCBpdC5cbi8vIE90aGVyd2lzZSB3ZSBtdXN0IGFsc28gcmVwbGFjZSB0aGUgb2ZmZW5kaW5nIGNoYXJhY3RlcnMgd2l0aCBzYWZlIGVzY2FwZVxuLy8gc2VxdWVuY2VzLlxuXG4gICAgcnhfZXNjYXBhYmxlLmxhc3RJbmRleCA9IDA7XG4gICAgcmV0dXJuIHJ4X2VzY2FwYWJsZS50ZXN0KHN0cmluZylcbiAgICAgID8gXCJcXFwiXCIgKyBzdHJpbmcucmVwbGFjZShyeF9lc2NhcGFibGUsIGZ1bmN0aW9uIChhKSB7XG4gICAgICB2YXIgYyA9IG1ldGFbYV07XG4gICAgICByZXR1cm4gdHlwZW9mIGMgPT09IFwic3RyaW5nXCJcbiAgICAgICAgPyBjXG4gICAgICAgIDogXCJcXFxcdVwiICsgKFwiMDAwMFwiICsgYS5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTQpO1xuICAgIH0pICsgXCJcXFwiXCJcbiAgICAgIDogXCJcXFwiXCIgKyBzdHJpbmcgKyBcIlxcXCJcIjtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gc3RyKGtleSwgaG9sZGVyKSB7XG5cbi8vIFByb2R1Y2UgYSBzdHJpbmcgZnJvbSBob2xkZXJba2V5XS5cblxuICAgIHZhciBpOyAgICAgICAgICAvLyBUaGUgbG9vcCBjb3VudGVyLlxuICAgIHZhciBrOyAgICAgICAgICAvLyBUaGUgbWVtYmVyIGtleS5cbiAgICB2YXIgdjsgICAgICAgICAgLy8gVGhlIG1lbWJlciB2YWx1ZS5cbiAgICB2YXIgbGVuZ3RoO1xuICAgIHZhciBtaW5kID0gZ2FwO1xuICAgIHZhciBwYXJ0aWFsO1xuICAgIHZhciB2YWx1ZSA9IGhvbGRlcltrZXldO1xuXG4vLyBJZiB0aGUgdmFsdWUgaGFzIGEgdG9KU09OIG1ldGhvZCwgY2FsbCBpdCB0byBvYnRhaW4gYSByZXBsYWNlbWVudCB2YWx1ZS5cblxuICAgIGlmIChcbiAgICAgIHZhbHVlXG4gICAgICAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCJcbiAgICAgICYmIHR5cGVvZiB2YWx1ZS50b0pTT04gPT09IFwiZnVuY3Rpb25cIlxuICAgICkge1xuICAgICAgdmFsdWUgPSB2YWx1ZS50b0pTT04oa2V5KTtcbiAgICB9XG5cbi8vIElmIHdlIHdlcmUgY2FsbGVkIHdpdGggYSByZXBsYWNlciBmdW5jdGlvbiwgdGhlbiBjYWxsIHRoZSByZXBsYWNlciB0b1xuLy8gb2J0YWluIGEgcmVwbGFjZW1lbnQgdmFsdWUuXG5cbiAgICBpZiAodHlwZW9mIHJlcCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB2YWx1ZSA9IHJlcC5jYWxsKGhvbGRlciwga2V5LCB2YWx1ZSk7XG4gICAgfVxuXG4vLyBXaGF0IGhhcHBlbnMgbmV4dCBkZXBlbmRzIG9uIHRoZSB2YWx1ZSdzIHR5cGUuXG5cbiAgICBzd2l0Y2ggKHR5cGVvZiB2YWx1ZSkge1xuICAgICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgICByZXR1cm4gcXVvdGUodmFsdWUpO1xuXG4gICAgICBjYXNlIFwibnVtYmVyXCI6XG5cbi8vIEpTT04gbnVtYmVycyBtdXN0IGJlIGZpbml0ZS4gRW5jb2RlIG5vbi1maW5pdGUgbnVtYmVycyBhcyBudWxsLlxuXG4gICAgICAgIHJldHVybiAoaXNGaW5pdGUodmFsdWUpKVxuICAgICAgICAgID8gU3RyaW5nKHZhbHVlKVxuICAgICAgICAgIDogXCJudWxsXCI7XG5cbiAgICAgIGNhc2UgXCJib29sZWFuXCI6XG4gICAgICBjYXNlIFwibnVsbFwiOlxuXG4vLyBJZiB0aGUgdmFsdWUgaXMgYSBib29sZWFuIG9yIG51bGwsIGNvbnZlcnQgaXQgdG8gYSBzdHJpbmcuIE5vdGU6XG4vLyB0eXBlb2YgbnVsbCBkb2VzIG5vdCBwcm9kdWNlIFwibnVsbFwiLiBUaGUgY2FzZSBpcyBpbmNsdWRlZCBoZXJlIGluXG4vLyB0aGUgcmVtb3RlIGNoYW5jZSB0aGF0IHRoaXMgZ2V0cyBmaXhlZCBzb21lZGF5LlxuXG4gICAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpO1xuXG4vLyBJZiB0aGUgdHlwZSBpcyBcIm9iamVjdFwiLCB3ZSBtaWdodCBiZSBkZWFsaW5nIHdpdGggYW4gb2JqZWN0IG9yIGFuIGFycmF5IG9yXG4vLyBudWxsLlxuXG4gICAgICBjYXNlIFwib2JqZWN0XCI6XG5cbi8vIER1ZSB0byBhIHNwZWNpZmljYXRpb24gYmx1bmRlciBpbiBFQ01BU2NyaXB0LCB0eXBlb2YgbnVsbCBpcyBcIm9iamVjdFwiLFxuLy8gc28gd2F0Y2ggb3V0IGZvciB0aGF0IGNhc2UuXG5cbiAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgIHJldHVybiBcIm51bGxcIjtcbiAgICAgICAgfVxuXG4vLyBNYWtlIGFuIGFycmF5IHRvIGhvbGQgdGhlIHBhcnRpYWwgcmVzdWx0cyBvZiBzdHJpbmdpZnlpbmcgdGhpcyBvYmplY3QgdmFsdWUuXG5cbiAgICAgICAgZ2FwICs9IGluZGVudDtcbiAgICAgICAgcGFydGlhbCA9IFtdO1xuXG4vLyBJcyB0aGUgdmFsdWUgYW4gYXJyYXk/XG5cbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuYXBwbHkodmFsdWUpID09PSBcIltvYmplY3QgQXJyYXldXCIpIHtcblxuLy8gVGhlIHZhbHVlIGlzIGFuIGFycmF5LiBTdHJpbmdpZnkgZXZlcnkgZWxlbWVudC4gVXNlIG51bGwgYXMgYSBwbGFjZWhvbGRlclxuLy8gZm9yIG5vbi1KU09OIHZhbHVlcy5cblxuICAgICAgICAgIGxlbmd0aCA9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHBhcnRpYWxbaV0gPSBzdHIoaSwgdmFsdWUpIHx8IFwibnVsbFwiO1xuICAgICAgICAgIH1cblxuLy8gSm9pbiBhbGwgb2YgdGhlIGVsZW1lbnRzIHRvZ2V0aGVyLCBzZXBhcmF0ZWQgd2l0aCBjb21tYXMsIGFuZCB3cmFwIHRoZW0gaW5cbi8vIGJyYWNrZXRzLlxuXG4gICAgICAgICAgdiA9IHBhcnRpYWwubGVuZ3RoID09PSAwXG4gICAgICAgICAgICA/IFwiW11cIlxuICAgICAgICAgICAgOiBnYXBcbiAgICAgICAgICAgICAgPyAoXG4gICAgICAgICAgICAgICAgXCJbXFxuXCJcbiAgICAgICAgICAgICAgICArIGdhcFxuICAgICAgICAgICAgICAgICsgcGFydGlhbC5qb2luKFwiLFxcblwiICsgZ2FwKVxuICAgICAgICAgICAgICAgICsgXCJcXG5cIlxuICAgICAgICAgICAgICAgICsgbWluZFxuICAgICAgICAgICAgICAgICsgXCJdXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICA6IFwiW1wiICsgcGFydGlhbC5qb2luKFwiLFwiKSArIFwiXVwiO1xuICAgICAgICAgIGdhcCA9IG1pbmQ7XG4gICAgICAgICAgcmV0dXJuIHY7XG4gICAgICAgIH1cblxuLy8gSWYgdGhlIHJlcGxhY2VyIGlzIGFuIGFycmF5LCB1c2UgaXQgdG8gc2VsZWN0IHRoZSBtZW1iZXJzIHRvIGJlIHN0cmluZ2lmaWVkLlxuXG4gICAgICAgIGlmIChyZXAgJiYgdHlwZW9mIHJlcCA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgIGxlbmd0aCA9IHJlcC5sZW5ndGg7XG4gICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHJlcFtpXSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICBrID0gcmVwW2ldO1xuICAgICAgICAgICAgICB2ID0gc3RyKGssIHZhbHVlKTtcbiAgICAgICAgICAgICAgaWYgKHYpIHtcbiAgICAgICAgICAgICAgICBwYXJ0aWFsLnB1c2gocXVvdGUoaykgKyAoXG4gICAgICAgICAgICAgICAgICAoZ2FwKVxuICAgICAgICAgICAgICAgICAgICA/IFwiOiBcIlxuICAgICAgICAgICAgICAgICAgICA6IFwiOlwiXG4gICAgICAgICAgICAgICAgKSArIHYpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuXG4vLyBPdGhlcndpc2UsIGl0ZXJhdGUgdGhyb3VnaCBhbGwgb2YgdGhlIGtleXMgaW4gdGhlIG9iamVjdC5cblxuICAgICAgICAgIGZvciAoayBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgaykpIHtcbiAgICAgICAgICAgICAgdiA9IHN0cihrLCB2YWx1ZSk7XG4gICAgICAgICAgICAgIGlmICh2KSB7XG4gICAgICAgICAgICAgICAgcGFydGlhbC5wdXNoKHF1b3RlKGspICsgKFxuICAgICAgICAgICAgICAgICAgKGdhcClcbiAgICAgICAgICAgICAgICAgICAgPyBcIjogXCJcbiAgICAgICAgICAgICAgICAgICAgOiBcIjpcIlxuICAgICAgICAgICAgICAgICkgKyB2KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4vLyBKb2luIGFsbCBvZiB0aGUgbWVtYmVyIHRleHRzIHRvZ2V0aGVyLCBzZXBhcmF0ZWQgd2l0aCBjb21tYXMsXG4vLyBhbmQgd3JhcCB0aGVtIGluIGJyYWNlcy5cblxuICAgICAgICB2ID0gcGFydGlhbC5sZW5ndGggPT09IDBcbiAgICAgICAgICA/IFwie31cIlxuICAgICAgICAgIDogZ2FwXG4gICAgICAgICAgICA/IFwie1xcblwiICsgZ2FwICsgcGFydGlhbC5qb2luKFwiLFxcblwiICsgZ2FwKSArIFwiXFxuXCIgKyBtaW5kICsgXCJ9XCJcbiAgICAgICAgICAgIDogXCJ7XCIgKyBwYXJ0aWFsLmpvaW4oXCIsXCIpICsgXCJ9XCI7XG4gICAgICAgIGdhcCA9IG1pbmQ7XG4gICAgICAgIHJldHVybiB2O1xuICAgIH1cbiAgfVxuXG4vLyBJZiB0aGUgSlNPTiBvYmplY3QgZG9lcyBub3QgeWV0IGhhdmUgYSBzdHJpbmdpZnkgbWV0aG9kLCBnaXZlIGl0IG9uZS5cblxuICBpZiAodHlwZW9mIEpTT04uc3RyaW5naWZ5ICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBtZXRhID0geyAgICAvLyB0YWJsZSBvZiBjaGFyYWN0ZXIgc3Vic3RpdHV0aW9uc1xuICAgICAgXCJcXGJcIjogXCJcXFxcYlwiLFxuICAgICAgXCJcXHRcIjogXCJcXFxcdFwiLFxuICAgICAgXCJcXG5cIjogXCJcXFxcblwiLFxuICAgICAgXCJcXGZcIjogXCJcXFxcZlwiLFxuICAgICAgXCJcXHJcIjogXCJcXFxcclwiLFxuICAgICAgXCJcXFwiXCI6IFwiXFxcXFxcXCJcIixcbiAgICAgIFwiXFxcXFwiOiBcIlxcXFxcXFxcXCJcbiAgICB9O1xuICAgIEpTT04uc3RyaW5naWZ5ID0gZnVuY3Rpb24gKHZhbHVlLCByZXBsYWNlciwgc3BhY2UpIHtcblxuLy8gVGhlIHN0cmluZ2lmeSBtZXRob2QgdGFrZXMgYSB2YWx1ZSBhbmQgYW4gb3B0aW9uYWwgcmVwbGFjZXIsIGFuZCBhbiBvcHRpb25hbFxuLy8gc3BhY2UgcGFyYW1ldGVyLCBhbmQgcmV0dXJucyBhIEpTT04gdGV4dC4gVGhlIHJlcGxhY2VyIGNhbiBiZSBhIGZ1bmN0aW9uXG4vLyB0aGF0IGNhbiByZXBsYWNlIHZhbHVlcywgb3IgYW4gYXJyYXkgb2Ygc3RyaW5ncyB0aGF0IHdpbGwgc2VsZWN0IHRoZSBrZXlzLlxuLy8gQSBkZWZhdWx0IHJlcGxhY2VyIG1ldGhvZCBjYW4gYmUgcHJvdmlkZWQuIFVzZSBvZiB0aGUgc3BhY2UgcGFyYW1ldGVyIGNhblxuLy8gcHJvZHVjZSB0ZXh0IHRoYXQgaXMgbW9yZSBlYXNpbHkgcmVhZGFibGUuXG5cbiAgICAgIHZhciBpO1xuICAgICAgZ2FwID0gXCJcIjtcbiAgICAgIGluZGVudCA9IFwiXCI7XG5cbi8vIElmIHRoZSBzcGFjZSBwYXJhbWV0ZXIgaXMgYSBudW1iZXIsIG1ha2UgYW4gaW5kZW50IHN0cmluZyBjb250YWluaW5nIHRoYXRcbi8vIG1hbnkgc3BhY2VzLlxuXG4gICAgICBpZiAodHlwZW9mIHNwYWNlID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBzcGFjZTsgaSArPSAxKSB7XG4gICAgICAgICAgaW5kZW50ICs9IFwiIFwiO1xuICAgICAgICB9XG5cbi8vIElmIHRoZSBzcGFjZSBwYXJhbWV0ZXIgaXMgYSBzdHJpbmcsIGl0IHdpbGwgYmUgdXNlZCBhcyB0aGUgaW5kZW50IHN0cmluZy5cblxuICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc3BhY2UgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgaW5kZW50ID0gc3BhY2U7XG4gICAgICB9XG5cbi8vIElmIHRoZXJlIGlzIGEgcmVwbGFjZXIsIGl0IG11c3QgYmUgYSBmdW5jdGlvbiBvciBhbiBhcnJheS5cbi8vIE90aGVyd2lzZSwgdGhyb3cgYW4gZXJyb3IuXG5cbiAgICAgIHJlcCA9IHJlcGxhY2VyO1xuICAgICAgaWYgKHJlcGxhY2VyICYmIHR5cGVvZiByZXBsYWNlciAhPT0gXCJmdW5jdGlvblwiICYmIChcbiAgICAgICAgICB0eXBlb2YgcmVwbGFjZXIgIT09IFwib2JqZWN0XCJcbiAgICAgICAgICB8fCB0eXBlb2YgcmVwbGFjZXIubGVuZ3RoICE9PSBcIm51bWJlclwiXG4gICAgICAgICkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSlNPTi5zdHJpbmdpZnlcIik7XG4gICAgICB9XG5cbi8vIE1ha2UgYSBmYWtlIHJvb3Qgb2JqZWN0IGNvbnRhaW5pbmcgb3VyIHZhbHVlIHVuZGVyIHRoZSBrZXkgb2YgXCJcIi5cbi8vIFJldHVybiB0aGUgcmVzdWx0IG9mIHN0cmluZ2lmeWluZyB0aGUgdmFsdWUuXG5cbiAgICAgIHJldHVybiBzdHIoXCJcIiwge1wiXCI6IHZhbHVlfSk7XG4gICAgfTtcbiAgfVxuXG5cbi8vIElmIHRoZSBKU09OIG9iamVjdCBkb2VzIG5vdCB5ZXQgaGF2ZSBhIHBhcnNlIG1ldGhvZCwgZ2l2ZSBpdCBvbmUuXG5cbiAgaWYgKHR5cGVvZiBKU09OLnBhcnNlICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBKU09OLnBhcnNlID0gZnVuY3Rpb24gKHRleHQsIHJldml2ZXIpIHtcblxuLy8gVGhlIHBhcnNlIG1ldGhvZCB0YWtlcyBhIHRleHQgYW5kIGFuIG9wdGlvbmFsIHJldml2ZXIgZnVuY3Rpb24sIGFuZCByZXR1cm5zXG4vLyBhIEphdmFTY3JpcHQgdmFsdWUgaWYgdGhlIHRleHQgaXMgYSB2YWxpZCBKU09OIHRleHQuXG5cbiAgICAgIHZhciBqO1xuXG4gICAgICBmdW5jdGlvbiB3YWxrKGhvbGRlciwga2V5KSB7XG5cbi8vIFRoZSB3YWxrIG1ldGhvZCBpcyB1c2VkIHRvIHJlY3Vyc2l2ZWx5IHdhbGsgdGhlIHJlc3VsdGluZyBzdHJ1Y3R1cmUgc29cbi8vIHRoYXQgbW9kaWZpY2F0aW9ucyBjYW4gYmUgbWFkZS5cblxuICAgICAgICB2YXIgaztcbiAgICAgICAgdmFyIHY7XG4gICAgICAgIHZhciB2YWx1ZSA9IGhvbGRlcltrZXldO1xuICAgICAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgZm9yIChrIGluIHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrKSkge1xuICAgICAgICAgICAgICB2ID0gd2Fsayh2YWx1ZSwgayk7XG4gICAgICAgICAgICAgIGlmICh2ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZVtrXSA9IHY7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHZhbHVlW2tdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXZpdmVyLmNhbGwoaG9sZGVyLCBrZXksIHZhbHVlKTtcbiAgICAgIH1cblxuXG4vLyBQYXJzaW5nIGhhcHBlbnMgaW4gZm91ciBzdGFnZXMuIEluIHRoZSBmaXJzdCBzdGFnZSwgd2UgcmVwbGFjZSBjZXJ0YWluXG4vLyBVbmljb2RlIGNoYXJhY3RlcnMgd2l0aCBlc2NhcGUgc2VxdWVuY2VzLiBKYXZhU2NyaXB0IGhhbmRsZXMgbWFueSBjaGFyYWN0ZXJzXG4vLyBpbmNvcnJlY3RseSwgZWl0aGVyIHNpbGVudGx5IGRlbGV0aW5nIHRoZW0sIG9yIHRyZWF0aW5nIHRoZW0gYXMgbGluZSBlbmRpbmdzLlxuXG4gICAgICB0ZXh0ID0gU3RyaW5nKHRleHQpO1xuICAgICAgcnhfZGFuZ2Vyb3VzLmxhc3RJbmRleCA9IDA7XG4gICAgICBpZiAocnhfZGFuZ2Vyb3VzLnRlc3QodGV4dCkpIHtcbiAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZShyeF9kYW5nZXJvdXMsIGZ1bmN0aW9uIChhKSB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFwiXFxcXHVcIlxuICAgICAgICAgICAgKyAoXCIwMDAwXCIgKyBhLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtNClcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuLy8gSW4gdGhlIHNlY29uZCBzdGFnZSwgd2UgcnVuIHRoZSB0ZXh0IGFnYWluc3QgcmVndWxhciBleHByZXNzaW9ucyB0aGF0IGxvb2tcbi8vIGZvciBub24tSlNPTiBwYXR0ZXJucy4gV2UgYXJlIGVzcGVjaWFsbHkgY29uY2VybmVkIHdpdGggXCIoKVwiIGFuZCBcIm5ld1wiXG4vLyBiZWNhdXNlIHRoZXkgY2FuIGNhdXNlIGludm9jYXRpb24sIGFuZCBcIj1cIiBiZWNhdXNlIGl0IGNhbiBjYXVzZSBtdXRhdGlvbi5cbi8vIEJ1dCBqdXN0IHRvIGJlIHNhZmUsIHdlIHdhbnQgdG8gcmVqZWN0IGFsbCB1bmV4cGVjdGVkIGZvcm1zLlxuXG4vLyBXZSBzcGxpdCB0aGUgc2Vjb25kIHN0YWdlIGludG8gNCByZWdleHAgb3BlcmF0aW9ucyBpbiBvcmRlciB0byB3b3JrIGFyb3VuZFxuLy8gY3JpcHBsaW5nIGluZWZmaWNpZW5jaWVzIGluIElFJ3MgYW5kIFNhZmFyaSdzIHJlZ2V4cCBlbmdpbmVzLiBGaXJzdCB3ZVxuLy8gcmVwbGFjZSB0aGUgSlNPTiBiYWNrc2xhc2ggcGFpcnMgd2l0aCBcIkBcIiAoYSBub24tSlNPTiBjaGFyYWN0ZXIpLiBTZWNvbmQsIHdlXG4vLyByZXBsYWNlIGFsbCBzaW1wbGUgdmFsdWUgdG9rZW5zIHdpdGggXCJdXCIgY2hhcmFjdGVycy4gVGhpcmQsIHdlIGRlbGV0ZSBhbGxcbi8vIG9wZW4gYnJhY2tldHMgdGhhdCBmb2xsb3cgYSBjb2xvbiBvciBjb21tYSBvciB0aGF0IGJlZ2luIHRoZSB0ZXh0LiBGaW5hbGx5LFxuLy8gd2UgbG9vayB0byBzZWUgdGhhdCB0aGUgcmVtYWluaW5nIGNoYXJhY3RlcnMgYXJlIG9ubHkgd2hpdGVzcGFjZSBvciBcIl1cIiBvclxuLy8gXCIsXCIgb3IgXCI6XCIgb3IgXCJ7XCIgb3IgXCJ9XCIuIElmIHRoYXQgaXMgc28sIHRoZW4gdGhlIHRleHQgaXMgc2FmZSBmb3IgZXZhbC5cblxuICAgICAgaWYgKFxuICAgICAgICByeF9vbmUudGVzdChcbiAgICAgICAgICB0ZXh0XG4gICAgICAgICAgICAucmVwbGFjZShyeF90d28sIFwiQFwiKVxuICAgICAgICAgICAgLnJlcGxhY2UocnhfdGhyZWUsIFwiXVwiKVxuICAgICAgICAgICAgLnJlcGxhY2UocnhfZm91ciwgXCJcIilcbiAgICAgICAgKVxuICAgICAgKSB7XG5cbi8vIEluIHRoZSB0aGlyZCBzdGFnZSB3ZSB1c2UgdGhlIGV2YWwgZnVuY3Rpb24gdG8gY29tcGlsZSB0aGUgdGV4dCBpbnRvIGFcbi8vIEphdmFTY3JpcHQgc3RydWN0dXJlLiBUaGUgXCJ7XCIgb3BlcmF0b3IgaXMgc3ViamVjdCB0byBhIHN5bnRhY3RpYyBhbWJpZ3VpdHlcbi8vIGluIEphdmFTY3JpcHQ6IGl0IGNhbiBiZWdpbiBhIGJsb2NrIG9yIGFuIG9iamVjdCBsaXRlcmFsLiBXZSB3cmFwIHRoZSB0ZXh0XG4vLyBpbiBwYXJlbnMgdG8gZWxpbWluYXRlIHRoZSBhbWJpZ3VpdHkuXG5cbiAgICAgICAgaiA9IGV2YWwoXCIoXCIgKyB0ZXh0ICsgXCIpXCIpO1xuXG4vLyBJbiB0aGUgb3B0aW9uYWwgZm91cnRoIHN0YWdlLCB3ZSByZWN1cnNpdmVseSB3YWxrIHRoZSBuZXcgc3RydWN0dXJlLCBwYXNzaW5nXG4vLyBlYWNoIG5hbWUvdmFsdWUgcGFpciB0byBhIHJldml2ZXIgZnVuY3Rpb24gZm9yIHBvc3NpYmxlIHRyYW5zZm9ybWF0aW9uLlxuXG4gICAgICAgIHJldHVybiAodHlwZW9mIHJldml2ZXIgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgICA/IHdhbGsoe1wiXCI6IGp9LCBcIlwiKVxuICAgICAgICAgIDogajtcbiAgICAgIH1cblxuLy8gSWYgdGhlIHRleHQgaXMgbm90IEpTT04gcGFyc2VhYmxlLCB0aGVuIGEgU3ludGF4RXJyb3IgaXMgdGhyb3duLlxuXG4gICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJKU09OLnBhcnNlXCIpO1xuICAgIH07XG4gIH1cbn0oKSk7XG5cblxuLyoqXG4gKlxuICoganNvbui9rOWtl+espuS4slxuICovXG5mdW5jdGlvbiBzdHJpbmdUb0pzb24oZGF0YSl7XG4gIHJldHVybiBKU09OLnBhcnNlKGRhdGEpO1xufVxuLyoqXG4gKuWtl+espuS4sui9rGpzb25cbiAqL1xuZnVuY3Rpb24ganNvblRvU3RyaW5nKGRhdGEpe1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG59XG4vKipcbiAqbWFw6L2s5o2i5Li6anNvblxuICovXG5mdW5jdGlvbiBtYXBUb0pzb24obWFwKSB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShzdHJNYXBUb09iaihtYXApKTtcbn1cbi8qKlxuICpqc29u6L2s5o2i5Li6bWFwXG4gKi9cbmZ1bmN0aW9uIGpzb25Ub01hcChqc29uU3RyKXtcbiAgcmV0dXJuICBvYmpUb1N0ck1hcChKU09OLnBhcnNlKGpzb25TdHIpKTtcbn1cblxuXG4vKipcbiAqbWFw6L2s5YyW5Li65a+56LGh77yIbWFw5omA5pyJ6ZSu6YO95piv5a2X56ym5Liy77yM5Y+v5Lul5bCG5YW26L2s5o2i5Li65a+56LGh77yJXG4gKi9cbmZ1bmN0aW9uIHN0ck1hcFRvT2JqKHN0ck1hcCl7XG4gIGxldCBvYmo9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIGZvciAobGV0W2ssdl0gb2Ygc3RyTWFwKSB7XG4gICAgb2JqW2tdID0gdjtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAq5a+56LGh6L2s5o2i5Li6TWFwXG4gKi9cbmZ1bmN0aW9uICBvYmpUb1N0ck1hcChvYmope1xuICBsZXQgc3RyTWFwID0gbmV3IE1hcCgpO1xuICBmb3IgKGxldCBrIG9mIE9iamVjdC5rZXlzKG9iaikpIHtcbiAgICBzdHJNYXAuc2V0KGssb2JqW2tdKTtcbiAgfVxuICByZXR1cm4gc3RyTWFwO1xufVxuXG4vLyDovazkuLp1bmljb2RlIOe8lueggVxuZnVuY3Rpb24gZW5jb2RlVW5pY29kZShzdHIpIHtcbiAgdmFyIHJlcyA9IFtdO1xuICBmb3IgKCB2YXIgaT0wOyBpPHN0ci5sZW5ndGg7IGkrKyApIHtcbiAgICByZXNbaV0gPSAoIFwiMDBcIiArIHN0ci5jaGFyQ29kZUF0KGkpLnRvU3RyaW5nKDE2KSApLnNsaWNlKC00KTtcbiAgfVxuICByZXR1cm4gXCJcXFxcdVwiICsgcmVzLmpvaW4oXCJcXFxcdVwiKTtcbn1cblxuLy8g6Kej56CBXG5mdW5jdGlvbiBkZWNvZGVVbmljb2RlKHN0cikge1xuICBzdHIgPSBzdHIucmVwbGFjZSgvXFxcXC9nLCBcIiVcIik7XG4gIHJldHVybiB1bmVzY2FwZShzdHIpO1xufVxuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIGVuY29kZVVuaWNvZGU6ZW5jb2RlVW5pY29kZSxcbiAgZGVjb2RlVW5pY29kZTpkZWNvZGVVbmljb2RlLFxuXG4gIFBhcnNlIDogc3RyaW5nVG9Kc29uLFxuICBzdHJpbmdUb0pzb246IHN0cmluZ1RvSnNvbixcbiAganNvblRvU3RyaW5nOmpzb25Ub1N0cmluZyxcbiAgbWFwVG9Kc29uOm1hcFRvSnNvbixcbiAganNvblRvTWFwOmpzb25Ub01hcCxcbiAgc3RyTWFwVG9PYmo6c3RyTWFwVG9PYmosXG4gIG9ialRvU3RyTWFwOm9ialRvU3RyTWFwLFxufTsiXX0=