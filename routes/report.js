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

router.get('/index', function(req, res, next) {
   if(!baseServer.checkCode(req,res)) {
        return false;
    }

    baseServer.afterAuthorized(req, res, next,function (userInfo) {
        res.render('report');
    })
});



router.post('/validuser', function(req, res, next) {

    if(!baseServer.checkCode(req,res)) {
        return false;
    }
    baseServer.afterAuthorized(req, res, next,function (userInfo) {
        defualtCfg.method="GET";
        var opt=appUtil.extend({},defualtCfg);
        opt.url+=`/analysis/validUser?userUnionId=${userInfo.unionid}`;
        opt.callBack=function(error, response, body){
            if(error)
            {
                res.send(error);
            }
            else {
                body = JSON.parse(body);
                res.send(body);
            }
        }
        httpClient(opt);
    });

});

router.post('/totalanalysis', function(req, res, next) {
    let ireq =req;

    console.log('req.body',req.body);
    if(!baseServer.checkCode(req,res)) {
        return false;
    }
    baseServer.afterAuthorized(req, res, next,function (userInfo) {
        defualtCfg.method="GET";
        var opt=appUtil.extend({},defualtCfg);
        opt.url+=`/analysis/totalAnalysis?userUnionId=${userInfo.unionid}&userType=${ireq.body.userType}&beginDate=${ireq.body.beginDate}&endDate=${ireq.body.endDate}`;

        console.log('opt',opt);
        opt.callBack=function(error, response, body){
            if(error)
            {
                res.send(error);
            }
            else {
                body = JSON.parse(body);
                res.send(body);
            }
        }
        httpClient(opt);
    });
});


router.post('/rankanalysis', function(req, res, next) {

    let ireq =req;
    if(!baseServer.checkCode(req,res)) {
        return false;
    }
    baseServer.afterAuthorized(req, res, next,function (userInfo) {
        defualtCfg.method="GET";
        var opt=appUtil.extend({},defualtCfg);
        opt.url+=`/analysis/rankAnalysis?userUnionId=${userInfo.unionid}&userType=${ireq.body.userType}&beginDate=${ireq.body.beginDate}&endDate=${ireq.body.endDate}&searchTypeCode=${ireq.body.searchTypeCode}`;
        opt.callBack=function(error, response, body){
            if(error)
            {
                res.send(error);
            }
            else {
                body = JSON.parse(body);
                res.send(body);
            }
        }
        httpClient(opt);
    });
});


router.post('/productrankanalysis', function(req, res, next) {

    let ireq =req;
    if(!baseServer.checkCode(req,res)) {
        return false;
    }
    baseServer.afterAuthorized(req, res, next,function (userInfo) {
        defualtCfg.method="GET";
        var opt=appUtil.extend({},defualtCfg);
        opt.url+=`/analysis/productRankAnalysis?userUnionId=${userInfo.unionid}&userType=${ireq.body.userType}&beginDate=${ireq.body.beginDate}&endDate=${ireq.body.endDate}&searchTypeCode=${ireq.body.searchTypeCode}`;
        opt.callBack=function(error, response, body){
            if(error)
            {
                res.send(error);
            }
            else {
                body = JSON.parse(body);
                res.send(body);
            }
        }
        httpClient(opt);
    });
});


module.exports = router;
