const express = require('express')
const router = express.Router()
const notesController = require('../controllers/notesController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)
// Applying the verifyJWT middleware to all routes defined in this router
// This middleware will verify the JWT for each incoming request

//This is the crud operations
router.route('/')
    .get(notesController.getAllNotes)
    // GET request to "/" (root URL)
    // Executes the notesController.getAllNotes function to get all notes
    .post(notesController.createNewNote)
    // POST request to "/"
    // Executes the notesController.createNewNote function to create a new note
    .patch(notesController.updateNote)
    // PATCH request to "/"
    // Executes the notesController.updateNote function to update a note
    .delete(notesController.deleteNote)
    // DELETE request to "/"
    // Executes the notesController.deleteNote function to delete a note


module.exports = router