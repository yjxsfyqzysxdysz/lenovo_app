$(function () {
	$.ajax({
		url: "./header.html",
		type: "get",
		success: function (res) {
			$(res).replaceAll("header");
		}
	})
})


