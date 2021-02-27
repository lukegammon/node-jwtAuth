const router = require("express").Router();
const User = require("../model/User");
const {registerValidation} = require('../validation');


router.post('/register', async (req, res) => {
    //Validate before creating a user
    const { error } = registerValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    //Create new user
        const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    //Save user or catch error
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});


module.exports = router;