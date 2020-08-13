const {Chat} = require('../models/Chat')
const { upload } = require('../config/storage')
const getAllChats = async (req, res) => {
    try {
        const messages = await Chat.find().populate('sender','name email image')
        res.json({ messages })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}

const uploadFiles = async(req,res) => {
    upload(req,res,err => {
        if(err){
            return res.json({success:false,err})
        }

        return res.json({success:true,url:res.req.file.path})
    })
}

module.exports = { getAllChats, uploadFiles }