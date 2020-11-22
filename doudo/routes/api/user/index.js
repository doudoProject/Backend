var router = require('express').Router()
const User = require('../../../models/User');

/* 
	GET Get User Info
	/v1/user
*/
router.get('', (req, res, next) => {
	User.find({userid:req.user.userid}).populate('couple')
	.then(user=>{
		if(!user) throw 'no such user';
		res.status(200).json({
			success:true,
			userInfo:user
		})
	})
	.catch(err=>{
		res.status(400).json({
			success:false,
			message:err
		})
	})
});


module.exports = router