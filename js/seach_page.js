// 页面登录时自动加载
$(function () {
  var pno = 0;
  function loadPage(no = 0) {
    pno = no;
    if ((location.search.indexOf("kwords=") != -1) && ($(".filtrate_list>ul>li:first-child>.le_sel_cont>.term").length == 0)) {   // 如果登录
      var kwords = decodeURIComponent(location.search.split("=")[1]);
      $(".search_result_nav").children().html(kwords);
      $.ajax({
        url: "http://localhost:3000/products",
        type: "get",
        data: { kwords, pno },
        dataType: "json",
        success: function (output) {
          console.log(output);
          var { products, pno, pageCount, count } = output;
          $("#searchProCount").html(count);
          // 页面上的产品清单
          var html = "";
          for (var p of products) {
            var { lid, title, subtitle, price, photo } = p;
            html += `
              <li>
                <!--图片区域-->
                <a href="product.html?lid=${lid}" class="productList_img">
                  <img src="${photo}" alt="">
                </a>
                <!--图片标记-->
                <div class="icons_mark">
                  <i class="fenqifukuan" title="分期付款"></i>
                  <i class="yijiuhuanxin" title="以旧换新"></i>
                  <span class="youhuiquan">优惠券</span>
                </div>
                <!--文字部分-->
                <!--标题-->
                <div class="product_title">
                  <a href="product.html?lid=${lid}" class="product_title_text redhover">${title}</a>
                </div>
                <!--说明-->
                <div class="product_msg">
                  <a>${subtitle}</a>
                </div>
                <!--价格-->
                <div class="product_price">${price.toFixed(2)}</div>
                <!--对比勾选框-->
                <a href="javascript:;" class="product_select_chk">
                  <i></i>
                  <span>对比</span>
                </a>
              </li>
            `;
          }
          $("#productList").html(html);


          // 上一页、下一页页码按钮
          // 上一页按钮
          var html = `<a href="javascript:;" class="prevpage ${pno == 0 ? 'disabled' : ''}">&lt;</a>`;
          // 页码按钮
          for (var i = 0; i < pageCount; i++) {
            html += `<a href="javascript:;" class="page_num redhover ${pno == i ? 'activity' : ''}">${i + 1}</a>`
          }
          // 下一页按钮
          html += `<a href="javascript:;" class="nextpage ${pno == pageCount - 1 ? 'disabled' : ''}">&gt;</a>`
          $(".page").html(html);


        }
      })
    }
  }
  loadPage();   // 调用函数
  // 翻页
  if ((location.search.indexOf("kwords=") != -1) && ($(".filtrate_list>ul>li:first-child>.le_sel_cont>.term").length == 0)) {
    // 页码的点击效果
    $(".page").on("click", "a:not(.disabled):not(.active)", function (e) {
      e.preventDefault();
      var $a = $(e.target);
      if ($a.hasClass("prevpage")) {   // 上一页
        loadPage(pno - 1);
      } else if ($a.hasClass("nextpage")) {   // 下一页
        loadPage(pno + 1);
      } else {    // 任意页
        // $a.html()
        loadPage($a.html() - 1);
      }
    })
  }
})

// 价格栏
$(() => {
  // 点击弹出价格输入框
  $(".search_peace_center").on("click", "input", function (e) {
    var $btn = $(e.target);
    if ($btn.is("[readonly='readonly']")) {
      $btn.nextAll("div").toggleClass(" show");
    }
  })
  // 点击输入框后，该框消失
  $(".price_info").on("click", function (e) {
    var $btn = $(e.target);
    if ($btn.is("a")) {
      $btn.parent().removeClass(" show");
    }
  })
})

// 选中框样式
$(() => {
  $(".search_peace_right").on("click", "a", function (e) {
    var $chk = $(e.target);
    var $a = $(".search_peace_right>a").children();
    if ($chk.is($a)) {
      $chk.parent().children("i").toggleClass(" chk_show");
    }
  })
  $(".productList").on("click", "i", function (e) {
    var $chk = $(e.target);
    if ($chk.is("i")) {
      $chk.toggleClass(" chk_show");
    }
  })
})


