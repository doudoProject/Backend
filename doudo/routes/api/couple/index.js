var router = require('express').Router();
const User = require('../../../models/User');
const Couple = require('../../../models/Couple');
const CalendarEvent = require('../../../models/CalendarEvent');

/* 
	GET Get Couple Info
	/v1/couple
*/
router.get('', (req, res, next) => {
	Couple.findOneByCoupleId(req.body.coupleid)
	    .then(couple => {
	        if(!couple) {
	            return res.status(400).json({
					success:false,
	                message: "그런 커플은 없습니다",
	            })
	        } 
			else {
				//본인이 커플인지 확인 필요
				res.json({
					success:true,
					coupleInfo:couple
				})
	        }
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
			//본인이 이미 커플인지 확인
			var newCouple = {
				coupleid: req.body.coupleid,
	            name: req.body.name,
	            member: [req.user.id],
			}
			Couple.create(newCouple);
		}
	})
	/*
	return;
	Couple.findOne({coupleid:req.body.coupleid})
	    .then(couple => {
	        if(couple) {
	            return res.status(400).json({
					success:false,
	                message: "해당 커플 아이디는 사용할 수 없습니다",
	            })
	        } 
			else {
				//본인이 이미 커플인지 확인
				
				//커플 생성
	            const newCouple = new Couple({
					coupleid: req.body.coupleid,
	                name: req.body.name,
	                member: [req.user.id],
	                todo:[],
					events: [],
	            });
	            newCouple.save()
					.then(couple => {
						// 계정 커플 ID 저장
						User.findOneAndUpdate({ userid: req.user.userid },{ $set: { coupleid: `${couple.coupleid}` } },{ upsert: true, useFindAndModify: false })
							.then(user=>{
								res.json({
									success:true,
									coupleInfo:couple,
								})
							})
					})
	                .catch(err => console.log(err))
	        }
	    })
		*/
});

module.exports = router