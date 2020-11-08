var express = require('express');
var router = express.Router();


router.get('/', (req, res, next) => {
	res.status(200).send('<h1 align="center">User API</h1>');
});


/* Sign Up */
router.get('/signup', (req, res, next) => {
	//some process to register user information
	res.status(200).send({
		message:'signup API',
	});
});

module.exports = router;
