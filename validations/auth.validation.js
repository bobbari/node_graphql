const Joi = require('@hapi/joi');



const loginValidation = (data) => {
    let validationSchema = Joi.object({
        username:Joi.string().required('username is required').min(5),
        password:Joi.string().required('password is required').min(5)
    });
    return validationSchema.validate(data);
}
const createUserValidation = (data) => {
    let validationSchema = Joi.object({
        username:Joi.string().required('username is required').min(5),
        password:Joi.string().required('password is required').min(5)
    });
    return validationSchema.validate(data);
}

module.exports = { loginValidation, createUserValidation}