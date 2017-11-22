/**
 * Created by JoeLiu on 2017-11-6.
 */
var wechat = require('wechat');
var messageServer=require('./service/messageServer');
var userBindServer=require('./service/userBindServer');
var baseServer=require('./service/baseService');
var tulinChat = require('./service/tulinChatServer');
var config = require('./config/wechat_config');

 /*{
    token: 'rkylinmclocationt201711061327',
    appid: 'wx1d024d4ce5f7e303',
    encodingAESKey: 'bFZKmA8BcOe3Hw64Dp8e9OXxNTVLgqVI4xsAt7bZFBg',
    checkSignature: false
};*/

function initwechat(app) {
    app.use('/', wechat(config, function (req, res, next) {
        var message = req.weixin;
        if(message.EventKey=="MC_CASE_SUPPORT")
        {
            messageServer.sendKFMessage({
                "touser":message.FromUserName,
                "msgtype":"miniprogrampage",
                "miniprogrampage":
                {
                    "title":"哈罗小助手",
                    "appid":"wx0d601009b9b6ac71",
                    "pagepath":"/pages/home/home?init=true",
                    "thumb_media_id":"421uwH5rd-4A_c5pmCoHjpa4kWTvI9DtMHCq7ZpK73M"
                }
            },function (params) {
                console.log('params',params);
            });
            res.reply({type: "text", content: '欢迎使用案例助手!'});
            return;
        }

        if(message.MsgType=="text")
        {
            let isvirfcode =/^\d+$/.test(message.Content);
            if(message.Content.length==6&&isvirfcode){
                baseServer.getuserinfo(message.FromUserName,function (ars) {
                    userBindServer.bindUser(ars,message.Content,function (resobj) {
                        console.log('resobj.code',resobj);
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
                tulinChat.send({info:message.Content},function (message) {
                    res.reply({type: "text", content: message});
                    //res.reply({type: "text",content:'图灵机器人连接测试中'});
                })
            }
        }
        if(message.MsgType=="event")
        {
            if(message.Event=="subscribe"){
                res.reply({type: "text", content: '欢迎关注哈罗助手，请发送六位验证码进行身份验证.'});
            }
        }
    }));
}

module.exports = {
    initwechat: initwechat
}