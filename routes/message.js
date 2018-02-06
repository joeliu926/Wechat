/**
 * Created by JoeLiu on 2017-11-9.
 */
var express = require('express');
var router = express.Router();
var messageServer=require('../service/messageServer');

router.post('/sendmessage', function(req, res, next) {
    let response = res;
    messageServer.sendKFMessage(req.body,function (params) {
        response.send({code:0,msg:'OK',params:params});
    });
});
router.post('/sendtemplatemsg', function(req, res, next) {
    let response = res;
    messageServer.sendtemplatemsg(req.body,function (params) {
        response.send({code:0,msg:'OK',params:params});
    });
});

module.exports = router;
