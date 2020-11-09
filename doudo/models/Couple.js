const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	coupleid: {
        type: String,
        required: true
    },
    name : {
        type: String,
		default: '커플 이름을 설정해주세요',
        required: true
    },
	member:[String],
	todo:[String],
	events:{
		name:{type:String},
		datetime:{type:String},
		author:{type:String},
	}
});

module.exports = User = mongoose.model('users', UserSchema);