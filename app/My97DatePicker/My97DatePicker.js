define(function(require,exports,module){
	require('./WdatePicker.js');
	
	require('jquery');
	// 其它配置参阅文档：http://www.my97.net/dp/demo/index.htm
	jQuery('.Wdate').click(function(){
		WdatePicker();
	});
});