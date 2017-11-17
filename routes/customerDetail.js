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

    console.log('77777')
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
            opt.url+=`/product/list?unionid=${userInfo.unionid}&all=0`;
            opt.callBack=function(error, response, body){
                if(error)
                {
                    resolve();
                }
                else {
                    body = JSON.parse(body);
                    if(body.data){
                        let prouList  = [];
                        body.data.forEach(item=>{
                            item.productList.forEach(item2=>{
                                item2.productList.forEach(item3=>{
                                    prouList.push(item3);
                                });
                            })
                        })
                        initData.proList =prouList;
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
                    {//把三及并作一级处理
                        let originList  = [];
                        body.data.forEach(item=>{
                            item.sourceList.forEach(item2=>{
                                originList.push(item2);
                            })
                        })
                        initData.origin = originList;
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
                        //console.log('initData',initData);
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
