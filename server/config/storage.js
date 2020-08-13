const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null,`${Date.now()}_${file.originalname}` )
    },
    fileFilter: (req,file,cb) =>{
        const ext = path.extname(file.originalname)
        if(ext !==".jpg" && ext !==".jpeg" && ext !==".png" && ext !==".mp4"){
            return cb(res.status(400).json({msg:"Only images and videos are allowed"}),false)
        }
        cb(null,trye)
    }
    
})

const upload = multer({ storage }).single('file')

module.exports = { upload }