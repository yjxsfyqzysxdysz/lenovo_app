// 会员中心左侧导览栏 点击后显隐
$(() => {
  $("#user_leftbox>div.user_list h3").on('click', function () {
    var $click = $(this);
    $click.next().slideToggle(500);
  })
})

// 修改头像
// 点击修改头像及其文字，可获得
$(() => {
  toggleHeadSet = function () {
    $(".msg_right").toggle(500)
      .next().toggle(500)
  }
})

// 请求页脚
$(function () {
  $.ajax({
    url: "./footer2.html",
    type: "get",
    success: function (res) {
      // res->html片段
      // console.log(res);
      $(res).replaceAll("footer");
    }
  })
})

// 从服务器获取用户信息，并写在页面上
$(() => {
  // 获得原始密码
  // 从服务器获取用户订单信息，并写在页面上
  var uid = sessionStorage.getItem("key");
  if (uid != undefined) {
    // 用户信息
    $.ajax({
      url: "http://localhost:3000/users/sel",
      type: "get",
      data: { uid },
      dataType: "json",
      success: function (res) {
        console.log(res)
        $("#oldpass").val(res.upwd);

        // 会员中心用户信息从数据库获取
        $(".userName").html(res.uname);
        $(".userMyId").html("NO.00000000" + res.uid);
        $("#infoform>ul").children("li:first-child").children("p:last-child").html(res.uname)
          .parent().next().children(":nth-child(2)").children("input").val(res.nickname)
          .parent().parent().next().children("p:last-child").children(`[value=${res.gender}]`).attr("checked", true)
          .siblings("input").attr("checked", false)
          .parent().parent().next().children("p:last-child").children().val(res.birthday)
          .parent().parent().next().children(":nth-child(2)").children().val(res.user_name)
          .parent().parent().next().children("div:nth-child(2)").children("input").val(res.habitat.split(" ")[0] + " " + res.habitat.split(" ")[1])
          .parent().next().children("input").val(res.habitat.split(" ")[2] + " " + res.habitat.split(" ")[3])
          .parent().next().children("input").val(res.habitat.split(" ")[4] + " " + res.habitat.split(" ")[5])
          .parent().parent().next().children("p:last-child").children().val(res.address)
          .parent().parent().next().children("p:last-child").children().val(res.phone);

        //  选择居住地 市-县/区
        $(() => {

          // 市
          var cities = [
            [{ "name": "市区", "value": 1101 },
            { "name": "郊县", "value": 1102 }],// 北京
            [{ "name": "市区", "value": 1201 }],// 天津
            [{ "name": "石家庄", "value": 1301 }],// 河北
            [{ "name": "太原", "value": 1401 }],// 山西
            [{ "name": "呼和浩特", "value": 1501 }],// 内蒙
            [{ "name": "沈阳", "value": 2101 }],// 辽宁
            [{ "name": "长春", "value": 2201 }],// 吉林
            [{ "name": "哈尔滨", "value": 2301 }],// 黑龙江
            [{ "name": "市区", "value": 3101 }],// 上海
            [{ "name": "南京", "value": 3201 }],// 江苏
            [{ "name": "杭州", "value": 3301 }],// 浙江
            [{ "name": "合肥", "value": 3401 }],// 安徽
            [{ "name": "福州", "value": 3501 }],// 福建
            [{ "name": "南昌", "value": 3601 }],// 江西
            [{ "name": "济南", "value": 3701 }],// 山东
            [{ "name": "郑州", "value": 4101 }],// 河南
            [{ "name": "武汉", "value": 4201 }],// 湖北
            [{ "name": "长沙", "value": 4301 }],// 湖南
            [{ "name": "广州", "value": 4401 }],// 广东
            [{ "name": "南宁", "value": 4501 }],// 广西
            [{ "name": "海口", "value": 4601 }],// 海南
            [{ "name": "市区", "value": 5001 }],// 重庆
            [{ "name": "成都", "value": 5101 }],// 四川
            [{ "name": "贵阳", "value": 5201 }],// 贵州
            [{ "name": "昆明", "value": 5301 }],// 云南
            [{ "name": "拉萨", "value": 5401 }],// 西藏
            [{ "name": "西安", "value": 6101 }],// 陕西
            [{ "name": "兰州", "value": 6201 }],// 甘肃
            [{ "name": "西宁", "value": 6301 }],// 青海
            [{ "name": "银川", "value": 6401 }],// 宁夏
            [{ "name": "乌鲁木齐", "value": 6501 }],// 新疆
            [{ "name": "台北", "value": 7101 }],// 台湾
            [{ "name": "市区", "value": 8101 }],// 香港
            [{ "name": "市区", "value": 8201 }]// 澳门
          ]
          // 区/街道
          var counties = [
            [[// 北京
              { "name": "东城区", "value": 110101 },
              { "name": "西城区", "value": 110102 },
              { "name": "海淀区", "value": 110103 },
              { "name": "昌平区", "value": 110104 },
              { "name": "朝阳区", "value": 110105 },
              { "name": "大兴区", "value": 110106 },
              { "name": "房山区", "value": 110107 },
              { "name": "丰台区", "value": 110108 },
              { "name": "海淀区", "value": 110109 },
              { "name": "怀柔区", "value": 110110 },
              { "name": "密云区", "value": 110111 },
              { "name": "平谷区", "value": 110112 },
              { "name": "顺义区", "value": 110113 },
              { "name": "通州区", "value": 110114 },
              { "name": "延庆区", "value": 110115 },
              { "name": "门头沟区", "value": 110116 },
              { "name": "石景山区", "value": 110117 }
            ],
            [{ "name": "郊县", "value": 110201 }]],
            [[// 天津
              { "name": "和平区", "value": 120101 },
              { "name": "河东区", "value": 120102 },
              { "name": "河西区", "value": 120103 },
              { "name": "南开区", "value": 120104 },
              { "name": "河北区", "value": 120105 },
              { "name": "红桥区", "value": 120106 },
              { "name": "海滨新区", "value": 120107 },
              { "name": "东丽区", "value": 120108 },
              { "name": "西青区", "value": 120109 },
              { "name": "津南区", "value": 120111 },
              { "name": "北辰区", "value": 120112 },
              { "name": "武清区", "value": 120113 },
              { "name": "宝坻区", "value": 120114 },
              { "name": "宁河区", "value": 120115 },
              { "name": "静海区", "value": 120116 },
              { "name": "蓟州区", "value": 120117 }
            ]],
            [[{ "name": "裕华区", "value": 130101 }]],// 石家庄
            [[{ "name": "迎泽区", "value": 140101 }]],// 太原
            [[{ "name": "赛罕区", "value": 150101 }]],// 呼和浩特
            [[{ "name": "和平区", "value": 210101 }]],// 沈阳
            [[{ "name": "朝阳区", "value": 220101 }]],// 长春		
            [[{ "name": "香坊区", "value": 230101 }]],// 哈尔滨
            [[{ "name": "闵行区", "value": 310101 }]],// 市区
            [[{ "name": "秦淮区", "value": 320101 }]],// 南京
            [[{ "name": "上城区", "value": 330101 }]],// 杭州
            [[{ "name": "蜀山区", "value": 340101 }]],// 合肥
            [[{ "name": "台江区", "value": 350101 }]],// 福州
            [[{ "name": "东湖区", "value": 360101 }]],// 南昌
            [[{ "name": "历下区", "value": 370101 }]],// 济南
            [[{ "name": "中原区", "value": 410101 }]],// 郑州
            [[{ "name": "汉阳区", "value": 420101 }]],// 武汉
            [[{ "name": "岳麓区", "value": 430101 }]],// 长沙
            [[{ "name": "荔湾区", "value": 440101 }]],// 广州
            [[{ "name": "良庆区", "value": 450101 }]],// 南宁
            [[{ "name": "龙华区", "value": 460101 }]],// 海口
            [[{ "name": "渝中区", "value": 500101 }]],// 重庆
            [[{ "name": "武侯区", "value": 510101 }]],// 成都
            [[{ "name": "南明区", "value": 520101 }]],// 贵阳
            [[{ "name": "呈贡区", "value": 530101 }]],// 昆明
            [[{ "name": "堆龙德庆区", "value": 540101 }]],// 拉萨
            [[
              { "name": "新城区", "value": 610101 },
              { "name": "莲湖区", "value": 610102 },
              { "name": "碑林区", "value": 610103 },
              { "name": "雁塔区", "value": 610104 },
              { "name": "未央区", "value": 610105 },
              { "name": "灞桥区", "value": 610106 },
              { "name": "长安区", "value": 610107 },
              { "name": "临潼区", "value": 610108 },
              { "name": "阎良区", "value": 610109 },
              { "name": "鄠邑区", "value": 610110 }
            ]],// 西安
            [[{ "name": "城关区", "value": 620101 }]],// 兰州
            [[{ "name": "城中区", "value": 630101 }]],// 西宁
            [[{ "name": "金凤区", "value": 640101 }]],// 银川
            [[{ "name": "天山区", "value": 650101 }]],// 乌鲁木齐
            [[{ "name": "中正区", "value": 710101 }]],// 台北
            [[{ "name": "深水埗区", "value": 810101 }]],// 中西区
            [[{ "name": "花地玛堂区", "value": 820101 }]]// 花地玛堂区
          ]

          // 判断 该用户在数据库中是否有habitat数据
          // 若没有，则一步一步重写 DOM 树，省->市->区
          // 若有，则一次性重写数据库中所三级地址所在的数组

          // 判断数据库是否有habitat数据
          if (res.habitat == "") {    // 如果数据库中没有数据
            selhaitat();
          } else {    // 如果数据库中有数据 就直接重写DOM树
            // 城市
            for (var i = 0; i < cities.length; i++) {
              for (var j = 0; j < cities[i].length; j++) {
                if (cities[i][j].value == res.habitat.split(" ")[3]) {
                  // console.log(cities[i])
                  var frag = document.createDocumentFragment();
                  frag.appendChild(new Option("请选择城市"));
                  for (var c of cities[i]) {
                    frag.appendChild(new Option(c.name, c.value));
                  }
                  $("#city").html("")
                    .append(frag);
                }
              }
            }
            // 区县
            for (var i = 0; i < counties.length; i++) {
              for (var j = 0; j < counties[i].length; j++) {
                for (var k = 0; k < counties[i][j].length; k++) {
                  if (counties[i][j][k].value == res.habitat.split(" ")[5]) {
                    var frag = document.createDocumentFragment();
                    frag.appendChild(new Option("请选择区/县"));
                    for (var c of counties[i][j]) {
                      frag.appendChild(new Option(c.name, c.value));
                    }
                    $("#dist").html("")
                      .append(frag);
                  }
                }
              }
            }
            // 使数据库中已有地址数据，自动被选择
            $(`#province option[value='${res.habitat.split(" ")[1]}']`).attr('selected', true);
            $(`#city option[value='${res.habitat.split(" ")[3]}']`).attr('selected', true);
            $(`#dist option[value='${res.habitat.split(" ")[5]}']`).attr('selected', true);
            selhaitat();
          }
          // 封装函数，使得改变habitat时，其对应的value值也跟着改变
          function selhaitat() {
            // jquery方法
            var selCts = document.getElementsByName("cities")[0];
            var selCos = document.getElementsByName("counties")[0];
            // 选择市
            $("#province").change(function () {
              var $selProvs = $(this);
              console.log($selProvs)
              var i = $selProvs.get(0).selectedIndex;//i=selProvs的下标
              console.log(i)
              // $selProvs.next().val($selProvs.children(`:eq(${i})`).html());
              $selProvs.next().val($selProvs.children(`:eq(${i})`).html() + " " + $selProvs.children(`:eq(${i})`).val());
              if (i > 0) {
                var arr = cities[i - 1];
                var frag = document.createDocumentFragment();
                frag.appendChild(new Option("请选择城市"));
                for (var c of arr) {
                  frag.appendChild(new Option(c.name, c.value));
                }
                selCts.innerHTML = "";
                selCts.appendChild(frag);
                selCos.innerHTML = `<option value="">区/县</option>`;
                selCts.nextElementSibling.value = "";
                selCos.nextElementSibling.value = "";
              }
              // 选择区
              $("#city").on("change", function () {
                var $selCities = $(this);
                var j = $selCities.get(0).selectedIndex;
                // $selCities.next().val($selCities.children(`:eq(${j})`).html());
                $selCities.next().val($selCities.children(`:eq(${j})`).html() + " " + $selCities.children(`:eq(${j})`).val());
                if (j > 0) {
                  var arr = counties[i - 1][j - 1];
                  var frag = document.createDocumentFragment();
                  frag.appendChild(new Option("请选择区/县"));
                  for (var c of arr) {
                    frag.appendChild(new Option(c.name, c.value));
                  }
                  selCos.innerHTML = "";
                  selCos.appendChild(frag);
                  selCos.nextElementSibling.value = "";
                }
                // 选择县
                $("#dist").on("change", function () {
                  var $selContainer = $(this);
                  var k = $selContainer.get(0).selectedIndex;
                  // $selContainer.next().val($selContainer.children(`:eq(${k})`).html());
                  $selContainer.next().val($selContainer.children(`:eq(${k})`).html() + " " + $selContainer.children(`:eq(${k})`).val());
                })

              })
            })
          }
          /*
            // 给由服务器中返回的地址信息，在下拉窗口中显示数据库中的数据
            // $("#select_id option[text='jQuery']").attr("selected", true);    // 不会用，不理解jQuery是个什么东西，是[]选择器出现了问题
            // var count = $("#province option").length;
            // for (var i = 0; i < count; i++) {
            //   if ($("#province").get(0).options[i].text == "北京市") {
            //     $("#province").get(0).options[i].selected = true;
            //     break;
            //   }
            // }
  
            // html DOM
            // var selProvs = document.getElementById("province");
            // var selCities = document.getElementById("city");
            // var selContainer = document.getElementById("dist");
            // selProvs.onchange = function () {
            //   var selProvs = this;
            //   console.log(selProvs)
            //   var i = selProvs.selectedIndex;//i=selProvs的下标
            //   // console.log(i)
            //   // console.log(selProvs.nextElementSibling)
            //   selProvs.nextElementSibling.value = selProvs.children[i].innerHTML;
            //   var selCts = document.getElementsByName("cities")[0];
            //   if (i > 0) {
            //     var arr = cities[i - 1];
            //     var frag = document.createDocumentFragment();
            //     frag.appendChild(new Option("请选择城市"));
            //     for (var c of arr) {
            //       frag.appendChild(new Option(c.name, c.value));
            //     }
            //     selCts.innerHTML = "";
            //     selCts.appendChild(frag);
            //   }
            //   // 选择区
            //   selCities.onchange = function () {
            //     var selCities = this;
            //     var j = selCities.selectedIndex;
            //     selCities.nextElementSibling.value = selCities.children[j].innerHTML;
            //     var selCos = document.getElementsByName("counties")[0];
            //     if (j > 0) {
            //       var arr = counties[i - 1][j - 1];
            //       var frag = document.createDocumentFragment();
            //       frag.appendChild(new Option("请选择区/县"));
            //       for (var c of arr) {
            //         frag.appendChild(new Option(c.name, c.value));
            //       }
            //       selCos.innerHTML = "";
            //       selCos.appendChild(frag);
            //     }
            //     // 选择县
            //     selContainer.onchange = function () {
            //       var selContainer = this;
            //       var k = selContainer.selectedIndex;
            //       selContainer.nextElementSibling.value = selContainer.children[k].innerHTML;
            //     }
            //   }
            // }
          */
        })
      }
    })

    //密码验证
    $(".paswd_box>div>ul>li>p>input").on("focusout", function (e) {
      e.preventDefault();
      var $msg = $("#checkCodeWarn")
      if ($(e.target).val() == "") {
        $msg.html("新密码不能为空")
          .css("display", "block");
      } else if (!(/^\w{8,20}$/).test($(e.target).val())) {  // 8-20位字符
        $msg.html("请输入正确格式的密码")
          .css("display", "block");
      } else if ($(e.target).parent().parent().parent().children("li:nth-child(2)").children("p:last-child").children().val() != $(e.target).parent().parent().parent().children("li:nth-child(3)").children("p:last-child").children().val()) {
        $msg.html("两次输入不一致！")
          .css("display", "block");
      } else {
        $msg.css("display", "none");
      }


    })

    // 修改密码
    $("#changepasssubmit").on("click", function () {
      var upwd = $("#newpass").val().toString();
      $.ajax({
        url: "http://localhost:3000/users/update",
        type: "post",
        data: { uid, upwd },
        dataType: "json",
        success: function (res) {
          // console.log(res);
          if (res.code == 200) {
            console.log("密码重置成功");
            alert("密码重置成功");
            location.href = "./user_homepage.html";
          } else {
            console.log("密码重置失败");
            alert("密码重置失败");
            $("#newpass").val("")
              .parent().parent().next().children("p:last-child").children("input").val("");
          }
        }
      })
    })

    //  修改用户信息
    $("#pushedit").on("click", function () {
      var $submit = $(this);
      var $msg_ul = $(".msg_ul");
      // 获取页面上的值给参数，再拿参数在下面进行判断
      // 确定是否传入服务器
      var nickname = $msg_ul.children(":eq(1)").children(":eq(1)").children().val();
      var gender = $msg_ul.children(":eq(2)").children(":eq(1)").children(["checked=true"]).val();
      var birthday = $msg_ul.children(":eq(3)").children(":eq(1)").children().val();
      var user_name = $msg_ul.children(":eq(4)").children(":eq(1)").children().val();
      var pro = $msg_ul.children(":eq(5)").children(":eq(1)").children("input").val();
      var cit = $msg_ul.children(":eq(5)").children(":eq(2)").children("input").val();
      var cou = $msg_ul.children(":eq(5)").children(":eq(3)").children("input").val();
      var habitat = pro + " " + cit + " " + cou;
      var address = $msg_ul.children(":eq(6)").children(":eq(1)").children().val();
      var phone = $msg_ul.children(":eq(7)").children(":eq(1)").children().val();

      // 如果4个表*数据均有值，且值为真，则传入服务器，对数据库进行修改
      if (nickname && gender && birthday && (habitat.indexOf("undefined", 0) == -1 && habitat.indexOf("请", 0) == -1)) {
        $.ajax({
          url: "http://localhost:3000/users/update",
          type: "post",
          data: { nickname, gender, birthday, user_name, habitat, address, uid, phone },
          dataType: "json",
          success: function (res) {
            console.log(res);
            if (res.code == 200) {
              console.log("设置成功");
              alert("设置成功");
              // location.href = "./user_homepage.html";
            } else {
              console.log("设置失败");
              alert("设置失败");
            }
          }
        })
      } else {
        if (!nickname) {
          $(".error-container").css("display", "block")
            .children("p").html("会员昵称不能为空");
          return;
        } else if (!birthday) {
          $(".error-container").css("display", "block")
            .children("p").html("生日不能为空");
          return;
        } else if (habitat.indexOf(undefined, 0) != -1 || habitat.indexOf("请", 0) != -1) {
          // console.log(11111)
          $(".error-container").css("display", "block")
            .children("p").html("请输入正确的居住地");
          return;
        }
      }
    })

    // 上传头像   /* *************************************未完成******************************* */
    $(".uphead_btn").on("click", function (e) {
      if ($(e.target).attr("id") == "uploadImg") {      // 若点击保存按钮

      } else {    // 若点击取消按钮

      }
    })

    // 从服务器获取用户订单信息，并写在页面上
    $(() => {
      $.ajax({
        url: "http://localhost:3000/cart/userorder",
        type: "get",
        data: { uid },
        dataType: "json",
        success: function (res) {
          console.log(res)
          if (res.code == 0) {    // 没有订单
            var html = `<div class="right_middle_buttom_none">
            (⊙︿⊙)，您买的东西太少了，这里都空空的，快去挑选合适的商品吧！
          </div>`;
            $(".right_middle_buttom").html(html);
          } else if (res.code == 1) {    // 订单

            var div = $('<div class="right_middle_bottom_exist"></div>');
            var html = '';
            var msg = '';   // 订单状态 
            $(".right_middle_buttom").empty();    // 清空节点
            
            for (var i = 0; i < res.output.order.length; i++) {   // 遍历每个订单
              var prices = res.output.order[i].price.split(",");    // 价格
              prices.pop();
              var counts = res.output.order[i].count.split(",");
              counts.pop();
              var lid = res.output.order[i].lid.split(",");
              lid.pop();
              var count = 0;    // 商品总数量
              var price = 0;    // 商品总价格
              switch (res.output.order[i].status) {
                case 3: msg = "等待付款";
                  break;
                case 4: msg = "等待发货";
                  break;
                case 5: msg = "运输中";
                  break;
                case 6: msg = "已签收";
                  break;
                default: msg = "已取消";
              }
              // 时间
              var t = new Date(res.output.order[i].order_time).toString().split(" ");
              var year = t[3];
              var m = t[1];
              var date = t[2];
              var time = t[4];
              var month;
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
              var div = $(`<div class="right_middle_bottom_exist_order"></div>`);

              var order_img = order_name = '';   // 图片
              for (var j=0;j<lid.length;j++) {   // 遍历一个订单中的每个商品
                for (var k = 0; k < res.output.laptop.length; k++) {    // 用订单中商品的id与与返回的laptop中的id相对比，的带laptop的下标
                  if (res.output.laptop[k].lid == lid[j]) {
                    order_img += `<div class="goodsimg"><a href="/product.html?lid=${res.output.laptop[k].lid}"><img src="${res.output.laptop[k].photo}" title="${res.output.laptop[k].title}"></a></div>`;
                    order_name += `<span><a href="/product.html?lid=${res.output.laptop[k].lid}" class="redhover nowrap" title="${res.output.laptop[k].title}">${res.output.laptop[k].title}</a></span>`
                  }
                }
                count += parseInt(counts[j]);   // 1个订单中有几个商品，就加几次
                console.log(counts[j])
                price += parseInt(prices[j]);
                var html = `
                  <!-- 图片 -->
                  <div class="exist_order_img">${order_img}</div>
                  <!-- 商品名称 -->
                  <div class="exist_order_name">${order_name}</div>
                  <!-- 数量 -->
                  <div class="exist_order_num">
                    <span>${count}</span>
                  </div>
                  <!-- 总价格 -->
                  <div class="exist_order_allprice">
                    <div>¥
                      <span>${price.toFixed(2)}</span>
                    </div>
                    <div>在线支付</div>
                  </div>
                  <!-- 下单时间 -->
                  <div class="exist_order_ordertime">
                    <span>${year}-${month}-${date} ${time}</span>
                  </div>
                  <!-- 订单状态 -->
                  <div class="exist_order_status">
                    <span id="orderstatus">${msg}</span>
                  </div>
                  <!-- 查看（跳转页） -->
                  <div class="exist_order_opt">
                    <a href="javascript:;" class="redhover">查看</a>
                  </div>
                  <!-- 分割线 -->
                  <div class="hline"></div>
                `;
              }
              div.html(html);
              $(".right_middle_buttom").append(div);
              if (i == 3) { return }    // 只显示4个订单
            }
          }
        }
      })
    })
  }
})

