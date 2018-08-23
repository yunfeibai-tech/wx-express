/**
 * @Author: yunfei_bai
 * @Date: 2018/8/20 18:56
 * @Description:
 * */
var Sequelize = require('sequelize')
//用户表
exports.user = {
    'id' :{
        'type' : Sequelize.INTEGER, //字段类型
        field:'id',
        primaryKey: true
    },
    'user_no': {
        'type': Sequelize.CHAR(32), // 字段类型
        field: 'user_no',
    },
    'user_name':{
      type: Sequelize.CHAR(32), //字段类型
      field:'user_name'
    },
    'nick_name': {
        'type': Sequelize.CHAR(32), // 字段类型
        field: 'nick_name'
    },
    'sex': {
        'type': Sequelize.INTEGER, // 字段类型
        field: 'sex'
    },
    'city':{
      type:Sequelize.CHAR(20),
      field:'city'
    },
    'country':{
      type:Sequelize.CHAR(20),
      field:'country'
    },
    'province':{
      type:Sequelize.CHAR(20),
      field:'province'
    },
    'language':{
        type:Sequelize.CHAR(10),
        field:'language'
    },
    'headimgUrl':{
      type:Sequelize.CHAR(200),
      field:'headimg_url'
    },
    'subscribeTime':{
        type:Sequelize.INTEGER,
        field:'subscribe_time'
    },
    'create_time': {
        type: Sequelize.DATE, // 字段类型
        field: 'create_time',
    },
    'unionid':{
        type:Sequelize.CHAR(64),
        field:'unionid'
    },
    'remark':{
        type:Sequelize.CHAR(200),
        field:'remark'
    },
    'groupid':{
      type:Sequelize.CHAR(15),
      field:'groupid'
    },
    'tagid_list':{
      type:Sequelize.CHAR(200),
      field:'tagid_list'
    },
    'subscribe_scene':{
      type:Sequelize.CHAR(50),
      field:'subscribe_scene'
    },
    'qr_scene':{
        type:Sequelize.CHAR(200),
        field:'qr_scene'
    },
    'qr_scene_str':{
        type:Sequelize.CHAR(200),
        field:'qr_scene_str'
    },
    'openid':{
        type:Sequelize.CHAR(64),
        field:'openid'
    },
    'subscribe':{
        type:Sequelize.INTEGER,
        field:'subscribe'
    },
    'create_time':{
        'type': Sequelize.DATE, // 字段类型
        field: 'create_time',
    },
    'update_time': {
        'type': Sequelize.DATE, // 字段类型
        field: 'update_time',
    }
    ,
}