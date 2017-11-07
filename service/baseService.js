var CONSTANT=require('../config/constant');
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtils');
var weChatAPI=require('../config/weChatAPI');
var weConfig=require('../config/wechat_config');


var accesstoken=require('../public/access_token.json');
var fileUtil=require('../utils/fileUtils');

var defualtCfg={
    //url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/api/consultRecord/',
    url:'',
    contentType:'application/json;charset=UTF-8'
};

function getmenu(req, res, next){
    console.log("get menu --------");
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);
    opt.url+=weChatAPI.menu.getmenu.url;
    console.log(opt.url);
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
           // console.log(JSON.parse(body));
            res.send(JSON.parse(body));
        }
    }
    httpClient(opt);
}
function gettoken(req, res, next){
    console.log("get access token===========");
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
            var tokenUpdateTime=accesstoken.last_update_time;
            if(!tokenUpdateTime||new Date(tokenUpdateTime)=="Invalid Date"){
                return false;
            }
            var timeDiff= new Date().getTime()-(new Date(accesstoken.last_update_time).getTime());
            if(timeDiff>accesstoken.token_diff_time){
                var sPath='public/access_token.json';
                accesstoken.last_update_time=new Date().getTime();
                accesstoken.access_token=JSON.parse(body).access_token;
                //console.log(accesstoken);
                fileUtil.writeJSON(sPath,JSON.stringify(accesstoken));
            }
            return true;

           // res.send(JSON.parse(body));
        }
    }
    httpClient(opt);
}
module.exports = {
    gettoken: gettoken,
    getmenu:getmenu
}