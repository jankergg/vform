/**
 * vee-validate v2.0.0-beta.24
 * (c) 2017 Abdelrahman Awad
 * @license MIT
 */
var alpha = (value) => /^[a-zA-Z]*$/.test(value);

var alpha_dash = (value) => /^[a-zA-Z0-9_-]*$/.test(value);

var alpha_num = (value) => /^[a-zA-Z0-9]*$/.test(value);

var alpha_spaces = (value) => /^[a-zA-Z\s]*$/.test(value);

var between = (value, [min, max]) => Number(min) <= value && Number(max) >= value;

var confirmed = (value, [confirmedField], validatingField) => {
  const field = confirmedField
    ? document.querySelector(`input[name='${confirmedField}']`)
    : document.querySelector(`input[name='${validatingField}_confirmation']`);

  return !! (field && String(value) === field.value);
};

function unwrapExports (x) {
  return x && x.__esModule ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
  return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var assertString_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = assertString;
function assertString(input) {
  if (typeof input !== 'string') {
    throw new TypeError('This library (validator.js) validates strings only');
  }
}
module.exports = exports['default'];
});

var isCreditCard_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isCreditCard;

var _assertString = assertString_1;

var _assertString2 = _interopRequireDefault(_assertString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable max-len */
var creditCard = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})|62[0-9]{14}$/;
/* eslint-enable max-len */

function isCreditCard(str) {
  (0, _assertString2.default)(str);
  var sanitized = str.replace(/[^0-9]+/g, '');
  if (!creditCard.test(sanitized)) {
    return false;
  }
  var sum = 0;
  var digit = void 0;
  var tmpNum = void 0;
  var shouldDouble = void 0;
  for (var i = sanitized.length - 1; i >= 0; i--) {
    digit = sanitized.substring(i, i + 1);
    tmpNum = parseInt(digit, 10);
    if (shouldDouble) {
      tmpNum *= 2;
      if (tmpNum >= 10) {
        sum += tmpNum % 10 + 1;
      } else {
        sum += tmpNum;
      }
    } else {
      sum += tmpNum;
    }
    shouldDouble = !shouldDouble;
  }
  return !!(sum % 10 === 0 ? sanitized : false);
}
module.exports = exports['default'];
});

var isCreditCard = unwrapExports(isCreditCard_1);

var credit_card = (value) => isCreditCard(String(value));

var decimal = (value, params) => {
  const decimals = Array.isArray(params) ? (params[0] || '*') : '*';
  if (Array.isArray(value)) {
    return false;
  }

  if (value === null || value === undefined || value === '') {
    return true;
  }

    // if is 0.
  if (Number(decimals) === 0) {
    return /^-?\d*$/.test(value);
  }

  const regexPart = decimals === '*' ? '+' : `{1,${decimals}}`;
  const regex = new RegExp(`^-?\\d*(\\.\\d${regexPart})?$`);

  if (! regex.test(value)) {
    return false;
  }

  const parsedValue = parseFloat(value);

    // eslint-disable-next-line
    return parsedValue === parsedValue;
};

var digits = (value, [length]) => {
  const strVal = String(value);

  return /^[0-9]*$/.test(strVal) && strVal.length === Number(length);
};

const validateImage = (file, width, height) => {
  const URL = window.URL || window.webkitURL;
  return new Promise(resolve => {
    const image = new Image();
    image.onerror = () => resolve({ valid: false });
    image.onload = () => resolve({
      valid: image.width === Number(width) && image.height === Number(height)
    });

    image.src = URL.createObjectURL(file);
  });
};

var dimensions = (files, [width, height]) => {
  const list = [];
  for (let i = 0; i < files.length; i++) {
        // if file is not an image, reject.
    if (! /\.(jpg|svg|jpeg|png|bmp|gif)$/i.test(files[i].name)) {
      return false;
    }

    list.push(files[i]);
  }

  return Promise.all(list.map(file => validateImage(file, width, height)));
};

var merge_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = merge;
function merge() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaults = arguments[1];

  for (var key in defaults) {
    if (typeof obj[key] === 'undefined') {
      obj[key] = defaults[key];
    }
  }
  return obj;
}
module.exports = exports['default'];
});

var isByteLength_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = isByteLength;

var _assertString = assertString_1;

var _assertString2 = _interopRequireDefault(_assertString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable prefer-rest-params */
function isByteLength(str, options) {
  (0, _assertString2.default)(str);
  var min = void 0;
  var max = void 0;
  if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
    min = options.min || 0;
    max = options.max;
  } else {
    // backwards compatibility: isByteLength(str, min [, max])
    min = arguments[1];
    max = arguments[2];
  }
  var len = encodeURI(str).split(/%..|./).length - 1;
  return len >= min && (typeof max === 'undefined' || len <= max);
}
module.exports = exports['default'];
});

var isFQDN = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFDQN;

var _assertString = assertString_1;

var _assertString2 = _interopRequireDefault(_assertString);

var _merge = merge_1;

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var default_fqdn_options = {
  require_tld: true,
  allow_underscores: false,
  allow_trailing_dot: false
};

function isFDQN(str, options) {
  (0, _assertString2.default)(str);
  options = (0, _merge2.default)(options, default_fqdn_options);

  /* Remove the optional trailing dot before checking validity */
  if (options.allow_trailing_dot && str[str.length - 1] === '.') {
    str = str.substring(0, str.length - 1);
  }
  var parts = str.split('.');
  if (options.require_tld) {
    var tld = parts.pop();
    if (!parts.length || !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
      return false;
    }
  }
  for (var part, i = 0; i < parts.length; i++) {
    part = parts[i];
    if (options.allow_underscores) {
      part = part.replace(/_/g, '');
    }
    if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
      return false;
    }
    if (/[\uff01-\uff5e]/.test(part)) {
      // disallow full-width chars
      return false;
    }
    if (part[0] === '-' || part[part.length - 1] === '-') {
      return false;
    }
  }
  return true;
}
module.exports = exports['default'];
});

var isEmail_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEmail;

var _assertString = assertString_1;

var _assertString2 = _interopRequireDefault(_assertString);

var _merge = merge_1;

var _merge2 = _interopRequireDefault(_merge);

var _isByteLength = isByteLength_1;

var _isByteLength2 = _interopRequireDefault(_isByteLength);

var _isFQDN = isFQDN;

var _isFQDN2 = _interopRequireDefault(_isFQDN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var default_email_options = {
  allow_display_name: false,
  allow_utf8_local_part: true,
  require_tld: true
};

/* eslint-disable max-len */
/* eslint-disable no-control-regex */
var displayName = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s]*<(.+)>$/i;
var emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
var quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
var emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
var quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
/* eslint-enable max-len */
/* eslint-enable no-control-regex */

function isEmail(str, options) {
  (0, _assertString2.default)(str);
  options = (0, _merge2.default)(options, default_email_options);

  if (options.allow_display_name) {
    var display_email = str.match(displayName);
    if (display_email) {
      str = display_email[1];
    }
  }

  var parts = str.split('@');
  var domain = parts.pop();
  var user = parts.join('@');

  var lower_domain = domain.toLowerCase();
  if (lower_domain === 'gmail.com' || lower_domain === 'googlemail.com') {
    user = user.replace(/\./g, '').toLowerCase();
  }

  if (!(0, _isByteLength2.default)(user, { max: 64 }) || !(0, _isByteLength2.default)(domain, { max: 256 })) {
    return false;
  }

  if (!(0, _isFQDN2.default)(domain, { require_tld: options.require_tld })) {
    return false;
  }

  if (user[0] === '"') {
    user = user.slice(1, user.length - 1);
    return options.allow_utf8_local_part ? quotedEmailUserUtf8.test(user) : quotedEmailUser.test(user);
  }

  var pattern = options.allow_utf8_local_part ? emailUserUtf8Part : emailUserPart;

  var user_parts = user.split('.');
  for (var i = 0; i < user_parts.length; i++) {
    if (!pattern.test(user_parts[i])) {
      return false;
    }
  }

  return true;
}
module.exports = exports['default'];
});

var isEmail = unwrapExports(isEmail_1);

var email = (value) => isEmail(String(value));

var ext = (files, extensions) => {
  const regex = new RegExp(`.(${extensions.join('|')})$`, 'i');

  return files.every(file => regex.test(file.name));
};

var image = (files) => files.every(file =>
    /\.(jpg|svg|jpeg|png|bmp|gif)$/i.test(file.name)
);

var In = (value, options) => !! options.filter(option => option == value).length; // eslint-disable-line

var isIP_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isIP;

