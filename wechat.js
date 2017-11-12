/**
 * Created by JoeLiu on 2017-11-6.
 */
var wechat = require('wechat');
var messageServer=require('./service/messageServer');
var config = {
    token: 'rkylinmclocationt201711061327',
    appid: 'wx1d024d4ce5f7e303',
    encodingAESKey: 'bFZKmA8BcOe3Hw64Dp8e9OXxNTVLgqVI4xsAt7bZFBg',
    checkSignature: false
};

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
                    "pagepath":"/page/index",
                    "thumb_media_id":"thumb_media_id"
                }
            });
        }
    }));
}

module.exports = {
    initwechat: initwechat
}