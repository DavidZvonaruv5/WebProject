const express = require('express')
const router = express.Router()
const path = require('path')

//using regex we can route to each path in put application with ease
router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

module.exports = router