var _assertString = assertString_1;

var _assertString2 = _interopRequireDefault(_assertString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ipv4Maybe = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
var ipv6Block = /^[0-9A-F]{1,4}$/i;

function isIP(str) {
  var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  (0, _assertString2.default)(str);
  version = String(version);
  if (!version) {
    return isIP(str, 4) || isIP(str, 6);
  } else if (version === '4') {
    if (!ipv4Maybe.test(str)) {
      return false;
    }
    var parts = str.split('.').sort(function (a, b) {
      return a - b;
    });
    return parts[3] <= 255;
  } else if (version === '6') {
    var blocks = str.split(':');
    var foundOmissionBlock = false; // marker to indicate ::

    // At least some OS accept the last 32 bits of an IPv6 address
    // (i.e. 2 of the blocks) in IPv4 notation, and RFC 3493 says
    // that '::ffff:a.b.c.d' is valid for IPv4-mapped IPv6 addresses,
    // and '::a.b.c.d' is deprecated, but also valid.
    var foundIPv4TransitionBlock = isIP(blocks[blocks.length - 1], 4);
    var expectedNumberOfBlocks = foundIPv4TransitionBlock ? 7 : 8;

    if (blocks.length > expectedNumberOfBlocks) {
      return false;
    }
    // initial or final ::
    if (str === '::') {
      return true;
    } else if (str.substr(0, 2) === '::') {
      blocks.shift();
      blocks.shift();
      foundOmissionBlock = true;
    } else if (str.substr(str.length - 2) === '::') {
      blocks.pop();
      blocks.pop();
      foundOmissionBlock = true;
    }

    for (var i = 0; i < blocks.length; ++i) {
      // demo for a :: which can not be at the string start/end
      // since those cases have been handled above
      if (blocks[i] === '' && i > 0 && i < blocks.length - 1) {
        if (foundOmissionBlock) {
          return false; // multiple :: in address
        }
        foundOmissionBlock = true;
      } else if (foundIPv4TransitionBlock && i === blocks.length - 1) {
        // it has been checked before that the last
        // block is a valid IPv4 address
      } else if (!ipv6Block.test(blocks[i])) {
        return false;
      }
    }
    if (foundOmissionBlock) {
      return blocks.length >= 1;
    }
    return blocks.length === expectedNumberOfBlocks;
  }
  return false;
}
module.exports = exports['default'];
});

var isIP = unwrapExports(isIP_1);

var ip = (value, [version] = [4]) => isIP(value, version);

var max = (value, [length]) => {
  if (value === undefined || value === null) {
    return length >= 0;
  }

  return String(value).length <= length;
};

var max_value = (value, [max]) => {
  if (Array.isArray(value) || value === null || value === undefined || value === '') {
    return false;
  }

  return Number(value) <= max;
};

var mimes = (files, mimes) => {
  const regex = new RegExp(`${mimes.join('|').replace('*', '.+')}$`, 'i');

  return files.every(file => regex.test(file.type));
};

var min = (value, [length]) => {
  if (value === undefined || value === null) {
    return false;
  }
  return String(value).length >= length;
};

var min_value = (value, [min]) => {
  if (Array.isArray(value) || value === null || value === undefined || value === '') {
    return false;
  }

  return Number(value) >= min;
};

var not_in = (value, options) => ! options.filter(option => option == value).length; // eslint-disable-line

var numeric = (value) => /^[0-9]+$/.test(String(value));

var regex = (value, [regex, ...flags]) => {
  if (regex instanceof RegExp) {
    return regex.test(value);
  }

  return new RegExp(regex, flags).test(String(value));
};

var required = (value) => {
  if (Array.isArray(value)) {
    return !! value.length;
  }

  if (value === undefined || value === null) {
    return false;
  }

  return !! String(value).trim().length;
};

var size = (files, [size]) => {
  if (isNaN(size)) {
    return false;
  }

  const nSize = Number(size) * 1024;
  for (let i = 0; i < files.length; i++) {
    if (files[i].size > nSize) {
      return false;
    }
  }

  return true;
};

var isURL_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isURL;

var _assertString = assertString_1;

var _assertString2 = _interopRequireDefault(_assertString);

var _isFQDN = isFQDN;

var _isFQDN2 = _interopRequireDefault(_isFQDN);

var _isIP = isIP_1;

var _isIP2 = _interopRequireDefault(_isIP);

var _merge = merge_1;

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var default_url_options = {
  protocols: ['http', 'https', 'ftp'],
  require_tld: true,
  require_protocol: false,
  require_host: true,
  require_valid_protocol: true,
  allow_underscores: false,
  allow_trailing_dot: false,
  allow_protocol_relative_urls: false
};

var wrapped_ipv6 = /^\[([^\]]+)\](?::([0-9]+))?$/;

function isRegExp(obj) {
  return Object.prototype.toString.call(obj) === '[object RegExp]';
}

function checkHost(host, matches) {
  for (var i = 0; i < matches.length; i++) {
    var match = matches[i];
    if (host === match || isRegExp(match) && match.test(host)) {
      return true;
    }
  }
  return false;
}

function isURL(url, options) {
  (0, _assertString2.default)(url);
  if (!url || url.length >= 2083 || /\s/.test(url)) {
    return false;
  }
  if (url.indexOf('mailto:') === 0) {
    return false;
  }
  options = (0, _merge2.default)(options, default_url_options);
  var protocol = void 0,
      auth = void 0,
      host = void 0,
      hostname = void 0,
      port = void 0,
      port_str = void 0,
      split = void 0,
      ipv6 = void 0;

  split = url.split('#');
  url = split.shift();

  split = url.split('?');
  url = split.shift();

  split = url.split('://');
  if (split.length > 1) {
    protocol = split.shift();
    if (options.require_valid_protocol && options.protocols.indexOf(protocol) === -1) {
      return false;
    }
  } else if (options.require_protocol) {
    return false;
  } else if (options.allow_protocol_relative_urls && url.substr(0, 2) === '//') {
    split[0] = url.substr(2);
  }
  url = split.join('://');

  split = url.split('/');
  url = split.shift();

  if (url === '' && !options.require_host) {
    return true;
  }

  split = url.split('@');
  if (split.length > 1) {
    auth = split.shift();
    if (auth.indexOf(':') >= 0 && auth.split(':').length > 2) {
      return false;
    }
  }
  hostname = split.join('@');

  port_str = ipv6 = null;
  var ipv6_match = hostname.match(wrapped_ipv6);
  if (ipv6_match) {
    host = '';
    ipv6 = ipv6_match[1];
    port_str = ipv6_match[2] || null;
  } else {
    split = hostname.split(':');
    host = split.shift();
    if (split.length) {
      port_str = split.join(':');
    }
  }

  if (port_str !== null) {
    port = parseInt(port_str, 10);
    if (!/^[0-9]+$/.test(port_str) || port <= 0 || port > 65535) {
      return false;
    }
  }

  if (!(0, _isIP2.default)(host) && !(0, _isFQDN2.default)(host, options) && (!ipv6 || !(0, _isIP2.default)(ipv6, 6)) && host !== 'localhost') {
    return false;
  }

  host = host || ipv6;

  if (options.host_whitelist && !checkHost(host, options.host_whitelist)) {
    return false;
  }
  if (options.host_blacklist && checkHost(host, options.host_blacklist)) {
    return false;
  }

  return true;
}
module.exports = exports['default'];
});

var isURL = unwrapExports(isURL_1);

var url = (value, [requireProtocol] = [true]) =>
    isURL(value, { require_protocol: !! requireProtocol });

/* eslint-disable camelcase */
var Rules = {
  alpha_dash,
  alpha_num,
  alpha_spaces,
  alpha,
  between,
  confirmed,
  credit_card,
  decimal,
  digits,
  dimensions,
  email,
  ext,
  image,
  in: In,
  ip,
  max,
  max_value,
  mimes,
  min,
  min_value,
  not_in,
  numeric,
  regex,
  required,
  size,
  url
};

class ErrorBag
{
  constructor() {
    this.errors = [];
  }

    /**
     * Adds an error to the internal array.
     *
     * @param {string} field The field name.
     * @param {string} msg The error message.
     * @param {String} rule The rule that is responsible for the error.
     * @param {String} scope The Scope name, optional.
     */
  add(field, msg, rule, scope = '__global__') {
    this.errors.push({ field, msg, rule, scope });
  }

    /**
     * Gets all error messages from the internal array.
     *
     * @param {String} scope The Scope name, optional.
     * @return {Array} errors Array of all error messages.
     */
  all(scope) {
    if (! scope) {
      return this.errors.map(e => e.msg);
    }

    return this.errors.filter(e => e.scope === scope).map(e => e.msg);
  }

