/*
 * @Description: 权限控制路由
 * @Author: Alex_McAvoy
 * @Date: 2023-08-24 02:27:25
 */
var express = require('express');
var md5 = require('md5');
var UserModel = require('../../models/UserModel');

var router = express.Router();

// 注册页面
router.get('/reg', (req, res) => {
    res.render('auth/reg');
});

// 登录页面
router.get('/login', (req, res) => {
    res.render('auth/login');
});

// 注册操作
router.post('/reg', (req, res) => {
    // 获取用户名
    let { username } = req.body;
    // 查询数据库是否已存在该用户
    UserModel.findOne({ username: username }).then(data => {
        // 判断是否存在用户
        if (data) {
            return res.render('success', { msg: ':)用户名名已存在，请登录', url: '/login' });
        }
        // 将 password 进行 md5 加密
        req.body.password = md5(req.body.password);
        // 创建新用户
        UserModel.create({
            ...req.body
        }).then(data => {
            return res.render('success', { msg: ':)注册成功', url: '/login' });
        }).catch(error => {
            return res.status(500).send('注册失败' + error);
        });
    }).catch(error => {
        return res.status(500).send('注册失败' + error);
    });
});

// 登录操作
router.post('/login', (req, res) => {
    // 获取用户名密码
    let { username, password } = req.body;
    // 查询数据库
    UserModel.findOne({ username: username, password: md5(password) }).then(data => {
        if (!data) {
            return res.send('账户或密码错误')
        } else {
            return res.render('success', { msg: ':)登录成功', url: '/account' });
        }
    }).catch(error => {
        return res.status(500).send('登录失败' + error);
    });
});

module.exports = router;