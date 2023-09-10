const express = require("express");
const cors = require("cors")
const connectDB = require('./config/db')
const path = require('path')
const bodyParser = require('body-parser')
const routes = require('./routes/index')
const app = express();
const ejs = require('ejs')
const multer = require('multer')
const fs = require('fs');
const cat = require('./models/categorie')

connectDB()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.set('view engine', 'ejs');
app.use(express.static('uploads'));
app.use(routes)

const uploadDir = './uploads';

/* if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

var upload = multer({
  storage: multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,uploadDir);
    },
    filename: function(req,file,callback) {
      callback(null,file.fieldname + '-' +Date.now() + path.extname(file.originalname))
    }
  })
}) */

/* app.post('/post',upload.single('imageCat'), (req,res)=>{
    console.log(req.file)
        const x = cat();
        x.nomCat = req.body.nomCat,
        x.descriptionCat = req.body.descriptionCat,
        x.imageCat = req.file.filename
        x.save()
        .then(result => {
          console.log(result);
          res.redirect('/listeCat')
        })
        .catch(err => {
          console.error(err);
        });
  }) */


app.listen(3000, () => {
    console.log("Server is running at port 8000");
  });