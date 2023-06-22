const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    // If the authorization header is missing or doesn't start with 'Bearer ', return unauthorized message
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1] // Extracting the token from the authorization header

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            // If there is an error verifying the token, return forbidden message
            if (err) return res.status(403).json({ message: 'Forbidden' })
            // If the token is valid, extract the username and roles from the decoded token and attach them to the request object
            req.user = decoded.UserInfo.username
            req.roles = decoded.UserInfo.roles
            next() // Call the next middleware or route handler
        }
    )
}

module.exports = verifyJWT 