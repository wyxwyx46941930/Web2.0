//使用DOM实现相应功能
//先设置相应变量
var S_flag = 0; 
var Path_flag = [0, 0, 0, 0, 0]; 
var E_flag = 0; 
var Lose_flag = 0;
var test_cheat = 0; 
//使用onload函数，避免网页加载时出现bug
window.onload = function()
{
    addListener();
};

//增加事件
function addListener() { 
    var _wall = document.getElementsByClassName("wall");

    var _path = document.getElementsByClassName("path");

    for (var i = 0; i < 5; i++)
    {
        _wall[i].addEventListener('mouseover', error_func); 

        _wall[i].addEventListener('mouseout', my_reset); 

        _path[i].addEventListener('mouseout', record); 
    }
    var _start = document.getElementById("start");

    var _end = document.getElementById("end");

    _start.addEventListener('mouseover', start_);

    _end.addEventListener('mouseover', end_); 

    var _test = document.getElementById("test");

    _test.addEventListener('mouseover', test_); 
}

//测试是否成功
function test_(event) 
{ 
    if (S_flag == 1)
    {
        test_cheat = 1;
    }
}

//重新开始
function my_reset(event) 
{ 
    event.target.className = "wall"; 
}

//判断是否撞墙
function error_func(event)
{ 
    if (S_flag == 1 && E_flag === 0)
    { 
        if (Lose_flag != 1) 
        { 
            event.target.className += " error"; 
        }

        document.getElementById("result").textContent = "You Lose!";

        Lose_flag = 1; 
        S_flag = 0; 

    }
}

//记录是否走过相应的道路防止作弊
function record(event) { 
    if (event.target.id == "path_1") 
    {
        Path_flag[0] = 1;
    } 

    else if (event.target.id == "path_2") 
    {
        Path_flag[1] = 1;
    } 

    else if (event.target.id == "path_3") 
    {
        Path_flag[2] = 1;
    } 

    else if (event.target.id == "path_4") 
    {
        Path_flag[3] = 1;
    } 

    else if (event.target.id == "path_5") 
    {
        Path_flag[4] = 1;
    }
}
//点击开始
function start_(event)
{ 

    if (S_flag === 0) 
    {
        E_flag = 0;
        Lose_flag = 0;
        test_cheat = 0;

        for (var i = 0; i < 5; i++) 
        {
            Path_flag[i] = 0;
        }

    }
    S_flag = 1;
    document.getElementById("result").textContent=" " ; 
}
//到达终点
function end_(event) 
{ 
    E_flag = 1; 
    if (Lose_flag != 1) 
    { 
        if (JudgeCheat()) 
        { 
            if (test_cheat === 0) 
            {  
                document.getElementById("result").textContent = "You Win!";
            } else 
            { 
                document.getElementById("result").textContent =
                "Don't Cheat, you should start from the 'S' and move to the 'E' inside the maze!";      
            }
        } 
        else 
        { 
            document.getElementById("result").textContent =
            "Don't Cheat, you should start from the 'S' and move to the 'E' inside the maze!";
        }

        S_flag = 0;
    }
}

//在这里判断是否作弊
function JudgeCheat() 
{
    if (Path_flag[0] == 1 && Path_flag[1] == 1 && Path_flag[2] == 1 && Path_flag[3] == 1 && Path_flag[4] == 1) 
    {
        return true;
    } 
    else 
    {
        return false;
    }
}
