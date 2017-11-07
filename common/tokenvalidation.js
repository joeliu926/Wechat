var accesstoken=require('../public/access_token.json');
var fileUtil=require('../utils/fileUtils');

function tokenvalidation() {
    var tokenUpdateTime=accesstoken.last_update_time;
    if(!tokenUpdateTime||new Date(tokenUpdateTime)=="Invalid Date"){
        return false;
    }
    var timeDiff= new Date().getTime()-(new Date(accesstoken.last_update_time).getTime());
    console.log(timeDiff);
    if(timeDiff>accesstoken.token_diff_time){
        var sPath='public/access_token.json';
        accesstoken.last_update_time=new Date().getTime();
        console.log(accesstoken);
        fileUtil.writeJSON(sPath,JSON.stringify(accesstoken));
    }
    return true;
}
module.exports={
    tokenvalidation:tokenvalidation
}