    /**
     * Checks if there are any errors in the internal array.
     * @param {String} scope The Scope name, optional.
     * @return {boolean} result True if there was at least one error, false otherwise.
     */
  any(scope) {
    if (! scope) {
      return !! this.errors.length;
    }

    return !! this.errors.filter(e => e.scope === scope).length;
  }

    /**
     * Removes all items from the internal array.
     *
     * @param {String} scope The Scope name, optional.
     */
  clear(scope) {
    if (! scope) {
      scope = '__global__';
    }

    this.errors = this.errors.filter(e => e.scope !== scope);
  }

    /**
     * Collects errors into groups or for a specific field.
     *
     * @param  {string} field The field name.
     * @param  {string} scope The scope name.
     * @param {Boolean} map If it should map the errors to strings instead of objects.
     * @return {Array} errors The errors for the specified field.
     */
  collect(field, scope, map = true) {
    if (! field) {
      const collection = {};
      this.errors.forEach(e => {
        if (! collection[e.field]) {
          collection[e.field] = [];
        }

        collection[e.field].push(map ? e.msg : e);
      });

      return collection;
    }

    if (scope) {
      return this.errors.filter(e => e.field === field && e.scope === scope)
                       .map(e => (map ? e.msg : e));
    }

    return this.errors.filter(e => e.field === field && e.scope === '__global__')
                          .map(e => (map ? e.msg : e));
  }
    /**
     * Gets the internal array length.
     *
     * @return {Number} length The internal array length.
     */
  count() {
    return this.errors.length;
  }

    /**
     * Gets the first error message for a specific field.
     *
     * @param  {string} field The field name.
     * @return {string|null} message The error message.
     */
  first(field, scope = '__global__') {
    const selector = this._selector(field);
    const scoped = this._scope(field);

    if (scoped) {
      const result = this.first(scoped.name, scoped.scope);
      // if such result exist, return it. otherwise it could be a field.
      // with dot in its name.
      if (result) {
        return result;
      }
    }

    if (selector) {
      return this.firstByRule(selector.name, selector.rule, scope);
    }

    for (let i = 0; i < this.errors.length; i++) {
      if (this.errors[i].field === field && (this.errors[i].scope === scope)) {
        return this.errors[i].msg;
      }
    }

    return null;
  }

    /**
     * Returns the first error rule for the specified field
     *
     * @param {string} field The specified field.
     * @return {string|null} First error rule on the specified field if one is found, otherwise null
     */
  firstRule(field, scope) {
    const errors = this.collect(field, scope, false);

    return (errors.length && errors[0].rule) || null;
  }

    /**
     * Checks if the internal array has at least one error for the specified field.
     *
     * @param  {string} field The specified field.
     * @return {Boolean} result True if at least one error is found, false otherwise.
     */
  has(field, scope = '__global__') {
    return !! this.first(field, scope);
  }

    /**
     * Gets the first error message for a specific field and a rule.
     * @param {String} name The name of the field.
     * @param {String} rule The name of the rule.
     * @param {String} scope The name of the scope (optional).
     */
  firstByRule(name, rule, scope) {
    const error = this.collect(name, scope, false).filter(e => e.rule === rule)[0];

    return (error && error.msg) || null;
  }

    /**
     * Removes all error messages associated with a specific field.
     *
     * @param  {string} field The field which messages are to be removed.
     * @param {String} scope The Scope name, optional.
     */
  remove(field, scope) {
    if (scope) {
      this.errors = this.errors.filter(e => e.field !== field || e.scope !== scope);

      return;
    }

    this.errors = this.errors.filter(e => e.field !== field && e.scope === '__global__');
  }


    /**
     * Get the field attributes if there's a rule selector.
     *
     * @param  {string} field The specified field.
     * @return {Object|null}
     */
  _selector(field) {
    if (field.indexOf(':') > -1) {
      const [name, rule] = field.split(':');

      return { name, rule };
    }

    return null;
  }

    /**
     * Get the field scope if specified using dot notation.
     *
     * @param {string} field the specifie field.
     * @return {Object|null}
     */
  _scope(field) {
    if (field.indexOf('.') > -1) {
      const [scope, name] = field.split('.');

      return { name, scope };
    }

    return null;
  }
}

var ValidatorException = class
{
  constructor(msg) {
    this.msg = `[vee-validate]: ${msg}`;
  }

  toString() {
    return this.msg;
  }
};

/**
 * Gets the data attribute. the name must be kebab-case.
 */
const getDataAttribute = (el, name) => el.getAttribute(`data-vv-${name}`);

/**
 * Determines the input field scope.
 */
const getScope = (el) => {
  let scope = getDataAttribute(el, 'scope');
  if (! scope && el.form) {
    scope = getDataAttribute(el.form, 'scope');
  }

  return scope;
};

/**
 * Debounces a function.
 */
const debounce = (callback, wait = 0, immediate) => {
  let timeout;
  if (wait == 0) {
    return callback;
  }
  return (...args) => {
    const later = () => {
      timeout = null;
      if (!immediate) callback(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) callback(args);
  };
};

/**
 * Emits a warning to the console.
 */
const warn = (message) => {
  if (! console) {
    return;
  }

    console.warn(`[vee-validate]: ${message}`); // eslint-disable-line
};

/**
 * Checks if the value is an object.
 */
const isObject = (object) => {
  return object !== null && object && typeof object === 'object' && ! Array.isArray(object);
};

/**
 * Checks if a function is callable.
 */
const isCallable = (func) => typeof func === 'function';

/**
 * Check if element has the css class on it.
 */
const hasClass = (el, className) => {
  if (el.classList) {
    return el.classList.contains(className);
  }

  return !!el.className.match(new RegExp(`(\\s|^)${className}(\\s|$)`));
};

/**
 * Adds the provided css className to the element.
 */
const addClass = (el, className) => {
  if (el.classList) {
    el.classList.add(className);
    return;
  }

  if (!hasClass(el, className)) {
    el.className += ` ${className}`;
  }
};

/**
 * Remove the provided css className from the element.
 */
const removeClass = (el, className) => {
  if (el.classList) {
    el.classList.remove(className);
    return;
  }

  if (hasClass(el, className)) {
    const reg = new RegExp(`(\\s|^)${className}(\\s|$)`);
    el.className = el.className.replace(reg, ' ');
  }
};

/**
 * Converts an array-like object to array.
 * Simple polyfill for Array.from
 */
const toArray = (arrayLike) => {
  if (Array.from) {
    return Array.from(arrayLike);
  }

  const array = [];
  const length = arrayLike.length;
  for (let i = 0; i < length; i++) {
    array.push(arrayLike[i]);
  }

  return array;
};

/**
 * Assign polyfill from the mdn.
 */
const assign = (target, ...others) => {
  if (Object.assign) {
    return Object.assign(target, ...others);
  }

  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  const to = Object(target);
  others.forEach(arg => {
    // Skip over if undefined or null
    if (arg != null) {
      Object.keys(arg).forEach(key => {
        to[key] = arg[key];
      });
    }
  });

  return to;
};

/**
 * polyfills array.find
 * @param {Array} array
 * @param {Function} predicate
 */
const find = (array, predicate) => {
  if (array.find) {
    return array.find(predicate);
  }

  let result;
  array.some(item => {
    if (predicate(item)) {
      result = item;
      return true;
    }

    return false;
  });

  return result;
};

/**
 * Gets the rules from a binding value or the element dataset.
 *
 * @param {String} expression The binding expression.
 * @param {Object|String} value The binding value.
 * @param {element} el The element.
 * @returns {String|Object}
 */
const getRules = (expression, value, el) => {
  if (! expression) {
    return getDataAttribute(el, 'rules');
  }

  if (typeof value === 'string') {
    return value;
  }

  if (~['string', 'object'].indexOf(typeof value.rules)) {
    return value.rules
  }

  return value;
};

/* eslint-disable prefer-rest-params */
class Dictionary
{
  constructor(dictionary = {}) {
    this.dictionary = {};
    this.merge(dictionary);
  }

  hasLocale(locale) {
    return !! this.dictionary[locale];
  }

  getMessage(locale, key, fallback) {
    if (! this.hasMessage(locale, key)) {
      return fallback || this._getDefaultMessage(locale);
    }

    return this.dictionary[locale].messages[key];
  }

  _getDefaultMessage(locale) {
    if (this.hasMessage(locale, '_default')) {
      return this.dictionary[locale].messages._default;
    }

    return this.dictionary.en.messages._default;
  }

  getAttribute(locale, key, fallback = '') {
    if (! this.hasAttribute(locale, key)) {
      return fallback;
    }

    return this.dictionary[locale].attributes[key];
  }

  hasMessage(locale, key) {
    return !! (
            this.hasLocale(locale) &&
            this.dictionary[locale].messages &&
            this.dictionary[locale].messages[key]
        );
  }

  hasAttribute(locale, key) {
    return !! (
            this.hasLocale(locale) &&
            this.dictionary[locale].attributes &&
            this.dictionary[locale].attributes[key]
        );
  }

  merge(dictionary) {
    this._merge(this.dictionary, dictionary);
  }

  setMessage(locale, key, message) {
    if (! this.hasLocale(locale)) {
      this.dictionary[locale] = {
        messages: {},
        attributes: {}
      };
    }

    this.dictionary[locale].messages[key] = message;
  }

  setAttribute(locale, key, attribute) {
    if (! this.hasLocale(locale)) {
      this.dictionary[locale] = {
        messages: {},
        attributes: {}
      };
    }

    this.dictionary[locale].attributes[key] = attribute;
  }

  _merge(target, source) {
    if (! (isObject(target) && isObject(source))) {
      return target;
    }

    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (! target[key]) {
          assign(target, { [key]: {} });
        }

        this._merge(target[key], source[key]);
        return;
      }

      assign(target, { [key]: source[key] });
    });

    return target;
  }
}

