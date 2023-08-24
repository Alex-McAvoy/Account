/*
 * @Description: token校验中间件
 * @Author: Alex_McAvoy
 * @Date: 2023-08-24 19:15:23
 */
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let token = req.get('token');
    if (!token) {
        return res.json({
            code: '20002',
            msg: 'token缺失',
            data: null
        });
    }

    // 校验 token
    jwt.verify(token, 'alex', (error, data) => {
        if (error) {
            return res.json({
                code: '20003',
                msg: 'token校验失败',
                error: error
            });
        }
        next();
    });
}