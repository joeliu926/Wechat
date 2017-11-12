var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtils');
var weChatAPI=require('../config/weChatAPI');

var defualtCfg={
    //url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/api/consultRecord/',
    url:'',
    contentType:'application/json'
};

function sendKFMessage(data){
    defualtCfg.method=weChatAPI.message.sendkfmsg.method;
    var opt=appUtil.extend({},defualtCfg);
    opt.url+=weChatAPI.message.sendkfmsg.url;
    opt.data= data;
    opt.callBack=function(error, response, body){
        if(error)
        {
            console.log(error);
        }
        else {
            console.log(JSON.parse(body));
        }
    }
    httpClient(opt);
}
module.exports = {
    sendKFMessage:sendKFMessage
}