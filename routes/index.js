const express = require('express')
const router = express.Router()
const actions = require('../methods/actions')
const multer = require('multer');
const path = require('path')
const fs = require('fs');

const uploadDir = './uploads';

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

var upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
})

router.get('/', (req, res) => {
  res.send('Hello World')
})

//@route POST /addCat
//router.post('/addCat', actions.addCat)
router.post('/post', upload.single('imageCat'), actions.add_cat)

router.get('/formcat', actions.addCatForm)

router.get('/listeCat', actions.listeCat)

router.get('/formpro', actions.addProdForm)

router.post('/ajouter_produit', upload.single('imageProd'), actions.add_pro)

router.get('/listProd', actions.listeProd)

router.get('/listProByCat/:categoryId', actions.listeProdByCat)

router.post('/supprimer/:id', actions.supprimerProduit);

router.post('/supprimercategorie/:id', actions.supprimerCategorie);

router.get('/allprod', actions.allProd)

router.get('/allcat', actions.allCat)

router.get('/allprodbycat/:categorieId', actions.allProdByCat)

module.exports = router

