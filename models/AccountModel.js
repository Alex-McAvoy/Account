/*
 * @Description: 账单信息模型
 * @Author: Alex_McAvoy
 * @Date: 2023-08-23 19:37:39
 */

const mongoose = require('mongoose');

// 创建文档结构对象
let AccountSchema = new mongoose.Schema({
    title: {
        type: String,
        required: truue
    }, 
    time: Date,
    type: {
        type: Number,
        default: -1
    },
    account: {
        type: Number,
        required: true
    },
    remarks: {
        type: String
    }
});

// 创建模型对象
let AccountModel = mongoose.model('accounts', AccountSchema);

module.exports = AccountModel;