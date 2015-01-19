/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 * 对其进行重新封装
 */
define(function(require, exports, module) {
	require("jquery");
	var config = {};
	config.defaults = {};
	// 配置
	exports.setRaw = function(isRaw){
		if (isRaw == true)
			config.raw = true;
		else
			config.raw = false;//默认
	};
	exports.setJson = function(isJson){
		if (isJson==true)
			config.json = true;
		else
			config.json = false;//默认
	};
	// 获取指定cookie
	exports.get = function(key){
		return cookie(key);
	};
	// 获取所有cookie
	exports.getAll = function(){
		return cookie();
	};
	// 添加1个cookie
	exports.add = function(key,value,intExpiresDay,stringPath){
		var args = arguments.length;
		if (args == 2)
			return cookie(key,value);
		else if (args == 3)
			return cookie(key,value, { expires: intExpiresDay });//有限期
		else if (args == 4)
			return cookie(key,value, { expires: intExpiresDay, path:stringPath});//路径
	};
	// 移除1个指定cookie
	exports.remove = function(key,stringPath){
		var args = arguments.length;
		if (args == 1)
			return removeCookie(key);
		else if (args == 2)
			return removeCookie(key, { path: stringPath }); 
	};
	/*------------------------- 以下是重新封装 ------------------------*/
	var pluses = /\+/g;
	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}
	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}
	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}
	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}
		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));

			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}
	//-----------------------------------------------------
	var cookie = function (key, value, options) {
		// Write
		if (arguments.length > 1 && !jQuery.isFunction(value)) {
			options = jQuery.extend({}, config.defaults, options);
			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}
			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};
	
	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return jQuery.isFunction(converter) ? converter(value) : value;
	}
	function removeCookie(key, options) {
		if (cookie(key) === undefined) {
			return false;
		}
		// Must not alter options, thus extending a fresh object...
		cookie(key, '', jQuery.extend({}, options, { expires: -1 }));
		return !cookie(key);
	};
});