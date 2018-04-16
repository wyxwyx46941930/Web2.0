/*
使用说明：
①点击start，然后拼图发生乱序重排，时间开始变化
②在点击start之前，点击拼图是不会发生移动的，同时步数不会被统计，时间也不会变化
③点击start之后，如果点击help，拼图就会被自动还原，同时时间也会变化，步数也会增加
④在点击help还原的过程中，再点击start和help或者是任意一块拼图，均没有效果
⑤最终help还原结束之后，相当于游戏结束，这时候再点击拼图，不会发生异动，重新点击start开始新的游戏
⑥时间函数setInertel只能让函数开始跟结束无法暂停，这里是我的锅
*/
var judge = false; //设置开始前不可以点击图片
var stop_judge = true; //设置按钮可否点击
var timeFun = 0; //设置图像变量问题
var solution = []; //设立一个存入解决方案的栈
var count = 0;
var n_sec = 0; //秒
var n_min = 0; //分
var n_hour = 0; //时
var show_time = document.getElementById("time"); //插入显示时间变量
var step_show = document.getElementById("step"); //插入显示步数变量
/*使用onload解决页面显示问题*/
window.onload = function() {
    create_pic();
    timer();
    document.getElementById("restart").addEventListener("click", random_pos);
    document.getElementById("change_image").addEventListener("click", findSolution);
};
/*创立二维数组时事更新id与类的位置*/
var n_timer = timer();
var creat_array = new Array(); //设置最初的数组
var build_array = new Array(); //设置判断数组
function create_pic() {
    picture = document.getElementById("picture");
    for (var i = 1; i <= 16; i++) {
        var part = document.createElement("div");
        part.addEventListener("click", pic_move);
        part.className = "picture_part" + count + " position_" + i;
        picture.appendChild(part);
        part.id = "_position_" + i;
        creat_array[i - 1] = part;//由于这里是传引用所以可以随着图像的变化自动改变数组里面的内容
    }
    build_two_array();
}

function build_two_array() {
    for (var i = 0; i < 4; i++) {
        build_array[i] = new Array();
    }
    var count = 0;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            build_array[i][j] = creat_array[count];
            count++;
        }
    }
}
/*检查函数*/
function check() {
    var count = 1;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var partId = "_position_" + count;
            if (build_array[i][j].id != partId) {
                document.getElementById("result").innerText = "Playing";
                return;
            }
            count++;
        }
    }
    document.getElementById("result").innerText = "You win";
    judge = false;
    return;
}
/*还原图形的函数*/
function do_find() {
    document.getElementById("result").innerText = "Playing";
    if (solution.length > 0) {
        var step_first = document.getElementById("step");
        var now_step = parseInt(step_first.value);
        now_step += 1;
        var temp = now_step.toString();
        step.value = temp;
        var tmp = solution.pop();
        var target_pic_offset = document.getElementById(tmp);
        var blank_pic_offset = document.getElementById("_position_16");
        var str = blank_pic_offset.className;
        blank_pic_offset.className = target_pic_offset.className;
        target_pic_offset.className = str;
        var strId = blank_pic_offset.id;
        blank_pic_offset.id = target_pic_offset.id;
        target_pic_offset.id = strId;
    }
    if (solution.length == 0) {
        check();
        clearInterval(timeFun);
        clearInterval(n_timer);
        document.getElementById("restart").addEventListener("click", random_pos);
        document.getElementById("change_image").addEventListener("click", findSolution);
    }
}

