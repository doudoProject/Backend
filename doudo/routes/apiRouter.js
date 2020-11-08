module.exports = function(app){
	var express = require('express');
	var router = express.Router();
	var userRouter = require('./userRouter');
	
	/* api Main */
	router.get('/', (req, res, next) => {
		res.status(200).send('<h1 align="center">API Main</h1>');
	});
	
	app.use('/v1/user', userRouter);
	
	return router;
};
