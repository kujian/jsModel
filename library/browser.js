define(function(require, exports, module) {
	var u = navigator.userAgent;
	var versionList = {};
	versionList = {
		trident : u.indexOf('Trident') > -1, // IE内核
		presto : u.indexOf('Presto') > -1, // opera内核
		webKit : u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
		gecko : u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
		mobile : !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
		ios : !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
		android : u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或uc浏览器
		iPhone : u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
		iPad : u.indexOf('iPad') > -1, // 是否iPad
		weixin : u.indexOf('MicroMessenger') > -1, // 是否微信
		weibo : u.indexOf('weibo') > -1, // 是否微博
		webApp : u.indexOf('Safari') == -1,// 是否web应该程序，没有头部与底部
	};
	//----------------------------- 以下为公有方法----------------------------------
	// 浏览器版本信息
	exports.versions = function(){
		return versionList;
	};
	exports.isIe = function(){
		return versionList.trident;
	};
	exports.isFirefox = function(){
		return versionList.gecko;
	};
	exports.isChorme = function(){
		return versionList.webKit;
	};
	exports.isSafari = function(){
		return versionList.webKit;
	};
	exports.isAndroid = function(){
		return versionList.android;
	};
	exports.isiPhone = function(){
		return versionList.iPhone;
	};
	exports.isWeixin = function(){
		return versionList.weixin;
	};
});
