/*
 * @Description: 
 * @Author: Alex_McAvoy
 * @Date: 2023-08-24 02:27:25
 */
var express = require('express');

var router = express.Router();

// 注册页面
router.get('/reg', (req, res) => {
    res.render('auth/reg');
});

module.exports = router;