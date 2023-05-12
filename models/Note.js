const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

//each note will have these fields, some are required some are not
const noteSchema = new mongoose.Schema(
    {
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title:{
        type: String,
        required: true,
    },
    text:{
        type: String,
        required: true,
    },
    completed:{
        type: Boolean,
        default: false,
    }
},
{ //This is another object, mongoose will provide it
    timestamps: true
}
)

noteSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: 'ticketNums',
    start_seq: 500
})

module.exports = mongoose.model('Note', noteSchema)