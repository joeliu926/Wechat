/**
 * Created by JoeLiu on 2017-11-16.
 */

var _accessToken = "";
var _last_update_time = 1510744759132;

module.exports ={
    token_diff_time:1800000,
    getaccessToken:function () {
        return _accessToken
    },
    setaccessToken:function (vars) {
        _accessToken =vars;
    },
    getlast_update_time:function () {
        return _last_update_time
    },
    setlast_update_time:function (vars) {
        _last_update_time =vars;
    }
}