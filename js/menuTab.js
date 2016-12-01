//menu tab
function addMenuTab(tabId, tabName, fileName, cssName, jsName){
	disactiveAllMenuTab();
	if(!haveMenuTab(tabId)){
		var tabDiv = $("<li class='nav-item'></li>").css({"height":"10px"}).appendTo("#menuTabDiv ul");
		var tabA = $("<a class='nav-link' href='#" + tabId + "ContentDiv' id='" + tabId + "'></a>").appendTo(tabDiv);
		var tabSpan = $("<span>" + tabName + "</span>").appendTo(tabA);
		var tabCloseButton = $("<button type='button' id='"+tabId+"CloseButton' class='close' aria-label='Close'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button>").appendTo(tabA);
		
		regMenuTabClick(tabId);
		regMenuTabCloseClick(tabId);
		addMenuTabContent(tabId, fileName);
		addMenuTabContentCss(cssName);
		addMenuTabContentJs(jsName);
	}
	activeMenuTab(tabId);
}

function addMenuTabContent(tabId, fileName){
	var tabContent = $("<div role='tabpanel' class='tab-pane' id='"+tabId+"ContentDiv'></div>").appendTo("#tab-content");
	tabContent.load("page/" + fileName + ".html");
}

function addMenuTabContentCss(cssName){
	var link = document.createElement('link');
	link.type = "text/css";
	link.rel = "stylesheet";
	link.href = "../css/"+ cssName +".css";
	document.getElementsByTagName("head")[0].appendChild(link);
}

function addMenuTabContentJs(jsName){
	$.getScript("../js/pagejs/"+ jsName +".js")
}

//注册标签事件
function regMenuTabClick(tabId){
	$("#" + tabId).on("click",function(e){
		disactiveAllMenuTab();
		activeMenuTab(e.currentTarget.id);
	});
}

function regMenuTabCloseClick(tabId){
	$("#" + tabId + " .close").on("click",function(e){
		removeMenuTab($("#" + e.currentTarget.id).parent().attr("id"));
	});
}

function removeMenuTab(tabId){
	var leftTabId;
	$("#menuTabDiv li a").each(function(i){
		if(i != 0 && $(this).attr("id") == tabId){
			disactiveAllMenuTab();
			activeMenuTab(leftTabId);
			return false;
		}
		leftTabId = $(this).attr("id");
	});
	$("#" + tabId).off("click");
	$("#" + tabId).remove();
}

//激活指定标签
function activeMenuTab(tabId){
	$("#menuTabDiv li a").each(function(i){
		if($(this).attr("id") == tabId){
			$(this).tab("show");
		}
	});
}

//移除所有激活标签
function disactiveAllMenuTab(){
	$("#menuTabDiv li a").each(function(i){
		$(this).removeClass("active");
	});
}

//判断是否存在tab
function haveMenuTab(tabId){
	var count = 0;
	$("#menuTabDiv li a").each(function(i){
		if($(this).attr("id") == tabId){
			count++;
			return false;
		}
	});
	if(count == 0){
		return false;
	}else{
		return true;
	}
}