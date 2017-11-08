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
        res.reply(
            [  {
                title: '你好boy',
                description: '这是一个测试的对话',
                picurl: 'https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=4088918123,1681772807&fm=85&s=EBAF31623EFD79ABDEC411E10300E020',
                url: 'https://www.baidu.com/'
            },
                {
                    title: '你好girl',
                    description: '这是第二个测试信息',
                    picurl: 'https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=4088918123,1681772807&fm=85&s=EBAF31623EFD79ABDEC411E10300E020',
                    url: 'https://www.baidu.com/'
                }]
        );
    }));
}

module.exports = {
    initwechat: initwechat
}