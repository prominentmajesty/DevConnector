const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs'); 
const {check, validationResult} = require('express-validator');
const { route } = require('./users');
// @route  GET api/auth
//@desc    AUthenticate user token
//@acess   Public
router.get('/', auth, async(req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.error(err);
        res.status(500).json({errors : [{msg : err}]});
    }
});

// @route  POST api/users
//@desc    Authenticate user & get token
//@acess   Public
router.post('/', [
    check('email', 'please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
    ], async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()});
        }

    const {email, password} = req.body;
    
    try{
        //Check If User Exist
        let userExist = await User.findOne({email : email});
        if(!userExist){
            console.log('Invalid Credencial');
           return res.status(400).json({errors : [{msg : 'Invalid Credentials'}]});
        }
        const ismatch = await bcrypt.compare(password, userExist.password);
        if(!ismatch){
            console.log('Password did not match');
            return res.status(400).json({errors : [{msg : 'Ivalid Credential'}]});
        }
        const payload = {
            user : {
                id : userExist.id
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
        console.error(err);
        res.status(500).json({errors : [{msg : err}]});
    }
});

module.exports = router;