var router = require('express').Router()
const mongoose = require('mongoose')
const Couple = require('../../../models/Couple')

/* 
	GET Get Chat List
	/v1/chat
*/

// TODO : mark as read
router.get('/:from', (req, res, next) => {
	Couple.aggregate([
		{
			$match:{
				'_id':req.user.couple
			} 
		},
		{
			$unwind: "$chat"
		},
		{
			$match: {
				"chat.createdat": {$gte: new Date(req.params.from), $lt: new Date()}
			}
		},
		{
			$group:{
				"_id":"$_id", //couple._id
				"chats":{
					"$push":{
						"_id":"$chat._id",
						"message":"$chat.message",
						"sender":"$chat.sender",
						"read":"$chat.read",
						"createdat":"$chat.createdat"
					}
				}
			}
		},
	])
	.then(chat=>{
		if(!chat) throw 'no such couple'
		res.json({
			success:true,
			chats: (chat.length ? chat[0].chats:[])
		})
	})
	.catch(err=>{
		res.status(400).json({
			success:false,
			message:err
		})
	})
});


/* 
	POST Send Chat
	/v1/chat
*/
router.post('', (req, res, next) => {
  
  var newChat= {
		message:req.body.message,
		sender:req.user.userid,
		createdat:new Date()
	}
  Couple.findOneAndUpdate(
    { _id : mongoose.Types.ObjectId(req.user.couple) },
    { $push : { chat: newChat }},
    {new : true}
  )
  .then((response)=>{
    res.json({
      success:true,
      affected:response.chat[response.chat.length-1]
    })
  })
  .catch(err=>{
    res.status(400).json({
      success:false,
      message:err.message
    })
  })
})

module.exports = router