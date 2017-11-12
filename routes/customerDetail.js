/**
 * Created by JoeLiu on 2017-11-9.
 */
var express = require('express');
var router = express.Router();

router.get('/detail', function(req, res, next) {
    if(!baseServer.checkCode(req,res)){
        return false;
    }

    baseServer.afterAuthorized(req, res, next,function (userInfo) {
        res.render('customerDetail', { title: 'Expsdfress',userInfo:userInfo  });
    })
});

router.get('/photolist', function(req, res, next) {
    if(!baseServer.checkCode(req,res)){
        return false;
    }

    baseServer.afterAuthorized(req, res, next,function (userInfo) {
        res.render('photoList', { title: 'sd',userInfo:userInfo  });
    })
});

module.exports = router;
