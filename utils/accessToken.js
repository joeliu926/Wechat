/**
 * Created by JoeLiu on 2017-11-16.
 */

var _accessToken = "";
var _last_update_time = 1510744759132;

module.exports ={
    token_diff_time:1800000,
    getaccessToken:function () {
        console.log('get_accessToken',_accessToken);
        return _accessToken
    },
    setaccessToken:function (vars) {
        console.log('set_accessToken',vars)
        _accessToken =vars;
    },
    getlast_update_time:function () {
        console.log('get__last_update_time',_last_update_time);
        return _last_update_time
    },
    setlast_update_time:function (vars) {
        console.log('set__last_update_time',vars);
        _last_update_time =vars;
    }
}