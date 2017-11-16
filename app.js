var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var baseSevice=require('./service/baseService');
var wechatapp = require('./wechat');
var routesConfig = require('./config/routeConfig');

var app = express();
app.use(express.query());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:'rkylin_wechat',
  name:'rkylin_wechat_sessionid',
  cookie:{maxAge:12 * 60 * 60 * 1000},
  resave:true,
  saveUninitialized:false
}));

app.use(function(req, res, next) {

  console.log('init',req.path)
  baseSevice.gettoken(req,res,next);
  next();
});

routesConfig(app);

wechatapp.initwechat(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
