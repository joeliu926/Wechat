var weConfig=require('./wechat_config');
//var accessToken=require("../public/access_token.json").access_token;
var accessToken=require("../utils/accessToken");
var config={
    accesstoken:{
        method:"get",
        url:"https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+weConfig.appid+"&secret="+weConfig.appSecret
    },
    menu:{
        setmenu:function(){
             //method:"post",
             return "https://api.weixin.qq.com/cgi-bin/menu/create?access_token="+accessToken.getaccessToken();
        },
        getmenu:function(){
           // method:"get",
            return "https://api.weixin.qq.com/cgi-bin/menu/get?access_token="+accessToken.getaccessToken();
        },
        deletemenu:function(){
            //method:"get",
            return "https://api.weixin.qq.com/cgi-bin/menu/delete?access_token="+accessToken.getaccessToken();
        },
        setconditional:function(){
           // method:"post",
            return "https://api.weixin.qq.com/cgi-bin/menu/addconditional?access_token="+accessToken.getaccessToken();
        },
        del:function(){
             //   method:"post",
            return "https://api.weixin.qq.com/cgi-bin/menu/delconditional?access_token="+accessToken.getaccessToken();
        }
    },
    customer:{

    },
    userinfo:function () {
        //method:"get",
        return "https://api.weixin.qq.com/cgi-bin/user/info?access_token="+accessToken.getaccessToken()+"&openid=_OPENID_&lang=zh_CN";
    },
    authorize:{
        authorizecode:{
            method:"GET",
            url:"https://open.weixin.qq.com/connect/oauth2/authorize?appid="+weConfig.appid+"&redirect_uri=REDIRECT_URI&response_type=code&scope=snsapi_userinfo&state=_state_#wechat_redirect"
        },
        augetopenid:{
            method:"POST",
            url:"https://api.weixin.qq.com/sns/oauth2/access_token?appid="+weConfig.appid+"&secret="+weConfig.appSecret+"&code=_CODE_&grant_type=authorization_code"
        }
    },
    message:{
        sendkfmsg:function () {
           // method:"POST",
            return "https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token="+accessToken.getaccessToken();
        },
        sendtemplatemsg:function () {
            // method:"POST",
            return "https://api.weixin.qq.com/cgi-bin/message/template/send?access_token="+accessToken.getaccessToken();
        },
        kfaccountadd:function () {
           // method:"POST",
            return "https://api.weixin.qq.com/customservice/kfaccount/add?access_token="+accessToken.getaccessToken();
        },
        kfaccountalter:function () {
            //method:"POST",
            return "https://api.weixin.qq.com/customservice/kfaccount/add?access_token="+accessToken.getaccessToken();
        },
        kfaccountdelete:function () {
            //method:"GET",
             return "https://api.weixin.qq.com/customservice/kfaccount/del?access_token="+accessToken.getaccessToken();
        },
        kfaccountget:function () {
            //method:"GET",
            return "https://api.weixin.qq.com/cgi-bin/customservice/getkflist?access_token="+accessToken.getaccessToken();
        }
    }

};
module.exports=config;