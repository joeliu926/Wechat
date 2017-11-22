/**
 * Created by JoeLiu on 2017-11-22.
 */
var fs = require('fs');// 加载编码转换模块
var path = require("path");
var file = "../config/constant.js";

var data = fs.readFileSync(__dirname + file,'utf-8');
data = data + "";

data = data.replace(/remoteHost:('|')?.+('|")?,/g,function (word){
    return 'remoteHost:"http://140.143.185.73",';
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