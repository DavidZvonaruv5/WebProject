const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

//this function will log the events that are happening, wether its crud opertaions, or error handling messages
const logEvents = async (message, logFileName) => {
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`
    //we are going to make the file if it doesnt exist, then we are going to log the file
    //the 'path' requirement is very useful when operating with file systems.
    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
    } catch (err) {
        console.log(err)
    }
}

//this is our logger middleware function
const logger = (req, res, next) => {
     //Log the request details including the HTTP method, URL, and request origin to a file called 'reqLog.log'
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    console.log(`${req.method} ${req.path}`)
    //Call the next middleware function in the chain, this is a must when creating custom middleware
    next()
}

module.exports = { logEvents, logger }