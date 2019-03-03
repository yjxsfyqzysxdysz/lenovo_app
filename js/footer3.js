$(function(){
  $.ajax({
    url:"./footer3.html",
    type:"get",
    success: function(res) {
      // res->html片段
      // console.log(res);
      $(res).replaceAll("footer");
    }
  })
})