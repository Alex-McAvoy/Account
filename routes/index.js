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
  // 获取所有账单信息
  let accounts = db.get('accounts').value();
  // 渲染账单列表页
  res.render('list', { accounts: accounts });
});

// 添加记录页
router.get('/account/create', function (req, res, next) {
  res.render('create');
});

// 添加记录
router.post('/account', (req, res) => {
  // 生成 id
  let id = shortid.generate();
  // 请求体数据写入 lowdb
  db.get('accounts').unshift({ id: id, ...req.body }).write();
  // 渲染添加成功提醒页
  res.render('success', { msg: ':) 添加成功', url: '/account' });
});

// 删除记录
router.get('/account/:id', (req, res) => {
  // 获取 id 参数
  let id = req.params.id;
  // 删除
  db.get('accounts').remove({ id: id }).write();
  // 渲染删除成功提醒页
  res.render('success', { msg: ':) 删除成功', url: '/account' });
});

module.exports = router;
