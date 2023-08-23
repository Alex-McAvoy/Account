/*
 * @Description: 模板引擎设置与错误处理器
 * @Author: Alex_McAvoy
 * @Date: 2023-08-22 21:24:16
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var MongoStore = require('connect-mongo');

var indexRouter = require('./routes/web/index');
var authRouter = require('./routes/web/auth');
var accountRouter = require("./routes/api/account");

var { DB_HOST, DB_PORT, DB_NAME } = require('./config/config');

var app = express();

// 模板引擎设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session 中间件
app.use(session({
  name: 'sid', // cookie-name，默认 connect.sid
  secret: 'alex', // 参与加密的字符串，加盐
  saveUninitialized: false, // 是否为每次请求时都设置一个cookie来存储
  resave: true, // 是否在每次请求时重新保存 session 20分钟
  store: MongoStore.create({
    mongoUrl: `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`
  }),
  cookie: {
    httpOnly: true, // 前端是否可通过 JS 操作 cookie
    maxAge: 1000 * 60 * 60 * 24 * 7 // 控制 sessionID 过期时间，单位 ms
  }
}));

// 路由设置
app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/api', accountRouter);

// 抛出 404 异常并交给错误处理器处理
app.use(function (req, res, next) {
  next(createError(404));
});

// 错误处理器
app.use(function (err, req, res, next) {
  // 设置错误消息局部变量，仅在开发模式中有效
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // 渲染错误页
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
