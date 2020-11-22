const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
	description:{type:String,required:true},
	done:{type:Boolean,default:false},
	duedate:{type:Date}
});

module.exports = TodoSchema;