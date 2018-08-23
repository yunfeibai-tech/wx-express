/**
 * @Author: yunfei_bai
 * @Date: 2018/8/18 13:38
 * @Description:
 * */
var  sequelize = require('sequelize');
var dbc = require('../config')
let db = null;
exports.getDbCon =function () {
    try {
        if (!db) {
            db = new sequelize(
                dbc.dbConfig.database, // 数据库名
                dbc.dbConfig.user,   // 账号
                dbc.dbConfig.password,   // 密码
                {
                    'dialect': 'mysql',
                    'host': dbc.dbConfig.host, // 数据库ip
                    'port': dbc.dbConfig.port,        // 数据库端口
                    'pool': { //设置数据连接池和线程
                        max: 5,
                        min: 0,
                        acquire: 30000,
                        idle: 10000
                    },
                    'define': {
                        // 开启驼峰
                        'underscored': true
                    }
                }
            );
        }
    } catch (e) {
        throw e;
    }
    return db;
}
