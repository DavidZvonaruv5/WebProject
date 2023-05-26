const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
//this is the connection to the DB, usoing the DATABASE_URI mongoDB has provided
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB