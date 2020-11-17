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


/* 
	POST Sign In
	/v1/auth/signin
*/
router.post('/signin', (req, res) => {

    const userid = req.body.userid;
    const password = req.body.password;
	
    User.findOne({userid:userid})
        .then(user => {
            if(!user){
                return res.status(400).json({
					success: false,
					message: "아이디나 패스워드가 일치하지 않습니다"
				});
            }

            // 패스워드 확인
            bcrypt.compare(password, user.password)
            	.then(isMatch => {
                    if(isMatch) {
                        // 회원 비밀번호가 일치할 때
                        // JWT PAYLOAD 생성
                        const payload = {
                            id: user.id,
                            name: user.name
                        };

                        // JWT 토큰 생성
                        // 1시간 동안 유효
                        jwt.sign(payload, keys.secretOrKey, { expiresIn: 7200 }, (err, token) => {
                            res.json({
                                success: true,
                                accessToken: token
                            })
                        });
                    } else {
                        return res.status(400).json({
							success: false,
							message: "아이디나 패스워드가 일치하지 않습니다"
						});
                    }
                });
        })
});
module.exports = router