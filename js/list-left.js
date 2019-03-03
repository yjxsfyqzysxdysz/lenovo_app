// 文件说明
// 该文件为主页左侧导览栏的动作设置
// 包含导览栏在[300,5400]区间显示、
//到对应楼层，其相对应图标点亮、
//点击楼层图标，页面自动跳转至该区域的设置
$().ready(function () {
	//声明
	var sort_left = document.getElementsByClassName("sort-list_left")[0];
	var list_top = document.getElementById("sort-list_left_md").getElementsByTagName("span");
	var list_but = document.getElementById("sort-list_left_md").getElementsByTagName("em");

	// console.log(list_but[0]);
	//滚动事件
	window.onscroll = function () {
		var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

		// console.log(scrollTop);
		if (scrollTop > 350 && scrollTop < 700) {
			list_top[0].style.display = "none";
			list_but[0].style.display = "block";
			list_but[1].style.display = "block";
		} else {
			list_top[0].style.display = "block";
			list_but[0].style.display = "none";
			list_but[1].style.display = "none";
		}
		if (scrollTop > 900 && scrollTop < 1250) {
			list_top[1].style.display = "none";
			list_but[2].style.display = "block";
			list_but[3].style.display = "block";
		} else {
			list_top[1].style.display = "block";
			list_but[2].style.display = "none";
			list_but[3].style.display = "none";
		}
		if (scrollTop > 1450 && scrollTop < 1800) {
			list_top[2].style.display = "none";
			list_but[4].style.display = "block";
			list_but[5].style.display = "block";
		} else {
			list_top[2].style.display = "block";
			list_but[4].style.display = "none";
			list_but[5].style.display = "none";
		}
		if (scrollTop > 2000 && scrollTop < 2350) {
			list_top[3].style.display = "none";
			list_but[6].style.display = "block";
			list_but[7].style.display = "block";
		} else {
			list_top[3].style.display = "block";
			list_but[6].style.display = "none";
			list_but[7].style.display = "none";
		}
		if (scrollTop > 2550 && scrollTop < 2900) {
			list_top[4].style.display = "none";
			list_but[8].style.display = "block";
			list_but[9].style.display = "block";
		} else {
			list_top[4].style.display = "block";
			list_but[8].style.display = "none";
			list_but[9].style.display = "none";
		}
		if (scrollTop > 3100 && scrollTop < 3450) {
			list_top[5].style.display = "none";
			list_but[10].style.display = "block";
			list_but[11].style.display = "block";
		} else {
			list_top[5].style.display = "block";
			list_but[10].style.display = "none";
			list_but[11].style.display = "none";
		}
		if (scrollTop > 3650 && scrollTop < 4000) {
			list_top[6].style.display = "none";
			list_but[12].style.display = "block";
			list_but[13].style.display = "block";
		} else {
			list_top[6].style.display = "block";
			list_but[12].style.display = "none";
			list_but[13].style.display = "none";
		}
		if (scrollTop > 4200 && scrollTop < 4550) {
			list_top[7].style.display = "none";
			list_but[14].style.display = "block";
			list_but[15].style.display = "block";
		} else {
			list_top[7].style.display = "block";
			list_but[14].style.display = "none";
			list_but[15].style.display = "none";
		}
		if (scrollTop > 4700 && scrollTop < 5050) {
			list_top[8].style.display = "none";
			list_but[16].style.display = "block";
			list_but[17].style.display = "block";
		} else {
			list_top[8].style.display = "block";
			list_but[16].style.display = "none";
			list_but[17].style.display = "none";
		}

		//左边导航栏滚动定位
		if (scrollTop >= 300 && scrollTop < 5400) {
			sort_left.style.display = "block";
		} else {
			sort_left.style.display = "none";
		}
	}




	//左侧标签的楼层跳转
	//1.查找要触发的元素
	var list_lefts = document.getElementsByClassName("list_item");
	for (var i = 0; i < list_lefts.length; i++) {
		var a = list_lefts[i];
		a.index = i;//给每个className为child的元素添加index属性;
		a.onclick = function () {
			var a = this;
			// console.log(a);
			var a = (this.index)
			// console.log(a);

			if (a > 0) {
				$("html").stop(true).animate({
					scrollTop:(360 + 584 * a)
				},1000);				
			} else {
				$("html").stop(true).animate({
				scrollTop:450
			},1000);
			}

		}
	}

	/*
	//jQuery方法
	//左侧标签的楼层跳转
	$(".list_item").click(function(){
			var a=$(this);
			// console.log(a)
			//获取下标
			var b=$(".list_item").index($(this))
			// console.log(b)
			if(b>0){
					$(document).scrollTop(360+584*b);
			}else{
					$(document).scrollTop(450);
			}
	});
	// console.log(scrollTop);
	*/
})