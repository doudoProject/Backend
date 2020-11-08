var router = require('express').Router()


router.get('/', (req, res, next) => {
	res.status(200).send('<h1 align="center">Auth API</h1>')
});


/* Sign Up */
router.get('/signup', (req, res, next) => {
	//some process to register user information
	res.status(200).json({
		message:'signup API',
	})
})

module.exports = router