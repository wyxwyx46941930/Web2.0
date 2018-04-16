//使用正则表达式验证错误
var rgx = 
{
    username: /^[a-zA-Z][a-zA-Z0-9_]{5,17}$/,
    sid: /^[1-9][0-9]{7}$/,
    password: /^[0-9a-zA-Z\-_]{6,12}$/,
    phone: /^[1-9][0-9]{10}$/,
    email: /^[0-9a-zA-Z_\-]+(\.[0-9a-zA-Z_\-]+)*@([0-9a-zA-Z_\-]+\.)+[a-zA-Z]{2,4}$/
};
var errorMsg = 
{
    username:           '6~18位英文字母、数字或下划线，英文字母开头',
    sid:                '学号8位数字，不能以0开头',
    password:           '6~12位数字、大小写字母、中划线、下划线',
    confirm_password:   '密码两次输入不一致',
    phone:              '电话11位数字，不能以0开头',
    email:              '邮箱不合法'
};
//验证部分有有效
function validate(k, v) 
{
    var result = {};
    result.status = v.match(rgx[k]) !== null;
    result.error = result.status ? '' : errorMsg[k];
    return result;
}
//验证全部信息是否有效果
function validateAll(userInfo) 
{
    var result = { status: true };
    for (var k in rgx) 
    {
        if (userInfo.hasOwnProperty(k)) 
        {
            result[k] = validate(k, userInfo[k]);
            result.status = result.status && result[k].status;
        }
    }
    return result;
}
//验证密码
function validateConfirmPassword(p, cp) 
{
    var result = {};
    result.status = p === cp;
    result.error = result.status ? '' : errorMsg['confirm_password'];
    return result;
}

if (typeof(exports) === 'object') 
{
    exports.validateAll = validateAll;
}
