/**
 * Created by JoeLiu on 2017-11-9.
 */
var express = require('express');
var router = express.Router();

router.get('/detail', function(req, res, next) {
    res.render('customerDetail', { title: 'Expsdfress' });
});

router.get('/photolist', function(req, res, next) {
    res.render('photoList', { title: 'sd' });
});

module.exports = router;
