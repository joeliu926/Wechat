var CONSTANT=require('../config/constant');
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtils');
var weChatAPI=require('../config/weChatAPI');
var menuconfig=require('../public/menu');
//var accesstoken=require('../public/access_token.json');
var accesstoken=require('../utils/accessToken');
var fileUtil=require('../utils/fileUtils');
var sessionAgent = require('../utils/sessionAgent');

var defualtCfg={
    //url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/api/consultRecord/',
    url:'',
    contentType:'application/json'
};

function getmenu(req, res, next){
    console.log("get menu --------");
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);
    opt.url+=weChatAPI.menu.getmenu();
    console.log(opt.url);
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            console.log(JSON.parse(body));
            res.send(JSON.parse(body));
        }
    }
    httpClient(opt);
}

function getoauthopenid(code,resolves,rejects){

    let resolve =resolves;
    let reject=rejects;
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.data=menuconfig;
    opt.url+=weChatAPI.authorize.augetopenid.url.replace("_CODE_",code);
    opt.callBack=function(error, response, body){
        if(error)
        {
            reject(error);
        }
        else {
            resolve(JSON.parse(body));
        }
    }
    httpClient(opt);
}

function getuserinfo(openid,resolves,rejects){
    let resolve =resolves;
    let reject=rejects;
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);
    opt.url+=weChatAPI.userinfo().replace("_OPENID_",openid);
    opt.callBack=function(error,response, body){
        if(error)
        {
            reject(error);

        }
        else {
            resolve(JSON.parse(body));
        }
    }
    httpClient(opt);
}

function gettoken(req, res, next){
    var tokenUpdateTime=accesstoken.getlast_update_time();

    console.log('tokenUpdateTime',tokenUpdateTime);

    if(!tokenUpdateTime||new Date(tokenUpdateTime)=="Invalid Date"){
        console.log('return false',new Date(tokenUpdateTime));
        return false;
    }
    var timeDiff= new Date().getTime()-(new Date(tokenUpdateTime).getTime());

    console.log('timeDiff',timeDiff);
    console.log('accesstoken.token_diff_time',accesstoken.token_diff_time);
    if(timeDiff>accesstoken.token_diff_time){
        defualtCfg.method="GET";
        var opt=appUtil.extend({},defualtCfg);
        opt.url+=weChatAPI.accesstoken.url;
        console.log(opt.url);
        opt.callBack=function(error, response, body){
            if(error)
            {
                res.send(error);
            }
            else {
                var sPath='public/access_token.json';
                //accesstoken.last_update_time=new Date().getTime();
                //accesstoken.access_token=JSON.parse(body).access_token;
                accesstoken.setlast_update_time(new Date().getTime());
                accesstoken.setaccessToken(JSON.parse(body).access_token);
                fileUtil.writeJSON(sPath,JSON.stringify(accesstoken));
            }
        }
        httpClient(opt);
    } else {
        console.log("exist token data----------------");
    }
    return true;
}

function checkCode(req,res) {
    let _userinfo = sessionAgent.getUserInfo(req);
    if(_userinfo){
        return true;
    }
    else{
        if(!req.query.state){
            let requrl =req.headers["x-client-proto"]+"://"+req.headers.host+"/wx"+req.originalUrl;
            res.redirect(weChatAPI.authorize.authorizecode.url.replace("REDIRECT_URI",requrl));
            return false;
        }
        else{return true;}
    }

}

function setcharactermenu(req, res, next,code){

    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.data=menuconfig;
    opt.url+=weChatAPI.authorize.augetopenid.url;
    console.log(opt.url);
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            console.log(JSON.parse(body));
            res.send(JSON.parse(body));
        }
    }
    httpClient(opt);
}

function afterAuthorized(req, res, next,cb) {
    let _userinfo = sessionAgent.getUserInfo(req);

    if(_userinfo){
        cb&&cb(_userinfo);
    }
    else{
        var _promise =  new Promise(function(resolve){resolve();});
        _promise.then(function () {
                return new Promise (function(resolve, reject) {
                    getoauthopenid(req.query.code,resolve,reject);
                });
            })
            .then(function (openObj) {
                return new Promise (function(resolve, reject) {
                    getuserinfo(openObj.openid,resolve,reject);
                });
            })
            .then(function (userInfo) {

                sessionAgent.setUserInfo(req,userInfo);

                cb&&cb(userInfo);

            });
    }
}

module.exports = {
    gettoken: gettoken,
    getmenu:getmenu,
    getuserinfo:getuserinfo,
    checkCode:checkCode,
    getoauthopenid:getoauthopenid,
    setcharactermenu:setcharactermenu,
    afterAuthorized:afterAuthorized
}