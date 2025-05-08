import Joi from "joi";

//creating validator
const userSchema = (req, res, next) =>{
    const signupSchema = Joi.object({
        name: Joi.string().min(5).max(20).required().messages({
            'string.empty': "Name cannot be empty",
            'string.min': "Name should have at least {#limit} characters",
            'string.max': "Name should have at most {#limit} characters",
            'any.required': 'Name is required'
        }),
        email: Joi.string().email().required().messages({
            'string.empty': 'Email is cannot be empty',
            'any.required': 'Email is required',
            'string.unique': 'Email should be unique'
        }),
        phone_number: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
            'string.pattern.base': 'Phone number must be exactly 10 digits',
            'string.empty': 'Phone number cannot be empty',
            'any.required': 'Phone number is required'
        }),
        password: Joi.string().min(5).max(20).required().messages({
            'string.empty': "Password cannot be empty",
            'string.min': "Password should have at least {#limit} characters",
            'string.max': "Password should have at most {#limit} characters",
            'any.required': 'Password is required'
        })
    });

    //checking conditions
    const { error } = signupSchema.validate(req.body);
    if(error){
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }
    next();
}

//login 
const loginSchema = (req, res, next) =>{
    const loginSchema = Joi.object({
        email: Joi.string().email().required().messages({
            'string.empty': 'Email is cannot be empty',
            'any.required': 'Email is required',
        }),
        password: Joi.string().min(5).max(20).required().messages({
            'string.empty': "Password cannot be empty",
            'string.min': "Password should have at least {#limit} characters",
            'string.max': "Password should have at most {#limit} characters",
            'any.required': 'Password is required'
        })
    });

    //checking conditions
    const { error } = loginSchema.validate(req.body);
    if(error){
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }
    next();
}

export { loginSchema, userSchema };
