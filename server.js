const express = require('express')
const multer = require('multer')

const app = express()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './image')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    },
    limits: {
        fileSize: 100000
      },
      onFileSizeLimit: function (file) {
        console.log('Failed: ' + file.originalname + ' is limited')
        fs.unlink(file.path)
      }
})
const upload = multer({ storage: storage })


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/upload',upload.single("file"), (req, res) => {
    console.log(req.file, req.body)
    res.send(req.files)
})

app.listen(3000, () => {
    console.log('App running on port 3000')
})