const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    // origin: '*',
    // the origin will accpet cors from anywhere.
    origin: (origin,callback) =>{
        if(allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null,true)
        } else{
            callback(new Error('not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions