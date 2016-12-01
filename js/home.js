$(document).ready(function(){
	regMenuTabClick("myHomePage");
	addMenuTab("newTab", "新标签页", "demo1", "demo1", "demo1");
	$("#demoButton").click(demoClick);
	dropdownOpen();//调用
});
function dropdownOpen() {

	var $dropdownLi = $('li.nav-item');

	$dropdownLi.mouseover(function () {
		$(this).addClass('open');
	}).mouseout(function () {
		$(this).removeClass('open');
	});
}
function demoClick(){
	addMenuTab("newTab1", "新标签页");
}