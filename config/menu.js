var menuconfig =  {
    "button":[
        {
            "name":"咨询助手",
            "sub_button":[
                {
                    "type":"miniprogram",
                    "name":"案例助手",
                    "url":"http://mp.weixin.qq.com",
                    "appid":"wx0d601009b9b6ac71",
                    "pagepath":"pages/view/index"
                },
                {
                    "type":"click",
                    "name":"打卡助手",
                    "key":"MC_CLOCK_IN"
                }]
        },{
            "type":"click",
            "name":"客户中心",
            "key":"MC_CUSTOMER_CENTER"
        }]
};

module.exports =menuconfig;