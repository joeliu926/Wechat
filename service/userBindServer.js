var CONSTANT=require('../config/constant');
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtils');
var weChatAPI=require('../config/weChatAPI');

var defualtCfg={
    url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/api',
    contentType:'application/json'
};

function bindUser(unionid,usercode,cb){
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.url+='/users/bind';
    opt.data= {
        unionId:unionid,
        userCode:usercode
    };

    console.log('opt',opt);
    
    opt.callBack=function(error, response, body){
        if(error)
        {
            console.log(error);
        }
        else {
            cb&&cb(body);
        }
    }
    httpClient(opt);
}

module.exports = {
    bindUser:bindUser
}