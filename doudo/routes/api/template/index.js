var router = require('express').Router()

/* routing Template */
router.get('/', (req, res, next) => {
	res.status(200).json({message:'template'})
});


module.exports = router