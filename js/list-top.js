// 文件说明
// 该文件为主页轮播图上的导览栏的鼠标移入事件设置
//该文件除首页外，对其余页面的页首黑条处的导览栏弹出亦可使用
$().ready(function () {


	//1.查找触发事件的元素
	var listAll = document.querySelectorAll(
		"#tab>li>.list_name"
	);
	//移入事件
	for (var a of listAll) {
		a.onmouseover = function () {
			var a = this;
			a.style.borderRight = "0";
			a.lastElementChild.style.display = "block";
		}
		//移出事件
		a.onmouseout = function () {
			var a = this;
			a.style.borderRight = "1px solid #e6e6e6";
			a.lastElementChild.style.display = "none";
		}
	}
})