const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

//This is the crud operations
router.route('/')
.get(usersController.getAllUsers)
.post(usersController.createNewUser)
.patch(usersController.updateUser)
.delete(usersController.deleteUser)


module.exports = router