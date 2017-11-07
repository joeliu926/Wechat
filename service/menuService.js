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
    console.log("get menu --------");
    defualtCfg.method="get";
    var opt=appUtil.extend({},defualtCfg);
    opt.url+=weChatAPI.menu.getmenu.url;
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
    console.log("set menu info --------");
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.url+=weChatAPI.menu.setmenu.url;
    opt.data=menuconfig;
    console.log("------------------------");
    console.log(opt);
    console.log("------------------------");
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
function setcharactermenu(req, res, next){
    console.log("set individual menu info --------");
    //console.log(menuconfig);
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.data=menuconfig;
    opt.url+=weChatAPI.menu.setconditional.url;
    console.log("------------------------");
    console.log(opt);
    console.log("------------------------");
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
module.exports = {
    getmenu:getmenu,
    setmenu:setmenu,
    setcharactermenu:setcharactermenu
}