/**
 * Created by JoeLiu on 2018-2-5.
 */

Date.prototype.pattern=function(fmt) {
    var o = {
        "M+" : this.getMonth()+1, //月份
        "d+" : this.getDate(), //日
        "h+" : this.getHours() == 0 ? 12 : this.getHours(), //小时
        "H+" : this.getHours(), //小时
        "m+" : this.getMinutes(), //分
        "s+" : this.getSeconds(), //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S" : this.getMilliseconds() //毫秒
    };
    var week = {"0":"\u65e5","1":"\u4e00","2":"\u4e8c","3":"\u4e09","4":"\u56db","5":"\u4e94","6":"\u516d"};
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+week[this.getDay()+""]);
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    var m = {
        "s":"m",
        "d":"h",
    };
    return fmt;
}

var report = JBook.create('report');
setTimeout(function () {
    report.init({
        userName:'潜客概况-总体',
        CharListHasData:false,
        userType:0,
        topTab:0,
        sortTab:0,
        chartTab:0,
        sortTabP:0,
        chartTabP:0,
        startTime:new Date(new Date().getTime() - (6 * 24 * 60 * 60 * 1000)).pattern("yyyy-MM-dd"),
        endTime:new Date().pattern("yyyy-MM-dd"),
        startTimeP:new Date(new Date().getTime() - (6 * 24 * 60 * 60 * 1000)).pattern("yyyy-MM-dd"),
        endTimeP:new Date().pattern("yyyy-MM-dd"),
        sortList:[{"userName":'',"amount":12,"width":0}],
        CharList:[],
        sortListP:[{"userName":'',"amount":12,"width":0}],
        userAll:0,
        userHasR:0,
        userHasPhone:0,
        userHasBook:0
    });

    report.refreshUserChart = function (params) {
        $('#containerUser').highcharts({
            chart: {
                type: 'funnel',
                marginRight: 80,
                marginBottom: 40,
                height:500
            },
            title: {
                text: '',
                x: -50
            },
            navigation: {
                buttonOptions: {
                    enabled: false
                }
            },
            credits: {
                enabled: false
            },
            colors:[
                '#EDEBFF',
                '#DFDCFF',
                '#D1CDFF',
                '#C4BFFF'
            ],
            plotOptions: {
                series: {
                    dataLabels: {
                        allowPointSelect:false,
                        enabled: true,
                        crop: false,
                        overflow: 'none',
                        format: '<b>{point.name}</b> ({point.y:,.0f})',
                        softConnector: true,
                        style:{"color": "#999", "fontSize": "22px", "fontWeight": "0", "textOutline": "1px 1px contrast" ,"margin":'0 0 100px 0',"padding":'0 0 100px 0'}
                    },
                    neckWidth: '35%',
                    neckHeight: '55%',
                    allowPointSelect: true
                }
            },
            legend: {
                enabled: false
            },
            series: [{
                name: '客户',
                data: params
            }]
        });
    }

    report.refreshUChart =function () {

        let _this = this;
        $.ajax({
            type: 'POST',
            url: '../report/totalanalysis',
            data: {
                userType:_this.userType,
                beginDate:_this.startTime,
                endDate:_this.endTime
            },
            success: function (data) {

                if(data.code==0){
                    let chartList =[];
                    let HasData = false;
                    data.data.forEach(m=>{
                        if(m.amount!=0){
                            HasData=true;
                        }
                        if(m.searchTypeCode==0){
                            chartList.push( ['潜客总数', m.amount]);
                        }

                        if(m.searchTypeCode==1){
                            chartList.push( ['有过反馈', m.amount]);
                        }

                        if(m.searchTypeCode==2){
                            chartList.push( ['有手机号', m.amount]);
                        }

                        if(m.searchTypeCode==3){
                            chartList.push( ['已约到店', m.amount]);
                        }
                    });
                    _this.setData('CharListHasData', HasData);
                    _this.setData('CharList', chartList);

                    report.refreshUserChart(chartList);
                }
            },
            dataType: "json"
        });
    }

    report.refreshUserSort = function () {
        let _this = this;
        $.ajax({
            type: 'POST',
            url: '../report/rankanalysis',
            data: {
                userType:_this.userType,
                beginDate:_this.startTime,
                endDate:_this.endTime,
                searchTypeCode:_this.sortTab
            },
            success: function (data) {
                if(data.code==0){
                    let _sortlist =[];
                    let _first = 0;
                    data.data.forEach((m,index)=>{
                        if(index==0){
                            _first =m.amount;
                            if(_first==0){
                                _sortlist.push({"userName":m.userName,"amount":m.amount,"width":10});
                            }else{
                                _sortlist.push({"userName":m.userName,"amount":m.amount,"width":80});
                            }
                        }else{
                            let parsNumber  = ~~(m.amount/_first*80);
                            parsNumber = parsNumber<10?10:parsNumber;
                            _sortlist.push({"userName":m.userName,"amount":m.amount,"width":parsNumber});
                        }
                    })
                    _this.setData('sortList',_sortlist);
                }
            },
            dataType: "json"
        });
    }

    report.refreshProductSort = function () {
        let _this = this;
        $.ajax({
            type: 'POST',
            url: '../report/productrankanalysis',
            data: {
                userType:_this.userType,
                beginDate:_this.startTimeP,
                endDate:_this.endTimeP,
                searchTypeCode:_this.sortTabP
            },
            success: function (data) {

                if(data.code==0){
                    let _sortlist =[];
                    let _first = 0;
                    data.data.forEach((m,index)=>{
                        if(index==0){
                            _first =m.amount;
                            if(_first==0){
                                _sortlist.push({"userName":m.productName,"amount":m.amount,"width":10});
                            }else{
                                _sortlist.push({"userName":m.productName,"amount":m.amount,"width":80});
                            }
                        }else{
                            let parsNumber  = ~~(m.amount/_first*80);

                            parsNumber = parsNumber<10?10:parsNumber;
                            _sortlist.push({"userName":m.productName,"amount":m.amount,"width":parsNumber});
                        }
                    });
                    _this.setData('sortListP',_sortlist);
                }
            },
            dataType: "json"
        });
    }

    report.init=function () {

        let _this =this;
        //user vaild`
        $.ajax({
            type: 'POST',
            url: '../report/validuser',
            data: {},
            success: function (data) {
                if(data.code==0){
                    if(!data.data.isAuth){
                        _this.setData('topTab',3);
                    }
                    if(data.data.userType==1){
                        _this.setData('userName',"潜客概况-"+data.data.userName);
                    }
                    _this.setData('userType',data.data.userType);

                }else{
                    _this.setData('topTab',3);
                }

            },
            dataType: "json"
        });
        //TOP
        let ToDay =new Date(new Date().getTime()).pattern("yyyy-MM-dd");
        $.ajax({
            type: 'POST',
            url: '../report/totalanalysis',
            data: {
                userType:_this.userType,
                beginDate:ToDay,
                endDate:ToDay
            },
            success: function (data) {
                if(data.code==0){
                    data.data.forEach(m=>{
                        if(m.searchTypeCode==0){
                            _this.setData('userAll', m.amount);
                        }

                        if(m.searchTypeCode==1){
                            _this.setData('userHasR', m.amount);
                        }

                        if(m.searchTypeCode==2){
                            _this.setData('userHasPhone', m.amount);
                        }

                        if(m.searchTypeCode==3){
                            _this.setData('userHasBook', m.amount);
                        }
                    })
                }
            },
            dataType: "json"
        });

        //报表
        report.refreshUChart();

        //排行
        report.refreshUserSort();

        //项目排行
        report.refreshProductSort();
    };

    report.init();

    report.changlist=function () {
        this.setData('list', [{name:'eee',age:1222},{name:'bb',age:13},{name:'cccds',age:5555}]);
    }


    report.clickTopTab=function () {
        if(this.topTab){
            this.setData('topTab', 0);
        }
        else{
            this.setData('topTab', 1);
        }
    }
    report.clicksortTab=function (params) {
        this.setData('sortTab', params);

        report.refreshUserSort();
    }

    report.clickchartTab=function (params) {
        this.setData('chartTab', params);
        let nDate = new Date();
        if(params){

            let _sevenDay =   new Date(nDate.getTime() - (29 * 24 * 60 * 60 * 1000));
            console.log('_sevenDay.pattern("yyyy-MM-dd")',_sevenDay.pattern("yyyy-MM-dd"));
            this.setData('startTime', _sevenDay.pattern("yyyy-MM-dd"));
        }
        else{
            let _sevenDay =   new Date(nDate.getTime() - (6 * 24 * 60 * 60 * 1000));
            this.setData('startTime', _sevenDay.pattern("yyyy-MM-dd"));
        }
        this.setData('endTime', nDate.pattern("yyyy-MM-dd"));

        //报表
        report.refreshUChart();

        //排行
        report.refreshUserSort();
    }

    report.changeST=function(params,event){
        this.setData('startTime', event.target.value);

        //报表
        report.refreshUChart();

        //排行
        report.refreshUserSort();
    }

    report.changeET=function(params,event){
        this.setData('endTime', event.target.value);

        //报表
        report.refreshUChart();

        //排行
        report.refreshUserSort();
    }

    report.clicksortTabP=function (params) {
        this.setData('sortTabP', params);
        report.refreshProductSort();
    }

    report.clickchartTabP=function (params) {
        this.setData('chartTabP', params);
        let nDate = new Date();
        if(params){

            let _sevenDay =   new Date(nDate.getTime() - (29 * 24 * 60 * 60 * 1000));
            this.setData('startTimeP', _sevenDay.pattern("yyyy-MM-dd"));
        }
        else{
            let _sevenDay =   new Date(nDate.getTime() - (6 * 24 * 60 * 60 * 1000));
            this.setData('startTimeP', _sevenDay.pattern("yyyy-MM-dd"));
        }
        this.setData('endTimeP', nDate.pattern("yyyy-MM-dd"));
        report.refreshProductSort();
    }

    report.changeSTP=function(params,event){
        this.setData('startTimeP', event.target.value);
        report.refreshProductSort();
    }

    report.changeETP=function(params,event){
        this.setData('endTimeP', event.target.value);
        report.refreshProductSort();
    }
    
    report.setstore=function (params) {
        localStorage.setItem('rkylinreportTop'+params, false);
        this.setData('sortTabP', report.sortTabP);
        this.setData('sortTab', report.sortTab);
    }
},200);