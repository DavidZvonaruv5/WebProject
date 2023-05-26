const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body //store the username and password that the use has entered
    
    //if the user did not enter a username/password display the following message
    if (!username || !password) {
        return res.status(400).json({message:'All fields are required'})
    }

    //look for  the user in Users collection
    const foundUser = await User.findOne({ username }).exec()
    
    //if we dont find a user or he is not active then display the following message
    if (!foundUser  || !foundUser.active) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    //compare the received password and the user's password that is stored in the DB using bcrypt
    const match = await bcrypt.compare(password, foundUser.password)

    //if there is not a message return the unauthorized message
    if (!match) return res.status(402).json({ message: 'Unauthorized' })
    
    //make the access token
    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "username": foundUser.username,
                "roles": foundUser.roles
            }
        },
        //pass the secret token to create this
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    )

    //make the refresh token
    const refreshToken = jwt.sign(
        { "username": foundUser.username },
        //pass the secret token to create this
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )

    // Create secure cookie with refresh token 
    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //the cookie will expire in seven days
    })

    // Send accessToken containing username and roles 
    res.json({ accessToken })
})

const refresh = (req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })

            const foundUser = await User.findOne({ username: decoded.username }).exec()

            if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.username,
                        "roles": foundUser.roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            )

            res.json({ accessToken })
        })
    )
}


const logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
}

module.exports = {
    login,
    refresh,
    logout
}