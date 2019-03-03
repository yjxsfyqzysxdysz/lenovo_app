$(function(){
  $.ajax({
    url:"./footer2.html",
    type:"get",
    success: function(res) {
      // res->html片段
      // console.log(res);
      $(res).replaceAll("footer");
    }
  })
})