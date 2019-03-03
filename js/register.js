// 个人用户与企业用户切换
$(() => {
  $(".regist_tap").on("click", function (e) {
    var $h = $(e.target);
    $h.toggleClass(" now")
      .siblings().toggleClass(" now");
    // console.log($(".person_regist").hasClass("now"))
    if ($(".person_regist").hasClass("now")) {
      $h.parent().next().children(":first-child").attr("style", "display:block;")
        .next().attr("style", "display:none;")
    } else {
      $h.parent().next().children(":first-child").attr("style", "display:none;")
        .next().attr("style", "display:block;")
    }
  })
})

// 滑块触发事件
$(() => {
  var pops = document.querySelectorAll(".ui-slider-btn");

  for (var pop of pops) {
    pop.onmouseover = function () {
      var pop = this;
      var canMove = false, offsetX;

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
          if (left >= 0 && left <= 310) {
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
          if (left >= 210 && left <= 223) {
            pop.style.left = "308px";
            bg.style.width = "308px";
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
          pop.style.left = "308px";
          bg.style.width = "308px";
          pop.className += " success";
          pop.previousElementSibling.innerHTML = "验证成功";
          pop.previousElementSibling.style.color = "#fff";
          pop.previousElementSibling.style.background = "url()";
        }, 500)
      }

    }
  }

})


// 输入框获得焦点
// 前端验证事件
$(() => {
  var record = "";
  $(".regist_main").on("focusout", function (e) {   // 失去焦点
    e.preventDefault();

    // 输入框右侧清空小按钮的显隐
    if ($(e.target).val() != "") {
      $(e.target).next("i").attr("style", "display:block");
    } else {
      $(e.target).next("i").attr("style", "display:none");
    }

    // 正则判断输入内容
    if ($(e.target).attr("class") == "phone_person") {  // 输入手机号
      vali($(e.target), /^1\d{10}$/, "请输入正确的手机号码");   // 以1开头的11位数字
    } else if ($(e.target).attr("class") == "captcha") {    // 输入验证码
      vali($(e.target), /[0]{6}/, "请输入正确的验证码");      // 6个0
    } else if ($(e.target).attr("class") == "pwd") {    //  输入密码
      vali($(e.target), /^\w{8,20}$/, "请输入正确的密码");      // 8-20位字符
    } else if ($(e.target).attr("class") == "repwd") {    //  再次输入密码
      var $err = $(".regist-error");
      if ($(e.target).val() != $(e.target).parent().prev().children("input").val()) {
        $err.attr("style", "display:block;")
          .html("两次密码不相符");
      } else {
        $err.attr("style", "display:none;");
        record++;
      }
    }
  })
  // 封装函数
  function vali(txt, reg, msg) {
    var $err = $(".regist-error");
    if (!reg.test(txt.val())) {
      $err.attr("style", "display:block;")
        .html(msg);
    } else {
      $err.attr("style", "display:none;");
      record++;
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
      $(".regist-error").attr("style", "display:block;")
        .html("滑块验证失败，请重试");
    }
    var num = Number($(this).attr("style").split(": ")[1].split("px")[0]);
    if (num >= 210 && num <= 223) {
      record++;
      $(".regist-error").attr("style", "display:none;")
    }
  })

  // 用户注册
  // 还存在问题，即先输入符合规则的参数，使record++，在改为错误的，仍能通过
  $(".regist_button").click(function () {
    console.log(record)
    if (record == 5) {
      $(".regist_button").attr("disabled", false);
    }
    if (!($(".regist_button").attr("disabled"))) {
      var phone = $(".phone_person").val();
      var upwd = $(".repwd").val();
      console.log(phone)
      console.log(upwd)
      $.ajax({
        url: "http://localhost:3000/users/reg",
        type: "post",
        data: { upwd, phone },
        dataType: "json",
        success: function (res) {
          console.log(res);
          if (res.code == 200) {
            location.href = `./`;
            console.log("注册成功")
          } else if (res.cod == 400) {
            console.log("注册失败")
          }
        }
      })
    }
  })
})

// canvas制图 验证码
$(() => {
  var c3 = document.getElementById("can");
  var ctx = c3.getContext("2d");
  // 1.创建进行120*30 背景色随机
  ctx.fillStyle = rc(180, 230);
  ctx.fillRect(0, 0, 120, 30);
  // 2.创建随机字符串4绘制矩形中
  var pool = "0123456789";
  for (var i = 0; i < 4; i++) {
    var c = pool[rn(0, pool.length)];
    console.log(c);   // 为4个验证码
    ctx.textBaseline = "top";
    var fs = rn(15, 30)
    ctx.font = fs + "px SimHei";
    ctx.fillStyle = rc(30, 180);
    ctx.fillText(c, 30 * i, 0);
  }
  // 3.创建5条干扰先
  for (var i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.strokeStyle = rc(0, 230);
    ctx.moveTo(rn(0, 120), rn(0, 30));
    ctx.lineTo(rn(0, 120), rn(0, 30));
    ctx.stroke();
  }
  // 4.创建50个干扰点
  for (var i = 0; i < 50; i++) {
    ctx.fillStyle = rc(0, 255);
    ctx.beginPath();
    ctx.arc(rn(0, 120), rn(0, 30), 0.5, 0, 2 * Math.PI);
    ctx.fill();
  }


  function rn(min, max) {
    var n = Math.random() * (max - min) + min;
    return Math.floor(n);
  }
  function rc(min, max) {
    var r = rn(min, max);
    var g = rn(min, max);
    var b = rn(min, max);
    return `rgb(${r},${g},${b})`;
  }
  console.log(rn(100, 200));
  console.log(rc(0, 50));

})