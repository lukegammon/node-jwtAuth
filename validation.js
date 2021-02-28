//User Validation
const Joi = require('@hapi/joi');

//Register validation
const registerValidation = (data) => {
    const schema = Joi.object( {
        name: Joi.string().max(255).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
};

const loginValidation = (data) => {
    const schema = Joi.object( {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

//https://youtu.be/2jqok-WgelI?t=3795