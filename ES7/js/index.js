
function ReplaceChildChs(nodeObj) {
	// if($("#hdfUseLang").val()=="CN")return;
	if(nodeObj.children().length > 0) {
		nodeObj.children().each(function() {
			ReplaceChildChs($(this));
			//            if ($(this)[0].nodeName.toUpperCase() == "TD"){
			FindChsAndReplaceIt($(this));
			//            }
		});
	} else {
		FindChsAndReplaceIt(nodeObj);
	}
}

// 直接替换html 的一种设想，但总是报错
function JustReplaceChsDom(nodeObj) {
	var pat = new RegExp("[\u4e00-\u9fa5]+", "g"); // 匹配中文的正则表达式
	var str = $(nodeObj).html();
	while((arr = pat.exec(str)) != null) {
		if(langPackage[arr[0]]) {
			str = str.replace(arr[0], langPackage[arr[0]]);
		}
	}
	$(nodeObj).html(str);
}

function FindChsAndReplaceIt(nodeObj) {
	var pat = new RegExp("[\u4e00-\u9fa5]+", "g");
	if((nodeObj.text() || nodeObj.val() || nodeObj.attr("title")) &&
		(pat.exec(nodeObj.text()) || pat.exec(nodeObj.val()) || pat.exec(nodeObj.attr("title")))) {
		var str = ""
		if(nodeObj.text()) {
			str = nodeObj.text();
			ReplaceValue(str, nodeObj, "text");
		}
		if(nodeObj.val()) {
			str = nodeObj.val();
			ReplaceValue(str, nodeObj, "val");
		}
		if(nodeObj.attr("title")) {
			str = nodeObj.attr("title");
			ReplaceValue(str, nodeObj, "title");
		}
	}
}

function ReplaceValue(str, nodeObj, attrType) {
	var arr;
	var pat = new RegExp("[\u4e00-\u9fa5]+", "g");
	while((arr = pat.exec(str)) != null) {
		if(langPackage[arr[0]]) {
			str = str.replace(arr[0], langPackage[arr[0]]);
			if(attrType == "text") {
				nodeObj.text(str);
			} else if(attrType == "val") {
				nodeObj.val(str);
			} else if(attrType == "title") {
				nodeObj.attr("title", str);
			}
		}
	}
}