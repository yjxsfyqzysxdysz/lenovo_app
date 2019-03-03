// 点击 新增收货地址 按钮
$(() => {
  $(".new_p").on("click", function () {
    var $newAdd = $(this);
    $newAdd.parent().parent().children(":last-child").attr("style", "display:block");
  })
})

// 封装函数，使得改变habitat时，其对应的value值也跟着改变
function selhaitat() {
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
  // 区/县
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

  var selCts = document.getElementById("city");
  var selCos = document.getElementById("dist");
  // 选择市
  $("#province").change(function () {
    var $selProvs = $(this);

    var i = $selProvs.get(0).selectedIndex;//i=selProvs的下标
    // console.log(i)
    // $selProvs.next().val($selProvs.children(`:eq(${i})`).html());
    // console.log($selProvs.children(`:eq(${i})`))
    $selProvs.next().val($selProvs.children(`:eq(${i})`).html() + " " + $selProvs.children(`:eq(${i})`).val() + " " + i);
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
      $selCities.next().val($selCities.children(`:eq(${j})`).html() + " " + $selCities.children(`:eq(${j})`).val() + " " + j);
      if (j > 0) {
        var arr = counties[i - 1][j - 1];
        var frag = document.createDocumentFragment();
        frag.appendChild(new Option("请选择区/县"));
        // console.log(arr)
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
        $selContainer.next().val($selContainer.children(`:eq(${k})`).html() + " " + $selContainer.children(`:eq(${k})`).val() + " " + k);
      })

    })
  })
}

// 填写地址栏信息 
$(() => {     // 填写 新增收货地址 时
  selhaitat();
  // 由于input 的 type="checkbox" 的模式下 value 始终不改变
  $("#check").click(function () {
    $(this).toggleClass("on")
      .toggleClass("ou");
  })
})

