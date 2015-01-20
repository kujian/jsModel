define(function(require,exports,module){
	var Editor = require('library/mouseKeyboard.js');
	var XML = require('library/xml.js');
	require('jquery');
	require('core/seajs-css.js');// 使用css插件
	seajs.use("./core/default.css");
	window.weiboToolAction = {};//用于挂载工具栏点击事件
	var editorPath = typeof(window.editorPath)!="undefined"? window.editorPath : './core/'; //自行修改路径
	window.swfuploadDir = location.href.replace('/editor/','/swfupload/');// swfupload 目录
	window.meituDir = location.href.replace('/editor/','/meitu/');// swfupload 目录
	window.meituProcessUrl = window.swfuploadDir+"swfupload.php";// 美图秀秀上传图片处理文件
	
	window.weiboToolAction.refreshWordsLength = function(){
		jQuery('#u-weibo-word').text(140-jQuery('#content').val().length);
	};
	window.weiboToolAction.refreshWordsLength();
	//计算还可以输入多少字
	jQuery('#content').keyup(function(){
		window.weiboToolAction.refreshWordsLength();
	});
	
	//生成工具栏
	XML.loadXMLFileAsync(editorPath+"tool.xml",createTool);
	function createTool(toolXml){
		var length = toolXml.find("node").length;
		var toolHtml = '';
		if ( length > 0 ){
			for ( var i = 0; i< length; ++i){
				var currentNode = toolXml.find("node").eq(i);
				toolHtml +='<a class="u-tool" onclick="window.weiboToolAction.'+currentNode.attr("id")+'();" href="javascript:void(0);">'; // 各个工具栏的点击事件
				toolHtml +='<em style="background-position: '+currentNode.find("x").text()+'px '+currentNode.find("y").text()+'px;" class="W_ficon ficon_'+currentNode.attr("id")+'"></em>';
				toolHtml += currentNode.find("title").text();
				toolHtml +='</a>';
				
				var layerHtml = '<div class="u-layer-node" id="layer_'+currentNode.attr("id")+'"></div>';
				jQuery('.m-layer').append(layerHtml);
			}
		}
		jQuery('#weibo-tool').html(toolHtml);
	}

	// 点击表情的时候，显示表情图片
	window.weiboToolAction.face = function(){
		console.log('显示表情')
		jQuery('.m-layer').show();
		jQuery('.u-layer-node').hide();
		jQuery('#layer_face').show();
		if (jQuery('#layer_face').attr('data-show')==1)
			return;
		
		jQuery('#layer_face').html('<div id="u-face-nodes"></div><div id="u-face-content"></div>');
		XML.loadXMLFileAsync(editorPath+"dialogs/face.xml",createToolface);
		jQuery('#layer_face').attr('data-show',1);
	};
	// 当前显示表情索引
	window.weiboCurrentFaceNodeIndex = 0;
	window.weiboFaceXml = '';
	// 创建表情栏
	function createToolface(faceXml){
		window.weiboFaceXml = faceXml;
		var faceLength = window.weiboFaceXml.find("face").length;
		for (var i = 0; i< faceLength; ++i){
			var currentNode = window.weiboFaceXml.find("face").eq(i);
			var faceNodeTitle = '<div class="u-face-node" data-show="0" onclick="window.weiboToolAction.changeFace('+i+');">'+currentNode.attr('title')+'</div>';
			jQuery('#u-face-nodes').append(faceNodeTitle);
			//showFaceSmallImage();//显示当前索引小表情
		}
		jQuery('.u-face-content').eq(window.weiboCurrentFaceNodeIndex).show();
		window.weiboToolAction.changeFace(0);
	}
	// 显示当前索引的小表情
	function showFaceSmallImage(){
		var i = window.weiboCurrentFaceNodeIndex;
		console.log("显示索引"+i+"表情");
		var currentNode = window.weiboFaceXml.find("face").eq(i);
		var faceNodeContent = '<ul class="u-face-content">';
		var imgNode = currentNode.find('img');
		var faceImgLength = imgNode.length;
		for (var j = 0;j< faceImgLength; ++j){
			faceNodeContent += '<li class="face-select" title="'+imgNode.eq(j).attr('title')+'"><img src="'+imgNode.eq(j).attr('src')+'" /></li>';
		}
		faceNodeContent += '</ul>';
		jQuery('#u-face-content').append(faceNodeContent);
		jQuery('.u-face-node').eq(i).attr('data-show',1);
		jQuery('.face-select').click(function(){
			var title = jQuery(this).attr('title');
			Editor.insertAtCursor(document.getElementById('content'),"["+title+"]",window.weiboToolAction.refreshWordsLength);
		});
	};
	window.weiboToolAction.changeFace = function(i){
		console.log('切换表情');
		jQuery('.u-layer-node').hide();
		jQuery('#layer_face').show();
		var beenShow = jQuery('.u-face-node').eq(i).attr('data-show');
		if (beenShow==0){
			window.weiboCurrentFaceNodeIndex = i;
			showFaceSmallImage();
		}
		jQuery('.u-face-content').hide();
		jQuery('.u-face-content').eq(i).show();
	};

	// 关闭面板
	jQuery('.closeFace').click(function(){
		jQuery('.m-layer').hide();
	});
	// 显示图片编辑框
	window.weiboToolAction.image = function(){
		console.log('切换图片');
		jQuery('.m-layer').show();
		jQuery('.u-layer-node').hide();
		jQuery('#layer_image').show();
		if (jQuery('#layer_image').attr('data-show')==1)
			return;
		// swfupload的一些组件，上传过程
		var swfOther = "<div class='undis'  style='display:none;'><input id='btnCancel' type='button' value='取消上传' onclick='swfu.cancelQueue();' /><div id='divStatus'>0 个文件已上传</div></div>";
		swfOther += "<div id='fsUploadProgress'></div>";
		jQuery('#g-weibo-other').append(swfOther);
		// 美图秀秀和swfupload的元件
		var imageUnit = '<div  id="spanButtonPlaceHolder" ></div><div id="u-meitu-open"></div>';
		jQuery('#layer_image').html(imageUnit);
		// swfupload
		seajs.use("../swfupload/swfupload.js");
		// 美图秀秀
		seajs.use("../meitu/meitu.js");
		jQuery('#layer_image').attr('data-show',1);
	};
	//视频
	window.weiboToolAction.video = function(){
		console.log("使用视频");
		jQuery('.u-layer-node').hide();
		jQuery('.m-layer').show();
		jQuery('#layer_video').show();
		jQuery('.u-videoContent').hide();
		jQuery('#m-video-menu').show();
		if (jQuery('#layer_video').attr('data-show')==1)
			return ;
		var videoUnit ='<div id="m-video-menu"><div class="u-video" id="localVideo">本地视频</div>';
		videoUnit +='<div class="u-video" id="webVideo">在线视频</div></div>';
		jQuery('#layer_video').append(videoUnit).attr('data-show',1);
		var localVideoContent = '<div class="u-videoContent" id="localVideoContent" style="display:none"><input type="text" id="u-remoteVideoShareUrl" class="W_input" placeholder="请输入视频播放页地址"/><a href="javascript:void(0);" class="W_btn_a btn_30px" id="videoSubmit"><span class="btn_30px">确定</span></a><div style="line-height: 20px;	font-size: 13px;margin-top: 5px;">目前已支持新浪播客、优酷网、土豆网、酷6网、搜狐视频、56网、奇艺网、凤凰网、音悦台、乐视网等视频网站的视频播放页链接</div></div>';
		
		jQuery('#layer_video').append(localVideoContent);
		jQuery('#localVideo').click(function(){
			console.log("本地视频上传");
			alert("暂未处理");
		});
		jQuery('#webVideo').click(function(){
			jQuery('#m-video-menu').hide();
			jQuery('#localVideoContent').show();
			console.log("网页视频分享");
		});
		jQuery('#videoSubmit').click(function(){
			var url = jQuery('#u-remoteVideoShareUrl').val();
			if (url.length < 5){
				alert("请检查视频播放地址是否正确！");
				return false;
			}
			// 将长视频地址转换为短地址后，插入到编辑器中
			var shortUrl = url;
			Editor.insertAtCursor(document.getElementById('content'),shortUrl,window.weiboToolAction.refreshWordsLength);
		});
	};
	//话题
	window.weiboToolAction.topic = function(){
		console.log("使用话题");
		jQuery('.u-layer-node').hide();
		jQuery('.m-layer').show();
		jQuery('#layer_topic').show();
		if (jQuery('#layer_topic').attr('data-show')==1)
			return ;
		var insertTopic = '<div id="u-insertNewTopic">#插入新话题</div>';
		jQuery('#layer_topic').append(insertTopic);
		jQuery('#layer_topic').attr('data-show',1);
		
		// 其它话题需要通过新浪微博接口授权，请自行处理
		jQuery('#u-insertNewTopic').click(function(){
			Editor.insertAtCursor(document.getElementById('content'),"#在这里输入你想要说的话题#",window.weiboToolAction.refreshWordsLength);
		});
	};
});