var userModel = require('../model/user_model');
//这里实现在进入网页时候进入那一块
module.exports = function (req, res, next) 
{
    var path = req.path;
    var qu = req.query.username;
    var cu = req.cookies.username;
    //判断用户名
    if (path === '/') 
    {
        if (qu !== undefined && cu !== undefined) 
        {
            if (qu === cu) 
            {
                userModel.readUser(qu, function (items) {
                    if (items.length > 0) {
                        next();
                    } else {
                        res.clearCookie('username', { path: '/' });
                        res.redirect('/');
                    }
                });
            } 
            else if (qu !== '') 
            {
                res.redirect('/?username=' + cu);
            } 
            else 
            {
                res.redirect('/?username=' + cu);
            }
        } 
        else if (qu === undefined && cu !== undefined) 
        {
            res.redirect('/?username=' + cu);
        } 
        else if (qu !== undefined && cu === undefined) 
        {
            res.redirect('/');
        } 
        else 
        {
            next();
        }
    } 
    //进入登陆界面
    else if (path === '/regist') {
        if (cu !== undefined) 
        {
            res.redirect('/?username=' + cu);
        } 
        else 
        {
            next();
        }
    } 
    else 
    {
        next();
    }
};
