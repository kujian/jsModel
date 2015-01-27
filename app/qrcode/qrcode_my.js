define(function(require,exports,module){
	require('jquery');
	require('./jquery.qrcode.js');
	require('./qrcode.js');
	
	if ( typeof(window.qrcodeUrl) == 'undefined'){
		window.qrcodeUrl = location.href; // 当前页面
	}
	
	jQuery('#qrcode').qrcode({
		text	: window.qrcodeUrl,// 其它设置参阅 jquery.qrcode.js
		width:100,
		height:100
	});	
});