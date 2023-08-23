/*
 * @Description: 路由模块
 * @Author: Alex_McAvoy
 * @Date: 2023-08-22 21:24:16
 */
var express = require('express');
var moment = require('moment');
const AccountModel = require('../models/AccountModel');

// 创建路由对象
var router = express.Router();

// 记账本列表页
router.get('/account', function (req, res, next) {
  // 获取所有账单信息
  AccountModel.find().sort({ time: -1 }).exec().then(data => {
    res.render('list', { accounts: data, moment: moment });
  }).catch(error => {
    res.status(500).send("读取失败" + error)
  });
});

// 添加记录页
router.get('/account/create', function (req, res, next) {
  res.render('create');
});

// 添加记录
router.post('/account', (req, res) => {
  // 将 time 属性转为 Date 类型
  req.body.time = moment(req.body.time).toDate();
  // 将数据插入 MongoDB
  AccountModel.create({
    ...req.body
  }).then(data => {
    res.render('success', { msg: ':) 添加成功', url: '/account' });
  }).catch(error => {
    res.status(500).send("插入失败" + error)
  });
});

// 删除记录
router.get('/account/:id', (req, res) => {
  // 获取 id 参数
  let id = req.params.id;
  // 删除
  AccountModel.deleteOne({ _id: id }).then(data => {
    res.render('success', { msg: ':) 删除成功', url: '/account' });
  }).catch(error => {
    res.status(500).send("删除失败" + error)
  });
});

module.exports = router;
