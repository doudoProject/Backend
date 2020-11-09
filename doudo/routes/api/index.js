var router = require('express').Router()
var auth = require('./auth')
var group = require('./group')
const passport = require('passport')

/* api Main */
router.get('/', (req, res, next) => {
	res.status(200).send('<h1 align="center">API Main</h1>')
});

router.use('/auth', auth)
router.use('/group',passport.authenticate('jwt', { session: false}), group)

module.exports = router