$(function () {
  $.ajax({
      url: "./header3.html",
      type: "get",
      success: function (res) {
          $(res).replaceAll("header");
        }
      })
  })