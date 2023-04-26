const express = require('express')

// Controller
const { signupUser, loginUser } = require('../controlers/userController')

const router = express.Router()

//login route
router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser)

module.exports = router