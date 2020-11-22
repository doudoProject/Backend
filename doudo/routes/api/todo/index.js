var router = require('express').Router()

/* 
	GET Get Todolist
	/v1/todo
*/
router.get('', (req, res, next) => {
	res.status(200).json({message:'template'})
});

/* 
	POST Add Todolist
	/v1/todo
*/
router.post('', (req, res, next) => {
	res.status(200).json({message:'template'})
});



module.exports = router