/**
 * Created by JoeLiu on 2017-11-9.
 */
var express = require('express');
var router = express.Router();
var messageServer=require('../service/messageServer');

router.post('/sendmessage', function(req, res, next) {
    messageServer.sendKFMessage({
        "touser":"oh3NkxMjCx123_zJv-UhbbAItkeY",
        "msgtype":"text",
        "text":
        {
            "content":"Hello World"
        }
    });
});

module.exports = router;
