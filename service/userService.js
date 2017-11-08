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
function getoauthopenid(code){

    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.data=menuconfig;
    opt.url+=weChatAPI.authorize.augetopenid.url;
    console.log(opt.url);
    opt.callBack=function(error, response, body){
        if(error)
        {
           // res.send(error);
        }
        else {
            console.log(JSON.parse(body));
           // res.send(JSON.parse(body));
        }
    }
    httpClient(opt);
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
module.exports = {
    getoauthopenid:getoauthopenid,
    setcharactermenu:setcharactermenu
}