/**
 * Created by JoeLiu on 2017-11-9.
 */
var express = require('express');
var router = express.Router();
var baseServer=require('../service/baseService');

router.get('/list', function(req, res, next) {
    if(!baseServer.checkCode(req,res)) {
        return false;
    }

    baseServer.afterAuthorized(req, res, next,function (userInfo) {
        console.log('userInfo',userInfo);
        res.render('customerList', { title: 'tes',userInfo:userInfo });
    })
});

module.exports = router;
