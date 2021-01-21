var router = require('express').Router()
var auth = require('./auth')
var user = require('./user')
var couple = require('./couple')
var todo = require('./todo')
var chat = require('./chat')
const passport = require('passport')

router.use('/auth', auth)
router.use('/user',passport.authenticate('jwt', { session: false}), user)
router.use('/couple',passport.authenticate('jwt', { session: false}), couple)
router.use('/todo',passport.authenticate('jwt', { session: false}), todo)
router.use('/chat',passport.authenticate('jwt', { session: false}), chat)

module.exports = router