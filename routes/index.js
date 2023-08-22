/*
 * @Description: 路由模块
 * @Author: Alex_McAvoy
 * @Date: 2023-08-22 21:24:16
 */
var express = require('express');
var lowdb = require('lowdb');
var fileSync = require('lowdb/adapters/FileSync');
var shortid = require('shortid');

// 创建路由对象
var router = express.Router();

// 创建 db 对象
var adapter = new fileSync(__dirname + '/../data/db.json');
var db = lowdb(adapter);

// 记账本列表页
router.get('/account', function (req, res, next) {
  res.render('list');
});

// 添加记录页
router.get('/account/create', function (req, res, next) {
  res.render('create');
});

// 添加记录
router.post('/account', function (req, res, next) {
  // 生成 id
  let id = shortid.generate();
  // 请求体数据写入 lowdb
  db.get('accounts').unshift({ id: id, ...req.body }).write();
  // 成功提醒
  res.render('success', {msg: ':) 添加成功', url: '/account'});
});

module.exports = router;
