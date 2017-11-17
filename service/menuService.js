var CONSTANT=require('../config/constant');
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtils');
var weChatAPI=require('../config/weChatAPI');
var weConfig=require('../config/wechat_config');

var menuconfig=require('../public/menu');


var defualtCfg={
    //url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/api/consultRecord/',
    url:'',
    contentType:'application/json'
};

function getmenu(req, res, next){
    defualtCfg.method="get";
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
function setmenu(req, res, next){
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.url+=weChatAPI.menu.setmenu();
    opt.data=menuconfig;
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
function setcharactermenu(req, res, next){
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.data=menuconfig;
    opt.url+=weChatAPI.menu.setconditional();
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
module.exports = {
    getmenu:getmenu,
    setmenu:setmenu,
    setcharactermenu:setcharactermenu
}