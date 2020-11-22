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
	})
});



module.exports = router