const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcrypt');


router.post('/register', async (req, res) => {
    //Validate before creating a user
    const { error } = registerValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    };
    //Check if user exists in databases
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
        res.status(400).send(err);
    }
});
//Login
router.post('/login', async (req, res) => {
    //Validtae before login
    const { error } = loginValidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    };
    //Check if email exists
    const user = await User.findOne({email: req.body.email});
    if(!user) {
        return res.status(400).send("Email address not found");
    };
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) {
        return res.status(400).send("Invalid Password");
    }
    //Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});


module.exports = router;