/* istanbul ignore next */
/* eslint-disable max-len */
var messages = {
  _default: (field) => `The ${field} value is not valid.`,
  alpha_dash: (field) => `The ${field} field may contain alpha-numeric characters as well as dashes and underscores.`,
  alpha_num: (field) => `The ${field} field may only contain alpha-numeric characters.`,
  alpha_spaces: (field) => `The ${field} field may only contain alphabetic characters as well as spaces.`,
  alpha: (field) => `The ${field} field may only contain alphabetic characters.`,
  between: (field, [min, max]) => `The ${field} field must be between ${min} and ${max}.`,
  confirmed: (field) => `The ${field} confirmation does not match.`,
  credit_card: (field) => `The ${field} field is invalid.`,
  decimal: (field, [decimals] = ['*']) => `The ${field} field must be numeric and may contain ${decimals === '*' ? '' : decimals} decimal points.`,
  digits: (field, [length]) => `The ${field} field must be numeric and exactly contain ${length} digits.`,
  dimensions: (field, [width, height]) => `The ${field} field must be ${width} pixels by ${height} pixels.`,
  email: (field) => `The ${field} field must be a valid email.`,
  ext: (field) => `The ${field} field must be a valid file.`,
  image: (field) => `The ${field} field must be an image.`,
  in: (field) => `The ${field} field must be a valid value.`,
  ip: (field) => `The ${field} field must be a valid ip address.`,
  max: (field, [length]) => `The ${field} field may not be greater than ${length} characters.`,
  max_value: (field, [max]) => `The ${field} field must be ${max} or less.`,
  mimes: (field) => `The ${field} field must have a valid file type.`,
  min: (field, [length]) => `The ${field} field must be at least ${length} characters.`,
  min_value: (field, [min]) => `The ${field} field must be ${min} or more.`,
  not_in: (field) => `The ${field} field must be a valid value.`,
  numeric: (field) => `The ${field} field may only contain numeric characters.`,
  regex: (field) => `The ${field} field format is invalid.`,
  required: (field) => `The ${field} field is required.`,
  size: (field, [size]) => `The ${field} field must be less than ${size} KB.`,
  url: (field) => `The ${field} field is not a valid URL.`
};

var after = (moment) => (value, [targetField, format]) => {
  const dateValue = moment(value, format, true);
  const field = document.querySelector(`input[name='${targetField}']`);

  if (! (dateValue.isValid() && field)) {
    return false;
  }

  const other = moment(field.value, format, true);

  if (! other.isValid()) {
    return false;
  }

  return dateValue.isAfter(other);
};

var before = (moment) => (value, [targetField, format]) => {
  const dateValue = moment(value, format, true);
  const field = document.querySelector(`input[name='${targetField}']`);

  if (! dateValue.isValid() || ! field) {
    return false;
  }

  const other = moment(field.value, format, true);

  if (! other.isValid()) {
    return false;
  }

  return dateValue.isBefore(other);
};

var date_format = (moment) => (value, [format]) => moment(value, format, true).isValid();

var date_between = (moment) => (value, [min, max, format]) => {
  const minDate = moment(min, format, true);
  const maxDate = moment(max, format, true);
  const dateVal = moment(value, format, true);

  if (! (minDate.isValid() && maxDate.isValid() && dateVal.isValid())) {
    return false;
  }

  return dateVal.isBetween(minDate, maxDate);
};

/* istanbul ignore next */
/* eslint-disable max-len */
var messages$1 = {
  after: (field, [target]) => `The ${field} must be after ${target}.`,
  before: (field, [target]) => `The ${field} must be before ${target}.`,
  date_between: (field, [min, max]) => `The ${field} must be between ${min} and ${max}.`,
  date_format: (field, [format]) => `The ${field} must be in the format ${format}.`
};

var date = {
  make: (moment) => ({
    date_format: date_format(moment),
    after: after(moment),
    before: before(moment),
    date_between: date_between(moment)
  }),
  messages: messages$1,
  installed: false
};

class FieldBag {
  constructor() {
    this.fields = {};
  }

    /**
     * Initializes and adds a new field to the bag.
     */
  _add(name) {
    this.fields[name] = {};
    this._setFlags(name, { dirty: false, valid: false, }, true);
  }

  /**
   * Adds a field if it does not exist.
   */
  _addIfNotExists(name) {
    if (this.fields[name]) {
      return;
    }

    this._add(name);
  }

    /**
     * Remooves a field from the bag.
     */
  _remove(name) {
    delete this.fields[name];
  }

    /**
     * Resets the flags state for a specified field or all fields.
     */
  reset(name) {
    if (! name) {
      Object.keys(this.fields).forEach(field => {
        this._setFlags(field, { dirty: false, valid: false, }, true);
      });

      return;
    }

    this._setFlags(name, { dirty: false, valid: false, }, true);
  }

    /**
     * Sets the flags for a specified field.
     */
  _setFlags(name, flags, initial = false) {
    return Object.keys(flags).every(
            flag => this._setFlag(name, flag, flags[flag], initial)
        );
  }

    /**
     * Sets a flag for a specified field.
     */
  _setFlag(name, flag, value, initial = false) {
    const method = `set${flag.charAt(0).toUpperCase()}${flag.slice(1)}`;
    if (typeof this[method] !== 'function') {
      return false;
    }

    this[method](name, value, initial);

    return true;
  }

    /**
     * Sets the dirty flag along with dependant flags.
     */
  setDirty(name, value, initial = false) {
    this.fields[name].dirty = value;
    this.fields[name].clean = initial || ! value;
    this.fields[name].passed = this.fields[name].valid && value;
    this.fields[name].failed = ! this.fields[name].valid && value;
  }

    /**
     * Sets the valid flag along with dependant flags.
     */
  setValid(name, value) {
    this.fields[name].valid = value;
    this.fields[name].passed = this.fields[name].dirty && value;
    this.fields[name].failed = this.fields[name].dirty && ! value;
  }

    /**
     * Gets a field flag value.
     */
  _getFieldFlag(name, flag) {
    if (this.fields[name]) {
      return this.fields[name][flag];
    }

    return false;
  }

  dirty(name) {
    if (! name) {
      return Object.keys(this.fields).some(field => this.fields[field].dirty);
    }

    return this._getFieldFlag(name, 'dirty');
  }

  valid(name) {
    if (! name) {
      return Object.keys(this.fields).every(field => this.fields[field].valid);
    }

    return this._getFieldFlag(name, 'valid');
  }

  passed(name) {
    if (! name) {
      return Object.keys(this.fields).every(field => this.fields[field].passed);
    }

    return this._getFieldFlag(name, 'passed');
  }

  failed(name) {
    if (! name) {
      return Object.keys(this.fields).some(field => this.fields[field].failed);
    }

    return this._getFieldFlag(name, 'failed');
  }

  clean(name) {
    if (! name) {
      return ! this.dirty();
    }

    return this._getFieldFlag(name, 'clean');
  }
}

let LOCALE = 'en';
let STRICT_MODE = true;
const DICTIONARY = new Dictionary({
  en: {
    messages,
    attributes: {}
  }
});

