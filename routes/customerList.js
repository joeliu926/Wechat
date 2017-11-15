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
    url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/api/customer',
    contentType:'application/json'
};

router.get('/list', function(req, res, next) {
   if(!baseServer.checkCode(req,res)) {
        return false;
    }

    baseServer.afterAuthorized(req, res, next,function (userInfo) {
        let _startD_str = req.query.Date?req.query.Date.split("_")[0]:"";
        let _endD_str = req.query.Date?req.query.Date.split("_")[1]:"";
        let _startD = _startD_str?Date.parse(_startD_str):"";
        let _endD = _endD_str?Date.parse(_endD_str):"";

        defualtCfg.method="GET";
        var opt=appUtil.extend({},defualtCfg);
        opt.url+=`/customerList?userUnionid=${userInfo.unionid}&startDate=${_startD}&endDate=${_endD}`;
        opt.callBack=function(error, response, body){
            if(error)
            {
                console.log(error);
            }
            else {
                res.render('customerList', { datalist:JSON.parse(body).data ,userInfo:'',startDate:_startD_str,endDate:_endD_str});
            }
        }
        httpClient(opt);
    })
});





module.exports = router;
