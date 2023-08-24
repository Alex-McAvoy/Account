/*
 * @Description: token校验中间件
 * @Author: Alex_McAvoy
 * @Date: 2023-08-24 19:15:23
 */
const jwt = require('jsonwebtoken');
const { secret } = require('../config/config');

module.exports = (req, res, next) => {
    // 检测 token
    let token = req.get('token');
    if (!token) {
        return res.json({
            code: '20002',
            msg: 'token缺失',
            data: null
        });
    }

    // 校验 token
    jwt.verify(token, secret, (error, data) => {
        if (error) {
            return res.json({
                code: '20003',
                msg: 'token校验失败',
                error: error
            });
        }
        // 保存用户信息
        req.user = data;
        // 校验通过
        next();
    });
}