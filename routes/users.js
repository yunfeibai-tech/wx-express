var appID = require('./config').appID
var appSecret = require('./config').appSecret;
var getToken = require('../utils/reply').getToken;
var request = require('request');
function getUserInfo(openID){
    return getToken(appID, appSecret).then(function(res){
        var token = res;
        return new Promise(function(resolve, reject){
            request('https://api.weixin.qq.com/cgi-bin/user/info?access_token='+token+'&openid='+openID+'&lang=zh_CN', function(err, res, data){
                resolve(JSON.parse(data));
            });
        });
    }).catch(function(err){
        console.log(err);
    });
}

module.exports = {
    getUserInfo: getUserInfo
};