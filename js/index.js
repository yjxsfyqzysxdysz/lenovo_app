// 一楼数据动态获取
$(function () {
  $.ajax({
    url: "http://localhost:3000/index",
    type: "get",
    // data:
    dataType: "json",
    success: function (res) {  // 1.x；2.x 专用
      console.log(res);
      var p = res[0];
      var html = "";
      for (var p of res.slice(0, 8)) {// 数据库中前5个数据
        var { title, details, price, md, href } = p;
        html += `
              <div class="floor_item">
                <a href="${href}">
                  <img src="${md}" alt="">
                </a>
                <a href="javascript:;" class="floor_item_a redhover">${title}</a>
                <a href="javascript:;" class="floor_item_b redhover">${details}</a>
                <p>
                  <a href="javascript:;">￥${price.toFixed(2)}</a>
                </p>
                <span class="floor_left_item_top floor_left_item_xinpin"></span>
              </div>
              `;
      }
      var div = document.querySelector("#floor_1 .floor_right");
      div.innerHTML = html;
    }
  })
  // .then(res => { // 3.x 专用 })
})

// Lenovo电脑 点击后跳转搜索页面
$(() => {
  $("#tab>li:first-child>div:first-child>a:first-child").click(function () {
    $click = $(this);
    var kwords = "笔记本";
    $.ajax({
      url: "http://localhost:3000/products/",
      type: "get",
      data: { kwords },
      dataType: "JSON",
      success: function (res) {
        console.log(res)
        location.href = `seach_page.html?kwords=${kwords}`;
      }
    })
  })
})

// 尾页
$(function () {
  $.ajax({
    url: "./footer.html",
    type: "get",
    success: function (res) {
      // res->html片段
      // console.log(res);
      $(res).replaceAll("footer");
    }
  })
})
// 轮播图
$(() => {
  var items = document.querySelector(".mycarousel-inner").children;
  var lists = document.querySelector(".main_page .mycarousel-indicators").children;
  var i = 1;
  setInterval(function () {

    for (var list of lists) {
      list.onclick = function () {
        var list = this;
        i = list.getAttribute("data-slide-to");
        for (var item of items) {
          item.className = "mycarousel-item";
        }
        for (var list of lists) {
          list.className = "";
        }
        items[i].className += " active";
        lists[i].className = "active"
      }
      list.className = "";
    }
    for (var item of items) {
      item.className = "mycarousel-item";
    }
    // for (var list of lists) {
    //   list.className = "";
    // }
    items[i].className += " active";
    lists[i].className = "active"
    i < items.length - 1 ? i++ : i = 0;
  }, 5000)
})

// 倒计时
$(() => {
  var i = 0;
  setInterval(function () {
    // 场次
    var timestars = document.querySelectorAll(".mycarousel-inner .timestar");
    // console.log(inner);

    var d1 = new Date();
    var d2 = new Date();
    // for (i = 0; i < timestars.length; i++) {
    var list_ad_lf = document.querySelectorAll(".list_ad_lf")[i];
    var coupontext = timestars[i].nextElementSibling;
    var inner = timestars[i].innerHTML.split(":00 场")[0];
    var counttime = timestars[i].parentElement.lastElementChild;
    var counttime_hour = counttime.firstElementChild;
    var counttime_minutes = counttime_hour.nextElementSibling;
    var counttime_seconds = counttime.lastElementChild;
    var price_boxs = list_ad_lf.parentElement.querySelectorAll(".list_ad_rt_cell .list_ad_word_cell_size_1 .price_box")
    // console.log(inner)
    d1.setHours(inner);
    d1.setMinutes(00);
    d1.setSeconds(00);
    d1.setMilliseconds(00);

    function fn(a, b, c) {
      var alls = Math.floor((a - b) / 1000 + c * 60 * 60);
      var newh = Math.floor(alls / (60 * 60)).toString();
      var newm = Math.floor((alls % (60 * 60)) / 60).toString();
      var news = Math.floor((alls % (60 * 60)) % 60).toString();
      if (newh < 10) { newh = "0" + newh }
      if (newm < 10) { newm = "0" + newm }
      if (news < 10) { news = "0" + news }
      var a = [newh, newm, news];
      return a;
    }



    if (d1 - d2 < 0) {    // 已经开始
      if (d2 - d1 <= 2 * 60 * 60 * 1000) {   // 2h以内
        counttime_hour.innerHTML = fn(d1, d2, 2)[0];
        counttime_minutes.innerHTML = fn(d1, d2, 2)[1];
        counttime_seconds.innerHTML = fn(d1, d2, 2)[2];
        for (var price_box of price_boxs) {
          price_box.style.borderColor = "#df2634";
        }
        for (var price_box of price_boxs) {
          price_box.style.borderColor = "#df2634";
          price_box.querySelector(".new_price").style.color = "#df2634";
          price_box.lastElementChild.style.background = "#df2634";
          price_box.querySelector(".price_box_right a").innerHTML = "立即抢购";
        }
      } else {                                // 2h以外
        list_ad_lf.style.backgroundImage = ("url(./img/list_ad/list_ad_left1.png)");
        coupontext.innerHTML = "今日活动已结束";
        coupontext.className = "coupostart";
        for (var span of counttime.children) {  // 不显示时间
          span.innerHTML = "";
        }
        for (var price_box of price_boxs) {
          price_box.style.borderColor = "#767676";
          price_box.querySelector(".new_price").style.color = "#767676";
          price_box.lastElementChild.style.background = "#767676";
          price_box.querySelector(".price_box_right a").innerHTML = "活动结束";
        }
      }
    } else {         // 尚未开始
      if (d1 - d2 <= 2 * 60 * 60 * 1000) {              // 2h以内
        counttime_hour.innerHTML = fn(d1, d2, 0)[0];
        counttime_minutes.innerHTML = fn(d1, d2, 0)[1];
        counttime_seconds.innerHTML = fn(d1, d2, 0)[2];
        coupontext.className = "coupontext";
        coupontext.innerHTML = "距离本场开始还有";
      } else {                                 // 2h以外
        list_ad_lf.style.backgroundImage = ("url(./img/list_ad/list_ad_left1.png)");
        coupontext.innerHTML = "敬请期待";
        coupontext.className = "coupostart";
        for (var span of counttime.children) {  // 不显示时间
          span.innerHTML = "";
        }
      }
      for (var price_box of price_boxs) {
        price_box.style.borderColor = "#fe6a00";
        price_box.querySelector(".new_price").style.color = "#fe6a00";
        price_box.lastElementChild.style.background = "#fe6a00";
        price_box.querySelector(".price_box_right a").innerHTML = "提醒我";
      }
    }
    i < timestars.length - 1 ? i++ : i = 0;
  }, 1000 / 4)
})

// 监控页面滚动距离
$().ready(function () {
  var sort_left = document.getElementsByClassName("sort-list_left")[0];
  var list_top = document.getElementById("sort-list_left_md").getElementsByTagName("span");
  var list_but = document.getElementById("sort-list_left_md").getElementsByTagName("em");
  var sort_right = document.getElementsByClassName("sort-list_right")[0];
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
    //右边导航栏滚动定位
    if (scrollTop >= 50 && scrollTop < 5400) {
      sort_right.style.display = "block";
    } else {
      sort_right.style.display = "none";
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
          scrollTop: (360 + 584 * a)
        }, 1000);
      } else {
        $("html").stop(true).animate({
          scrollTop: 450
        }, 1000);
      }

    }
  }
})


