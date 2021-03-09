const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CalendarEventSchema = new Schema({
    name : {
        type: String,
        required: true
    },
	datetime:{
		allday:{type:Boolean,required:true},
		start:{type:Date,required:true},
		end:{type:Date,required:true},
	},
	author:{
		type: String,
		required: true
	}
});

module.exports = CalendarEventSchema;