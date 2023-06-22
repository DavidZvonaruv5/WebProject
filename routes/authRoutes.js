const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const loginLimiter = require('../middleware/loginLimiter')

router.route('/')
    .post(loginLimiter, authController.login)
    // POST request to the root URL ("/")
    // Applies the loginLimiter middleware before executing the authController.login function

router.route('/refresh')
    .get(authController.refresh)
    // GET request to "/refresh"
    // Executes the authController.refresh function

router.route('/logout')
    .post(authController.logout)
    // POST request to "/logout"
    // Executes the authController.logout function

module.exports = router