const router = require("express").Router();
const User = require("../model/User");
const {registerValidation} = require('../validation');
const bcrypt = require('bcrypt');


router.post('/register', async (req, res) => {
    //Validate before creating a user
    const { error } = registerValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    };
    //Check if user exists in database
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists) {
        return res.status(400).send('Email already exists');
    };
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //Create new user
        const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    //Save user or catch error
    try {
        const savedUser = await user.save();
        res.send({user: user._id});
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});


module.exports = router;