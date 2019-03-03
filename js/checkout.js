// 点击 订单详情 按钮，弹出收货人信息
$(() => {
  $(".show_more").on("click", function () {
    var a = $(this);
    a.find("em").toggleClass("down")
    var b = a.parent().parent().next();
    if (b.attr("style") == "display:none;") {
      b.attr("style", "display:block;")
    } else {
      b.attr("style", "display:none;")
    }
    // console.log(b)
  })
})

// 支付方式选择效果
$(() => {


  // 显示更多支持银行
  $(".more_bank").click(function () {
    var $btn = $(this);
    $btn.parent().children(":gt(10):not(:last)").toggle()
  })

  // 分期方式
  $(".xinyka .banks").on("click", function () {
    var div = $(this);
    div.parent().children().children(":last-child").attr("style", "display:none;");
    div.children(":last-child").attr("style", "display:block;");
    // console.log(btn);
  })

  // 分期期数
  $(".banks-tab .date div").on("click", function () {
    var div = $(this);
    div.siblings().children().attr("style", "display:none;")
    div.children().attr("style", "display:block;");
  });
})



// 从服务器获取相关数据，写到页面上
$(() => {
  var uid = sessionStorage.getItem("key");
  $.ajax({
    url: "http://localhost:3000/cart/selorder_detail",
    type: "get",
    data: { uid },
    dataType: "json",
    success: function (res) {
      console.log(res)
      var oid = res.order.oid;

      var newTime = new Date(res.order.order_time + 1800000);
      var t = newTime.toString().split(" ");
      var year = t[3];
      var m = t[1];
      var date = t[2];
      var time = t[4];
      var month;
      if (res.receiver_address.cellphone.length == 11) {
        var phone = res.receiver_address.cellphone.substr(0, 3) + "*****" + res.receiver_address.cellphone.substr(8, 3);
      } else {
        var phone = res.receiver_address.fixedphone.substring(3, 0) + "*****";
      }
      console.log(res.receiver_address.cellphone.length)
      if (res.product.length > 0) {
        productName = "联想产品";
      } else {
        productName = res.product[0].title;
      }
      switch (m) {
        case "Jan": month = 1; break;
        case "Feb": month = 2; break;
        case "Mar": month = 3; break;
        case "Apr": month = 4; break;
        case "May": month = 5; break;
        case "Jun": month = 6; break;
        case "Jul": month = 7; break;
        case "Aug": month = 8; break;
        case "Sept": month = 9; break;
        case "Oct": month = 10; break;
        case "Nov": month = 11; break;
        default: month = 12;
      }
      var price = 0;
      for (var i = 0; i < res.product.length; i++) {
        price += parseInt(res.order.count.split(",")[i] * res.product[i].price);
      }
      $(".detail").children(":nth-child(2)").children("span").html(` ${year}年${month}月${date}日 ${time} `)
        .parent().next().children().children().html(`订单号： ${res.order.oid}\xa0\xa0<span>  商品名称: ${productName} </span>`)
        .parent().parent().next().children("p").children("span").html(`￥ ${price.toFixed(2)} 元`)
        .parent().parent().parent().next().children().children(":first-child").children("span").html(`${res.receiver_address.receiver} ${phone} ${res.receiver_address.province.split(" ")[0]} ${res.receiver_address.city.split(" ")[0]} ${res.receiver_address.county.split(" ")[0]} ${res.receiver_address.address}`)


      // 页面倒计时2 
      var minutes = parseInt(new Date(newTime - new Date()).getMinutes());
      var seconds = parseInt(new Date(newTime - new Date()).getSeconds());
      var milliseconds = parseInt(new Date(newTime - new Date()).getMilliseconds());
      var actual = setInterval(function () {
        milliseconds--;
        if (milliseconds == 0) {
          if (seconds != 0) {
            seconds--;
            milliseconds = 999;
          } else {
            if (minutes != 0) {
              minutes--;
              seconds = 59;
              milliseconds = 999;
            } else {
              clearInterval(actual);
              alert("本次支付结束，页面即将跳转...");
            }
          }
        }

        $(".actual").html(`距离本次支付结束还剩 ${minutes} : ${seconds} : ${milliseconds}`);
      }, 1)

      // 页面倒计时2
      var t_d = 59;
      var countdown = setInterval(function () {
        t_d--;
        $(".countdown").html(`${t_d} S`);
        if (t_d <= 0) {
          clearInterval(countdown);
          alert("支付超时，将返回订单页...");
          var aid = res.receiver_address.aid;
          var iid = [];
          for (var i = 0; i < res.order.length; i++) {
            oid.push(res.order[i].oid);
            iid.push(res.order[i].iid);
          }
          $.ajax({
            url: "http://localhost:3000/cart/update_shoppingcart_ischecked",
            type: "get",
            data: { aid, oid, iid },
            dataType: "json",
            success: function (res) {
              // location.href = "/settlement.html";
            }
          })
        }
      }, 1000)

      // 点击支付项
      $(".pay_types .pay_plats li a img").click(function (e) {
        var $btn = $(e.target);
        $(".pay_types .pay_plats li a img").next().removeClass("xinyka_icon");
        $btn.next().addClass("xinyka_icon");
        $(".mask").show()
          .next().show();

        var progress = $("#progress");
        var v = progress.val();
        // console.log(v)
        var t = setInterval(function () {
          v += 0.001;
          progress.val(v);
          if (v >= 1) {
            clearTimeout(t);
            alert("支付超时....")
            clearpay()
          }
        }, 1);

        // 点击 正在支付 X 按钮 隐藏
        $(".ljclose").click(function () {
          clearpay();
        })
        // 封装点击支付界面 X 按钮 界面隐藏效果
        function clearpay() {
          $(".mask").hide()
            .next().hide();
          clearTimeout(t);
          $("#progress").val(0);
        }


        // 点击支付确认
        $(() => {
          $(".ljpay>div.fenqi-btn>a").click(function () {
            $submit = $(this);
            $.ajax({
              url: "http://localhost:3000/cart/payment",
              type: "get",
              data: { oid },
              dataType: "json",
              success: function (res) {
                if (res.code == 1) {
                  console.log("购买成功");
                  alert("购买成功，即将跳转至用户页面...");
                  clearTimeout(t);
                  location.href = "/user_homepage.html";
                } else {
                  console.log("购买失败");
                }
              }
            })
          })
        })
      })
    }
  })
})