// 输入窗口判断
$(() => {
  $(".msg_ul").on("focusout", function (e) {   // 失去焦点
    e.preventDefault();
    if ($(e.target).attr("id") == "username") {   // 会员昵称
      if ($(e.target).val() == "") {
        $(".error-container").css("display", "block")
          .children("p").html("会员昵称不能为空");
      }
    }
    if ($(e.target).attr("id") == "province") {    // 居住地
      console.log($(e.target).next().val())
      if ($(e.target).next().val().indexOf(undefined, 0) != -1 || $(e.target).next().val().indexOf("请", 0) != -1) {
        $(".error-container").css("display", "block")
          .children("p").html("请填写正确的居住地址");
      } else {
        $(".error-container").css("display", "none");
      }
    } else if ($(e.target).attr("id") == "city") {
      if ($(e.target).next().val().indexOf(undefined, 0) != -1 || $(e.target).next().val().indexOf("请", 0) != -1) {
        $(".error-container").css("display", "block")
          .children("p").html("请填写正确的居住地址");
      } else {
        $(".error-container").css("display", "none");
      }
    } else if ($(e.target).attr("id") == "dist") {
      if ($(e.target).next().val().indexOf(undefined, 0) != -1 || $(e.target).next().val().indexOf("请", 0) != -1) {
        $(".error-container").css("display", "block")
          .children("p").html("请填写正确的居住地址");
      } else {
        $(".error-container").css("display", "none");
      }
    }


    // 正则判断输入内容
    if ($(e.target).attr("id") == "mobilePhone") {  // 输入手机号
      vali($(e.target), /^1\d{10}$/, "请输入正确的手机号码");   // 以1开头的11位数字
    } else if ($(e.target).attr("class") == "username") {    //  输入会员昵称
      vali($(e.target), /^\w{4,20}$/, "请输入正确的会员昵称");      // 8-20位字符
    }
  })
  // 封装函数
  function vali(txt, reg, msg) {
    var $err = $(".error-msg");
    if (!reg.test(txt.val())) {
      $err.html(msg)
        .parent().css("display", "block");
    } else {
      $err.parent().css("display", "none");
    }
  }
})

