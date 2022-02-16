const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { status } = require('express/lib/response');
const Post = require('../../models/Post');

// @route  GET api/profile/me
//@desc    Get/View current users profile
//@acess   private
router.get('/me', auth, async (req, res) => {
    try{
        const profile = await Profile.findOne({user : req.user.id}).populate('user',['name','avatar']);
        if(!profile){
            return res.status(400).json({msg : 'There is no profile for this user'});
        }
        res.json(profile);
    }catch(err){
        console.error(err);
        res.status(500).send('server Error');
    }
});

// @route  Post api/profile
// @desc    Create Or Update a User Profile
// @acess   private

router.post('/', [auth, [
    check('status', 'status is required !!').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty()
]], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        //Build Profile Object
        const profileFields = {};
        profileFields.user = req.user.id;
        if(company) profileFields.company = company;
        if(website) profileFields.website = website;
        if(location) profileFields.location = location;
        if(bio) profileFields.bio = bio;
        if(status) profileFields.status = status;
        if(githubusername) profileFields.githubusername = githubusername;
        if(skills){
            profileFields.skills = skills.split(',').map(skills => skills.trim());
        }

        //Build Social object
        profileFields.social = {};
        if(youtube) profileFields.social.youtube = youtube;
        if(facebook) profileFields.social.facebook = facebook;
        if(twitter) profileFields.social.twitter = twitter;
        if(instagram) profileFields.social.instagram = instagram;
        if(linkedin) profileFields.social.linkedin = linkedin;

        try{
            let profile = await Profile.findOne({user : req.user.id});
            if(profile){
                //If profile is found, update profile
                const getProfile = await Profile.findOneAndUpdate({user : req.user.id}, {$set : profileFields}, {new : true});
                return res.json(getProfile);
            }
                // If profile is not Found, Create profile
                const createProfile = new Profile(profileFields);
                createProfile.save();
                res.json(createProfile);
        }catch(err){
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
)

//@route  GET api/profile
//@desc    Get/View all profile
//@acess   public
router.get('/', async (req, res) => {
    try {
        const profile = await Profile.find().populate('user', ['name','avatar']);
        res.json(profile);
    } catch (error) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//@route  GET api/profile/user/:user_id
//@desc    Get profile by user ID
//@acess   public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({user : req.params.user_id}).populate('user', ['name','avatar']);
        if(!profile){
            return res.status(400).json({msg : 'There is no profile for this user'});
        }
        res.status(200).json(profile);
    } catch (err) {
        console.log(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg : 'Profile not found'});
        }
        res.status(500).send('Server Error');
    }
});

//@route  DELETE api/profile
//@desc    Delete profile, user & post
//@acess   private
router.delete('/', auth, async (req, res) => {
    try {

        // Remove profile
        await Profile.findOneAndRemove({user : req.user.id}); 

        // Remove user
        await User.findOneAndRemove({_id : req.user.id});

        res.json({msg : 'User deleted'});

    } catch (err) {
        console.log(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg : 'Profile not found'});
        }
        res.status(500).send('Server Error');
    }
});

//@route  PUT api/profile/experience
//@desc    Add profile experience
//@acess   private

router.put('/experience',
    [auth,
        [
            check('title', 'Title is required').not().isEmpty(),
            check('company', 'Company is required').not().isEmpty(),
            check('from', 'From date is required').not().isEmpty()
        ]
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()});
        }
        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description,
        } = req.body;

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } 

        try {
            const profile = await Profile.findOne({user : req.user.id});
            profile.experience.unshift(newExp);
            await profile.save();
            res.json(profile);

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }

});

//@route  DELETE api/profile/experience/:exp_id
//@desc    Delete experience from profile
//@acess   private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try{
        const profile = await Profile.findOne({user : req.user.id});
        //Get remove index
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    }catch(err){
        console.error(err.message);
        response.status(500).send('Server Error !!');
    }
});

// For Education Only...

//@route  PUT api/profile/Education
//@desc    Add profile Education
//@acess   private

router.put('/education',
    [auth,
        [
            check('school', 'School is required').not().isEmpty(),
            check('degree', 'Degree is required').not().isEmpty(),
            check('fieldofstudy', 'Field of study is required').not().isEmpty(),
            check('from', 'From is required').not().isEmpty(),
        ]
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()});
        }
        const {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description,
        } = req.body;

        const newEdu = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description 
        } 

        try {
            const profile = await Profile.findOne({user : req.user.id});
            profile.education.unshift(newEdu);
            await profile.save();
            res.json(profile);

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }

});

//@route  DELETE api/profile/education/:edu_id
//@desc    Delete education from profile
//@acess   private
router.delete('/education/:edu_id', auth, async (req, res) => {
    try{
        const profile = await Profile.findOne({user : req.user.id});
        //Get remove index
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
        profile.education.splice(removeIndex, 1);
        await profile.save();
        res.json(profile); 
    }catch(err){
        console.error(err.message);
        response.status(500).send('Server Error !!');
    }
});

//@route   GET api/profile/github/:username
//@desc    get user repo from Github
//@acess   Public
router.get('/github/:username', (req, res) => {
    try{
        const options = {
            uri : `https://api.github.com/users/${req.params.username}/repos?per_page=5&
            sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
            method : 'GET',
            headers : {'user-agent' : 'node.js'}
        };

        request(options, (err, respone, body) => {
            if(err) console.error(err);

            if(respone.statusCode !== 200){
               return res.status(400).json({msg : 'No Github pofile found'});
            }

            res.json(JSON.parse(body));
        });

    }catch(err){
        console.log(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router; 