class Validator
{
  constructor(validations, options = { init: true }) {
    this.strictMode = STRICT_MODE;
    this.$scopes = { __global__: {} };
    this.fieldBag = new FieldBag();
    this._createFields(validations);
    this.errorBag = new ErrorBag();
    // Some fields will be later evaluated, because the vm isn't mounted yet
    // so it may register it under an inaccurate scope.
    this.$deferred = [];
    this.$ready = false;

    // if momentjs is present, install the validators.
    if (typeof moment === 'function') {
      // eslint-disable-next-line
      this.installDateTimeValidators(moment);
    }

    if (options.init) {
      this.init();
    }
  }

  /**
   * @return Dictionary
   */
  get dictionary() {
    return DICTIONARY;
  }

  /**
   * Merges a validator object into the Rules and Messages.
   *
   * @param  {string} name The name of the validator.
   * @param  {function|object} validator The validator object.
   */
  static _merge(name, validator) {
    if (isCallable(validator)) {
      Rules[name] = validator;
      return;
    }

    Rules[name] = validator.validate;
    if (validator.getMessage && isCallable(validator.getMessage)) {
      DICTIONARY.setMessage('en', name, validator.getMessage);
    }

    if (validator.messages) {
      DICTIONARY.merge(
        Object.keys(validator.messages).reduce((prev, curr) => {
          const dict = prev;
          dict[curr] = {
            messages: {
              [name]: validator.messages[curr]
            }
          };

          return dict;
        }, {})
      );
    }
  }

  /**
   * Guards from extnsion violations.
   *
   * @param  {string} name name of the validation rule.
   * @param  {object} validator a validation rule object.
   */
  static _guardExtend(name, validator) {
    if (Rules[name]) {
      throw new ValidatorException(
        `Extension Error: There is an existing validator with the same name '${name}'.`
      );
    }

    if (isCallable(validator)) {
      return;
    }

    if (! isCallable(validator.validate)) {
      throw new ValidatorException(
        // eslint-disable-next-line
        `Extension Error: The validator '${name}' must be a function or have a 'validate' method.`
      );
    }

    if (! isCallable(validator.getMessage) && ! isObject(validator.messages)) {
      throw new ValidatorException(
        // eslint-disable-next-line
        `Extension Error: The validator '${name}' must have a 'getMessage' method or have a 'messages' object.`
      );
    }
  }

  /**
   * Static constructor.
   *
   * @param  {object} validations The validations object.
   * @return {Validator} validator A validator object.
   */
  static create(validations, $vm, options) {
    return new Validator(validations, $vm, options);
  }

  /**
   * Adds a custom validator to the list of validation rules.
   *
   * @param  {string} name The name of the validator.
   * @param  {object|function} validator The validator object/function.
   */
  static extend(name, validator) {
    Validator._guardExtend(name, validator);
    Validator._merge(name, validator);
  }

  /**
   * Installs the datetime validators and the messages.
   */
  static installDateTimeValidators(moment) {
    if (typeof moment !== 'function') {
      warn('To use the date-time validators you must provide moment reference.');

      return false;
    }

    if (date.installed) {
      return true;
    }

    const validators = date.make(moment);
    Object.keys(validators).forEach(name => {
      Validator.extend(name, validators[name]);
    });

    Validator.updateDictionary({
      en: {
        messages: date.messages
      }
    });
    date.installed = true;

    return true;
  }

  /**
   * Removes a rule from the list of validators.
   * @param {String} name The name of the validator/rule.
   */
  static remove(name) {
    delete Rules[name];
  }

  /**
   * Sets the default locale for all validators.
   *
   * @param {String} language The locale id.
   */
  static setLocale(language = 'en') {
    /* istanbul ignore if */
    if (! DICTIONARY.hasLocale(language)) {
      // eslint-disable-next-line
      warn('You are setting the validator locale to a locale that is not defined in the dicitionary. English messages may still be generated.');
    }

    LOCALE = language;
  }

  /**
   * Sets the operating mode for all newly created validators.
   * strictMode = true: Values without a rule are invalid and cause failure.
   * strictMode = false: Values without a rule are valid and are skipped.
   * @param {Boolean} strictMode.
   */
  static setStrictMode(strictMode = true) {
    STRICT_MODE = strictMode;
  }

  /**
   * Updates the dicitionary, overwriting existing values and adding new ones.
   *
   * @param  {object} data The dictionary object.
   */
  static updateDictionary(data) {
    DICTIONARY.merge(data);
  }

  static addLocale(locale) {
    if (! locale.name) {
      warn('Your locale must have a name property');
      return;
    }

    this.updateDictionary({
      [locale.name]: locale
    });
  }

  addLocale(locale) {
    Validator.addLocale(locale);
  }

  /**
   * Resolves the scope value. Only strings and functions are allowed.
   * @param {Function|String} scope
   * @returns {String}
   */
  _resolveScope(scope) {
    if (typeof scope === 'string') {
      return scope;
    }

    // The resolved value should be string.
    if (isCallable(scope)) {
      const value = scope();
      return typeof value === 'string' ? value : '__global__';
    }

    return '__global__';
  }

  /**
   * Resolves the field values from the getter functions.
   */
  _resolveValuesFromGetters(scope = '__global__') {
    if (! this.$scopes[scope]) {
      return {};
    }
    const values = {};
    Object.keys(this.$scopes[scope]).forEach(name => {
      const field = this.$scopes[scope][name];
      const getter = field.getter;
      const context = field.context;
      const fieldScope = this._resolveScope(field.scope);
      if (getter && context && (scope === '__global__' || fieldScope === scope)) {
        values[name] = {
          value: getter(context()),
          scope: fieldScope
        };
      }
    });

    return values;
  }

  /**
   * Creates the fields to be validated.
   *
   * @param  {object} validations
   * @return {object} Normalized object.
   */
  _createFields(validations) {
    if (! validations) {
      return;
    }

    Object.keys(validations).forEach(field => {
      this._createField(field, validations[field]);
    });
  }

  /**
   * Creates a field entry in the fields object.
   * @param {String} name.
   * @param {String|Array} checks.
   */
  _createField(name, checks, scope = '__global__') {
    scope = this._resolveScope(scope);
    if (! this.$scopes[scope]) {
      this.$scopes[scope] = {};
    }

    if (! this.$scopes[scope][name]) {
      this.$scopes[scope][name] = {};
    }

    const field = this.$scopes[scope][name];
    this.fieldBag._addIfNotExists(name);
    field.validations = this._normalizeRules(name, checks, scope);
    field.required = this._isRequired(field);
  }

  /**
   * Normalizes rules.
   * @return {Object}
   */
  _normalizeRules(name, checks, scope) {
    if (! checks) return {};

    if (typeof checks === 'string') {
      return this._normalizeString(checks);
    }

    if (! isObject(checks)) {
      warn(`Your checks for '${scope}.${name}' must be either a string or an object.`);
      return {};
    }

    return this._normalizeObject(checks);
  }

  /**
   * Checks if a field has a required rule.
   */
  _isRequired(field) {
    return field.validations && field.validations.required;
  }

  /**
   * Normalizes an object of rules.
   */
  _normalizeObject(rules) {
    const validations = {};
    Object.keys(rules).forEach(rule => {
      let params = [];
      if (rules[rule] === true) {
        params = [];
      } else if (Array.isArray(rules[rule])) {
        params = rules[rule];
      } else {
        params = [rules[rule]];
      }

      if (rules[rule] === false) {
        delete validations[rule];
      } else {
        validations[rule] = params;
      }

      if (date.installed && this._isADateRule(rule)) {
        validations[rule].push(this._getDateFormat(validations));
      }
    });

    return validations;
  }

  /**
   * Date rules need the existance of a format, so date_format must be supplied.
   * @param {String} name The rule name.
   * @param {Array} validations the field validations.
   */
  _getDateFormat(validations) {
    if (validations.date_format && Array.isArray(validations.date_format)) {
      return validations.date_format[0];
    }

    return null;
  }

  /**
   * Checks if the passed rule is a date rule.
   */
  _isADateRule(rule) {
    return !! ~['after', 'before', 'date_between'].indexOf(rule);
  }

  /**
   * Normalizes string rules.
   * @param {String} rules The rules that will be normalized.
   * @param {Object} field The field object that is being operated on.
   */
  _normalizeString(rules) {
    const validations = {};
    rules.split('|').forEach(rule => {
      const parsedRule = this._parseRule(rule);
      if (! parsedRule.name) {
        return;
      }

      if (parsedRule.name === 'required') {
        validations.required = true;
      }

      validations[parsedRule.name] = parsedRule.params;
      if (date.installed && this._isADateRule(parsedRule.name)) {
        validations[parsedRule.name].push(this._getDateFormat(validations));
      }
    });

    return validations;
  }

