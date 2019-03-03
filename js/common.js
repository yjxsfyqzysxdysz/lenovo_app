
// 封装，点击小图大图改变
// json,数据库导出文件
// self,点击的元素
// anyData,使用data-toggle=1的样式
// imgsrc,img文件的位置
function picchange(json, self, anyData, imgsrc) {
    var num = 0;
    for (var emp of json) {
        num++;
        for (var key in emp) { }
        if (num == self.getAttribute(anyData)) {
            var newaddress = emp[key];
            imgsrc.src = `./img/product/md/${newaddress}`;
        }
    }
}

//封装，一组元素点击后改变（增加/减少）同一class属性
//onclick,要改变的元素
//otherclick,其余的元素
//value,该元素的值
function manyclick(onclick, otherclick, value) {
    if (onclick.className != value) {
        var smpic_chked = document.querySelector(otherclick);
        smpic_chked.className = "";
        onclick.className = value;
    }
}

//封装，同一元素点击后改变（增加/减少）不同class属性
//onclick,改变的元素
//initial,该元素的初始值
//value1,属性1；value2,属性2
function onlyclick(onclick, value1, value2) {
    if (onclick.className.indexOf(value1, 0) != -1) {
        onclick.className = onclick.className.replace(value1, "");
        onclick.className += value2;
    } else {
        onclick.className = onclick.className.replace(value2, "");
        onclick.className += value1;
    }
}


