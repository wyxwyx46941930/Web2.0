//启动准备函数
$(window).load(function() {
    var show = $("#show").get(0); //拿到时间这个块
    setInterval(function() {
        var time = new Date();
        var mon; //记录月份
        var day; //记录天数
        var hour; //记录小时
        var min; //记录分钟
        var sec; //记录秒数
        //判断所要呈现的时间位是否大于10
        if (time.getMonth() < 9) 
        {
            mon = "0" + (time.getMonth() + 1);
            console.log(time.getMonth());
        } 
        else 
        {
            mon = time.getMonth() + 1;
        }
        if (time.getDate() < 10) 
        {
            day = "0" + time.getDate();
        } 
        else 
        {
            day = time.getDate();
        }
        if (time.getHours() < 10) 
        {
            hour = "0" + time.getHours();
        } 
        else 
        {
            hour = time.getHours();
        }
        if (time.getMinutes() < 10) 
        {
            min = "0" + time.getMinutes();
        } 
        else 
        {
            min = time.getMinutes();
        }
        if (time.getSeconds() < 10) 
        {
            sec = "0" + time.getSeconds();
        } 
        else
        {
            sec = time.getSeconds();
        }
        var t = time.getFullYear() + "-" + mon + "-" + day + " " + hour + ":" + min + ":" + sec;
        show.innerHTML = t;
    }, 1000);
    //拿到输入条件这个块
    var inputs = $('input[type="text"]');
    inputs.on('input', validate);
    inputs.each(function(index) 
    {
        if (inputs.eq(index).val().match(/^\{.+}$/)) 
        {
            inputs.eq(index).val('');
        }
    });
    //匹配重置按钮
    $('.reset-box input').click(resetInputs);
    validate();
});

//查询信息是否重复
function validate() {
    //拿到存到的一系列参数信息
    var params = 
    {
        username: $('input[name="username"]').eq(0).val(),
        id: $('input[name="id"]').eq(0).val(),
        tel: $('input[name="tel"]').eq(0).val(),
        email: $('input[name="email"]').eq(0).val()
    };
    var err = check(params), p ;
    for (var key in err) 
    {
        if (err.hasOwnProperty(key) && key != 'code') 
        {
            //查到已经存储过该人的信息
            p = $('#' + key.substr(0, key.length - 3) + '-err-label');
            if (p.text().indexOf('已存在') == -1) 
            {
                p.text(err[key] ? ERR_STRs[key] : '');
            }

        }
    }
    //如果信息没有填完禁用submit的功能
    $('input[type="submit"]').prop('disabled', err.code != 0);
}

//重置按钮
function resetInputs() {
    $('input[type="text"]').val('');
    validate();
}

