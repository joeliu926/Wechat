/**
 * Created by JoeLiux on 2017-10-23.
 */
module.exports = {
    wechatHost:"https://api.weixin.qq.com",
    remoteHost:"http://140.143.184.52",  //http://101.132.161.222:8082
    remotePort:"8082",
    cookie: {
        identityKey:"rky_mc_web_node",
        maxAge: 12 * 60 * 60 * 1000//24 * 60 * 60 * 1000
    },
    contentType: {
        'formData': 'multipart/form-data',
        'formUrlencoded': 'application/x-www-form-urlencoded',
        'applicationJson': 'application/json'
    },
    page: {

        main: '/',
    },
    session: {
        /**caas登录用户ID*/
        userId: '__USER_ID__',
        /**登录用户名称*/
        userInfo: '__USER_INFO__',
        /**登录时间 */
        loginTime: '__LOGIN_TIME__',
        /**登录次数*/
        loginCount: '__LOGIN_COUNT__',
        accessInfo: '__AUTH_INFO__',
        xAuthToken: '__X_AUTH_TOKEN__',
        resourceCode: '__RESOURCE_CODE__',
        OpenId:'__OPENID__'
    },
    //白名单
    sessionWhiteList: [

    ],
    accessWhiteList: [

    ],
    //回数code
    code: {
        err: 8000,
        loginErr: 8001,
        sessionOut: 8002,
        accessErr: 8003,
        userInfoErr:8004,
        authErr:8005,
        dataErr:8100,
        //维护中
        operationStatus:8200
    }
};
