define(function(require,exports,module){
	// 处理目录路径问题：如css，提交文件目录，用于解决第3方使用swfupload文件路径错误的问题
	window.swfupload = {};
	if (typeof(window.swfuploadDir) == 'string')
		window.swfupload.href = window.swfuploadDir;
	else
		window.swfupload.href = location.href.substring(0,location.href.lastIndexOf('/')); 
	
	$ = require('core/jquery-1.7.js');//1.7版本，支持动态绑定
	require('core/seajs-css.js');// 使用css插件

	require('./core/swfupload.js');
	require('./core/swfupload.queue.js');
	require('./core/fileprogress.js');
	require('./core/handlers.js');
	
	
	// 成功上传函数函数
	window.swfupload.uploadSuccess = function (file, serverReturnData) {
		console.log(serverReturnData);
		// 如：{"src":"1386292949439.jpg","imageId":1421041242} 其中 src 用于预览，imageId 用于提交
		try {
			// 这里对从服务器返回的信息进行逻辑处理
			try{
				var returnData = JSON.parse(serverReturnData);
				var previewImageSrc = window.swfupload.href+'/'+returnData['src']; // 预览图片的路径
				var previewImage = '<li><img src="'+previewImageSrc+'" /><br/><a class="removeUploadImage" onclick="window.swfupload.removeUploadImage(jQuery(this));">删除</a></li>';
				jQuery('#m-uploadImageResult-ul').append(previewImage);	
			} catch (ex){
				alert(ex);
				alert(serverReturnData);
			}
			var progress = new FileProgress(file, this.customSettings.progressTarget);
			progress.setComplete();
			//progress.setStatus("Complete.");
			progress.setStatus("上传完毕.");
			progress.toggleCancel(false);
		} catch (ex) {
			this.debug(ex);
		}
	}
	//swfupload 上传组件
	var swfparams = {
		flash_url : window.swfupload.href+"/core/swfupload.swf",
		upload_url: window.swfupload.href+"/swfupload.php", // 后台处理上传图片文件
		post_params: {"action" : "swfupload"},//提交图片时附带的参数，可以有多个
		file_size_limit : "3MB",
		file_types : "*.jpg;*.gif;*.png;*.jpeg;",//允许上传的图片格式
		file_types_description : "图片文件",
		file_upload_limit : 0,
		file_queue_limit : 0,
		custom_settings : {
			progressTarget : "fsUploadProgress",// 进度条id
			cancelButtonId : "btnCancel"// 取消按钮id
		},
		debug: false,

		//上传按钮设置
		button_image_url : window.swfupload.href+"/core/upfile.png",//背景图
		button_width: "144",
		button_height: "22",
		button_placeholder_id: "spanButtonPlaceHolder",
		
		// 上传过程中触发的事件，通常根据业务逻辑重写（参考：handlers.js）
		file_queued_handler : fileQueued,
		file_queue_error_handler : fileQueueError,
		file_dialog_complete_handler : fileDialogComplete,
		upload_start_handler : uploadStart,
		upload_progress_handler : uploadProgress,
		upload_error_handler : uploadError,
		upload_success_handler : window.swfupload.uploadSuccess, // 上传成功
		upload_complete_handler : uploadComplete,
		queue_complete_handler : queueComplete	// Queue plugin event
	};
	var swfu = new SWFUpload(swfparams);
	
	
	
	//删除图片，逻辑自行修改
	window.swfupload.removeUploadImage = function (jQueryObj){
		if (window.confirm("你确定要删除这张图片吗？"))
			jQueryObj.parent('li').remove();
	};
});
