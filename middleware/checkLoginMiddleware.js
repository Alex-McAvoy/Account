/*
 * @Description: 检测登录状态中间件
 * @Author: Alex_McAvoy
 * @Date: 2023-08-24 04:07:16
 */
module.exports = (req, res, next) => {
    if (!req.session.username) {
        return res.redirect('/login');
    }
    next();
}