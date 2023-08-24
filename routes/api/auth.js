/*
 * @Description: 权限控制API
 * @Author: Alex_McAvoy
 * @Date: 2023-08-24 02:27:25
 */
var express = require('express');
var md5 = require('md5');
var jwt = require('jsonwebtoken');
var UserModel = require('../../models/UserModel');
var { secret } = require('../../config/config');

var router = express.Router();

// 登录操作
router.post('/login', (req, res) => {
    // 获取用户名密码
    let { username, password } = req.body;
    // 查询数据库
    UserModel.findOne({ username: username, password: md5(password) }).then(data => {
        if (!data) {
            return res.json({
                code: '20001',
                msg: '账户或密码错误',
                data: null
            })
        } else {
            // 创建当前用户的 token
            let token = jwt.sign({
                username: data.username,
                _id: data._id
            }, secret, {
                expiresIn: 60 * 60 * 24 * 7
            });
            // 响应 token
            return res.json({
                code: '20000',
                msg: '登录成功',
                data: token
            })
        }
    }).catch(error => {
        return res.json({
            code: '20001',
            msg: '登录失败',
            error: error
        })
    });
});

// 退出登录操作
router.get('/logout', (req, res) => {
    // 销毁 session
    req.session.destroy(() => {
        res.render('success', { msg: '退出登录', url: '/login' });
    });
});

module.exports = router;