const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	userid: {
        type: String,
        required: true,
		unique:true
    },
	email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true
    },
	coupleId : {
        type: String
    },
	permission:{
		type: Number,
		default:0
	}
});

module.exports = User = mongoose.model('users', UserSchema);