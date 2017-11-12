/**
 * Created by JoeLiu on 2017-11-9.
 */
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var baseService=require('../service/baseService');
var testtoken=require('../service/menuService');

/* GET home page. */
router.get('/index', function(req, res, next) {

    res.end("this is post data");
});

router.get('/serveral', function(req, res, next) {
    var token="rkylinmclocationt201711061327";
    var signature = req.query.signature||"";
    var timestamp = req.query.timestamp||"";
    var echostr   = req.query.echostr||"";
    var nonce     = req.query.nonce||"";
    var oriArray = new Array();
    oriArray[0] = nonce;
    oriArray[1] = timestamp;
    oriArray[2] = token;
    oriArray.sort();
    var original = oriArray.join('');

    var md5sum = crypto.createHash('sha1');
    md5sum.update(original,"utf8");
    var scyptoString= md5sum.digest('hex');
    console.log("scyptoString---",scyptoString);
    if(signature == scyptoString){
        res.send(echostr);
    } else {
        res.send('validation failed');
    }
});

/* GET users listing. */
router.get('/users', function(req, res, next) {
    var ucode= req.query.code;
    baseService.getoauthopenid(ucode);
    res.send('respond with a resource  user data');
});

router.get('/setmenu', function(req, res, next) {
    testtoken.setmenu(req,res,next);
});


module.exports = router;