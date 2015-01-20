/**
 * 美图秀秀网页版 需要将 lib3/meitu/crossdomain.xml 文件复制到图片网站根目录下
 * 开发文档：http://open.web.meitu.com/wiki/
 */
define(function(require, exports, module) {
	window.meitu = {};
	// 处理目录路径问题：如css，提交文件目录，用于解决第3方使用swfupload文件路径错误的问题
	if (typeof(window.meituDir) == 'string')
		window.meitu.href = window.meituDir;
	else
		window.meitu.href = location.href.substring(0,location.href.lastIndexOf('/')); 
	if (typeof(window.meituProcessUrl)=='string'){
		window.meitu.meituProcessUrl = window.meituProcessUrl;
	}else{
		alert('请设置美图秀秀上传图片的处理文件，要求为http://');
		return false;
	}
	
	window.meitu.editorWidth = 528;
	window.meitu.editorHeight = 470;
	
	// require('http://open.web.meitu.com/sources/xiuxiu.js'); 原版，已被下载到本地
	require('core/seajs-css.js');// 使用css插件
	
	require('jquery');
	require('./core/xiuxiu.js');
	
	// 根据浏览器尺寸计算美图编辑器要显示的位置
	(function() {
		// window.innerHeight 要显示的高度请自行计算
		var left = (window.innerWidth - window.meitu.editorWidth) / 2;
		jQuery('#photo_merge_panel').css({
			"left" : left + "px",
			"top" : "100px"
		});
	})();

	jQuery('#u-meitu-open').click(function() {
		jQuery('#photo_merge_panel').show();
		if ( jQuery('#altContent').length > 0){
			console.log('加载美图编辑器');
			window.meitu.openMeituWeb();
		}else{
			console.log('已加载过美图编辑器，显示！');
			return false;
		}
	});
	window.meitu.openMeituWeb = function() {
		/* 第1个参数是加载编辑器div容器，第2个参数是编辑器类型，第3个参数是div容器宽，第4个参数是div容器高 */
		xiuxiu.embedSWF("altContent", 2, window.meitu.editorWidth + "px",
				window.meitu.editorHeight + "px");
		// 修改为您自己的图片上传接口
		xiuxiu.setUploadURL(window.meitu.meituProcessUrl);
		xiuxiu.setUploadType(2); // 1流量上传，2表单上传，3编码成Base64传给JS
		xiuxiu.setUploadArgs({
			'action' : 'swfupload'
		});// 上传的参数，可以附带 sessionId 之类的参数
		xiuxiu.setUploadDataFieldName("Filedata");
		xiuxiu.onInit = function() {
			xiuxiu.loadPhoto("http://open.web.meitu.com/sources/images/1.jpg");
		};
		// 图片上传前
		xiuxiu.onBeforeUpload = function(data, id) {
			var size = data.size;
			if (size > 2 * 1024 * 1024) {
				alert("图片不能超过2M");
				return false;
			}
			return true;
		};
		// 上传响应
		xiuxiu.onUploadResponse = function(serverReturnData) {
			try{
				var returnData = JSON.parse(serverReturnData);
				var previewImageSrc = './'+returnData['src']; // 预览图片的路径
				var previewImage = '<li><img src="'+previewImageSrc+'" /><br/><a class="removeUploadImage" onclick="window.meitu.removeUploadImage(jQuery(this));">删除</a></li>';
				jQuery('#m-uploadImageResult-ul').append(previewImage);	
			} catch (ex){
				alert(ex);
				alert(serverReturnData);
			}
		};
		// 关闭编辑器
		xiuxiu.onClose = function(id) {
			jQuery('#photo_merge_panel').hide();
			console.log("关闭编辑器");
		};
		// 调试编辑器
		xiuxiu.onDebug= function(data,id) {
			console.log('---error---');
			console.log(data);
		};
	};
	//删除图片，逻辑自行修改
	window.meitu.removeUploadImage = function (jQueryObj){
		if (window.confirm("你确定要删除这张图片吗？"))
			jQueryObj.parent('li').remove();
	};
});