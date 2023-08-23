/*
 * @Description: 数据库连接
 * @Author: Alex_McAvoy
 * @Date: 2023-08-22 21:24:16
 */
const mongoose = require('mongoose');
const { DB_HOST, DB_PORT, DB_NAME } = require('../config/config.js');

module.exports = function (success, error) {
    // 判断 error 为其设置默认值
    if (typeof error !== 'function') {
        error = () => {
            console.log('数据库连接失败');
        }
    }
    
    // 设置 strictQuery 为 true
    mongoose.set('strictQuery', true);

    // 连接 mongodb 服务
    mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`);

    // 设置连接成功的回调，回调函数只执行一次
    mongoose.connection.once('open', () => {
        success();
    });

    // 设置连接错误的回调
    mongoose.connection.on('error', () => {
        error();
    });

    // 设置连接关闭的回调
    mongoose.connection.on('close', () => {
        console.log('数据库连接关闭');
    });
}