/**
 * Created by JoeLiu on 2017-10-30.
 */
/**
 * 用户代理，
 * @type {exports}
 */
var CONSTANT = require("../config/constant.js");

function setUserResource(req,resources){
    req.session[CONSTANT.session.resourceCode]=resources;
}
function getUserResource(req){
    return 	req.session[CONSTANT.session.resourceCode];
}
/**
 * 资源检查
 * @param req
 * @param resource
 * @returns {boolean} true 有资源 false 无资源
 */
function checkUserResource(req,resource){
    var res=req.session[CONSTANT.session.resourceCode];
    if(res&&res.length&&res.indexOf(resource)>-1){
        return true;
    }else{
        return false;
    }
}
//用户id
function deleteUserId(req){
    delete req.session[CONSTANT.session.userId];
}
function setUserId(req,id){
   // console.log('req---------',CONSTANT.session.userId);
    req.session[CONSTANT.session.userId]=id;
}
function getUserId(req){
   // console.log('req.session[CONSTANT.session.ididi]',req.sessionID);
   // console.log('req.session[CONSTANT.session.userId]',req.sessionStore);
    return req.session?req.session[CONSTANT.session.userId]:null;
}

//用户信息
function deleteUserInfo(req){
    delete req.session[CONSTANT.session.userInfo];
}
function setUserInfo(req,info){
    req.session[CONSTANT.session.userInfo]=info;
}
function getUserInfo(req){
    return req.session?req.session[CONSTANT.session.userInfo]:null;
}


//用户token
function deleteUserToken(req){
    delete req.session[CONSTANT.session.xAuthToken];
}
function setUserToken(req,xAuthToken){
    req.session[CONSTANT.session.xAuthToken]=xAuthToken;
}
function getUserToken(req){
    return req.session?req.session[CONSTANT.session.xAuthToken]:null;
}

//用户openid
function deleteUserOpenId(req){
    delete req.session[CONSTANT.session.OpenId];
}
function setUserOpenId(req,xAuthToken){
    req.session[CONSTANT.session.OpenId]=xAuthToken;
}
function getUserOpenId(req){
    return req.session?req.session[CONSTANT.session.OpenId]:null;
}



module.exports ={
    deleteUserInfo:deleteUserInfo,
    setUserInfo:setUserInfo,
    getUserInfo:getUserInfo,
    setUserResource:setUserResource,
    getUserResource:getUserResource,
    checkUserResource:checkUserResource,
    deleteUserId:deleteUserId,
    setUserId:setUserId,
    getUserId:getUserId,
    deleteUserToken:deleteUserToken,
    setUserToken:setUserToken,
    getUserToken:getUserToken,
    deleteUserOpenId:deleteUserOpenId,
    setUserOpenId:setUserOpenId,
    getUserOpenId:getUserOpenId
};