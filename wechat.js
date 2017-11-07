/**
 * Created by JoeLiu on 2017-11-6.
 */
var wechat = require('wechat');
var config = {
    token: 'rkylinmclocationt201711061327',
    appid: 'wx1d024d4ce5f7e303',
    encodingAESKey: 'bFZKmA8BcOe3Hw64Dp8e9OXxNTVLgqVI4xsAt7bZFBg',
    checkSignature: false
};

function initwechat(app) {
    app.use('/', wechat(config, function (req, res, next) {
        var message = req.weixin;
        res.reply('bbb');
    }));
}

module.exports = {
    initwechat: initwechat
}