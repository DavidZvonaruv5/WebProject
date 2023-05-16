require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3500

console.log(process.env.NODE_ENV)

//connect to mongoDB
connectDB()

//make a use of the logger middleware we created
app.use(logger)

//apply cors operations restrictions
app.use(cors(corsOptions))

//allow the server to accept json data
app.use(express.json())

//Middleware function to parse cookies sent in the request headers
app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))

//make all routes paths 
app.use('/', require('./routes/root'))
app.use('/users', require('./routes/userRoutes'))
app.use('/notes', require('./routes/noteRoutes'))

//if all fail go to 404 missing page
app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

//errorHandling we created
app.use(errorHandler)

//make one connection to the database
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    //after a connection has been made, we can make the server run on the port/ domain provided
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

//Listen for an error event on the Mongoose connection
mongoose.connection.on('error', err => {
    console.log(err)
    //Log the error details, including error number, error code, syscall, and hostname, to a file called 'mongoErrLog.log'
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})