const User = require('../models/User')
const Note = require('../models/Note')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

//All prior testing have been made with postman website~


//Get all users
//GET
const getAllUsers = asyncHandler(async (req,res) => {
    const users = await User.find().select('-password').lean()
    if(!users?.length){
        return res.status(400).json({message: 'No users found'})
    }
    res.json(users)
})

//create a new user
//POST
const createNewUser = asyncHandler(async (req,res) => {
    const {username,password,roles} = req.body

    //check the data
    if(!username || !password || !Array.isArray(roles) || !roles.length){
        return res.status(400).json({message: 'All fields are required'})
    }

    //check duplicate
    const duplicate = await User.findOne({username}).lean().exec()
    //if your using async await you need to use exec() in order to fulfill the promise --> This is from stackOverflow (after a long search)

    if(duplicate){
        return res.status(409).json({message: 'Duplicate username'})
        //status 409 is a conflict request!
    }

    //hash the password
    const hashedPwd = await bcrypt.hash(password,10)
    //The password hashing is done with 10 salt rounds
    //A salt round is basically how much time is needed to crack the hashed password.
    //The bigger the salt round, the more time it takes to un-hash the passowrd
    const userObject = {username, "password": hashedPwd, roles}
    //now create and store the user in the DB
    const user = await User.create(userObject)

    if (user) {
        //user created
        res.status(201).json({message: `New user ${username} created`})
    } else{
        res.status(400).json({message:'Invalid user data received' })
    }
})

//update a user
//PATCH
const updateUser = asyncHandler(async (req,res) => {
    const { id, username, roles, active, password} = req.body

    //confirm the data from the request
    if(!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean'){
        return res.status(400).json({message: 'All fields are required'})
        //status 400 is a bad request
    }

    const user = await User.findById(id).exec() //exec needed from the same reason stated in the code above
    if(!user){
        return res.status(400).json({message: 'User not found'})
    }

    //check for duplicate
    const duplicate = await User.findOne({ username }).lean().exec()

    //allow updates to the original user
    if(duplicate && duplicate?._id.toString() !== id){
        return res.status(409).json({message: 'Duplicate username'})
    }

    user.username = username
    user.roles = roles
    user.active = active

    if(password){
        //Hash password
        user.password = await bcrypt.hash(password,10) //again hash the password with 10 salt rounds.
    }
    const updatedUser = await user.save()

    res.json({message: `${updatedUser.username} updated`})
})

//delete a user
//DELETE
const deleteUser = asyncHandler(async (req,res) => {
    const {id} = req.body
    
    if(!id){
        return res.status(400).json({message: 'User id is required'})
    }

    const note = await Note.findOne({user: id}).lean().exec()

    if(note){
        return res.status(400).json({message: 'User has aggigned notes'})
    }

    const user = await User.findById(id).exec()
    
    if(!user){
        return res.status(400).json({message: 'User not found'})
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} has been deleted`

    res.json(reply)

})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}

