const mongoose = require('mongoose');
const CalendarEvent = require('./CalendarEvent');
const Schema = mongoose.Schema;

const CoupleSchema = new Schema({
	coupleid: {
        type: String,
        required: true,
		unique:true
    },
    name : {
        type: String,
		default: '커플 이름을 설정해주세요',
        required: true
    },
	member:[{type:String, required:true}],
	todo:[String],
	event:CalendarEvent
});

module.exports = Couple = mongoose.model('couples', CoupleSchema);