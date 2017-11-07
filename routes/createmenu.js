var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var wconfig=require('../config/wechat_config');
var fileUtil=require('../utils/fileUtils');
var testtoken=require('../service/baseService');

router.get('/', function(req, res, next) {

/*    var tokenUpdateTime=accesstoken.last_update_time;
    if(!tokenUpdateTime||new Date(tokenUpdateTime)=="Invalid Date"){
        res.send("set false");
    }
    var timeDiff= new Date().getTime()-(new Date(accesstoken.last_update_time).getTime());
    console.log(timeDiff);
    if(timeDiff>accesstoken.token_diff_time){
        var sPath='public/access_token.json';
        accesstoken.last_update_time=new Date().getTime();
        console.log(accesstoken);
        fileUtil.writeJSON(sPath,JSON.stringify(accesstoken));
    }*/
    testtoken.gettoken(req,res,next);
    //res.send('validation failed');
});


module.exports = router;
