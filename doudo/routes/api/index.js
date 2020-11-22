var router = require('express').Router()
var auth = require('./auth')
var user = require('./user')
var couple = require('./couple')
const passport = require('passport')

router.use('/auth', auth)
router.use('/user',passport.authenticate('jwt', { session: false}), user)
router.use('/couple',passport.authenticate('jwt', { session: false}), couple)


module.exports = router