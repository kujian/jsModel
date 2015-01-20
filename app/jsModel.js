seajs.config({
	base:'/jsModel/',
	paths:{
		'library':'library',
		'core':'sea-modules',
	},
	alias:{
		"jquery":"sea-modules/jquery.js" // 可以在页面js文件中，使用 var $ = require('jquery') 快速加载jQuery模块
	}
});

function queryDir(string_path,int_slashCount){
	try{
		for ( var i = 0; i < int_slashCount; i++){
			string_path = string_path.substring(0,string_path.lastIndexOf('/'));
		}
		console.log("path:"+string_path);
		return string_path;
	}catch (e){
		alert(e.message);
	}
}