define(function(require,exports,module){
	// 加载xml库
	var XML = require('library/xml.js');
	
	// 字符串方法
	$xmlString = XML.loadXMLString("<rss version='2.0'><channel><title>标题1</title></channel><channel><title>标题2</title></channel></rss>");
	console.log("标题个数："+$xmlString.find("title").length);
	console.log("第1个标题的内容:"+$xmlString.find("title").eq(0).text());
	console.log("第2个标题的内容:"+$xmlString.find("title").eq(1).text());
	
	console.log("使用同步方式加载解析xml文件，可能会阻塞浏览器");
	$syncXML = XML.loadXMLFileSync('./xmlTest.xml');
	console.log($syncXML.find("taxrate").length);
	
	console.log("使用异步方式加载解析xml文件，需要传递一个回调函数");
	XML.loadXMLFileAsync('./xmlTest.xml',nodeLength);
	
	function nodeLength($xml){
		console.log($xml.find("taxrate").length);
	}
});