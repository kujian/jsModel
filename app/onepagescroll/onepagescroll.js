define(function(require, exports, module) {
	require('jquery');
	require('./jquery.onepage-scroll.js');
	require('core/seajs-css.js');// 使用css插件
	seajs.use("./onepage-scroll.css"); 

	jQuery(document).ready(function() {
		jQuery(".main").onepage_scroll({
			sectionContainer : "section",
			responsiveFallback : 600,
			loop : true
		});
	});
});