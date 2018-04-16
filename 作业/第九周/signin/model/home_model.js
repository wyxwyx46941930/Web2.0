function getModel(userInfo) 
{
    var m = {};
    m.jqueryLink = 'http://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.1.4.min.js';
    m.jsLink = 'javascripts/home.js';
    m.baseCssLink = 'stylesheets/sign.css';
    m.extraCssLink = 'stylesheets/home.css';
    m.pageTitle = '我的主页';
    m.formTitle = '我的资料';
    m.usernameTitle = '用户名';
    m.sidTitle = '学号';
    m.phoneTitle = '电话';
    m.emailTitle = '邮箱';
    m.submitTitle = '登出';
    for (var k in userInfo) {
        m[k] = userInfo[k];
    }
    m.signInLink = '/';
    return m;
}

exports.getModel = getModel;