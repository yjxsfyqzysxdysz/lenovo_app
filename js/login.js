// 登录方式转变
// 扫码——输入
$(() => {
  $(".login_switch").on("click", function (e) {
    var $btn = $(e.target);
    $btn.attr("style", "display:none;")
      .siblings().attr("style", "display:block;");

    if ($(".login_scan_tip").attr("style") == "display:none;") {
      $(".login_static").attr("style", "display:none;")
        .next().attr("style", "display:block;");
      // 验证码失效提示 10s
      setTimeout(function () {
        $(".qrcode_error").attr("style", "display:block;");
      }, 10000);
      $(".qrcode_refresh").on("click", function () {
        $(".qrcode_error").attr("style", "display:none;")
        setTimeout(function () {
          $(".qrcode_error").attr("style", "display:block;");
        }, 10000);
      })
    } else {
      $(".login_static").attr("style", "display:block;")
        .next().attr("style", "display:none;");
    }
  })
})

// 用户名登陆——手机号登陆
$(() => {
  $(".login_mains>a").on("click", function () {
    var $btn = $(this);
    $btn.attr("style", "display:none;")
      .siblings("a").attr("style", "display:inline;");

    $(".error-container").attr("style", "display:none;");   // 错误提示信息

    if ($(".btnCancle2").attr("style") == "display:none;") {  // 手机验证码快捷登录  是display:none
      $("#fast_login_box").attr("style", "display:block;")   // 手机登录页面为   display:none
        .prev().attr("style", "display:none;");
    } else {
      $("#fast_login_box").attr("style", "display:none;")
        .prev().attr("style", "display:block;");
    }
  })
})

// 滑块触发事件
$(() => {
  var canMove = false, offsetX;
  var pop = document.querySelector(".ui-slider-btn");
  var bg = pop.nextElementSibling;

  // 鼠标点下时触发的事件
  pop.onmousedown = function (e) {
    if (pop.className.indexOf("success") == -1) {
      canMove = true;
      clientX = e.clientX;//相对于pop
    }
  }
  // 鼠标移动时的事件
  window.onmousemove = function (e) {
    if (canMove) {
      var left = e.clientX - clientX;
      // console.log(left)
      if (left >= 0 && left <= 300) {
        pop.style.left = left + "px";
        bg.style.width = left + "px";
      }
    }
  }
  // 鼠标抬起时触发的事件
  pop.onmouseup = function (e) {
    if (pop.className.indexOf("success") == -1) {
      canMove = false;
      var left = e.clientX - clientX;
      if (left >= 203 && left <= 217) {
        pop.style.left = "215px";
        bg.style.width = "215px";
        succ();
      } else {
        pop.style.left = "0px";
        bg.style.width = "0px";
      }
    }
  }

  // 验证成功时的样式
  var succ = function () {
    setTimeout(function () {
      pop.style.left = "300px";
      bg.style.width = "300px";
      pop.className += " success";
      pop.previousElementSibling.innerHTML = "验证成功";
      pop.previousElementSibling.style.color = "#fff";
      pop.previousElementSibling.style.background = "url()";
    }, 500)
  }
})

// 在登录后，获得由session保存的用户的uid
// 由uid向服务器查询uid对应的数据
$(() => {
  var uid = sessionStorage.getItem("key");
  if (!(uid == undefined)) {    // 如果已经登录
    $.ajax({
      url: "http://localhost:3000/users/sel",
      type: "get",
      data: { uid },
      dataType: "json",
      success: function (res) {
        console.log(res)

        $(() => {   // 右上角人物小人 鼠标移入移出事件
          $(".top_username").attr("style", "display:block")
            .children("ul").children(":first-child").html(res.uname);
        })

        $(() => {   // 点击购物车按钮，跳转至购物车
          $(".home_cart").click(() => {
            location.href = "./shopping_trolley.html"
          })
        })

        // 左上角购物车小图标 上的数字
        $(() => {
          $.ajax({
            url: "http://localhost:3000/cart/sel_shoppingcart_item",
            type: "get",
            data: { uid },
            dataType: "json",
            success: function (res) {
              $("#top_cart_count").html(res.length);
            }
          })
        })

      }
    })
  }
})


