var userModel = require('../model/modalFactory').userModel
// var express = require('express');
import  express from 'express'
import sha1 from 'sha1'
import config from './config'
var router = express.Router();
var replyText = require('../utils/reply').replyText
var getUserInfo = require('./users').getUserInfo;
var getToken = require('../utils/reply').getToken;
/* GET home page. */
router.get('/', function(req, res, next) {
    var token = require('./config').token;
    var signature =req.query.signature;
    var timestamp = req.query.timestamp;
    var echostr   = req.query.echostr;
    var nonce     = req.query.nonce;
    var str = [token,timestamp,nonce].sort().join(''); //按字典排序，拼接字符串
    var sha = sha1(str); //加密
    if(sha === signature){
        res.status(200).send(echostr);
    } else {
        return false;
    }
});
router.post('/',function (req,response,next) {
    var postdata = "";
    req.addListener("data",function(postchunk){
        postdata += postchunk;
    });
    //获取到了POST数据
    req.addListener("end",function() {
        var parseString = require("xml2js").parseString;
        parseString(postdata, function (err, result) {
            if (!err) {
                var res;
                getUserInfo(result.xml.FromUserName[0])
                .then(function(userInfo){
                    //获得用户信息，合并到消息中
                    result.user = userInfo;
                    //将消息通过websocket广播
                    res = replyText(result,'你好!'+result.user.nickname);
                    response.end(res)
                })
            }
        });
    })
});
router.post('/changeKeyWord',function (req,res,next) {
    res.status(200).send('111');
});
//token 接口
router.post('/login',function (req,res,next) {
    var params ={
        "subscribe": 1,
        "openid": "o6_bmjrPTlm6_2sgVt7hMZOPfL2M",
        "nickname": "Band",
        "sex": 1,
        "language": "zh_CN",
        "city": "广州",
        "province": "广东",
        "country": "中国",
        "headimgurl":"http://thirdwx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0",
        "subscribe_time": 153269495700,
        "unionid": " o6_bmasdasdsad6_2sgVt7hMZOPfL",
        "groupid": 0,
        "tagid_list":[128,2],
        "subscribe_scene": "ADD_SCENE_QR_CODE",
        "qr_scene": 98765,
        "qr_scene_str": ""
    };
    res.status(200).json(params);
})
module.exports = router;
