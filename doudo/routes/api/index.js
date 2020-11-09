var router = require('express').Router()
var auth = require('./auth')
var couple = require('./couple')
const passport = require('passport')

router.use('/auth', auth)
router.use('/couple',passport.authenticate('jwt', { session: false}), couple)

module.exports = router