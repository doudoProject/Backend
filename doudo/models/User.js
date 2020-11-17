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
        type: Schema.Types.ObjectId
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

//Methods

// Encrypt password
UserSchema.methods.encryptPassword = function(){
	bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            if(err) throw err;
            this.password = hash;
        })
    })
}

// Pre save
UserSchema.pre('save',function(next){
	this.encryptPassword();
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

//Signup User
UserSchema.methods.signUp = function (){
	return this.save();
}

module.exports = User = mongoose.model('user', UserSchema);