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

router.get('/detail', function(req, res, next) {
    if(!baseServer.checkCode(req,res)){
        return false;
    }

    baseServer.afterAuthorized(req, res, next,function (userInfo) {



        let initData={
            proList:'',
            origin:'',
            customPhoto:'',
            chatPhoto:''
        }

        //项目列表
        var pmsProList = new Promise(function (resolve) {
            defualtCfg.method="GET";
            var opt=appUtil.extend({},defualtCfg)
            opt.url+=`/product/list/${userInfo.unionid}`;
            opt.callBack=function(error, response, body){
                if(error)
                {
                    resolve();
                }
                else {
                    body = JSON.parse(body);
                    if(body.data){
                        initData.proList =body.data;
                    }
                    resolve();
                }
            }
            httpClient(opt);
        });
        //客户来源
        var pmsOrigin = new Promise(function (resolve) {
            var opt=appUtil.extend({},defualtCfg);
            opt.url+=`/source/list?unionid=${userInfo.unionid}`;
            opt.callBack=function(error, response, body){

                if(error)
                {
                    resolve();
                }
                else {
                    body = JSON.parse(body);
                    if(body.data)
                    {
                        initData.origin = body.data;
                    }
                    resolve();
                }
            }
            httpClient(opt);
        });

        //客户上传照片
        var pmsCustomPhoto = new Promise(function (resolve) {
            var opt=appUtil.extend({},defualtCfg);
            opt.url+=`/customer/browsePicture/${req.query.id}/0`;
            opt.callBack=function(error, response, body){
                if(error)
                {
                    resolve();
                }
                else {
                    body = JSON.parse(body);
                    if(body.data)
                    {
                        initData.customPhoto  =body.data;
                    }
                    resolve();
                }
            }
            httpClient(opt);
        });
        //客户沟通照片
        var pmsChatPhoto = new Promise(function (resolve) {
            var opt=appUtil.extend({},defualtCfg);
            opt.url+=`/customer/browsePicture/${req.query.id}/1`;
            opt.callBack=function(error, response, body){
                if(error)
                {
                    resolve();
                }
                else {
                    body = JSON.parse(body);
                    if(body.data)
                    {
                        initData.chatPhoto  =body.data;
                    }
                    resolve();
                }
            }
            httpClient(opt);
        });


        Promise.all([pmsProList,pmsOrigin,pmsCustomPhoto,pmsChatPhoto]).then(function (values) {
            defualtCfg.method="GET";
            var opt=appUtil.extend({},defualtCfg);
            opt.url+=`/customer/customerDetail/${req.query.id}`;
            opt.callBack=function(error, response, body){
                if(error)
                {
                    console.log(error);
                }
                else {
                    body = JSON.parse(body);
                    if(body.data)
                    {
                        console.log('initData',initData);
                        res.render('customerDetail', { initData:initData,detailInfo:body.data,userInfo:'',});
                    }
                }
            }
            httpClient(opt);
        });

    })

});


router.post('/addDetail', function(req, res, next) {
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.url+=`/customer/update`;
    opt.data = req.body;
    opt.callBack=function(error, response, body){
        if(error)
        {
            console.log(error);
        }
        else {

            res.send({code:'0',msg:'OK'});
        }
    }
    httpClient(opt);
});
module.exports = router;