  /**
   * Normalizes a string rule.
   *
   * @param {string} rule The rule to be normalized.
   * @return {object} rule The normalized rule.
   */
  _parseRule(rule) {
    let params = [];
    const name = rule.split(':')[0];

    if (~rule.indexOf(':')) {
      params = rule.split(':').slice(1).join(':').split(',');
    }

    return { name, params };
  }

  /**
   * Formats an error message for field and a rule.
   *
   * @param  {string} field The field name.
   * @param  {object} rule Normalized rule object.
   * @param {object} data Additional Information about the validation result.
   * @param {string} scope The field scope.
   * @return {string} Formatted error message.
   */
  _formatErrorMessage(field, rule, data = {}, scope = '__global__') {
    const name = this._getFieldDisplayName(field, scope);
    const params = this._getLocalizedParams(rule, scope);
    // Defaults to english message.
    if (! this.dictionary.hasLocale(LOCALE)) {
      return this.dictionary.getMessage('en', rule.name)(name, params, data);
    }

    return this.dictionary.getMessage(LOCALE, rule.name)(name, params, data);
  }

  /**
   * Translates the parameters passed to the rule (mainly for target fields).
   */
  _getLocalizedParams(rule, scope = '__global__') {
    if (~ ['after', 'before', 'confirmed'].indexOf(rule.name) &&
        rule.params && rule.params[0]) {
      const param = this.$scopes[scope][rule.params[0]];
      if (param && param.name) return [param.name];
      return [this.dictionary.getAttribute(LOCALE, rule.params[0], rule.params[0])];
    }

    return rule.params;
  }

  /**
   * Resolves an appropiate display name, first checking 'data-as' or the registered 'prettyName'
   * Then the dictionary, then fallsback to field name.
   * @return {String} displayName The name to be used in the errors.
   */
  _getFieldDisplayName(field, scope = '__global__') {
    return this.$scopes[scope][field].name || this.dictionary.getAttribute(LOCALE, field, field);
  }

  /**
   * Tests a single input value against a rule.
   *
   * @param  {*} name The name of the field.
   * @param  {*} value  the value of the field.
   * @param  {object} rule the rule object.
   * @param {scope} scope The field scope.
   * @return {boolean} Whether it passes the check.
   */
  _test(name, value, rule, scope = '__global__') {
    const validator = Rules[rule.name];
    if (! validator || typeof validator !== 'function') {
      throw new ValidatorException(`No such validator '${rule.name}' exists.`);
    }

    let result = validator(value, rule.params, name);

    // If it is a promise.
    if (isCallable(result.then)) {
      return result.then(values => {
        let allValid = true;
        let data = {};
        if (Array.isArray(values)) {
          allValid = values.every(t => t.valid);
        } else { // Is a single object.
          allValid = values.valid;
          data = values.data;
        }

        if (! allValid) {
          this.errorBag.add(
                        name,
                        this._formatErrorMessage(name, rule, data, scope),
                        rule.name,
                        scope
                    );
        }

        return allValid;
      });
    }

    if (! isObject(result)) {
      result = { valid: result, data: {} };
    }

    if (! result.valid) {
      this.errorBag.add(
                name,
                this._formatErrorMessage(name, rule, result.data, scope),
                rule.name,
                scope
            );
    }

    return result.valid;
  }

  /**
   * Registers a field to be validated.
   *
   * @param  {string} name The field name.
   * @param  {String|Array|Object} checks validations expression.
   * @param {string} prettyName Custom name to be used as field name in error messages.
   * @param {Function} getter A function used to retrive a fresh value for the field.
   */
  attach(name, checks, options = {}) {
    const attach = () => {
      options.scope = this._resolveScope(options.scope);
      this.updateField(name, checks, options);
      const field = this.$scopes[options.scope][name];
      field.scope = options.scope;
      field.name = options.prettyName;
      field.getter = options.getter;
      field.context = options.context;
      field.listeners = options.listeners || { detach() {} };
      field.el = field.listeners.el;
      this._setAriaRequiredAttribute(field);
      this._setAriaValidAttribute(field, true);
    };

    const scope = isCallable(options.scope) ? options.scope() : options.scope;
    if (! scope && ! this.$ready) {
      this.$deferred.push(attach);
      return;
    }


    attach();
  }

  /**
   * Initializes the non-scoped fields and any bootstrap logic.
   */
  init() {
    this.$ready = true;
    this.$deferred.forEach(attach => {
      attach();
    });
    this.$deferred = [];

    return this;
  }

  /**
   * Append another validation to an existing field.
   *
   * @param  {string} name The field name.
   * @param  {string} checks validations expression.
   */
  append(name, checks, options = {}) {
    options.scope = this._resolveScope(options.scope);
    // No such field
    if (! this.$scopes[options.scope] || ! this.$scopes[options.scope][name]) {
      this.attach(name, checks, options);
    }

    const field = this.$scopes[options.scope][name];
    const newChecks = this._normalizeRules(name, checks, options.scope);
    Object.keys(newChecks).forEach(key => {
      field.validations[key] = newChecks[key];
    });
  }

  /**
   * Updates the field rules with new ones.
   */
  updateField(name, checks, options = {}) {
    let field = (this.$scopes[options.scope] && this.$scopes[options.scope][name]) || null;
    const oldChecks = field ? JSON.stringify(field.validations) : '';
    this._createField(name, checks, options.scope);
    field = (this.$scopes[options.scope] && this.$scopes[options.scope][name]) || null;
    const newChecks = field ? JSON.stringify(field.validations) : '';

    // compare both newChecks and oldChecks to make sure we don't trigger uneccessary directive
    // update by changing the errorBag (prevents infinite loops).
    if (newChecks !== oldChecks) {
      this.errorBag.remove(name, options.scope);
    }
  }

  /**
   * Removes a field from the validator.
   *
   * @param  {String} name The name of the field.
   * @param {String} scope The name of the field scope.
   */
  detach(name, scope = '__global__') {
    // No such field.
    if (! this.$scopes[scope] || ! this.$scopes[scope][name]) {
      return;
    }

    this.$scopes[scope][name].listeners.detach();
    this.errorBag.remove(name, scope);
    this.fieldBag._remove(name);
    delete this.$scopes[scope][name];
  }

  /**
   * Adds a custom validator to the list of validation rules.
   *
   * @param  {string} name The name of the validator.
   * @param  {object|function} validator The validator object/function.
   */
  extend(name, validator) {
    Validator.extend(name, validator);
  }

  /**
   * Gets the internal errorBag instance.
   *
   * @return {ErrorBag} errorBag The internal error bag object.
   */
  getErrors() {
    return this.errorBag;
  }

  /**
   * Gets the currently active locale.
   *
   * @return {String} Locale identifier.
   */
  getLocale() {
    return LOCALE;
  }

  /**
   * Just an alias to the static method for convienece.
   */
  installDateTimeValidators(moment) {
    Validator.installDateTimeValidators(moment);
  }

  /**
   * Removes a rule from the list of validators.
   * @param {String} name The name of the validator/rule.
   */
  remove(name) {
    Validator.remove(name);
  }

  /**
   * Sets the validator current langauge.
   *
   * @param {string} language locale or language id.
   */
  setLocale(language) {
    /* istanbul ignore if */
    if (! this.dictionary.hasLocale(language)) {
      // eslint-disable-next-line
      warn('You are setting the validator locale to a locale that is not defined in the dicitionary. English messages may still be generated.');
    }

    LOCALE = language;
  }

  /**
   * Sets the operating mode for this validator.
   * strictMode = true: Values without a rule are invalid and cause failure.
   * strictMode = false: Values without a rule are valid and are skipped.
   * @param {Boolean} strictMode.
   */
  setStrictMode(strictMode = true) {
    this.strictMode = strictMode;
  }

  /**
   * Updates the messages dicitionary, overwriting existing values and adding new ones.
   *
   * @param  {object} data The messages object.
   */
  updateDictionary(data) {
    Validator.updateDictionary(data);
  }

  /**
   * Adds a scope.
   */
  addScope(scope) {
    if (scope && ! this.$scopes[scope]) {
      this.$scopes[scope] = {};
    }
  }

