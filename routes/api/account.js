/*
 * @Description: API
 * @Author: Alex_McAvoy
 * @Date: 2023-08-22 21:24:16
 */
const express = require('express');
const moment = require('moment');
const AccountModel = require('../../models/AccountModel');
var checkTokenMiddleware = require('../../middleware/CheckTokenMiddleware');

// 创建路由对象
var router = express.Router();

// 获取记录列表
router.get('/account', checkTokenMiddleware, function (req, res, next) {
    // 获取所有账单信息
    AccountModel.find().sort({ time: -1 }).exec().then(data => {
        res.json({
            code: '20000',
            msg: '读取成功',
            data: data
        })
    }).catch(error => {
        res.json({
            code: '20001',
            msg: '读取失败',
            error: error
        })
    });
});

// 添加记录
router.post('/account', checkTokenMiddleware, (req, res) => {
    // 将 time 属性转为 Date 类型
    req.body.time = moment(req.body.time).toDate();
    // 将数据插入 MongoDB
    AccountModel.create({
        ...req.body
    }).then(data => {
        res.json({
            code: '20000',
            msg: '添加成功',
            data: data
        })
    }).catch(error => {
        res.json({
            code: '20001',
            msg: '添加失败',
            error: error
        })
    });
});

// 删除记录
router.delete('/account/:id', checkTokenMiddleware, (req, res) => {
    // 获取 id 参数
    let id = req.params.id;
    // 删除
    AccountModel.deleteOne({ _id: id }).then(data => {
        res.json({
            code: '20000',
            msg: '删除成功',
            data: data
        })
    }).catch(error => {
        res.json({
            code: '20001',
            msg: '删除失败',
            error: error
        })
    });
});

// 获取单个账单信息
router.get('/account/:id', checkTokenMiddleware, (req, res) => {
    // 获取 id 参数
    let id = req.params.id;
    // 获取单条数据
    AccountModel.findById({ _id: id }).then(data => {
        res.json({
            code: '20000',
            msg: '读取成功',
            data: data
        })
    }).catch(error => {
        res.json({
            code: '20001',
            msg: '读取失败',
            error: error
        })
    });
});

// 更新单个账单信息
router.patch('/account/:id', checkTokenMiddleware, (req, res) => {
    // 获取 id 参数
    let id = req.params.id;
    // 更新单条数据
    AccountModel.updateOne({ _id: id }, req.body).then(data => {
        // 更新成功后，查询对应数据
        AccountModel.findById({ _id: id }).then(data => {
            res.json({
                code: '20000',
                msg: '更新成功',
                data: data
            })
        });
    }).catch(error => {
        res.json({
            code: '20001',
            msg: '更新失败',
            error: error
        })
    });


});

module.exports = router;
