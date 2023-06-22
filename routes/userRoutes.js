const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)
// Applying the verifyJWT middleware to all routes defined in this router
// This middleware will verify the JWT for each incoming request

//This is the crud operations
router.route('/')
    .get(usersController.getAllUsers)
    // GET request to "/" (root URL)
    // Executes the usersController.getAllUsers function to get all users
    .post(usersController.createNewUser)
    // POST request to "/"
    // Executes the usersController.createNewUser function to create a new user
    .patch(usersController.updateUser)
    // PATCH request to "/"
    // Executes the usersController.updateUser function to update a user
    .delete(usersController.deleteUser)
    // DELETE request to "/"
    // Executes the usersController.deleteUser function to delete a user


module.exports = router