var router = require('express').Router()
const mongoose = require('mongoose')
const Couple = require('../../../models/Couple')
const Todo = require('../../../models/Todo')

/* 
	GET Get Todolist
	/v1/todo
*/
router.get('', (req, res, next) => {
	Couple.findById(req.user.couple)
	.then(couple=>{
		if(!couple) throw 'no such couple'
		res.json(couple.todo)
	})
	.catch(err=>{
		res.status(400).json({
			success:false,
			message:err.message
		})
	})
});

/* 
	POST Add Todolist
	/v1/todo
*/
router.post('', (req, res, next) => {
  
  var newTodo = {
		description:req.body.description,
		duedate:req.body.duedate
	}
  Couple.findOneAndUpdate(
    { _id : mongoose.Types.ObjectId(req.user.couple) },
    { $push : { todo: newTodo }},
    {new : true}
  )
  .then((response)=>{
    res.json({
      success:true,
      affected:response.todo[response.todo.length-1]
    })
  })
  .catch(err=>{
    res.status(400).json({
      success:false,
      message:err.message
    })
  })
  /*
	Couple.findById(req.user.couple)
	.then(couple=>{
		if(!couple) throw 'no such couple'
		var newTodo = {
		  description:req.body.description,
		  duedate:req.body.duedate
    }
		couple.todo.push(newTodo);
		couple.save()
		.then((couple)=>{
			res.json({
				success:true,
				todo:couple.todo
			})
		})
	})
	.catch(err=>{
		res.status(400).json({
			success:false,
			message:err.message
		})
	})*/
});

/* 
	DELETE Delete Todolist Item
	/v1/todo
*/

router.delete('', (req, res, next) => {
  Couple.update({_id: mongoose.Types.ObjectId(req.user.couple)},{$pull : {todo:{_id: req.body.id}}})
  .then(result=>{
    if(!result.nModified) throw 'todo object does not exist'
    res.json({
      success:true
    })
  })
  .catch(err=>{
    res.status(400).json({
      success:false,
      message:err.message
    })
  })
})

/* 
	PUT Update Todolist Item
	/v1/todo
*/

router.put('', (req, res, next) => {
  Couple.update({'_id': mongoose.Types.ObjectId(req.user.couple), 'todo._id':mongoose.Types.ObjectId(req.body._id) }, {$set : {'todo.$':req.body}} )
  .then(result=>{
    if(!result.nModified) throw 'todo object does not exist'
    res.json({
      success:true
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