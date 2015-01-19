define(function(require, exports, module) {
	require('jquery-1.7.js');// 相对于 seajs.config.base 所在路径
	require('./jquery.lazyload.min.js'); // 相对于引用页面 index.html 所在路径
	
	jQuery("img.lazy").lazyload();
});