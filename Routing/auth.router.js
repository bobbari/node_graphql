const router = require('express').Router();
const {signup,login, signinUser, createUser} = require('../controller/auth.controller');


router.post('/usersignin',signinUser)
router.post('/createUser',createUser)


module.exports = router;