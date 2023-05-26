const express = require('express')
const router = express.Router()
const notesController = require('../controllers/notesController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

//This is the crud operations
router.route('/')
.get(notesController.getAllNotes)
.post(notesController.createNewNote)
.patch(notesController.updateNote)
.delete(notesController.deleteNote)


module.exports = router