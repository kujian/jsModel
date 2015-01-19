/**
 * jquery xml
 */
define(function(require, exports, module) {
	require('jquery');
	
	// http://www.cnblogs.com/huacw/archive/2011/03/24/1994074.html
	// 使用同步方式解析xml文件，可能会锁住浏览器
	exports.loadXMLFileSync = function(xmlFile) {
		var xmlContent="";
		jQuery.ajax({
			url : xmlFile,
			dataType : 'xml',
			type : 'GET',
			timeout : 3000,
			async: false, 
			error : function(xml) {
				console.log("加载XML 文件出错！");
			},
			success : function(xml) {
				xmlContent =  jQuery(xml);
			}
		});
		return xmlContent;
	};
	// 使用异步方式解析xml文件
	exports.loadXMLFileAsync = function(xmlFile,callback) {
		jQuery.ajax({
			url : xmlFile,
			dataType : 'xml',
			type : 'GET',
			timeout : 3000,
			error : function(xml) {
				console.log("加载XML 文件出错！");
			},
			success : function(xml) {
				callback(jQuery(xml));
			}
		});
	};
	
	// http://api.jquery.com/jquery.parsexml/
	// 解析xml字符串
	exports.loadXMLString = function(xmlString) {
		var xmlDoc = jQuery.parseXML(xmlString);
		return jQuery(xmlDoc);
	};
});