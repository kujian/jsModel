<?php
/*
 * swfupload 插件的后台文件
 */

if ($_POST ['action'] == 'swfupload') {
	$swfupload = new Swfupload();
	if (!! $data = $swfupload->upload()){
		echo json_encode($data);
	}else{
		echo $swfupload->getErrorMsg();
	}
	exit;
}
class Swfupload{
	/**
	 * int 配置：允许上传的最大文件大小，默认为 3145728 即 3M（3 * 1024 * 1024 ）
	 */
	public $max_file_size_in_bytes = 3145728;
	/**
	 * array 配置：允许上传的图片扩展名，默认为 array ("jpg", "jpeg", "gif", "png" );
	 */
	public $extension_allow = array ("jpg", "jpeg", "gif", "png" );
	/**
	 * int 配置：允许上传的最长文件名称（含扩展名），默认为100字符
	 */
	public $MAX_FILENAME_LENGTH = 100;
	
	/**
	 * 使用各项配置对上传文件进行检查，如果检查通过，则将文件存在目录
	 * @param string $upload_name $_FILE[$upload_name] 中的名称
	 * @param string $callback 默认为空；如果不为空，则调用并返回 call_user_func_array($callback, array($_FILES [$upload_name]['tmp_name'])，取代原默认处理过程
	 */
	public function upload($upload_name='Filedata',$callback=NULL){
		if (!$this->checkUploadFile($upload_name)){
			return false;
		}
		if (!empty($callback)){
			return call_user_func_array($callback, array($_FILES [$upload_name]['tmp_name']));
		}
		// 下面根据自已的业务，对上传处理进行处理
		if(!move_uploaded_file($_FILES [$upload_name]['tmp_name'],dirname(__FILE__).'/upload/'.$_FILES [$upload_name]['name']))
			return $this->HandleError( '错误：没有将文件移动到指定目录！');
		// 根据业务需要返回某些数据
		return array('src'=>'/upload/'.$_FILES [$upload_name]['name'],'imageId'=>time());
	}
	public function getErrorMsg(){
		return $this->_errorMsg;
	}
	
	private $_errorMsg = '';
	private function HandleError($message) {
		$this->_errorMsg = $message;
		return false;
	}
	
	/**
	 * 对上传文件进行检查，通常不需要修改
	 * @param string $upload_name $_FILE[$upload_name] 中的字段
	 */
	private function checkUploadFile($upload_name){
		$POST_MAX_SIZE = ini_get ( 'post_max_size' );
		$unit = strtoupper ( substr ( $POST_MAX_SIZE, - 1 ) );
		$multiplier = ($unit == 'M' ? 1048576 : ($unit == 'K' ? 1024 : ($unit == 'G' ? 1073741824 : 1)));
		if (($_SERVER ['CONTENT_LENGTH'] > ($this->max_file_size_in_bytes + 1000)) || ( int ) $_SERVER ['CONTENT_LENGTH'] > $multiplier * ( int ) $POST_MAX_SIZE && $POST_MAX_SIZE) {
			header ( "HTTP/1.1 500 Internal Server Error" );
			return $this->HandleError ( "不能上传超过3M的文件." );
		}
	
		if (strlen($_FILES[$upload_name]['name']) > $this->MAX_FILENAME_LENGTH)
			return $this->HandleError("文件名最长为".$this->MAX_FILENAME_LENGTH);
	
		$uploadErrors = array (
				0 => "文件已成功上传",
				1 => "文件大小超过了 php.ini 的设定",
				2 => "文件过大",
				3 => "文件上传不完整",
				4 => "没有任何文件上传",
				6 => "临时文件夹不可用" );
		// Validate the upload
		if (! isset ( $_FILES [$upload_name] )) {
			return $this->HandleError ( "No upload found in \$_FILES for " . $upload_name );
		} else if (isset ( $_FILES [$upload_name] ["error"] ) && $_FILES [$upload_name] ["error"] != 0) {
			return $this->HandleError ( $uploadErrors [$_FILES [$upload_name] ["error"]] );
		} else if (! isset ( $_FILES [$upload_name] ["tmp_name"] ) || ! @is_uploaded_file ( $_FILES [$upload_name] ["tmp_name"] )) {
			return $this->HandleError ( "Upload failed is_uploaded_file test." );
		} else if (! isset ( $_FILES [$upload_name] ['name'] )) {
			return $this->HandleError ( "文件名为空" );
		}
		// Validate the file size (Warning: the largest files supported by this code is 2GB)
		$file_size = @filesize ( $_FILES [$upload_name] ["tmp_name"] );
		if (! $file_size || $file_size > $this->max_file_size_in_bytes) {
			return $this->HandleError ( "文件大小超过限制" );
		}
	
		if ($file_size <= 0) {
			return $this->HandleError ( "文件大小为0" );
		}
	
		// 验证扩展名
		$path_info = pathinfo ( $_FILES [$upload_name] ['name'] );
		$file_extension = strtolower ( $path_info ["extension"] );
		$is_valid_extension = false;
		foreach ( $this->extension_allow as $extension ) {
			if (strcasecmp ( $file_extension, $extension ) == 0) {
				$is_valid_extension = true;
				break;
			}
		}
		if (! $is_valid_extension) {
			return $this->HandleError ( "不被允许的类型" );
		}
		return true;
	}
}
