$(function(){
  $.ajax({
    url:"./footer.html",
    type:"get",
    success: function(res) {
      // res->html片段
      // console.log(res);
      $(res).replaceAll("footer");
    }
  })
})