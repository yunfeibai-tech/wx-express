/**
 * @Author: yunfei_bai
 * @Date: 2018/8/20 19:00
 * @Description:
 * */
var UserModel = require('./userModel');
var dbOrm = require('../common/sqlConfig')
let sequelize = dbOrm.getDbCon();
let userModel = sequelize.define('user', UserModel.user, {
    'freezeTableName': true,//禁止修改表名
    'tableName': 'user',//数据库表名
    'timestamps': false, //不自动增加时间戳
});
module.exports = {
    userModel: userModel,
}