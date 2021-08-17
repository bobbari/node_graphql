const userModel = require('../models/user.model');
const {createStudentValidation,loginValidation, createUserValidation} = require('../validations/auth.validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// salt
const saltRounds = 10;


const signinUser = async (req,res,next) => {
    const {error } = createUserValidation(req.body);
    if (error) {
        res.status(400).send({message:error.details['0'].message})
    } else {
        try {
            const {username,password} = req.body;
            const User = await userModel.find({"username": username});
            if (User) {
                const isPasswordMatch = await bcrypt.compare(password,User[0].password);
                if (isPasswordMatch) {
                    var privateKey = process.env.PRIVATE_KEY;
                    const token = jwt.sign(
                        {
                            data:{
                                userid:User._id
                            }
                        },
                        privateKey,
                        { expiresIn: '1h' }
                    )
                    res.send({message:'user login successful', token});
                }
            }
            
        } catch (error) {
            res.status(400).send({message:error.message})
        }
    }
}

const createUser =  async (req,res,next) => {
    const {error } = createUserValidation(req.body);
    if (error) {
        res.status(400).send({message:error.details['0'].message})
    } else {
        try {
            const {username,password} = req.body;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashPassword =  await bcrypt.hash(password,salt);
            const User =  new userModel({username,password:hashPassword});
            const createduser = await User.save();
            if (createduser) {
                res.status(200)
                    .json({message:'user created successfully',data:createduser})
                    .send();
            }
            next();
        } catch (error) {
            res.status(400).send({message:error.message})
        }
    }
}

const login = (req,res,next) => {
    const {username,password} = req.body;
    const {error} = loginValidation(req.body);
    if (error) {
        res.send({message:error.message});
    } else {
        try {
            
            const user = new userModel({username,password});
            res.send({data:student})
        } catch (error) {
            res.status(error.status).send({message:error.message});
        }
    }
}

module.exports = {  login, signinUser, createUser }