var router = require('express').Router()
var auth = require('./auth')
var couple = require('./couple')
const passport = require('passport')

/* api Main */
router.get('/', (req, res, next) => {
	res.status(200).send('<h1 align="center">API Main</h1>')
});

router.use('/auth', auth)
router.use('/couple',passport.authenticate('jwt', { session: false}), couple)

module.exports = router