function findSolution() {
    document.getElementById("restart").removeEventListener("click", random_pos);
    document.getElementById("change_image").removeEventListener("click", findSolution);
    timeFun = setInterval("do_find()", 200);
    judge = false;
}
/* 产生随机数列定义位置 */
function random_pos(event) {
    judge = true; //标记拼图已经开始，防止未开始图片就发生移动
    clearInterval(n_timer);
    n_sec = 0;
    n_min = 0;
    n_hour = 0;
    n_timer = timer(); //让时间函数开始运行
    step.value = "0";
    document.getElementById("result").innerText = "Playing";
    /* 产生随机数列前先将拼图块对应的位置复位 */
    for (var k = 1; k <= 16; k++) {
        document.getElementById("_position_" + k).className = "picture_part" + count + " position_" + k;
    }
    var part = document.getElementById("picture").childNodes;
    random_arr = [];
    for (var j = 0; j < 15; j++) {
        random_arr[j] = j + 1;
    }
    /* 通过更改ID名类名来改变位置 */
    /*使用先判断能否交换的方法，可以保证图一定能被还原*/
    for (var i = 0; i < 250; i++) {
        var random_value = parseInt(Math.random() * 16 + 1); //产生一个1-16的随机数
        var blank_pic_offset = document.getElementById("_position_16"); //找到第十六个被移动的块
        var blank_pic_offset_top = blank_pic_offset.offsetTop;
        var blank_pic_offset_left = blank_pic_offset.offsetLeft;
        var target_pic_offset = document.getElementById("_position_" + random_value); //找到随机数对应的块，判断能否移动
        var _offset_top = target_pic_offset.offsetTop;
        var _offset_left = target_pic_offset.offsetLeft;
        if ((Math.abs(blank_pic_offset_top - _offset_top) > 80) && (Math.abs(blank_pic_offset_top - _offset_top) < 90 && blank_pic_offset_left == _offset_left) ||
            (Math.abs(blank_pic_offset_left - _offset_left) > 80 && Math.abs(blank_pic_offset_left - _offset_left) < 90 && blank_pic_offset_top == _offset_top)) {
            if (solution[solution.length - 1] == target_pic_offset.id) {
                solution.pop();
            } else {
                solution.push(target_pic_offset.id);
            }
            var str = blank_pic_offset.className;
            blank_pic_offset.className = target_pic_offset.className;
            target_pic_offset.className = str;

            var strId = blank_pic_offset.id;
            blank_pic_offset.id = target_pic_offset.id;
            target_pic_offset.id = strId;

        }
    }
}
/* 点击图片触发的事件处理器 */
function pic_move(event) {
    if (judge == false) {
        return;
    }
    var blank_pic_offset = document.getElementById("_position_16");
    var blank_pic_offset_top = blank_pic_offset.offsetTop;
    var blank_pic_offset_left = blank_pic_offset.offsetLeft;
    var _offset_top = this.offsetTop;
    var _offset_left = this.offsetLeft;
    if ((Math.abs(blank_pic_offset_top - _offset_top) > 80) && (Math.abs(blank_pic_offset_top - _offset_top) < 90 && blank_pic_offset_left == _offset_left) ||
        (Math.abs(blank_pic_offset_left - _offset_left) > 80 && Math.abs(blank_pic_offset_left - _offset_left) < 90 && blank_pic_offset_top == _offset_top)) {
        if (solution[solution.length - 1] == this.id) {
            solution.pop();
        } else {
            solution.push(this.id);
        }
        var step_first = document.getElementById("step");
        var now_step = parseInt(step_first.value);
        now_step += 1;
        var temp = now_step.toString();
        step.value = temp;
        var str = blank_pic_offset.className;
        blank_pic_offset.className = this.className;
        this.className = str;
        var strId = blank_pic_offset.id;
        blank_pic_offset.id = this.id;
        this.id = strId;
        check();
    }
}
/*时间函数*/
function timer() {
    if (judge == true) {
        var ele_timer = document.getElementById("time");
        return setInterval(function() {
            var str_sec = n_sec;
            var str_min = n_min;
            var str_hour = n_hour;
            if (n_sec < 10) {
                str_sec = "0" + n_sec;
            }
            if (n_min < 10) {
                str_min = "0" + n_min;
            }
            if (n_hour < 10) {
                str_hour = "0" + n_hour;
            }
            var time = str_hour + ":" + str_min + ":" + str_sec;
            ele_timer.value = time;
            n_sec++;
            if (n_sec > 59) {
                n_sec = 0;
                n_min++;
            }
            if (n_min > 59) {
                n_sec = 0;
                n_hour++;
            }
        }, 1000);
    }
}