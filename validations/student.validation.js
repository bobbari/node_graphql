const Joi = require('@hapi/joi');

const createStudentValidation = (data) => {
    let validationSchema = Joi.object({
        'firstName':Joi.string().required('firstName is required').min(2),
        'lastName':Joi.string().required('lastName is required').min(2),
        'email':Joi.string().required('email is required').min(5),
        'Phone':Joi.number().required('Phone is required').min(10),
        'address':Joi.string().required('address is required'),
        'meeting_time':Joi.string(),
        
    }) 
    return validationSchema.validate(data)
}

module.exports = {createStudentValidation};
