/**
 * Created by JoeLiu on 2017-11-6.
 */
var wechat = require('wechat');
var config = {
    token: 'token',
    appid: 'wx1d024d4ce5f7e303',
    encodingAESKey: 'encodinAESKey',
    checkSignature: false // 可选，默认为true。由于微信公众平台接口调试工具在明文模式下不发送签名，所以如要使用该测试工具，请将其设置为false
};

function initwechat(app) {
    app.use('/wechat', wechat(config, function (req, res, next) {
        // 微信输入信息都在req.weixin上
        var message = req.weixin;
        if (message.FromUserName === 'aaa') {
            // 回复屌丝(普通回复)
            res.reply('bbb');
        }
    }));
}

module.exports = {
    initwechat: initwechat
}