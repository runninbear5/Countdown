var express = require('express');
var router = express.Router();

var controller = require('../controllers/indexController');

router.get('/', controller.home);

module.exports = router;
