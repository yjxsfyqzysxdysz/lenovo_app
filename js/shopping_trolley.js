// 加载页面自动赋值
$(() => {
  var uid = sessionStorage.getItem("key");
  if (uid != undefined) { // 表示已登录

    // 向数据库请求购物车数据
    $.ajax({
      url: "http://localhost:3000/cart/sel",
      type: "get",
      data: { uid },
      dataType: "json",
      success: function (res) {
        // console.log(res); // 返回一个类数组对象，数组内为数量，对象内为商品信息

        // 判断，数据库中改用户购物车中是否有商品
        // 没有，保持原样
        // 若有，重写DOM树
        if (res.is_del != 1) { //  1为删除，0为未删除
          if (res.length != 0) { // 为有数据返回，则重写DOM树
            // console.log(res.product.length)

            // 建立基本页面
            var html = `
              <!-- 第一列 选择框 -->
              <div class="bc_option clearfix">
                <!-- 当选中之后,加上class:"active" -->
                <div class="bc_all clearfix">
                  <a href="javascript:;" calss="chooseall"></a>
                  <span></span>
                </div>
              </div>
              <!-- 列表主体 -->
              <div class="bc_table" id="main_table">
                <!-- 表头 -->
                <table cellpadding="0" cellspacing="0">
                  <tbody>
                    <tr>
                      <th colspan="3" width="462">商品</th>
                      <th width="163">规格</th>
                      <th width="152">单价</th>
                      <th width="152">数量</th>
                      <th width="152">金额</th>
                      <th width="117">操作</th>
                    </tr>
                  </tbody>
                </table>
                <!-- 内容 -->
                <table cellpadding="0" cellspacing="0">
                  <tbody></tbody>
                </table>
              </div>
              <!-- 统计区域 -->
              <div class="bc_num clearfix">
                <!-- 左侧checked -->
                <div class="bc_num_fl">
                  <!-- 全选按钮 -->
                  <div class="bc_all clearfix">
                    <a href="javascript:;" calss="chooseall"></a>
                    <span style="cursor:pointer;">全选</span>
                  </div>
                  <!-- 删除按钮 -->
                  <a href="javascript:;" class="bc_num_del">删除选中商品</a>
                </div>
                <!-- 右侧 价格总计 -->
                <ul class="bc_num_fr">
                  <li style="margin-top:0;">商品总价：￥0.00 </li>
                  <li>优惠节省：￥ 0.00 </li>
                  <li>合计：
                    <span class="bc_red" id="totalmoneyf"> ￥ 0.00 </span>
                  </li>
                </ul>
              </div>
              <!-- 结算按钮 -->
              <div class="bc_probtn clearfix">
                <a href="javascript:;" title="去结算" id="submit">去结算</a>
              </div>
            `
            $("#cart_main").html(html);
            // 在页面中动态生成商品条目
            // var items = [];
            for (var i = 0; i < res.product.length; i++) {
              var tr = document.createElement("tr");
              tr.setAttribute("data-count", i)
              tr.innerHTML = `
                <!-- 选项 -->
                <td width="57" class="bc_table_sel">
                  <a href="javascript:;"></a>
                </td>
                <!-- 商品_图片 -->
                <td width="148" class="bc_table_img">
                  <a href="/product.html?lid=${res.product[i].lid}">
                    <img src="${res.product[i].photo}" alt="" title="${res.product[i].title}">
                  </a>
                  <div class="bc_zhezhao"></div>
                </td>
                <!-- 商品_名称 -->
                <td width="257" class="bc_proname bc_name_gift">
                  <a href="/product.html?lid=${res.product[i].lid}" class="redhover" title="${res.product[i].title}">${res.product[i].title}</a>
                </td>
                <!-- 规格 -->
                <td width="163">
                  <a href="javascript:;" class="redhover">${res.product[i].spec}</a>
                </td>
                <!-- 单价 -->
                <td width="152" style="position:relative;">
                  <span class="current_price">${res.product[i].price.toFixed(2)}</span>
                  <!--满减-->
                </td>
                <!-- 数量 -->
                <td width="152">
                  <!-- 数量按钮 区域 -->
                  <label class="i_box clearfix">
                    <!-- 按钮 - -->
                    <input class="pro_less" type="button" value="-"">
                    <!-- 输入窗口 -->
                    <input class="pro_num" maxnum="100" type="text" value="${res.shopping_trolley[i].count}" style="ime-mode: disabled;">
                    <!-- 按钮 + -->
                    <input class="pro_add" maxnum="100" type="button" value="+"">
                  </label>
                </td>
                <!-- 金额 -->
                <td width="152" class="bc_red">￥${(res.shopping_trolley[i].count * res.product[i].price.toFixed(2)).toFixed(2)}</td>
                <!-- 操作  -->
                <td width="117" style="text-align:left">
                  <a href="javascript:;" class="redhover" title="删除" data-toggle="del">删除</a>
                  <br>
                  <a href="javascript:;" class="redhover" title="收藏">移入收藏夹</a>
                </td>
              `;
              var frag = document.createDocumentFragment();
              frag.appendChild(tr);
              document.getElementById("main_table").children[1].children[0].appendChild(frag);
            }
            // 价格总计
            // total();

            // 页面点击效果
            $(() => {
              // 页面的点击
              $("#cart_main").on("click", (e) => {
                $click = $(e.target);
                // 点击全选按钮  或  单选按钮
                if ($click.parent().hasClass("bc_all clearfix")) {    // 点击全部商品
                  if ($click.parent().hasClass("active")) {
                    $(".bc_all").removeClass("active");
                    $("#main_table>table>tbody>tr>td:first-child").removeClass("active");
                  } else {
                    $(".bc_all").addClass("active");
                    $("#main_table>table>tbody>tr>td:first-child").addClass("active");
                  }
                } else if ($click.parent().hasClass("bc_table_sel")) {   // 点击单个商品
                  if ($click.parent().hasClass("active")) {   // 如果被点击项有被选中,点击就取消
                    if ($("#main_table table:last-child tr td:first-child:not(.active)").length == 0) {   // 如果全部都被选中
                      $(".bc_all").removeClass("active");
                    }
                    $click.parent().removeClass("active");
                  } else {    // 如果被点击项没有被选中,点击就选中
                    $click.parent().addClass("active");
                    if ($("#main_table table:last-child tr td:first-child:not(.active)").length == 0) {   // 如果没有全部被选中
                      $(".bc_all").addClass("active");
                    }
                  }
                } else if ($click.hasClass("bc_num_del")) {   // 点击的是全选删除按钮
                  if ($click.parent().parent().prev().children(":last-child").children().children().children().hasClass("active")) { // 如果有被选中项
                    var iid = []; // 将iid存入iid中
                    for (var i = 0; i < $click.parent().parent().prev().children(":last-child").children().children().children(".active").length; i++) {
                      iid.push(res.shopping_trolley[$click.parent().parent().prev().children(":last-child").children().children().children(".active")[i].parentElement.getAttribute("data-count")].iid); // 通过自定义属性获取得下标值
                    }
                    // console.log(iid)
                    if (iid.length == $click.parent().parent().prev().children(":last-child").children().children().length) {   //全部删除
                      if (confirm(`是否清空购物车？`)) {
                        del(iid);// 购物车商品复数删除
                      }
                    } else {    // 复数删除
                      if (confirm(`是否删除共计 ${iid.length} 件商品？`)) {
                        del(iid);// 购物车商品复数删除
                      }
                    }
                  } else {    // 没有商品被点选中时，点击“删除选中项”
                    alert("请选择至少一件商品");
                  }
                } else if ($click.attr("data-toggle") == 'del') {   // 点击的是单个商品的删除
                  // 点击请求对应的iid
                  // 点击它，返回其父级的父级的下标
                  for (var i = 0; i < $click.parent().parent().parent().children().length; i++) {
                    if ($click.parent().parent().parent().children()[i] == $click.parent().parent()[0]) { // 找到对象下标 i
                      // console.log(res.shopping_trolley[i].iid)
                      var iid = [res.shopping_trolley[i].iid]; // 在购物车中的序号
                      var product = res.product[i]; // 商品名称
                      var shopping_item = res.shopping_trolley[i]; //  商品信息
                    }
                  }
                  // 删除一件商品
                  if (confirm(`是否删除第 ${i + 1} 件商品：${product.title} ？`)) {
                    // confirm为alert弹出窗口的返回值，为bool属性
                    // 通过iid去数据库中通过SQL语句进行删，加，减等操作
                    del(iid);  // 删除单个商品
                  }
                } else if ($click.hasClass("pro_less")) {   // 商品数量减
                  var n = parseInt($click.next().val());
                  if (n > 1) {
                    n--;
                    $click.next().val(n);
                    amount();   // ajax请求 改变商品数量
                    // 实时改变商品小计价格及总价
                    $click.parent().parent().next().html(`￥ ${(parseInt($click.next().val()) * parseInt($click.parent().parent().prev().children().html())).toFixed(2)}`);
                    // 价格总计
                    // total();
                  }
                } else if ($click.hasClass("pro_add")) {   // 商品数量加
                  var subscript = $click.parent().parent().parent().attr("data-count") // 下标
                  var n = parseInt($click.prev().val());
                  if (n < res.product[subscript].inventory) {   // 
                    n++;
                    $click.prev().val(n);
                    amount();   // ajax请求 改变商品数量
                    // 实时改变商品小计价格及总价
                    // 小计
                    $click.parent().parent().next().html(`￥ ${(parseInt($click.prev().val()) * parseInt($click.parent().parent().prev().children().html())).toFixed(2)}`);
                    // 价格总计
                    // total();
                  }
                }



                var price = 0.00;
                var tr = $("tr[data-count]");
                for (var i = 0; i < tr.length; i++) {
                  if ($(tr[i]).children(":first-child").hasClass("active")) {
                    price += parseInt($(tr[i]).children(":nth-child(7)").html().split("￥")[1]);
                  }
                }
                $(".bc_num_fr").children(":first-child").html(`商品总价：￥ ${price.toFixed(2)}`)
                  .next().next().children("span").html(` ￥ ${price.toFixed(2)} `);




                // 改变商品数量
                function amount() {
                  var iid = res.shopping_trolley[$click.parent().parent().parent().attr("data-count")].iid;
                  var lid = res.shopping_trolley[$click.parent().parent().parent().attr("data-count")].lid;
                  var count = $click.siblings(".pro_num").val();
                  $.ajax({
                    url: "http://localhost:3000/cart/amount",
                    type: "post",
                    data: { iid, count, lid, uid },
                    dataType: "json",
                    success: function (res) {
                      // console.log(res)
                    }
                  })
                }

                // 价格总计
                function total() {
                  var total = 0;
                  for (var i = 0; i < $("#main_table>table:last-child>tbody").children().length; i++) {
                    total += parseInt((($("#main_table>table:last-child>tbody").children()[i].children[6].innerHTML).split("￥")[1]).split(".")[0]);
                  }
                  $(".bc_num_fr").children(":first-child").html(`商品总价：￥ ${total.toFixed(2)}`);    // 商品总价
                  $(".bc_num_fr").children(":last-child").children().html(`￥ ${(total - $(".bc_num_fr").children(":nth-child(2)").html().split("￥ ")[1]).toFixed(2)}`);    // 合计
                }

                // 购物车商品删除
                function del(iid) {
                  $.ajax({
                    url: "http://localhost:3000/cart/del",
                    type: "get",
                    data: { iid },
                    dataType: "json",
                    success: function (res) {
                      if (res.code == 1) {
                        location.reload(); // 重新加载当前文档
                      }
                    }
                  })
                }
              })
            })


            console.log(res)
            $("#submit").click(function () {    // 点击页面去结算按钮，可跳至订单页面
              var $click = $(this);
              var tbody = $click.parent().prev().prev().children(":last-child").children();
              var lid = [];
              for (var i = 0; i < tbody.children().length; i++) {
                if (tbody.children()[i].firstElementChild.className == "bc_table_sel active") {
                  lid.push(res.product[i].lid);
                }
              }

              $.ajax({
                url: "http://localhost:3000/cart/indent",   // 跳至订单页面
                type: "get",
                data: { lid, uid},
                dataType: "json",
                success: function (res) {
                  if (res.ok == 1) {
                    location.href = "/settlement.html";
                  } else {
                    alert("请先选择商品");
                  }
                }
              })
            })
          } else { // 如果购物车中无数据
            var html = `
              <div class="bc_table">
                <table cellpadding="0" cellspacing="0">
                  <tbody>
                    <tr>
                      <th colspan="3" width="37%">商品</th>
                      <th width="14%">规格</th>
                      <th width="13%">单价</th>
                      <th width="13%">数量</th>
                      <th width="13%">金额</th>
                      <th width="10%">操作</th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="bc_nopro clearfix">
                <h3>您的购物车内暂无商品,您可以</h3>
                <div class="bc_no_btn">
                  <a href="index.html" title="选购商品" event-name="PC_选购商品">选购商品</a>
                </div>
              </div>
            `

            // 购物车 判断删除商品后是否还有商品
            // 若没有 则删除dom树，重写
            var num = $("#main_table>table:nth-child(2)>tbody").children().length;
            // num=0，即没有商品
            if (num == 0) {
              $("#cart_main").children().remove();
              $("#cart_main").append(html);
            }
          }
        }
      }
    })


  } else {
    // alert("请先登录");
    // location.href = "./"
  }
})