/**
 * Created by JoeLiu on 2017-11-22.
 */
var fs = require('fs');// 加载编码转换模块
var path = require("path");
var file = "../config/constant.js";

var data = fs.readFileSync(__dirname + file,'utf-8');
data = data + "";

data = data.replace(/remoteHost:('|')?.+('|")?,/g,function (word){
    return 'remoteHost:"http://140.143.184.52",';
});
data = data.replace(/remotePort:('|")?.+('|")?,/g,function (word){
    return 'remotePort:"8082",';
});

fs.writeFile(__dirname + file, data, function(err){
    if(err){
        console.log("error! " + file);
        console.log(err);
    }else{
        console.log("constant.js success! ");
    }
});


//replace current file from local file
var fileAppCofnig_read = "/dist_wechat_config.js";
var fileAppCofnig_write = "./../config/wechat_config.js";
var dataApp = fs.readFileSync(__dirname + fileAppCofnig_read,'utf-8');
dataApp = dataApp + "";

fs.writeFileSync(__dirname + fileAppCofnig_write, dataApp, function(err){
    if(err){
        console.log("error! " + file);
        console.log(err);
    }else{
        console.log("wechat_config.js success! ");
    }
});


//replace boot port file use regex
var file_port = "./../bin/www";
var data_port = fs.readFileSync(__dirname + file_port,'utf-8');
data_port = data_port + "";
data_port = data_port.replace(/var port = normalizePort\(process.env.PORT \|\| \'\d{4}\'\);/g,function (word){
    return "var port = normalizePort(process.env.PORT || '8031');";
});
fs.writeFileSync(__dirname + file_port, data_port, function(err){
    if(err){
        console.log("error! " + file);
        console.log(err);
    }else{
        console.log("wwww.js success! ");
    }
});