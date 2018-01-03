/**
 * Created by JoeLiu on 2017-11-9.
 */
var express = require('express');
var router = express.Router();
var baseServer=require('../service/baseService');
var CONSTANT = require('../config/constant');
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtils');

var defualtCfg={
    url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/api',
    contentType:'application/json'
};

router.get('/photolist', function(req, res, next) {
    if(!baseServer.checkCode(req,res)){
        return false;
    }
    baseServer.afterAuthorized(req, res, next,function (userInfo) {

        let ids  =  req.query.id.split("_")[0];
        let types  =  req.query.id.split("_")[1];

        var opt=appUtil.extend({},defualtCfg);
        opt.url+=`/customer/browsePicture/${ids}/${types}`;

        opt.callBack=function(error, response, body){
            if(error)
            {
                console.log('error',error)
            }
            else {
                body= JSON.parse(body);
                 if(body.code==0){
                     res.render('photoList', {data:body.data,id:ids,type:types});
                 }else{
                     res.render('photoList', {data:[],id:ids,type:types});
                 }
            }
        }
        httpClient(opt);
    })
});


module.exports = router;
