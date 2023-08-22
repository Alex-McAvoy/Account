/*
 * @Description: 主页路由
 * @Author: Alex_McAvoy
 * @Date: 2023-08-22 21:24:16
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
