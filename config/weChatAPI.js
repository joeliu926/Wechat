var weConfig=require('./wechat_config');
var accessToken=require("../public/access_token.json").access_token;
var config={
    accesstoken:{
        method:"get",
        url:"https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+weConfig.appid+"&secret="+weConfig.appSecret
    },
    menu:{
        setmenu:{
             method:"post",
             url:"https://api.weixin.qq.com/cgi-bin/menu/create?access_token="+accessToken
        },
        getmenu:{
            method:"get",
            url:"https://api.weixin.qq.com/cgi-bin/menu/get?access_token="+accessToken
        },
        deletemenu:{
            method:"get",
            url:"https://api.weixin.qq.com/cgi-bin/menu/delete?access_token="+accessToken
        },
        getmenu:{
            method:"get",
            url:"https://api.weixin.qq.com/cgi-bin/menu/get?access_token="+accessToken
        },
        setconditional:{
            method:"post",
            url:"https://api.weixin.qq.com/cgi-bin/menu/addconditional?access_token="+accessToken
        },del:{
                method:"post",
            url:"https://api.weixin.qq.com/cgi-bin/menu/delconditional?access_token="+accessToken
        }
    },
    customer:{

    }

};
module.exports=config;