  /**
   * Validates a value against a registered field validations.
   *
   * @param  {string} name the field name.
   * @param  {*} value The value to be validated.
   * @param {String} scope The scope of the field.
   * @return {Promise}
   */
  validate(name, value, scope = '__global__') {
    if (name && name.indexOf('.') > -1) {
      // no such field, try the scope form.
      if (! this.$scopes.__global__[name]) {
        [scope, name] = name.split('.');
      }
    }
    if (! scope) scope = '__global__';
    if (! this.$scopes[scope] || ! this.$scopes[scope][name]) {
      if (! this.strictMode) return Promise.resolve(true);

      const fullName = scope === '__global__' ? name : `${scope}.${name}`;
      warn(`Validating a non-existant field: "${fullName}". Use "attach()" first.`);

      return Promise.reject(false);
    }

    const field = this.$scopes[scope][name];
    this.errorBag.remove(name, scope);
    // if its not required and is empty or null or undefined then it passes.
    if (! field.required && ~[null, undefined, ''].indexOf(value)) {
      this.fieldBag._setFlags(name, { valid: true, dirty: true });
      return Promise.resolve(true);
    }

    const promises = [];
    const test = Object.keys(field.validations).every(rule => {
      const result = this._test(
        name,
        value,
        { name: rule, params: field.validations[rule] },
        scope
      );
      if (isCallable(result.then)) {
        promises.push(result);
      }

      return result;
    });

    if (promises.length) {
      return Promise.all(promises).then(values => {
        const valid = values.every(t => t) && test;
        this.fieldBag._setFlags(name, { valid, dirty: true });
        this._setAriaValidAttribute(field, test);

        return valid;
      });
    }

    this.fieldBag._setFlags(name, { valid: test, dirty: true });
    this._setAriaValidAttribute(field, test);

    return new Promise((resolve, reject) => {
      if (test) {
        resolve(test);
        return;
      }

      reject(false);
    });
  }

  /**
   * Sets the aria-invalid attribute on the element.
   */
  _setAriaValidAttribute(field, valid) {
    if (! field.el) {
      return;
    }

    field.el.setAttribute('aria-invalid', !valid);
  }

  /**
   * Sets the aria-required attribute on the element.
   */
  _setAriaRequiredAttribute(field) {
    if (! field.el) {
      return;
    }

    field.el.setAttribute('aria-required', !! field.required);
  }

  /**
   * Validates each value against the corresponding field validations.
   * @param  {object} values The values to be validated.
   * @return {Promise} Returns a promise with the validation result.
   */
  validateAll(values) {
    let normalizedValues;
    if (! values || typeof values === 'string') {
      this.errorBag.clear(values);
      normalizedValues = this._resolveValuesFromGetters(values);
    } else {
      normalizedValues = {};
      Object.keys(values).forEach(key => {
        normalizedValues[key] = {
          value: values[key]
        };
      });
    }
    const promises = Object.keys(normalizedValues).map(property => this.validate(
      property,
      normalizedValues[property].value,
      normalizedValues[property].scope
    ));

    return Promise.all(promises).then(() => true).catch(() => {
      throw new ValidatorException('Validation Failed');
    });
  }

  /**
   * Validates all scopes.
   * @returns {Promise} All promises resulted from each scope.
   */
  validateScopes() {
    return Promise.all(
      Object.keys(this.$scopes).map(scope => this.validateAll(scope))
    );
  }
}

var makeMixin = (Vue, options) => ({
  computed: {
    [options.errorBagName]: {
      get() {
        return this.$validator.errorBag;
      }
    },
    [options.fieldsBagName]: {
      get() {
        return this.$validator.fieldBag;
      }
    }
  },
  beforeCreate() {
    this.$validator = new Validator(null, { init: false });
    Vue.util.defineReactive(this.$validator, 'errorBag', this.$validator.errorBag);
    Vue.util.defineReactive(this.$validator, 'fieldBag', this.$validator.fieldBag);
  },
  mounted() {
    this.$validator.init();
  }
});

class ListenerGenerator
{
  constructor(el, binding, vnode, options) {
    this.unwatch = undefined;
    this.callbacks = [];
    this.el = el;
    this.scope = isObject(binding.value) ? binding.value.scope : getScope(el);
    this.binding = binding;
    this.vm = vnode.context;
    this.component = vnode.child;
    this.options = options;
    this.fieldName = this._resolveFieldName();
    this.model = this._resolveModel(vnode.data.directives);
  }

  /**
   * Checks if the node directives contains a v-model.
   */
  _resolveModel(directives) {
    const expRegex = /^[a-z_]+[0-9]*(\w*\.[a-z_]\w*)*$/i;
    const model = find(directives, d => d.name === 'model' && expRegex.test(d.expression));

    return model && this._isExistingPath(model.expression) && model.expression;
  }

  /**
   * Checks if the object path exists.
   */
  _isExistingPath(path) {
    let obj = this.vm;
    return path.split('.').every(prop => {
      if (! Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }

      obj = obj[prop];

      return true;
    });
  }

    /**
     * Resolves the field name to trigger validations.
     * @return {String} The field name.
     */
  _resolveFieldName() {
    if (this.component) {
      return getDataAttribute(this.el, 'name') || this.component.name;
    }

    return getDataAttribute(this.el, 'name') || this.el.name;
  }

    /**
     * Determines if the validation rule requires additional listeners on target fields.
     */
  _hasFieldDependency(rules) {
    let fieldName = false;
    if (! rules) {
      return false;
    }

    if (isObject(rules)) {
      Object.keys(rules).forEach(r => { // eslint-disable-line
        if (/confirmed|after|before/.test(r)) {
          fieldName = rules[r];

          return false;
        }
      });

      return fieldName;
    }

    rules.split('|').every(r => {
      if (/\b(confirmed|after|before):/.test(r)) {
        fieldName = r.split(':')[1];
        return false;
      }

      if (/\b(confirmed)/.test(r)) {
        fieldName = `${this.fieldName}_confirmation`;
        return false;
      }

      return true;
    });

    return fieldName;
  }

    /**
     * Validates input value, triggered by 'input' event.
     */
  _inputListener() {
    this._validate(this.el.value);
  }

    /**
     * Validates files, triggered by 'change' event.
     */
  _fileListener() {
    const isValid = this._validate(toArray(this.el.files));

    if (! isValid && this.binding.modifiers.reject) {
      this.el.value = '';
    }
  }

    /**
     * Validates radio buttons, triggered by 'change' event.
     */
  _radioListener() {
    const checked = document.querySelector(`input[name="${this.el.name}"]:checked`);
    this._validate(checked ? checked.value : null);
  }

    /**
     * Validates checkboxes, triggered by change event.
     */
  _checkboxListener() {
    const checkedBoxes = document.querySelectorAll(`input[name="${this.el.name}"]:checked`);
    if (! checkedBoxes || ! checkedBoxes.length) {
      this._validate(null);
      return;
    }

    toArray(checkedBoxes).forEach(box => {
      this._validate(box.value);
    });
  }

    /**
     * Trigger the validation for a specific value.
     */
  _validate(value) {
    return this.vm.$validator.validate(
      this.fieldName, value, this.scope || getScope(this.el)
      ).catch(result => {
        return result;
      });
  }

    /**
     * Returns a scoped callback, only runs if the el scope is the same as the recieved scope
     * From the event.
     */
  _getScopedListener(callback) {
    return (scope) => {
      if (! scope || scope === this.scope || scope instanceof window.Event) {
        callback();
      }
    };
  }

    /**
     * Attaches validator event-triggered validation.
     */
  _attachValidatorEvent() {
    const listener = this._getScopedListener(this._getSuitableListener().listener.bind(this));
    const fieldName = this._hasFieldDependency(
        getRules(this.binding.expression, this.binding.value, this.el)
      );
    if (fieldName) {
            // Wait for the validator ready triggered when vm is mounted because maybe
            // the element isn't mounted yet.
      this.vm.$nextTick(() => {
        const target = document.querySelector(`input[name='${fieldName}']`);
        if (! target) {
          warn('Cannot find target field, no additional listeners were attached.');
          return;
        }

        target.addEventListener('input', listener);
        this.callbacks.push({ name: 'input', listener, el: target });
      });
    }
  }

