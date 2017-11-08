var express = require('express');
var router = express.Router();
var autoPlay=require("../config/autoreply");


var config = {
    token: 'rkylinmclocationt201711061327',
    appid: 'wx1d024d4ce5f7e303',
    encodingAESKey: 'bFZKmA8BcOe3Hw64Dp8e9OXxNTVLgqVI4xsAt7bZFBg',
    checkSignature: false //
};


/* GET home page. */
router.get('/', function(req, res, next) {

    res.end("this is post data");
});

module.exports = router;
