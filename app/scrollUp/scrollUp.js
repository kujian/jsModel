define(function(require, exports, module) {
	require('jquery');
	require('./jquery.scrollUp.js');
	require('core/seajs-css.js');// 使用css插件
	seajs.use("./themes/image.css"); // 有4个主题可以选择

	jQuery(function() {
		jQuery.scrollUp({
			scrollName : 'scrollUp', // Element ID
			topDistance : '300', // Distance from top before showing element (px)
			topSpeed : 300, // Speed back to top (ms)
			animation : 'fade', // Fade, slide, none
			animationInSpeed : 200, // Animation in speed (ms)
			animationOutSpeed : 200, // Animation out speed (ms)
			scrollText : '返回顶部', // Text for element
			activeOverlay : false, // Set CSS color to display scrollUp active
									// point, e.g '#00FFFF'
		});
	});
});