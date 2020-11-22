const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
	couple : {
        type: Schema.Types.ObjectId,
		ref:'couple'
    },
	permission:{
		type: Number,
		default:0
	}
});

//Statics 

//Find One by userid
UserSchema.statics.findOneByUserId = function (userid){
	return this.findOne({userid: userid});
}

//Find One by email
UserSchema.statics.findOneByEmail = function (email){
	return this.findOne({email: email});
}

// Middleware

// Pre save
UserSchema.pre('save',function(next){
	this.constructor.findOneByUserId(this.userid)
	.then(user=>{
		if(user)
			next(this.invalidate('','userid overlap'))
		this.constructor.findOneByEmail(this.email)
		.then(user=>{
			if(user)
				next(this.invalidate('','email overlap'))
			next();
		})
	})
});

//Methods

// Set couple
UserSchema.statics.setCouple = function(userobjectid, coupleobjectid){
	var user = this.findById(userobjectid);
	return user.updateOne({},{$set:{couple:coupleobjectid}},{upsert:true})
}

//Signup User
UserSchema.methods.signUp = function (){
	return this.save();
}

module.exports = User = mongoose.model('user', UserSchema);