var express = require('express');
var router = express.Router();
var crypto = require('crypto');
router.get('/', function(req, res, next) {
   var token="rkylinmclocationt201711061327";
    var signature = req.query.signature||"";
    var timestamp = req.query.timestamp||"";
    var echostr   = req.query.echostr||"";
    var nonce     = req.query.nonce||"";

    console.log("signature---",signature);
    console.log("timestamp---",timestamp);
    console.log("echostr---",echostr);
    console.log("nonce---",nonce);


    var oriArray = new Array();
    oriArray[0] = nonce;
    oriArray[1] = timestamp;
    oriArray[2] = token;
    oriArray.sort();
    var original = oriArray.join('');

    var md5sum = crypto.createHash('sha1');
     md5sum.update(original,"utf8");
     var scyptoString= md5sum.digest('hex');
     console.log("scyptoString---",scyptoString);
    if(signature == scyptoString){

        res.send(echostr);
    } else {
        res.send('validation failed');
    }

/*    res.send(echostr);
    res.send('this is server validation url');*/
});


module.exports = router;
