//使用express
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
//环境的搭建
//连接相应的文件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('views', path.join(__dirname, 'views'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
var auth = require('./routes/auth');
app.use(auth);
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'jade');
//与index相连接
var routes = require('./routes/index');
//与api相连接
var api = require('./routes/api');
app.use('/', routes);
app.use('/api', api);
app.use(function(req, res, next)
{
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//处理运行错误
app.use(function(err, req, res, next)
{
  res.status(err.status || 500);
  res.render('error', 
  {
    message: err.message,
    error: {}
  });
});
if (app.get('env') === 'development') 
{
  app.use(function(err, req, res, next) 
  {
    res.status(err.status || 500);
    res.render('error', 
    {
      message: err.message,
      error: err
    });
  });
}
module.exports = app;

