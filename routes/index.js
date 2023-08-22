/*
 * @Description: 路由模块
 * @Author: Alex_McAvoy
 * @Date: 2023-08-22 21:24:16
 */
var express = require('express');
var router = express.Router();

// 记账本列表
router.get('/account', function(req, res, next) {
  res.send('账本列表');
});

// 添加记录
router.get('/account/create', function(req, res, next) {
  res.send('添加记录');
});

module.exports = router;
