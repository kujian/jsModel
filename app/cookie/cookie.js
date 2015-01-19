define(function(require,exports,module){
	var cookie = require("../../library/cookie.js");
	
	console.log("添加cookie");
	cookie.add('name','jsModel');
	cookie.add('date','20150113',7);//有限期1天
	
	console.log("读取cookie");
	console.log(cookie.get('name'));
	
	console.log("读取所有cookie");
	console.log(cookie.getAll());
	
	console.log("删除cookie");
	console.log(cookie.remove('name'));
});