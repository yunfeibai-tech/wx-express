/**
 * @Author: yunfei_bai
 * @Date: 2018/8/23 11:19
 * @Description:
 * */
import  express from 'express'
import config from './config'
var router = express.Router();
import userModel from '../model/modalFactory'
import getToken  from '../utils/reply';
//获取用户列表
router.get('/getList',function (req,resUser,next) {
    return getToken.getToken(config.appID, config.appSecret).then(function(res){
        var token = res;
        return new Promise(function(resolve, reject){
            userModel.userModel.findAll().then(userList =>{
                resUser.status(200).json(userList)
            })
        });
    }).catch(function(err){
        console.log(err);
    });
})
module.exports = router;