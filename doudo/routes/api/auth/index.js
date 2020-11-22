var router = require('express').Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const keys = require('../../../config/keys');
const User = require('../../../models/User');

/* 
	POST Sign Up
	/v1/auth/signup
*/
router.post('/signup', (req, res, next) => {
	const newUser = new User({
		userid: req.body.userid,
		email: req.body.email,
		password: req.body.password,
		name:req.body.name
	});
	//Encrypt Password
	bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
			newUser.signUp()
			.then(user=>{
				res.json({
					success:true,
					userInfo:user
				})
			})
			.catch(err=>res.status(400).json({
				success:false,
				message:err.message
			}))
        })
    })
})


/* 
	POST Sign In
	/v1/auth/signin
*/
router.post('/signin', (req, res) => {

    const userid = req.body.userid;
    const password = req.body.password;
	
    User.findOne({userid:userid})
    .then(user => {
        if(!user) throw 'id or password mismatch'
		
        // 패스워드 확인
        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if(isMatch) {
                // JWT PAYLOAD
                const payload = {
                	id: user.id,
                    name: user.name,
					couple: user.couple
                };
                // JWT, expires in 7200s
                jwt.sign(payload, keys.secretOrKey, { expiresIn: 7200 }, (err, token) => {
                    res.json({
                        success: true,
                        accessToken: token,
						expiresIn:7200
                    })
                });
            } else {
                throw 'id or password mismatch'
            }
        });
    })
	.catch(err=>{
		res.status(400).json({
			success:false,
			message:err.message
		})
	})
});
module.exports = router