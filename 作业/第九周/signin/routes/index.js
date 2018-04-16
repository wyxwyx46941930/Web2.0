//这里实现进入某个界面的功能
var express = require('express');
var router = express.Router();
var homeModel = require('../model/home_model');
var signInModel = require('../model/sign_in_model');
var signUpModel = require('../model/sign_up_model');
var userModel = require('../model/user_model');

//进入sign in 界面
router.get('/', function(req, res, next) 
{
    var username = req.query.username;
    if (username === undefined) 
    {
        res.render('sign_in', signInModel.getModel());
        return;
    }
    userModel.readUser(username, function (items) 
    {
        if (items.length === 0) 
        {
            res.redirect('/');
        } 
        else 
        {
            res.render('home', homeModel.getModel(items[0]));
        }
    });
});

//进入sign up界面
router.get('/regist', function (req, res, next) 
{
    res.render('sign_up', signUpModel.getModel());
});

console.log('Export is listening localhost:8000') ;
module.exports = router;
