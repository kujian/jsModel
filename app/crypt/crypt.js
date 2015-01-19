define(function(require,exports,module){
	var crypt = require("../../library/crypt.js");
	
	console.log("md5加密");
	console.log(crypt.md5('message digest'));
	
	console.log("sha1加密");
	console.log(crypt.sha1('160-bit hash'));
});