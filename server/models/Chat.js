const { Schema, model } = require('mongoose')

const ChatSchema = new Schema({
    message: String,
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    type: String
}, { timestamps: true })



const Chat = model('Chat', ChatSchema)
module.exports = { Chat }