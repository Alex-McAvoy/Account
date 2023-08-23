/*
 * @Description: 用户信息模型
 * @Author: Alex_McAvoy
 * @Date: 2023-08-24 03:05:16
 */
const mongoose = require('mongoose');

// 创建文档的结构对象
let UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

// 创建模型对象
let UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
