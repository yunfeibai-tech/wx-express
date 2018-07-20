var express = require('express');
var router = express.Router();
var request = require('request');
var sha1 = require('sha1');
var config = require('./config')
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
//获取用户列表
router.get('/userList',function (req,resUser,next) {
    var dataList={userList:[]};
    return getToken(config.appID, config.appSecret).then(function(res){
        var token = res;
        return new Promise(function(resolve, reject){
            request('https://api.weixin.qq.com/cgi-bin/user/get?access_token='+token, function(err, respond, data){
                JSON.parse(data).data.openid.forEach(function (obj,index) {
                    getUserInfo(obj).then(function (userInfo) {
                        dataList.userList.push(userInfo)
                    })
                })
                setTimeout(function () {
                    console.log('--------------')
                    resUser.status(200).json(dataList)
                },200)

            });
        });
    }).catch(function(err){
        console.log(err);
    });
})
//token 接口
router.get('/getToken',function (req,res,next) {
    getToken().then(function (respond) {
        res.status(200).json({assese_token:respond});
    })
})
module.exports = router;
