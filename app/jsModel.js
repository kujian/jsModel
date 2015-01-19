seajs.config({
	base:"../../sea-modules/",// 根据引用页面所在地址修改路径
	alias:{
		"jquery":"jquery.js" // 可以在页面js文件中，使用 var $ = require('jquery') 快速加载jQuery模块
	}
});