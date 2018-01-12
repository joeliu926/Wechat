var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtils');
var weChatAPI=require('../config/weChatAPI');

var defualtCfg={
    //url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/api/consultRecord/',
    url:'',
    contentType:'application/json'
};

function sendKFMessage(data,cb){
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);

    console.log('data',data);
    opt.url+=weChatAPI.message.sendkfmsg();
    opt.data= data;

    console.log('opt---------------',opt);
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
/**
 * 发送模板消息
 * @param data
 * @param cb
 */
function sendtemplatemsg(bodyData,cb){
   // console.log("weChatAPI.message.sendtemplatemsg();----->",weChatAPI.message.sendtemplatemsg());
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.url+=weChatAPI.message.sendtemplatemsg();
    opt.data= bodyData;
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
    sendKFMessage:sendKFMessage,
    sendtemplatemsg:sendtemplatemsg
}