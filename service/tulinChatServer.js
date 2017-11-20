var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtils');
var weChatAPI=require('../config/weChatAPI');

var defualtCfg={
    url:'http://openapi.tuling123.com/openapi/api/v2',
    contentType:'application/json'
};
const appkey='602e5367686c47f3bf24711f591bcb89';

function send(args,cb){
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.data=
    {
        "reqType":0,
        "perception": {
            "inputText": {
                "text": args.info
            },
            "inputImage": {
                "url": "imageUrl"
            },
            "selfInfo": {
                "location": {
                    "city": "北京",
                    "province": "北京",
                    "street": "信息路"
                }
            }
        },
        "userInfo": {
            "apiKey": appkey,
            "userId": "xiaoluo"
        }
    }

    opt.callBack=function(error, response, body){
        try{
            if(error)
            {
                cb&&cb("小罗还在学习中，不明白您的意思！");
            }
            else {
                console.log('tuling',body)
                body = JSON.parse(body);

                if(body.intent.code==4003){
                    cb&&cb("小罗累了要休息了，明天见！");
                }
                cb&&cb(body.results[0].values.text);
            }
        }
        catch (e){
            cb&&cb("小罗被你干崩漏了！");
        }

    }
    httpClient(opt);
}

module.exports = {
    send:send
}