$(function () {
  var lid = this.location.search.slice(5);    //?lid=1
  $.ajax({
    url: "http://localhost:3000/details",
    type: "get",
    data: { lid },
    dataType: "json",
    success: function (res) {
      console.log(res);
      var { product, specs, pics, detail_pics, layout, family, specification } = res;
      // specs, pics返回的是类数组对象，遍历后打点获取
      var { title, subtitle, price, os, cpu, spec, promise, lid, fid } = product;


      // 导航栏内容
      var html = `<a href="javascript:;" class="redhover">首页</a>&gt; 商品详情 &gt; ${title}`
      document.getElementsByClassName("product_topList_con")[0].innerHTML = html;


      // 右侧主要内容
      var frag = document.createDocumentFragment();
      var h1 = document.createElement("h1");
      h1.className = "title";
      h1.innerHTML = `${title}`;
      frag.appendChild(h1);
      var div = document.createElement("div");
      div.className = "subhead";
      div.innerHTML = `${subtitle}`;
      frag.appendChild(div);
      var div = document.createElement("div");
      div.className = "container";
      div.innerHTML = `
          <div class="container_title">促销信息</div>
          <div class="container-title_con">
            <span>${promise}</span>
          </div>
      `
      frag.appendChild(div);

      console.log(specification)
      for (var item of specification) {    // 为规格栏加红边框
        if (item.lid == lid) {
          console.log(item);
          var condition_a = item.condition_a;
          var condition_b = item.condition_b;
          var condition_c = item.condition_c;
        }
      }

      var arr = ["颜色/尺寸:", "处理器/操作系统:", "内存/硬盘/显卡:"];
      var strs = [family.module_a.split(','), family.module_b.split(','), family.module_c.split(',')]
      var ul = document.createElement("ul");
      ul.id = "guige"
      // 创建li，并将挂载到ul上
      for (var i = 0; i < 3; i++) {
        var label = document.createElement("label");
        label.innerHTML = arr[i];
        var li = document.createElement("li");
        li.id = `guigeitem${i}`;
        li.className = `clearfix`;
        li.appendChild(label);
        for (var str of strs[i]) {
          var span = document.createElement("span");
          span.className = "spec-mid";
          var a = document.createElement("i");
          a.innerHTML = str;
          span.appendChild(a);
          // console.log(str)
          if (str == condition_a || str == condition_b || str == condition_c) {
            // console.log(str)
            span.className += " active";
          }
          li.appendChild(span);
        }
        // console.log(li)
        ul.appendChild(li);
      }

      // console.log(ul)
      var div = document.createElement("div");
      div.className = "container";
      div.id = "container_guige";
      div.appendChild(ul);
      // console.log(div)

      frag.appendChild(div);
      // console.log(frag);
      var content_right = document.getElementsByClassName("content_right")[0];
      content_right.insertBefore(frag, content_right.firstElementChild);


      // 点击页低悬浮页面所展现效果
      $(() => {
        $(".operate_right").on("click", function (e) {
          $click = $(e.target);
          // 如果点击的是加减数量，则只在前端页面修改，不传至服务器，数据库
          // 只有当点击 立即购买 或 加入购物车 时，才将数据写至服务器，数据库
          if ($click.hasClass("bg")) {    // 加减数量
            var count = parseInt($("#buy_number").val());   // 页面上的数量值
            if ($click.attr("id") == "reduce_buy_number") {   // 如果点击的是“—”，则减1
              if (parseInt($click.next().val()) > 1) {
                count -= 1;
                $("#buy_number").val(parseInt(count));
              }
            } else
              if ($click.attr("id") == "add_buy_number") {    // 如果点击的是“+”，则加1
                if (parseInt($click.prev().val()) < res.product.inventory) {
                  count += 1;
                  $("#buy_number").val(parseInt(count));
                }
              }
          }

          // 构造函数——加入购物车
          function jrgwc() {
            $.ajax({
              url: "http://localhost:3000/cart/add",
              type: "get",
              data: { lid, uid, count, },
              dataType: "json",
              success: function (res) {
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

          var count = $click.parent().prev().prev().prev().val();
          var uid = sessionStorage.getItem("key");
          if ($click.attr("id") == "jrgwc") {   // 加入购物车
            jrgwc();
            alert("商品已加入购物车");
          }

          if ($click.attr("id") == "ljgm") {   // 立即购买
            // jrgwc();    // 加入购物车
            $.ajax({
              url: "http://localhost:3000/cart/lijg",   // 跳至订单页面
              type: "get",
              data: { lid, uid, count },
              dataType: "json",
              success: function (res) {
                if (confirm("商品已加入购物车，是否现在跳转至结算中心")) {    // 跳至订单页面
                  location.href = "/settlement.html";
                }
              }
            })
          }


        })
      })


      // 给页面加载动态信息
      $(() => {
        // 价格动态
        document.getElementsByClassName("operate_money")[0].children[1].innerHTML = "￥" + price.toFixed(2);
        // 给缩略图加动态信息
        var html = "";
        for (var key in pics) {
          // console.log(key)
          html += `
            <li data-index="${key}">
              <a href="javascript:;">
                <img src="${pics[key].md}" alt="">
              </a>
            </li>
          `
        }
        document.getElementsByClassName("product_smppiclist")[0].children[0].innerHTML = html;

        // 商品详情 详情图片动态
        var html = [];
        for (var pic of detail_pics) {
          html += `<img class="lazy lazy_img" src="${pic.mg}" alt="">`
        }
        var p = document.createElement("p");
        p.innerHTML = html;
        var images = document.getElementsByClassName("images")[0];
        images.insertBefore(p, images.children[1]);

        // 配置信息 信息动态
        var html = `
            <div class="padding-top"></div>
              <div class="con">
                <div class="good_item">
                  <div class="item-title-container">
                    <div class="item_title">处理器</div>
                    <div class="item_title1"></div>
                  </div>
                  <div class="item_row">
                    <div class="col_one">CPU</div>
                    <div class="col_one col_two1">${layout.cpu_name}</div>
                  </div>
                  <div class="item_row">
                    <div class="col_one">CPU型号</div>
                    <div class="col_one col_two1">${layout.cpu_type}</div>
                  </div>
                  <div class="item_row">
                    <div class="col_one">CPU主频</div>
                    <div class="col_one col_two1">${layout.cpu_hz}</div>
                  </div>
                  <div class="item_row">
                    <div class="col_one">核心数</div>
                    <div class="col_one col_two1">${layout.cpu_num}</div>
                  </div>
                  <div class="item_row item-row-last">
                    <div class="col_one"></div>
                    <div class="col_one col_two1"></div>
                  </div>
                </div>
    
                <div class="good_item">
                  <div class="item-title-container">
                    <div class="item_title">操作系统</div>
                    <div class="item_title1"></div>
                  </div>
                  <div class="item_row">
                    <div class="col_one">操作系统</div>
                    <div class="col_one col_two1">${layout.os}</div>
                  </div>
                  <div class="item_row item-row-last">
                    <div class="col_one"></div>
                    <div class="col_one col_two1"></div>
                  </div>
                </div>
    
                <div class="good_item">
                  <div class="item-title-container">
                    <div class="item_title">屏幕</div>
                    <div class="item_title1"></div>
                  </div>
                  <div class="item_row">
                    <div class="col_one">屏幕尺寸</div>
                    <div class="col_one col_two1">${layout.screen_size}</div>
                  </div>
                  <div class="item_row">
                    <div class="col_one">屏幕类型</div>
                    <div class="col_one col_two1">${layout.screen_type}</div>
                  </div>
                  <div class="item_row item-row-last">
                    <div class="col_one"></div>
                    <div class="col_one col_two1"></div>
                  </div>
                </div>
    
    
    
                <div class="good_item">
                  <div class="item-title-container">
                    <div class="item_title">内存</div>
                    <div class="item_title1"></div>
                  </div>
                  <div class="item_row">
                    <div class="col_one">内存容量</div>
                    <div class="col_one col_two1">${layout.memory_space}</div>
                  </div>
                  <div class="item_row">
                    <div class="col_one">内存类型</div>
                    <div class="col_one col_two1">${layout.memory_type}</div>
                  </div>
                  <div class="item_row item-row-last">
                    <div class="col_one"></div>
                    <div class="col_one col_two1"></div>
                  </div>
                </div>
    
    
                <div class="good_item">
                  <div class="item-title-container">
                    <div class="item_title">硬盘</div>
                    <div class="item_title1"></div>
                  </div>
                  <div class="item_row">
                    <div class="col_one">硬盘容量</div>
                    <div class="col_one col_two1">${layout.disk_space}</div>
                  </div>
                  <div class="item_row">
                    <div class="col_one">硬盘类型</div>
                    <div class="col_one col_two1">${layout.disk_type}</div>
                  </div>
    
                  <div class="item_row item-row-last">
                    <div class="col_one"></div>
                    <div class="col_one col_two1"></div>
                  </div>
                </div>
                <div class="good_item">
                  <div class="item-title-container">
                    <div class="item_title">显卡</div>
                    <div class="item_title1"></div>
                  </div>
                  <div class="item_row">
                    <div class="col_one">显卡类型</div>
                    <div class="col_one col_two1">${layout.video_type}</div>
                  </div>
                  <div class="item_row">
                    <div class="col_one">显示芯片</div>
                    <div class="col_one col_two1">${layout.video_name}</div>
                  </div>
                  <div class="item_row">
                    <div class="col_one">显存容量</div>
                    <div class="col_one col_two1">${layout.video_space}</div>
                  </div>
    
    
                  <div class="item_row item-row-last">
                    <div class="col_one"></div>
                    <div class="col_one col_two1"></div>
                  </div>
                </div>
                <div class="good_item">
                  <div class="item-title-container">
                    <div class="item_title">光驱</div>
                    <div class="item_title1"></div>
                  </div>
                  <div class="item_row">
                    <div class="col_one">光驱类型</div>
                    <div class="col_one col_two1">${layout.cd_type}</div>
                  </div>
    
    
                  <div class="item_row item-row-last">
                    <div class="col_one"></div>
                    <div class="col_one col_two1"></div>
                  </div>
                </div>
                <div class="good_item">
                  <div class="item-title-container">
                    <div class="item_title">接口</div>
                    <div class="item_title1"></div>
                  </div>
                  <div class="item_row">
                    <div class="col_one">USB3.1</div>
                    <div class="col_one col_two1">${layout.usb_port}</div>
                  </div>
                  <div class="item_row">
                    <div class="col_one">视频接口</div>
                    <div class="col_one col_two1">${layout.video_port}</div>
                  </div>
                  <div class="item_row">
                    <div class="col_one">音频接口</div>
                    <div class="col_one col_two1">${layout.audio_port}</div>
                  </div>
                  <div class="item_row">
                    <div class="col_one">RJ45(以太网口)</div>
                    <div class="col_one col_two1">${layout.rj45}</div>
                  </div>
                  <div class="item_row">
                    <div class="col_one">Type-C 接口</div>
                    <div class="col_one col_two1">${layout.type_c}</div>
                  </div>
    
    
                  <div class="item_row item-row-last">
                    <div class="col_one"></div>
                    <div class="col_one col_two1"></div>
                  </div>
                </div>
                <div class="good_item">
                  <div class="item-title-container">
                    <div class="item_title">网络通信 </div>
                    <div class="item_title1"></div>
                  </div>
                  <div class="item_row">
                    <div class="col_one">无线网卡</div>
                    <div class="col_one col_two1">${layout.wifi}</div>
                  </div>
                  <div class="item_row">
                    <div class="col_one">蓝牙</div>
                    <div class="col_one col_two1">${layout.blue_tooth}</div>
                  </div>
    
    
                  <div class="item_row item-row-last">
                    <div class="col_one"></div>
                    <div class="col_one col_two1"></div>
                  </div>
                </div>
                <div class="good_item">
                  <div class="item-title-container">
                    <div class="item_title">多媒体</div>
                    <div class="item_title1"></div>
                  </div>
                  <div class="item_row">
                    <div class="col_one">扬声器</div>
                    <div class="col_one col_two1">${layout.loudspeaker}</div>
                  </div>
                  <div class="item_row">
                    <div class="col_one">麦克风</div>
                    <div class="col_one col_two1">${layout.mic}</div>
                  </div>
                  <div class="item_row">
                    <div class="col_one">摄像头</div>
                    <div class="col_one col_two1">${layout.camera}</div>
                  </div>
    
    
                  <div class="item_row item-row-last">
                    <div class="col_one"></div>
                    <div class="col_one col_two1"></div>
                  </div>
                </div>
                <div class="good_item">
                  <div class="item-title-container">
                    <div class="item_title">输入设备</div>
                    <div class="item_title1"></div>
                  </div>
                  <div class="item_row">
                    <div class="col_one">键盘描述</div>
                    <div class="col_one col_two1">${layout.keyboard}</div>
                  </div>
    
    
                  <div class="item_row item-row-last">
                    <div class="col_one"></div>
                    <div class="col_one col_two1"></div>
                  </div>
                </div>
                <div class="good_item">
                  <div class="item-title-container">
                    <div class="item_title">电源规格</div>
                    <div class="item_title1"></div>
                  </div>
                  <div class="item_row">
                    <div class="col_one">电池</div>
                    <div class="col_one col_two1">${layout.battery}</div>
                  </div>
    
    
                  <div class="item_row item-row-last">
                    <div class="col_one"></div>
                    <div class="col_one col_two1"></div>
                  </div>
                </div>
                <div class="good_item">
                  <div class="item-title-container">
                    <div class="item_title">机器规格 </div>
                    <div class="item_title1"></div>
                  </div>
                  <div class="item_row">
                    <div class="col_one">重量</div>
                    <div class="col_one col_two1">${layout.weight}</div>
                  </div>
                  <div class="item_row">
                    <div class="col_one">尺寸</div>
                    <div class="col_one col_two1">${layout.size}</div>
                  </div>
    
    
                  <div class="item_row item-row-last">
                    <div class="col_one"></div>
                    <div class="col_one col_two1"></div>
                  </div>
                </div>
                <div class="good_item">
                  <div class="item-title-container">
                    <div class="item_title">预装软件</div>
                    <div class="item_title1"></div>
                  </div>
                  <div class="item_row">
                    <div class="col_one">预装软件</div>
                    <div class="col_one col_two1">${layout.software}</div>
                  </div>
    
    
                  <div class="item_row item-row-last">
                    <div class="col_one"></div>
                    <div class="col_one col_two1"></div>
                  </div>
                </div>
              </div>
           `
        document.getElementById("box_configuration").innerHTML = html;

        // 商品编号
        document.getElementsByClassName("product_lid")[0].innerHTML = `商品编号：<span>${lid}</span>`;
      })


      // 左侧图片区域
      // 点击小图，大图改变
      // 点击箭头，小图改变   等效果
      $(() => {
        // 点击大图下的小图，小图获得黑框
        // 给大图加动态信息


        // 点击小图时所获取的地址
        var smpic_chks = document.querySelectorAll(".product_smppiclist>ul>li")
        // 大图的父级
        var div = document.getElementsByClassName("content_left_toppicter")[0];
        // console.log(div )
        // console.log(smpic_chks);  // 获得所有li
        // 默认页面大图为所在的第一个大图
        var img = `<img src='${pics[0].lg}' alt='' />`;
        div.innerHTML = img;

        smpic_chks[0].className = "smpic_chk";      // 给第一个小缩略图加上边框的属性
        for (var smpic_chk of smpic_chks) {
          smpic_chk.onclick = function () {
            var smpic_chk = this;
            // console.log(smpic_chk.getAttribute("data-index"))     // 获得自定义属性值,即pid
            // 点击的元素获得黑框
            manyclick(smpic_chk, ".product_smppiclist>ul>li.smpic_chk", "smpic_chk");
            // 点击小图，大图改变
            img = `<img src='${pics[smpic_chk.getAttribute("data-index")].lg}' alt='' />`
            div.innerHTML = img;
          }
        }



        // 点击箭头，小图标左右移动
        var btnboth = document.querySelectorAll(".sm-pic-list>a");
        // 右箭头
        var btnright = document.getElementsByClassName("coupon_arrows_next")[0];
        // 左箭头
        var btnleft = document.getElementsByClassName("coupon_arrows_prev")[0];
        // 小图的ul
        var btngroup = document.querySelector(".product_smppiclist>ul");
        // console.log(btngroup);
        // console.log(btnboth)

        // 设定初始样式
        btnleft.style.opacity = "0.3";
        btnleft.style.zIndex = "-1";
        // 当小图不足，无法点击时
        if (smpic_chks.length > 5) {
          btnright.style.opacity = "1";
        } else {
          btnright.style.opacity = "0.3";
          btnright.style.zIndex = "-1";
        }
        var m = 0;
        // 点击缩略图
        for (var btn of btnboth) {
          btn.onclick = function () {
            var btn = this;
            // console.log(btn)
            // 如果点击的是右键
            if (btn == btnright) {
              m++;
              // 小图左移98个px
              btngroup.style.marginLeft = `-${m * 98}px`;
              // 当点击右键后，左键肯定可以点击
              // 判断点击右键是第1次还是第n+1次
              // 若是第1次，则将左键的不可点击样式去掉
              if (btnleft.style.opacity != "1") {
                btnleft.style.opacity = "1";
                btnleft.style.zIndex = "auto";
              }
              // 判断右键再点击后，是否还能再次点击
              // 若不能，则改变样式
              if (smpic_chks.length - 5 - m <= 0) {
                btnright.style.opacity = "0.3";
                btnright.style.zIndex = "-1";
              }
            } else {
              // 当点击左键时
              m--;
              // 小图右移98个px
              btngroup.style.marginLeft = `${m * 98}px`;
              // 当点击左键后，左键肯定可以点击
              // 判断点击左键是第1次还是第n+1次
              // 若是第1次，则将右键的不可点击样式去掉
              if (btnright.style.opacity != "1") {
                btnright.style.opacity = "1";
                btnright.style.zIndex = "auto";
              }
              // 判断左键再点击后，是否还能再次点击
              // 若不能，则改变样式
              if (m <= 0) {
                btnleft.style.opacity = "0.3";
                btnleft.style.zIndex = "-1";
              }
            }
          }
        }

      })
    }
  })

  // 点击颜色/尺寸、处理器/操作系统、内存/硬盘/显卡后，获得三个值进行筛选，从而自动跳转到该页面

  // var guigeitem0=document.getElementById("guigeitem0");
  // var guigeitem1=document.getElementById("guigeitem1");
  // var guigeitem2=document.getElementById("guigeitem2");
  $(function () {
    $("#guige").on("click", "span", (e) => {
      var $click = $(e.target);
      console.log($click)
      $click.toggleClass("active")
        .siblings().removeClass("active");
    })
    // $.ajax({
    //   url: "http://localhost:3000/details",
    //   type: "get",
    //   data: { lid, fid, condition_a, condition_b, condition_c },
    //   dataType: "json"
    // }).then(output2 => {
    // })
  })





  // js动态效果

  // 页面说明
  // 本页面用于说明product.html（详情页）文件中的动态效果
  // 点击收藏，旁边的心变红
  $(() => {
    var pubfav = document.getElementsByClassName("pubfav")[0];
    pubfav.onclick = function () {
      var mubiao = pubfav.getElementsByTagName("span")[0];
      //点击的元素，图片改变
      onlyclick(mubiao, " dark_favicon", " light_favicon");
    }
  })



  //滚动事件
  $(() => {
    $(window).scroll(() => {
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop >= 200) {
        $(".content_left").css("margin-top", 0)
      } else {
        $(".content_left").css("margin-top", -60)
      }
      var $cr = $(".content_right");
      var $cl = $(".content_left");
      // 左侧区域的top的位置
      var offsetTop = parseInt($cr.offset().top)
      //	右侧区域的整体高度
      var hr = parseInt($cr.css("height"));
      //	左侧区域的整体高度
      var hl = parseInt($cl.css("height"));
      // 左右之间的差，即可以移动的距离
      var h = hr - hl;
      if (scrollTop - offsetTop < 0) {		//移动超过左侧区域的绝对位置
        $cl.css({ "position": "relative", "top": 0 })
      } else if (scrollTop - offsetTop > 0 && scrollTop - offsetTop <= h) {
        $cl.css({ "position": "absolute", "top": `${50 + scrollTop - offsetTop}px` })
      } else if (scrollTop - offsetTop > h) {
        $cl.css({ "position": "absolute", "top": h })
      }
    })
  })

  // 该文件为主页右侧导览栏的动作设置
  //使右侧导览栏在[50,5400]区间显示
  $(() => {
    $(window).scroll(() => {
      //滚动定位
      var sort_right = document.getElementsByClassName("sort-list_right")[0];
      var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      //右边导航栏滚动定位
      var mh = parseInt($(".product_main").css("height"));
      if (scrollTop >= 50 && scrollTop < mh - 300) {
        sort_right.style.display = "block";
      } else {
        sort_right.style.display = "none";
      }
    })
  })

  // 点击效果
  // 商品详情	配置信息	商品评价	服务支持	切换
  $(() => {
    // 商品介绍 跳转点击
    $("#container_info").on("click", ".ul-box li", (e) => {
      var $li = $(e.target);
      // 所点击的添加class
      $li.parent().children(["li"]).removeClass("checked");
      $li.addClass("checked");
      // 获得自定义属性值
      var num = $li.attr("data-index");
      // 下面4个项目的显隐
      var a = $li.parent().nextAll();
      $(a).css("display", ["none"]);
      $(a[num]).css("display", ["block"]);
    })

    // 商品评价评论点击
    $(".assess_tRight>span").on("click", function () {
      var $span = $(this);
      $span.parent().children(["span"]).removeClass("checked");
      $span.addClass("checked");
      var a = $span.children(":first-child")
      $span.parent().children(["span"]).children(":first-child").removeClass("radioActive").addClass("radio");
      $(a).addClass("radioActive")
    })
  })

  // 页低固定条二维码移入弹出弹窗，移出弹窗消失
  $(() => {
    // 移入
    $("#ewm_icon").on("mouseover", function () {
      var $icon = $(this);
      $icon.parent().children(":last-child").slideDown()
    })
      // 移出
      .on("mouseout", function () {
        var $icon = $(this);
        $icon.parent().children(":last-child").slideUp()
      })
  })

  // 评论区，用户上传的图片点击效果
  $(() => {
    // 点击缩略图后，显示大图
    $(".assess_picTop").on("click", "div", function () {
      var $click = $(this);
      // console.log($click)
      var num = $click.attr("data-index");
      // console.log(num)
      $click.toggleClass("redborder")
        .children("span").toggle()
        .parent().siblings().removeClass("redborder")
        .children("span").hide()
        .parent().parent().next().children("ul").children(`:nth-child(${num})`).toggle()
        .siblings().hide();
    })
    // 点击左右箭头，使图片转换
    $(".btn_div").on("click", function (e) {
      var $btn = $(e.target);
      // 在使用jQuery自带的显隐性会在第一次使元素变成inline，第二次显示时变为block
      // 为查找元素进行筛选
      var spana = $(".assess_picTop .assess_picBtn .sanjiao[style='display: inline;']");
      var spanb = $(".assess_picTop .assess_picBtn .sanjiao[style='display: block;']");
      // 当点击的为左箭头时
      if ($btn.attr("class") == "assess_btnLeft") {
        // 查找显示的图片的自定义属性值
        if (spana.parent().attr("data-index") > 1) {
          spana.hide()
            .parent().removeClass("redborder")
            .prev().toggleClass("redborder")
            .children("span").show()
            .parent().parent().next().children("ul").children(`:nth-child(${spana.parent().attr("data-index") - 1})`).show()
            .siblings().hide();
          // console.log(spana.parent().attr("data-index"))
        } else if (spanb.parent().attr("data-index") > 1) {
          spanb.hide()
            .parent().removeClass("redborder")
            .prev().toggleClass("redborder")
            .children("span").toggle()
            .parent().parent().next().children("ul").children(`:nth-child(${spanb.parent().attr("data-index") - 1})`).show()
            .siblings().hide();
          // console.log(spanb.parent().attr("data-index"))
        }
      } else {	// 当点击的为右箭头时			
        // console.log($btn)
        if (spana.parent().attr("data-index") < 8) {
          spana.hide()
            .parent().removeClass("redborder")
            .next().toggleClass("redborder")
            .children("span").show()
            .parent().parent().next().children("ul").children(`:nth-child(${parseInt(spana.parent().attr("data-index")) + 1})`).show()
            .siblings().hide();
        } else if (spanb.parent().attr("data-index") < 8) {
          spanb.hide()
            .parent().removeClass("redborder")
            .next().toggleClass("redborder")
            .children("span").show()
            .parent().parent().next().children("ul").children(`:nth-child(${parseInt(spanb.parent().attr("data-index")) + 1})`).show()
            .siblings().hide();
        }
      }
    })
  })


})

// 请求尾页
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