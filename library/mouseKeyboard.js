/* 鼠标键盘的一些操作
 */
define(function(require, exports, module) {
	/* 将 content 插入到控件input中光标所在的位置，或者替换其中的选择文本
		@param input 控件，如 document.getElementById('inputID')
	*/
	exports.insertAtCursor = function(input, content,callback) {
		if (document.selection) { // IE support
			input.focus();
			var sel = document.selection.createRange();
			sel.text = content;
			sel.select();
		} else if (input.selectionStart || input.selectionStart == '0') { // MOZILLA/NETSCAPE support
			var startPos = input.selectionStart;
			var endPos = input.selectionEnd;
			var restoreTop = input.scrollTop;
			input.value = input.value.substring(0, startPos) + content + input.value.substring(endPos, input.value.length);
			if (restoreTop > 0) {
				input.scrollTop = restoreTop;
			}
			input.focus();
			input.selectionStart = startPos + content.length;
			input.selectionEnd = startPos + content.length;
		} else {
			input.value += content;
			input.focus();
		}
		if (typeof(callback) == "function")
			callback();
	};
});