    /**
     * Determines a suitable listener for the element.
     */
  _getSuitableListener() {
    let listener;

    if (this.el.tagName === 'SELECT') {
      return {
        names: ['change', 'blur'],
        listener: this._inputListener
      };
    }

        // determine the suitable listener and events to handle
    switch (this.el.type) {
    case 'file':
      listener = {
        names: ['change'],
        listener: this._fileListener
      };
      break;

    case 'radio':
      listener = {
        names: ['change'],
        listener: this._radioListener
      };
      break;

    case 'checkbox':
      listener = {
        names: ['change'],
        listener: this._checkboxListener
      };
      break;

    default:
      listener = {
        names: ['input', 'blur'],
        listener: this._inputListener
      };
      break;
    }

    // users are able to specify which events they want to validate on
    // pipe separated list of handler names to use
    const events = getDataAttribute(this.el, 'validate-on');
    if (events) {
      listener.names = events.split('|');
    }

    return listener;
  }

  /**
   * Attaches neccessary validation events for the component.
   */
  _attachComponentListeners() {
    this.componentListener = debounce((value) => {
      this._validate(value);
    }, getDataAttribute(this.el, 'delay') || this.options.delay);

    this.component.$on('input', this.componentListener);
  }

  /**
   * Attachs a suitable listener for the input.
   */
  _attachFieldListeners() {
    // If it is a component, use vue events instead.
    if (this.component) {
      this._attachComponentListeners();

      return;
    }

    const handler = this._getSuitableListener();
    const listener = debounce(
            handler.listener.bind(this),
            getDataAttribute(this.el, 'delay') || this.options.delay
        );

    if (~['radio', 'checkbox'].indexOf(this.el.type)) {
      this.vm.$nextTick(() => {
        const elms = document.querySelectorAll(`input[name="${this.el.name}"]`);
        toArray(elms).forEach(input => {
          handler.names.forEach(handlerName => {
            input.addEventListener(handlerName, listener);
            this.callbacks.push({ name: handlerName, listener, el: input });
          });
        });
      });

      return;
    }

    handler.names.forEach(handlerName => {
      this.el.addEventListener(handlerName, listener);
      this.callbacks.push({ name: handlerName, listener, el: this.el });
    });
  }

  /**
   * Returns a context, getter factory pairs for each input type.
   */
  _resolveValueGetter() {
    if (this.component) {
      return {
        context: () => this.component,
        getter(context) {
          return context[getDataAttribute(context.$el, 'value-path')] || context.value;
        }
      };
    }

    switch (this.el.type) {
    case 'checkbox': return {
      context: () => document.querySelectorAll(`input[name="${this.el.name}"]:checked`),
      getter(context) {
        if (! context || ! context.length) {
          return null;
        }

        return toArray(context).map(checkbox => checkbox.value);
      }
    };
    case 'radio': return {
      context: () => document.querySelector(`input[name="${this.el.name}"]:checked`),
      getter(context) {
        return context && context.value;
      }
    };
    case 'file': return {
      context: () => this.el,
      getter(context) {
        return toArray(context.files);
      }
    };

    default: return {
      context: () => this.el,
      getter(context) {
        return context.value;
      }
    };
    }
  }

  /*
  * Gets the arg string value, either from the directive or the expression value.
  */
  _getArg() {
    // Get it from the directive arg.
    if (this.binding.arg) {
      return this.binding.arg;
    }

    // Get it from v-model.
    if (this.model) {
      return this.model;
    }

    return isObject(this.binding.value) ? this.binding.value.arg : null;
  }

  /**
   * Attaches model watchers and extra listeners.
   */
  _attachModelWatcher(arg) {
    const events = getDataAttribute(this.el, 'validate-on') || 'input|blur';
    const listener = debounce(
      this._getSuitableListener().listener.bind(this),
      getDataAttribute(this.el, 'delay') || this.options.delay
    );
    events.split('|').forEach(name => {
      if (~['input', 'change'].indexOf(name)) {
        const debounced = debounce((value) => {
          this.vm.$validator.validate(
            this.fieldName, value, this.scope || getScope(this.el)
            ).catch(result => {
              return result
            });
        }, getDataAttribute(this.el, 'delay') || this.options.delay);
        this.unwatch = this.vm.$watch(arg, debounced, { deep: true });
        // No need to attach it on element as it will use the vue watcher.
        return;
      }

      this.el.addEventListener(name, listener);
      this.callbacks.push({ name, listener, el: this.el });
    });
  }

  /**
   * Attaches the Event Listeners.
   */
  attach() {
    const { context, getter } = this._resolveValueGetter();
    this.vm.$validator.attach(
      this.fieldName,
      getRules(this.binding.expression, this.binding.value, this.el), {
        // eslint-disable-next-line
        scope: () => {
          return this.scope || getScope(this.el);
        },
        prettyName: getDataAttribute(this.el, 'as') || this.el.title,
        context,
        getter,
        listeners: this
      }
    );

    this._attachValidatorEvent();
    const arg = this._getArg();
    if (arg) {
      this._attachModelWatcher(arg);
      return;
    }

    this._attachFieldListeners();
  }

    /**
     * Removes all attached event listeners.
     */
  detach() {
    if (this.component) {
      this.component.$off('input', this.componentListener);
    }

    if (this.unwatch) {
      this.unwatch();
    }

    this.callbacks.forEach(h => {
      h.el.removeEventListener(h.name, h.listener);
    });
    this.callbacks = [];
  }
}

const listenersInstances = [];

function addClasses(el, flags, classNames) {
  if (! flags) return;

  if (flags.dirty) {
    addClass(el, classNames.touched);
    removeClass(el, classNames.untouched);
  } else {
    addClass(el, classNames.untouched);
    removeClass(el, classNames.touched);
  }

  if (flags.valid || flags.passed) {
    addClass(el, classNames.valid);
    removeClass(el, classNames.invalid);
  } else {
    addClass(el, classNames.invalid);
    removeClass(el, classNames.valid);
  }
}

function setDirty(el, classNames) {
  addClass(el, classNames.dirty);
  removeClass(el, classNames.pristine);
}

function setPristine(el, classNames) {
  addClass(el, classNames.pristine);
  removeClass(el, classNames.dirty);
}

var makeDirective = (options) => ({
  inserted(el, binding, vnode) {
    const listener = new ListenerGenerator(el, binding, vnode, options);

    listener.attach();
    listenersInstances.push({ vm: vnode.context, el, instance: listener });

    if (options.enableAutoClasses) {
      setPristine(el, options.classNames);
      el.onfocus = () => { setDirty(el, options.classNames); };
      addClasses(
        el,
        vnode.context.$validator.fieldBag.fields[listener.fieldName],
        options.classNames
      );
    }
  },
  update(el, { expression, value, oldValue }, { context }) {
    const { instance } = find(listenersInstances, l => l.vm === context && l.el === el);
    if (options.enableAutoClasses) {
      addClasses(el, context.$validator.fieldBag.fields[instance.fieldName], options.classNames);
    }

    // make sure we don't do uneccessary work if no expression was passed
    // nor if the expression did not change.
    if (! expression || (instance.cachedExp === JSON.stringify(value))) return;

    instance.cachedExp = JSON.stringify(value);
    const scope = isObject(value) ? (value.scope || getScope(el)) : getScope(el);
    context.$validator.updateField(
      instance.fieldName,
      getRules(expression, value, el),
      { scope: scope || '__global__' }
    );
  },
  unbind(el, { value }, { context }) {
    const holder = find(listenersInstances, l => l.vm === context && l.el === el);
    if (typeof holder === 'undefined') {
      return;
    }

    const scope = isObject(value) ? value.scope : (getScope(el) || '__global__');
    context.$validator.detach(holder.instance.fieldName, scope);
    listenersInstances.splice(listenersInstances.indexOf(holder), 1);
  }
});

const DEFAULT_CLASS_NAMES = {
  touched: 'touched', // the control has been blurred
  untouched: 'untouched', // the control hasn't been blurred
  valid: 'valid', // model is valid
  invalid: 'invalid', // model is invalid
  pristine: 'pristine', // control has not been interacted with
  dirty: 'dirty' // control has been interacted with
};

// eslint-disable-next-line
const install = (Vue, { locale = 'en', delay = 0, errorBagName = 'errors', dictionary = null, strict = true, fieldsBagName = 'fields', enableAutoClasses = false, classNames = {} } = {}) => {
  if (dictionary) {
    Validator.updateDictionary(dictionary);
  }

  Validator.setLocale(locale);
  Validator.setStrictMode(strict);

  const options = {
    locale,
    delay,
    dictionary,
    errorBagName,
    fieldsBagName,
    enableAutoClasses,
    classNames: assign({}, DEFAULT_CLASS_NAMES, classNames)
  };

  Vue.mixin(makeMixin(Vue, options));
  Vue.directive('validate', makeDirective(options));
};

var index = {
  install,
  Validator,
  ErrorBag,
  version: '2.0.0-beta.24'
};

export default index;
