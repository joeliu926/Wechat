var express = require('express');
var router = express.Router();
var userService=require('../service/userService');
/* GET users listing. */
router.get('/', function(req, res, next) {
    var ucode= req.query.code;
    userService.getoauthopenid(code);
  res.send('respond with a resource  user data');
});

module.exports = router;
