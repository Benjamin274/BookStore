const router = require('express').Router()
const multer = require('multer');
var mime = require('mime');
const path = require('path')
const fs = require('fs')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      var datetimestamp = Date.now();
      var filename = file.originalname.replace(/\s/g, '').split('.')
      filename.pop()
        cb(null, filename.join('-').split(' ').join('-')  + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
  })
   
  var upload = multer({ storage: storage,
    fileFilter: function (req, file, callback) {
      var ext = path.extname(file.originalname);
      if(ext !== '.pdf' && ext !== '.epub' && ext !== '.doc' && ext !== '.doc') {
          return callback(new Error('Only Books are allowed'))
      }
      callback(null, true)
  },
 })

const bookController = require('../../controller/bookController.js')

router.get('/',bookController.getAllBooks)
router.post('/',upload.single('bookFile'),bookController.postBook)
router.get('/download/:filename',(req,res)=>{
  const filePath = path.join(__dirname,'../../uploads/',req.params.filename)
  res.sendFile(filePath)
})
router.get('/genre/:id',bookController.getBookByGenre)


module.exports = router