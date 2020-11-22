var router = require('express').Router();
const User = require('../../../models/User');
const Couple = require('../../../models/Couple');
const CalendarEvent = require('../../../models/CalendarEvent');

/* 
	GET Get Couple Info
	/v1/couple
*/
router.get('', (req, res, next) => {
	Couple.findById(req.user.couple).populate('member')
	.then(couple => {
	    if(!couple) throw 'no such couple'
		//Todo :본인이 커플인지 확인 필요
		res.json(
			couple
		)
	})
	.catch(err=>{
		res.status(400).json({
			success:false,
	        message: err.message,
	    })
	})
	
});


/* 
	POST Create Couple Id
	/v1/couple
*/
router.post('', (req, res, next) => {
	User.findOneByUserId(req.user.userid)
	.then(user=>{
		if(user){
			//Todo: 본인이 이미 커플인지 확인
			var newCouple = {
				coupleid: req.body.coupleid,
	            name: req.body.name,
	            member: [req.user.id],
			}
			Couple.create(newCouple)
			.then(couple=>{
				User.setCouple(req.user.id,couple._id)
				.then(()=>{
					res.json({
						success:true,
						coupleInfo:couple
					});
				})
				
			})
		}
	})
	.catch(err=>{
		res.status(400).json({
			success:false,
			message:err.message
		})
	})
});

/* 
	POST Join Couple
	/v1/couple/join
*/
router.post('/join', (req, res, next) => {
	Couple.findOneByCoupleId(req.body.coupleid)
	.then(couple=>{
		if(!couple) throw 'no such couple'
		couple.member.push(req.user.id)
		couple.save()
		.then(()=>{
			User.setCouple(req.user.id,couple._id)
			.then(couple=>{
				res.json({
					success:true,
					coupleInfo:couple
				})
			})
		})
	})
	.catch(err=>{
		res.status(400).json({
			success:false,
			message:err.message
		})
	})
});

module.exports = router