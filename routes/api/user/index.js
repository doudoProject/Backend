var router = require('express').Router()
const User = require('../../../models/User');

/* 
	GET Get User Info
	/v1/user
*/
router.get('', (req, res, next) => {
	User.findOne({userid:req.user.userid}).select('-password').populate({path:'couple',populate:'member'})
	.then(user=>{
		if(!user) throw 'no such user';
		res.status(200).json(
			user
		)
	})
	.catch(err=>{
		res.status(400).json({
			success:false,
			message:err.message
		})
	})
});


module.exports = router