// 动态获取数据库 le_user 中的用户地址信息
$(() => {
  var uid = sessionStorage.getItem("key");
  if (!(uid == undefined)) {    // 如果已经登录

    // 1.判断改用是否有收货地址，若有收货地址，则自动写入
    // 2.点击×，删除收货信息
    // 3.点击修改，修改收货人信息，并传入数据库

    // 1.判断该用户是否有收货地址，若有收货地址，则自动写入
    $.ajax({
      url: "http://localhost:3000/users/seladdress",
      type: "get",
      data: { uid },
      dataType: "json",
      success: function (res) {
        console.log(res)
        var aid;
        if (res.code == 1) {   // 如果有收货地址
          for (var i = 0; i < res.result.length; i++) {
            if (res.result[i].is_default == 1) {   //  如果给地址为默认地址，则将改地址写入到第一个，粉色底的pink_bg
              $(".address").children(":first-child").attr("data-add", i)
                .children(":first-child")
                .html(res.result[i].receiver)
                .next().html(res.result[i].cellphone)
                .next().html(`${res.result[i].province.split(" ")[0]}${res.result[i].city.split(" ")[0]}${res.result[i].county.split(" ")[0]}    ${res.result[i].address}`);
              $("#_a").val(res.result[i].aid);
            }
            if (res.result[i].is_default == 0) {   // 如果有多个地址，将非默认地址自动以重写DOM树的方式写在默认地址下边
              var $div = $(`<div class='box-ax' data-add=${i}></div>`);
              var html = `
                  <p style="width:190px">${res.result[i].receiver}</p>
                  <p style="width:140px">${res.result[i].cellphone}</p>
                  <p style="width:500px">${res.result[i].province.split(" ")[0]}${res.result[i].city.split(" ")[0]}${res.result[i].county.split(" ")[0]}    ${res.result[i].address}</p>
                  <p class="ax-sp">
                    <span class="red">修改</span>
                    <a href="javascript:;">╳</a>
                  </p>
              `
              $div.html(html);
              $("#hidden").append($div);
            }
          }
          // 更多地址展现
          $(() => {
            $(".address_more").on("click", function (e) {
              var $btn = $(e.target);
              if ($btn.is("span") || $btn.is("img")) {
                if ($btn.parent().children("img").hasClass("update_ico")) {
                  $btn.parent().children("img").removeClass(" update_ico")
                    .addClass("downdate_ico")
                    .parent().parent().prev().slideToggle(500);
                } else {
                  $btn.parent().children("img").removeClass("downdate_ico")
                    .addClass("update_ico")
                    .parent().parent().prev().slideToggle(500);
                }
              }
            })
          })

          // 新增收货地址关闭按钮
          $(() => {
            $(".box-a>div:last-child").on("click", function (e) {
              var $close = $(e.target);
              if ($close.is("a")) {
                $close.parent().attr("style", "display:none")
                  .children(":last-child").children(":first-child").children("input").val("")
                  .parent().next().children("input").val("")
                  .parent().next().children().children("input").val("")
                  .parent().parent().children(":nth-child(2)").children(":first-child")[0].selectedIndex = 0;
                $("#city").html("<option value=''>城市</option>")
                  .parent().next().children(":first-child").html(`<option value="">区/县</option>`)
                  .parent().parent().next().children().val("")
                  .parent().next().children().val("")
                  .parent().next().children().children().removeClass().addClass("ou").attr("checked", false);
              }
            })
          })

          // 2.点击×，删除收货信息
          // 3.点击修改，修改收货人信息，并传入数据库

          /* ************************************ */
          /* 存在问题，点击修改地址时，在地址下拉选中，获得从数据库获得的数据，但当有地址时，直接修改“区/县”，则无法修改其对应的value值，造成保存错误，但不报错，只是无法保存正确的地址 */
          /* ************************************ */
          // 对现有收件人进行修改/删除等操作
          $(() => {
            $(".address .box-ax").on("click", function (e) {
              var $close = $(e.target);
              // 2.点击×，删除收货信息
              if ($close.is("a")) {   // 点击删除按钮
                // console.log($close)
                for (var i = 0; i < res.result.length; i++) {
                  if (i == $close.parent().parent().attr("data-add")) {
                    var aid = res.result[i].aid;
                    if (confirm(`是否删除该收件人信息？`)) {
                      $.ajax({
                        url: "http://127.0.0.1:3000/users/order_del",
                        type: "get",
                        data: { aid },
                        dataType: "json",
                        success: function (res) {
                          console.log(res)
                          location.reload();
                        }
                      })
                    }
                  }
                }
              }

              // 3.点击修改，修改收货人信息，并传入数据库
              if ($close.is(".red")) {    // 点击修改按钮
                for (var i = 0; i < res.result.length; i++) {
                  if (i == $close.parent().parent().attr("data-add")) {
                    aid = res.result[i].aid;
                    $(".box").css("display", "block")
                      .children("ul").children(":first-child").children("input").val(res.result[i].receiver)
                      .parent().next().children(":nth-child(2)").val(res.result[i].cellphone)
                      .next().next().next().val(res.result[i].fixedphone)
                      .parent().next().children(":nth-child(2)").children("input").val(res.result[i].province)
                      .parent().next().children("input").val(res.result[i].city)
                      .parent().next().children("input").val(res.result[i].county)
                      .parent().parent().next().children("input").val(res.result[i].address)
                      .parent().next().children("input").val(res.result[i].email)
                      .parent().next().children().children("input").prop("checked", res.result[i].is_default);

                    // 写入居住地下拉选的选项
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
                    // 区/县
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
                    var selCts = document.getElementById("city");
                    var selCos = document.getElementById("dist");
                    var j = res.result[i].province.split(" ")[2];//i=selProvs的下标
                    if (j > 0) {
                      var arr = cities[j - 1];
                      var frag = document.createDocumentFragment();
                      frag.appendChild(new Option("请选择城市"));
                      for (var c of arr) {
                        frag.appendChild(new Option(c.name, c.value));
                      }
                    }
                    selCts.innerHTML = "";
                    selCts.appendChild(frag);
                    var k = res.result[i].city.split(" ")[2];
                    if (k > 0) {
                      var arr = counties[j - 1][k - 1];
                      var frag = document.createDocumentFragment();
                      frag.appendChild(new Option("请选择区/县"));
                      for (var c of arr) {
                        frag.appendChild(new Option(c.name, c.value));
                      }
                      selCos.innerHTML = "";
                      selCos.appendChild(frag);
                    }
                    $("#province").val(res.result[i].province.split(" ")[1]);
                    $("#city").val(res.result[i].city.split(" ")[1]);
                    $("#dist").val(res.result[i].county.split(" ")[1]);
                    // insert_address(aid);
                  }
                }
              }
            })
          })

          // 创建新的收件人地址
          insert_address(aid);

        } else {    // 如果没有收件人地址
          insert_address(aid);
        }
        // 构造函数——新增收件人地址
        function insert_address(aid) {
          $(".box button").click(function () {
            var $click = $(this);

            var receiver = $(".box>ul").children(":first-child").children("input").val();       // 收货人
            var cellphone = $(".box>ul").children(":nth-child(2)").children(":nth-child(2)").val();   // 移动电话
            var fixedphone = $(".box>ul").children(":nth-child(2)").children(":last-child").val();    // 固定电话
            var province = $("#_p").val();    // 省
            var city = $("#_c").val();    // 市
            var county = $("#_d").val();    // 区县
            var address = $(".box>ul").children(":nth-child(4)").children(":nth-child(2)").val();    // 详细地址
            var email = $(".box>ul").children(":nth-child(5)").children(":nth-child(2)").val();    // 邮箱
            var is_default = $(".box>ul").children(":nth-child(6)").children().children("input").attr("class");    // 是否为默认地址

            // 判断4个带星号的数据是否输入正确

            if (receiver.replace(/(^\s*)|(\s*$)/g, '').length == 0) {    // 收货人姓名不得为空
              $(".box>ul").children(":first-child").children("input").next().html("收货人姓名不能为空")
                .attr("style", "display:inline-block;");
            } else {
              $(".box>ul").children(":first-child").children("input").next().attr("style", "display:none;");
            }
            vali(cellphone, /^1\d{10}$/, "请输入正确的手机号码");   // 正确的手机号
            var a = b = c = 0;
            if (province != "" && province.indexOf("请", 0) == -1) {
              a = 1;
            } else {
              a = 0;
            }
            if (city != "" && city.indexOf("请", 0) == -1) {
              b = 1;
            } else {
              b = 0;
            }
            if (county != "" && county.indexOf("请", 0) == -1) {
              c = 1;
            } else {
              c = 0;
            }
            if (a + b + c == 3) {
              $("#_d").parent().next().attr("style", "display:none;");
            } else {
              $("#_d").parent().next().html("请输入正确的地址")
                .attr("style", "display:inline-block;");
            }
            if (address.replace(/(^\s*)|(\s*$)/g, '').length == 0) {    // 详细地址不得为空
              $(".box>ul").children(":nth-child(4)").children(":nth-child(2)").next().html("详细地址不能为空")
                .attr("style", "display:inline-block;");
            } else {
              $(".box>ul").children(":nth-child(4)").children(":nth-child(2)").next().attr("style", "display:none;");
            }

            // 封装函数
            function vali(txt, reg, msg) {
              if (!reg.test(txt)) {
                $(".box>ul").children(":nth-child(2)").children(":nth-child(3)").html(msg)
                  .attr("style", "display:inline-block;");
              } else {
                $(".box>ul").children(":nth-child(2)").children(":nth-child(3)").attr("style", "display:none;");
              }
            }

            for (var i = 0; i < $(".err").length; i++) {
              if ($($(".err")[i]).attr("style") == "display:none;") {
                if (i == 3) {     // 当4个必填项都符合要求时，则可以传输

                  $.ajax({
                    url: "http://localhost:3000/users/address",
                    type: "post",
                    data: { uid, receiver, province, city, county, address, cellphone, fixedphone, email, is_default, aid },
                    dataType: "json",
                    success: function (res) {
                      if (res.code == 1) {   // 如果有收货地址
                        alert("新地址保存成功")
                        location.href = "/settlement.html";
                      } else if (res.code == 0) {
                        alert("新地址保存失败，请稍后重试");
                      } else if (res.code == 3) {
                        console.log(res)
                        alert("新地址保存成功");
                        $(".box").css("display", "none");
                        // 重写DOM树
                      }
                    }
                  })
                }
              }
            };
          })
        }

        // 当点击页面上非默认地址的收货地址时，给该地址添加一个 is_checked = 1，
        // 并将is_checked = 1 的项为最高优先级，且项只有一个
        // is_default 为在 is_checked = 0 时的最高级
        $(".address [data-add]").click(function () {
          var $click = $(this);
          if ($click.parent().attr("id") == "hidden") {
            console.log($click)
            $("#hidden").prepend($click.parent().prev().removeClass("pink_bg"));
            $(".address").prepend($click.addClass("pink_bg"));
            var i = $click.attr("data-add");
            aid = res.result[i].aid;
            $("#_a").val(res.result[i].aid);
          }
        })
      }
    })

    // 获得商品信息
    $.ajax({
      url: "http://localhost:3000/cart/sel_order",
      type: "get",
      data: { uid },
      dataType: "json",
      success: function (res) {
        console.log(res)
        var price = 0;
        for (var i = 0; i < res.laptop.length; i++) {
          var $div = $("<div class='list'></div>");
          var html = `
              <!-- 图片 -->
              <p class="list-a">
                <a href="javascript:;">
                  <img src="${res.laptop[i].photo}" title="${res.laptop[i].title}">
                </a>
              </p>
              <!-- 名称 -->
              <p class="list-b">
                <a href="javascript:;" title="${res.laptop[i].title}" class="redhover">${res.laptop[i].title}</a>
              </p>
              <!-- 单价 -->
              <p class="list-c">${res.laptop[i].price.toFixed(2)}</p>
              <!-- 数量 -->
              <p class="list-d">${res.order.count.split(",")[i]}</p>
              <!-- 总价 -->
              <p class="list-e">${(res.laptop[i].price * res.order.count.split(",")[i]).toFixed(2)}</p>
          `;
          $div.html(html);
          $(".box-02").append($div);
          price += res.laptop[i].price * res.order.count.split(",")[i];
        }

        $(".box-06").children(":first-child").children("span").children().html(`￥ ${price.toFixed(2)}`);

        // 封装函数，修改 le_order 表单的status的数值，n为要修改的数
        function update_status(n, oid) {
          var status = n;
          $.ajax({
            url: "http://127.0.0.1:3000/cart/update_order",
            type: "get",
            data: { oid, status },
            dataType: "json",
            success: function (res) {
              if (res.code == 1) {
                console.log(res.msg);
              } else {
                console.log(res.msg);
              }
            }
          })
        }

        // 当前 结算中心 页面的oid
        var oid = res.order.oid;
        // 点击提交订单
        $(() => {
          $(".box-05").on("click", function (e) {
            var $click = $(e.target);
            if (($click.prop("tagName") == "INPUT") || ($click.prop("tagName") == "A")) {
              if ($click.prop("tagName") == "A") {    // 如果点中的是a标签
                if ($click.prev().prop("checked")) {
                  $click.prev().prop("checked", false);
                } else {
                  $click.prev().prop("checked", true);
                }
              }
              if ($click.parent().children("input").prop("checked")) {
                $click.parent().parent().next().children(":last-child").children("button").css("background", "#e2231a");
                $(".box-06").on("click", function (e) {
                  var $button = $(e.target);
                  if ($button.html() == "提交订单") {
                    if ($button.css("background") == "rgb(226, 35, 26) none repeat scroll 0% 0% / auto padding-box border-box") {
                      // 提交订单
                      // 封装函数，修改 le_order 表单的status的数值，n为要修改的数
                      // update_status(2, oid);`
                      var aid = $("#_a").val();
                      var price = [];
                      var list = $(".list-e");
                      for (var i = 0; i < list.length; i++) {
                        price.push($(list[i]).html());
                      }
                      $.ajax({
                        url: "http://127.0.0.1:3000/cart/submit_order",
                        type: "get",
                        data: { aid, oid, price },
                        dataType: "json",
                        success: function (res) {
                          if(res.code==1){
                            location.href = "/checkout.html";
                          }else{
                            console.log(res);
                          }
                        }
                      })
                    }
                  }
                })
              } else {
                $click.parent().parent().next().children(":last-child").children("button").css("background", "#7c7c7c")
              }

            }
          })
        })

        // 点击 返回购物车修改 ,返回购物车
        $(() => {
          $(".box-tl>p>a").click(function () {
            $click = $(this);
            if (confirm("是否要返回购物车，以修改商品？")) {
              update_status(0, oid);
              location.href = "/shopping_trolley.html";
            }
          })
        })
      }
    })
  }
})