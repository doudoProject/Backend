var express = require('express');
var router = express.Router();

/* Doudo API Main */
router.get('/', function(req, res, next) {
	res.status(200).send('Thank you for using Doudo');
});

module.exports = router;