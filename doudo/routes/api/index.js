var router = require('express').Router()
var auth = require('./auth')

/* api Main */
router.get('/', (req, res, next) => {
	res.status(200).send('<h1 align="center">API Main</h1>')
});

router.use('/auth', auth)

module.exports = router