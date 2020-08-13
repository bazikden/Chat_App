const router = require('express').Router()
const { getAllChats,uploadFiles } = require('../constollers/chat_controllers')
const {auth} = require('../middleware/auth')

router.route('/').get(auth,getAllChats)
router.route('/uploadfiles').post(auth,uploadFiles)

module.exports = router