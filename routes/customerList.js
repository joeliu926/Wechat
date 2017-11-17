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

router.get('/list', function(req, res, next) {
   if(!baseServer.checkCode(req,res)) {
        return false;
    }

    baseServer.afterAuthorized(req, res, next,function (userInfo) {
        let _toDay = new Date();
        let _sevenDay =   new Date(_toDay.getTime() - (6 * 24 * 60 * 60 * 1000));
        let toDay = _toDay.getFullYear()+"-"+(_toDay.getMonth()+1)+"-"+_toDay.getDate();
        let sevenDay = _sevenDay.getFullYear()+"-"+(_sevenDay.getMonth()+1)+"-"+_sevenDay.getDate();

        let _startD_str = req.query.Date?req.query.Date.split("_")[0]:sevenDay;
        let _endD_str = req.query.Date?req.query.Date.split("_")[1]:toDay;
        let _startD = _startD_str?Date.parse(_startD_str):"";
        let _endD = _endD_str?Date.parse(_endD_str):"";

        defualtCfg.method="GET";
        var opt=appUtil.extend({},defualtCfg);
        opt.url+=`/users/wx/${userInfo.unionid}`;
        opt.callBack=function(error, response, body){
            if(error)
            {
                res.render('customerList', { datalist:[] ,userInfo:'',startDate:_startD_str,endDate:_endD_str,hasBind:false});
            }
            else {
                body=JSON.parse(body);
               if(body.code==3004){
                   res.render('customerList', { datalist:[] ,userInfo:'',startDate:_startD_str,endDate:_endD_str,hasBind:false});
               }
                else{
                   defualtCfg.method="GET";
                   opt=appUtil.extend({},defualtCfg);
                   opt.url=CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/api'+`/customer/customerList?userUnionid=${userInfo.unionid}&startDate=${_startD}&endDate=${_endD}`;
                   opt.callBack=function(error, response, body){
                       if(error)
                       {
                           console.log(error);
                       }
                       else {
                           res.render('customerList', { datalist:JSON.parse(body).data ,userInfo:'',startDate:_startD_str,endDate:_endD_str,hasBind:true});
                       }
                   }
                   httpClient(opt);
               }
            }
        }
        httpClient(opt);




    })
});





module.exports = router;
