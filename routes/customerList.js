/**
 * Created by JoeLiu on 2017-11-9.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/list', function(req, res, next) {
    res.render('customerList', { title: 'tes' });
});

module.exports = router;