// 登录
$(function () {
  // 点击登录
  $(".submit").click(function () {
    var uname = $("#account").val().toString();
    var upwd = $("#upwd").val();
    if (!(upwd == "" || uname == "")) {
      $.ajax({
        url: "http://localhost:3000/users/signin",
        type: "post",
        data: { uname, upwd },
        dataType: "json",
        success: function (res) {
          console.log(res);
          // console.log(1111);
          if (res.ok == 1) {      // 登录成功
            console.log(res.session.uname);
            console.log("登录成功")
            sessionStorage.setItem('key', res.session.uid);    // 将session赋值
            $(".shadow").attr("style", "display:none")
              .next().attr("style", "display:none");
            location.href = '/';
            // 获取session信息
            uid = sessionStorage.getItem("key");
            // 登录后可显示页面
            console.log(uid)
            if (uid != undefined) {
              $(".top_username").attr("style", "display:block")
                .children("ul").children(":first-child").html(res.session.uname);
            }
          } else {  // 登录失败
            $(".error-msg").html("账号或密码错误")
              .parent().attr("style", "display:block");
          }
        }
      })
    }
  })

  /* 加了悬浮窗后不需要了 */
  // 在index中点击用户窗口，判断是否登录，
  // 若已登录点击时，将跳转到用户页，
  // 若未登录，则跳出登录弹窗

  $(".blank").click(function () {
    var uid = sessionStorage.getItem("key")
    // console.log(uid)
    if (uid == undefined) { // 未登录
      console.log(111)
      //     // 如果未登录就打开登录界面
      $("#shadow").attr("style", "display:block")
        .next().attr("style", "display:block");
      //   } else {   // 登录了
      //     // 如果登录了就跳转到用户页面
      //     location.href = './user_homepage.html';
    }
  })


})

// 点击登出
$(() => {
  $(".logout").on("click", function () {
    $.ajax({
      url: "http://localhost:3000/users/signout",
      type: "get",
      dataType: "json",
      success: function (res) {
        console.log(res);
        if (res.ok == 1) {
          sessionStorage.removeItem('key');
          $(".top_username").attr("style", "display:none");
          location.href = '/';
        }
      }
    })
  })
})

// 点击显隐性
$(() => {
  // 关闭登录悬浮窗
  $(".close").on("click", function () {
    var $click = $(this);
    $click.parent().attr("style", "display:none")
      .prev().attr("style", "display:none");
    $(".login-content input").val("");    // 关闭清空输入框
  })
})

// 输入窗口判断
$(() => {
  $(".login_input").on("focusout", function (e) {   // 失去焦点
    e.preventDefault();

    // 输入框右侧清空小按钮的显隐
    if ($(e.target).val() != "") {
      $(e.target).next("i").attr("style", "display:block");
    } else {
      $(e.target).next("i").attr("style", "display:none");
    }

    // 正则判断输入内容
    if ($(e.target).attr("id") == "account_f") {  // 输入手机号
      vali($(e.target), /^1\d{10}$/, "请输入正确的手机号码");   // 以1开头的11位数字
    } else if ($(e.target).attr("class") == "captcha") {    // 输入验证码
      vali($(e.target), /[0]{6}/, "请输入正确的验证码");      // 6个0
    } else if ($(e.target).attr("class") == "pwd") {    //  输入密码
      vali($(e.target), /^\w{8,20}$/, "请输入正确的密码");      // 8-20位字符
    }

  })
  // 封装函数
  function vali(txt, reg, msg) {
    var $err = $(".error-msg");
    if (!reg.test(txt.val())) {
      $err.html(msg)
        .parent().attr("style", "display:block;");
    } else {
      $err.parent().attr("style", "display:none;");
    }
  }
  // 点击清空小按钮，输入框清空
  $(".icon-clear").on("click", function () {
    $(this).attr("style", "display:none")
      .prev("input").val("")
  })

  // 获取验证码
  $(".captcha_btn").on("click", function (e) {
    // 周期性定时器
    $(e.target).html("30 s")
      .prev().attr("placeholder", "验证码：000000");
    var i = 29;
    var t = setInterval(function () {
      $(e.target).html(`${i--} s`);
      if (i == 0) {
        clearInterval(t);
        $(e.target).html(`获取验证码`)
          .prev().attr("placeholder", "短信验证码");
      }
    }, 1000)
  })

  // 滑块验证
  $(".ui-slider-btn").on("mouseup", function () {
    if (!($(this).hasClass("success"))) {
      $(".error-container").attr("style", "display:block;")
        .children(".error-msg").html("滑块验证失败，请重试");
    }
    var num = Number($(this).attr("style").split(": ")[1].split("px")[0]);
    if (num >= 210 && num <= 223) {
      $(".error-container").attr("style", "display:none;")
    }
  })
})
