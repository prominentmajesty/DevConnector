const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

// @route  POST api/users
//@desc    Register User
//@acess   Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'please include a valid email').isEmail(),
    check('password', 'Please Enter a Password With 6 or More Cheracters').isLength({min : 6})
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }

    const {name, email, password} = req.body;
    
    try{
        //Check If User Exist
        let userExist = await User.findOne({email : email});
        if(userExist){
            console.log('User already exist');
           return res.status(400).json({errors : [{msg : 'User already exist'}]});
        }

        //Get User gravata
        const avatar = gravatar.url(email, {
            s : '200', 
            r : 'pg',
            d : 'mm'
        });
        
        const user = new User({
            name,
            email,
            avatar,
            password,
        })

        //Encrypt Password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);
        
        await user.save();
        const payload = {
            user : {
                id : user.id
            }
        }

        //Return jsonwebtoken
        jwt.sign(
            payload,
            config.get('jwtSeccret'),
            {expiresIn : 360000}, (err, token) => {
                if(err) throw err;
                res.json({token});
            }
        );

    }catch(err){
        console.log('Error :' + err);
        res.status(500).json({errors : [{msg : err}]});
    }
});

module.exports = router;