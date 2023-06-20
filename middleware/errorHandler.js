const { logEvents } = require('./logger')


//this is where we log and handle our errors
const errorHandler = (err, req, res, next) => {
    //call logEvents -> log the error to the log file
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
    console.log(err.stack)

    const status = res.statusCode ? res.statusCode : 500 // server error  status code!

    res.status(status)

    res.json({ message: err.message, isError: true })
}

module.exports = errorHandler 