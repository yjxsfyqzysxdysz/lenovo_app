$(function () {
	$.ajax({
		url: "./header.html",
		type: "get",
		success: function (res) {
			$(res).replaceAll("header");

			// 在header.html的基础上对其进行修改
			// 增加新的html、css、js代码
			$.ajax({
				url: "./header2.html",
				type: "get",
				success: function (res) {
					$(".nav_index").prepend(res);
				}
			})
		}
	})
})