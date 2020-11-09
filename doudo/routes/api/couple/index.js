var router = require('express').Router();

router.get('/', (req, res, next) => {
	res.status(200).send('<h1 align="center">Auth API</h1>');
});

module.exports = router