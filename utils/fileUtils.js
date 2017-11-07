var fs=require('fs');
var path = require('path');
var sPath=path.join(__dirname, '../');
function readJSON(path) {
    path=sPath+path;
    if (fs.existsSync(path)) {
        return JSON.parse(fs.readFileSync(path));
    }else {
        return {};
    }
}
function writeJSON(path,jsonstr) {
    path=sPath+path;
    if (fs.existsSync(path)) {
        fs.writeFileSync(path,jsonstr);
    } else {
        console.log(path+ " Not Found!");
    }
}


module.exports = {
    readJSON:readJSON,
    writeJSON:writeJSON
};