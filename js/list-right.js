// 文件说明
// 该文件为主页右侧导览栏的动作设置
//使右侧导览栏在[50,5400]区间显示
$(() => {
    //滚动定位
    var sort_right = document.getElementsByClassName("sort-list_right")[0];
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    //右边导航栏滚动定位
    if (scrollTop >= 50 && scrollTop < 5400) {
        sort_right.style.display = "block";
    } else {
        sort_right.style.display = "none";
    }

})