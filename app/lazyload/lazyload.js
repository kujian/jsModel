define(function(require, exports, module) {
	require('core/jquery-1.7.js');
	require('./jquery.lazyload.min.js'); // 相对于引用页面 index.html 所在路径
	
	jQuery("img.lazy").lazyload();
});