// 筛选框点击事件
$(".filtrate_list").on("click", (e) => {
  var $click = $(e.target);
  var uid = sessionStorage.getItem("key");
  var pno = 0;
  if (($click.parent().hasClass("list_sel_down") || ($click.parent().hasClass("list_sel_up")))) {    // 点击 -更多选项- ，筛选栏的显隐性
    $click.parent().toggleClass("show")
      .siblings("a").toggleClass(" show")
      .prevAll("ul").children(":nth-child(3)").nextAll().toggleClass(" show");
  } else if ($click.parent().hasClass("le_sel_morechoice")) {   // 点击 -多选按- 钮，可多选
    $click.parent().parent().toggleClass("active")
      .children(".le_sel_cont").children("a").children("span").toggleClass("block")
      .parent().next(".le_sel_btn").toggleClass("block");
    for (var i = 0; i < $click.parent().prev().children("a").length; i++) {   // 如果 一个筛选条件在单选时已经被选中，则在打开多选栏后，其选中表示也将被点中
      if ($($click.parent().prev().children("a")[i]).children("em").attr("style") == "color: red;") {
        $($($click.parent().prev().children("a")[i]).children("span").addClass("chk_show"));
      }
    }
  } else if ($click.hasClass("searchicon")) {    // 多选按钮的 -条件选择- 
    $click.toggleClass("chk_show");
    if ($click.hasClass("chk_show")) {
      $click.next().css("color", "red");
    } else {
      $click.next().css("color", "#737373");
    }
  } else if ($click.hasClass("le_btn_cancel")) {    // 点击 -取消- 按钮
    $click.parent().removeClass("block")
      .siblings().children("span").removeClass("block chk_show")
      .next().css("color", "#737373");
  } else if ($click.hasClass("le_btn_sure")) {    // 点击 -确定- 按钮
    $click.parent().parent().parent().prevAll().last().slideDown(500);
    var subscript = $(".filtrate_list>ul>li").index($click.parent().parent().parent()[0]);    // 制作下标，点击时所在li的下标 

    if ($(".list_sel_plan .le_sel_cont").children().length > 1) {    // 如果 -已选条件- 栏中有新增的筛选条件
      var dataChoice = $(".list_sel_plan .le_sel_cont").children("[data-choice]");

      for (var i = 0; i < dataChoice.length; i++) {   // 选中同一类型下的两个元素时，后选择的会顶替先选择的元素
        if ($(dataChoice[i]).attr("data-choice") == subscript) {
          $(dataChoice[i]).remove();
        }
      }
    }
    var choice_content = '';
    for (var i = 0; i < $click.parent().prevAll().length; i++) {
      if ($($click.parent().prevAll()[i]).children("span").hasClass("chk_show")) {
        choice_content += $($click.parent().prevAll()[i]).children("em").html() + ' ';
      }
    }
    // 在 -已选条件- 栏，创建新的标签来存放所选的筛选信息
    var $a = $(`<a href="javascript:;" class="term" data-choice=${subscript}></a>`);
    var html = `<i>${$click.parent().parent().prev().html()}</i><em>${choice_content}</em><b class="clearterm">X</b><span>&gt;</span>`;
    $a.html(html);
    $(".list_sel_plan>.le_sel_cont>.le_allcancel").before($a);    // 插入到 -全部清除- 之前
    // choice();   // 搜索商品，页面重写
    multipleChoice();   // 搜索商品，页面重写
  } else if (($click.parent().parent().parent(":not('.active')").hasClass("clearfix")) && ($click.parent().parent().prev().html() != "已选条件:")) {    // 点击 筛选条件（单选） 字体变红，上 已选条件 栏出现，并显示已选条件
    $click.css("color", "red")    // 点击的条件字体变为红色
      .parent().siblings().children("em").css("color", "#737373")   // 其余字体恢复为原色
      .parent().parent().parent().parent().children().first().slideDown(500);   // 已选条件 栏弹出
    var subscript = $(".filtrate_list>ul>li").index($click.parent().parent().parent()[0]);    // 制作下标，点击时所在li的下标 

    if ($(".list_sel_plan .le_sel_cont").children().length > 1) {    // 如果 -已选条件- 栏中有新增的筛选条件
      var dataChoice = $(".list_sel_plan .le_sel_cont").children("[data-choice]");

      for (var i = 0; i < dataChoice.length; i++) {   // 单选时，选中同一类型下的两个元素时，后选择的会顶替先选择的元素
        if ($(dataChoice[i]).attr("data-choice") == subscript) {
          $(dataChoice[i]).remove();
        }
      }

    }

    // 在 -已选条件- 栏，创建新的标签来存放所选的筛选信息
    var $a = $(`<a href="javascript:;" class="term" data-choice=${subscript}></a>`);
    var html = `<i>${$click.parent().parent().prev().html()}</i><em>${$click.html()}</em><b class="clearterm">X</b><span>&gt;</span>`;
    $a.html(html);
    $(".list_sel_plan>.le_sel_cont>.le_allcancel").before($a);    // 插入到 -全部清除- 之前
    choice();   // 搜索商品，页面重写

  } else if ($click.hasClass("clearterm")) {    // 单独点击删除选择条件时，该条件删除，下面该类别所有字体颜色恢复原色
    if ($click.parent().parent().children().length == 2) {
      $click.parent().parent().parent().slideUp(500);
    }
    $click.parent().remove();
    $($(".filtrate_list ul").children()[$click.parent().attr("data-choice")]).children().children().children("em").css("color", "#737373");
    choice();   // 搜索商品，页面重写
  } else if ($click.hasClass("le_allcancel")) {    // 点击 已选条件 上的全部撤销 按钮，将 已选条件 栏收回，所选条件清空，下面条件标识恢复原状
    $click.prevAll().remove();
    $click.parent().parent().slideUp(500)
      .nextAll().children().children().children("em").css("color", "#737373")
      .prev().removeClass("chk_show");
    choice();   // 搜索商品，页面重写
  }

  // 每组搜索条件时 && 的关系——搜索商品
  function choice(no = 0) {
    var term = $(".filtrate_list>ul>li:first-child>.le_sel_cont>.term");
    var kwords = '';
    pno = no;
    if (term.length > 0) {
      for (var i = 0; i < term.length; i++) {
        kwords += decodeURIComponent($(term[i]).children("em").html() + ',');
      }
      $.ajax({
        url: "http://localhost:3000/products/filtrate",
        type: "get",
        data: { kwords, uid, pno },
        dataType: "json",
        success: function (output) {
          console.log(output)

          var { products, pno, pageCount, count } = output;
          if (count > 1) {
            $("#searchProCount").html(count);
            // 页面上的产品清单
            var html = "";
            for (var p of products) {
              var { lid, title, subtitle, price, photo } = p;
              html += `
                  <li>
                    <!--图片区域-->
                    <a href="product.html?lid=${lid}" class="productList_img">
                      <img src="${photo}" alt="">
                    </a>
                    <!--图片标记-->
                    <div class="icons_mark">
                      <i class="fenqifukuan" title="分期付款"></i>
                      <i class="yijiuhuanxin" title="以旧换新"></i>
                      <span class="youhuiquan">优惠券</span>
                    </div>
                    <!--文字部分-->
                    <!--标题-->
                    <div class="product_title">
                      <a href="product.html?lid=${lid}" class="product_title_text redhover">${title}</a>
                    </div>
                    <!--说明-->
                    <div class="product_msg">
                      <a>${subtitle}</a>
                    </div>
                    <!--价格-->
                    <div class="product_price">${price.toFixed(2)}</div>
                    <!--对比勾选框-->
                    <a href="javascript:;" class="product_select_chk">
                      <i></i>
                      <span>对比</span>
                    </a>
                  </li>
                `;
            }
            $("#productList").html(html);

            // 上一页、下一页页码按钮
            // 上一页按钮
            var html = `<a href="javascript:;" class="prevpage ${pno == 0 ? 'disabled' : ''}">&lt;</a>`;
            // 页码按钮
            for (var i = 0; i < pageCount; i++) {
              html += `<a href="javascript:;" class="page_num redhover ${pno == i ? 'activity' : ''}">${i + 1}</a>`
            }
            // 下一页按钮
            html += `<a href="javascript:;" class="nextpage ${pno == pageCount - 1 ? 'disabled' : ''}">&gt;</a>`
            $(".page").html(html);


          } else {
            "暂无该商品，请重试"
          }


        }
      })
    } else {
      loadPage();
    }
  }
  // 翻页
  if ((location.search.indexOf("kwords=") != -1) && ($(".filtrate_list>ul>li:first-child>.le_sel_cont>.term").length != 0)) {
    // 页码的点击效果
    $(".page").on("click", "a:not(.disabled):not(.active)", function (e) {
      e.preventDefault();
      var $a = $(e.target);
      if ($a.hasClass("prevpage")) {   // 上一页
        choice(pno - 1);
      } else if ($a.hasClass("nextpage")) {   // 下一页
        choice(pno + 1);
      } else {    // 任意页
        // $a.html()
        choice($a.html() - 1);
      }
    })
  }


  // 每组搜索条件中有数条搜索元素（复数）为 || 关系——搜索商品
  // 应将前端获取的每一组筛选条件以一个数组的形式发往后端
  // 当多选时，则是以二维数组的形式发送
  // 不当以字符串的形式传递

  function multipleChoice() {
    var term = $(".filtrate_list>ul>li:first-child>.le_sel_cont>.term");
    var kwords = [];
    if (term.length > 0) {
      for (var i = 0; i < term.length; i++) {
        kwords.push(decodeURIComponent($(term[i]).children("em").html()));
      }


      $.ajax({
        url: "http://localhost:3000/products/multipleChoice",
        type: "get",
        data: { kwords, uid },
        dataType: "json",
        success: function (output) {
          console.log(output)
        }
      })
    }
  }
})
