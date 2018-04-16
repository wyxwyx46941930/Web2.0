//实现window.onload()
$(window).load(function () 
{
    var inputBoxes = $('.input-box input');
    var submitButton = $('.submit-box input').eq(0);
    var errorLabels = $('.error-label');
    inputBoxes.focus(function () 
    {
        $(this).toggleClass('input-active', true);
        $(this).closest('.input-box').find('.error-label').toggleClass('error-active', true);
    });
    inputBoxes.blur(function () 
    {
        $(this).toggleClass('input-active', false);
        $(this).closest('.input-box').find('.error-label').toggleClass('error-inactive', true);
    });
    submitButton.mouseenter(function () 
    {
        $(this).toggleClass('submit-active', true);
    });
    submitButton.mouseleave(function () 
    {
        $(this).toggleClass('submit-active', false);
    });
    submitButton.click(function (event) 
    {
        event.preventDefault();
        signIn();
    });
    $('#username-input').focus();
});
//出现错误提示
function toggleError(name, toggle, msg) 
{
    var errorLabel = $('input[name=' + name + ']').closest('.input-box').find('.error-label').eq(0);
    if (msg) 
    {
        errorLabel.text(msg);
    } 
    else 
    {
        errorLabel.text('');
    }
    errorLabel.toggleClass('error-show', toggle);
}
//点击鼠标事件
function toggleSignInButton(toggle, label) 
{
    var button = $('.submit-box input').eq(0);
    button.prop('disabled', !toggle);
    button.toggleClass('submit-active', toggle);
    button.val(label);
}
//登陆界面
function signIn() 
{
    var inputBoxes = $('.input-box input');
    var userInfo = {};
    inputBoxes.each(function () 
    {
        userInfo[$(this).attr('name')] = $(this).val();
    });
    var v = validateAll(userInfo);
    if (!v.status) 
    {
        return;
    }
    toggleSignInButton(false, '登录中');
    $.post('/api/sign_in', userInfo, function (json) 
    {
        var result = JSON.parse(json);
        if (result.status === true) 
        {
            window.location.replace('/?username=' + userInfo.username);
        } 
        else 
        {
            inputBoxes.each(function () 
            {
                var n = $(this).attr('name');
                toggleError(n, !result[n].status, result[n].error);
            });
            toggleSignInButton(true, '登录');
        }
    }).fail(function () 
    {
        toggleError('username', true, '错误的用户名或密码');
        toggleSignInButton(true, '登录');
    });
}
