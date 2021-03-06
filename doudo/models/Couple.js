const mongoose = require('mongoose');
const CalendarEventSchema = require('./CalendarEvent');
const Todo = require('./Todo');
const Schema = mongoose.Schema;

//Validator
memberMaxLengthValidator = function(arr){
	return arr.length <= 2;
}

const CoupleSchema = new Schema({
	coupleid: {
        type: String,
        required: true,
		unique:[true,'사용할 수 없는 커플 아이디입니다']
    },
    name: {
        type: String,
		default: '커플 이름을 설정해주세요',
    },
	member: {
		type:[{
			type:Schema.Types.ObjectId,
			ref:'user',
			required:true,
			unique: [true, '이미 커플이 되셨습니다'],
		}],
		validate:[memberMaxLengthValidator,'양다리는 안돼요..']
	},
	todo: [Todo],
	event: [CalendarEventSchema],
});


//Statics
CoupleSchema.statics.findOneByCoupleId = function(coupleid){
	return this.findOne({coupleid: coupleid});
}

CoupleSchema.statics.findOneByUserId = function(userid){
	return this.findOne({userid: userid});
}
CoupleSchema.statics.create = function(payload){
	var newCouple = new this(payload);
	return newCouple.save();
}

module.exports = Couple = mongoose.model('couple', CoupleSchema);