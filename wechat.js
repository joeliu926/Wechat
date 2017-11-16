/**
 * Created by JoeLiu on 2017-11-6.
 */
var wechat = require('wechat');
var messageServer=require('./service/messageServer');
var userBindServer=require('./service/userBindServer');
var baseServer=require('./service/baseService');
var config = {
    token: 'rkylinmclocationt201711061327',
    appid: 'wx1d024d4ce5f7e303',
    encodingAESKey: 'bFZKmA8BcOe3Hw64Dp8e9OXxNTVLgqVI4xsAt7bZFBg',
    checkSignature: false
};

function initwechat(app) {
    app.use('/', wechat(config, function (req, res, next) {
        var message = req.weixin;
        console.log('message',message);
        if(message.EventKey=="MC_CASE_SUPPORT")
        {
            messageServer.sendKFMessage({
                "touser":message.FromUserName,
                "msgtype":"miniprogrampage",
                "miniprogrampage":
                {
                    "title":"哈罗小助手",
                    "appid":"wx0d601009b9b6ac71",
                    "pagepath":"/page/index",
                    "thumb_media_id":"YZ8K_s8kxr51ol-iIJch1Edny09HJ4Ie_mgaYc3HDlbFWHtr9rqtJUPMYTOs7vBM"
                }
            },function (params) {
                console.log('params',params);
            });
            res.reply({type: "text", content: '欢迎使用案例助手!'});
            return;
        }

        if(message.MsgType=="text")
        {
            if(message.Content.length==6){
                baseServer.getuserinfo(message.FromUserName,function (ars) {
                    userBindServer.bindUser(ars,message.Content,function (resobj) {
                        //console.log('resobj.code',resobj);
                        resobj= JSON.parse(resobj);
                        if(resobj.code==0){
                            res.reply({type: "text", content: '恭喜您！绑定成功!'});
                        }
                        else if(resobj.code==3007){
                            res.reply({type: "text", content: '验证码无效!'});
                        }
                        else if(resobj.code==3008){
                            res.reply({type: "text", content: '您已经绑定，无需再操作!'});
                        }
                        else{
                            res.reply({type: "text", content: '绑定失败，请联系客服!'});
                        }
                    })
                },function (error) {
                    res.reply({type: "text", content: '您的输入不正确!'});
                });
            }
            else{
                res.reply({type: "text", content: '小罗在学习中，还不明白你说的是什么!'});
            }
        }
    }));
}

module.exports = {
    initwechat: initwechat
}