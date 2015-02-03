define(function(require, exports, module) {
	require('jquery');
	require('./jquery.als-1.7.js');
	
	jQuery("#lista1").als({
		visible_items: 4,
		scrolling_items: 2,
		orientation: "horizontal",
		circular: "yes",
		autoscroll: "no",
		interval: 5000,
		speed: 500,
		easing: "linear",
		direction: "right",
		start_from: 0
	});
	
	jQuery("#lista2").als({
		visible_items: 2,
		scrolling_items: 1,
		orientation: "vertical",
		circular: "yes",
		autoscroll: "no",
		start_from: 1
	});
});