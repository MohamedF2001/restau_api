var Categories = require('../models/categorie')
var Produits = require('../models/produit')
var config = require('../config/dbconfig');
const mongoose = require('mongoose')
const fs = require('fs'); // Module pour gérer les fichiers
const path = require('path'); // Module pour gérer les chemins de fichiers
const { error } = require('console');



const baseUrl = 'https://restauapi.adaptable.app/';


var functions = {
  // fonction pour ajouter les catégories
  add_cat: function (req, res) {
    const x = Categories();
    x.nomCat = req.body.nomCat,
      x.descriptionCat = req.body.descriptionCat,
      //x.imageCat = req.file.filename
      x.imageCat = `${baseUrl}/uploads/${req.file.filename}`
    x.save()
      .then(result => {
        console.log(result);
        //res.redirect('/listeCat')
        res.redirect('/formcat')
      })
      .catch(err => {
        console.error(err);
      });
  },

  // fonction pour ajouter les produits
  add_pro: function (req, res) {
    const p = Produits();
    p.nom = req.body.nom,
      p.description = req.body.description,
      p.prix = req.body.prix,
      p.categorie = req.body.categorie,
      //p.imageProd = req.file.filename,
      //p.imageProd = `/uploads/${req.file.filename}`; 
      p.imageProd = `${baseUrl}/uploads/${req.file.filename}`
    p.save()
      .then(result => {
        console.log(result);
        //res.redirect('/listProd')
        //console.log('Données du produit :', result);
        //console.log('URL de l\'image :', baseUrl + result.imageProd);
        res.redirect('/formpro')
      })
      .catch(err => {
        console.error(err);
      });
  },

  // fonction pour afficher le formulaire
  addCatForm: function (req, res) {
    res.render('addCat')
  },

  // fonction pour afficher le formulaire
  addProdForm: function (req, res) {
    Categories.find()
      .then(function (doc) {
        res.render('ajouter_produit', {
          categories: doc
        });
      })
  },

  // fonction pour afficher les catégories
  listeCat: function (req, res) {
    Categories.find()
      .then(function (doc) {
        res.render('listCat', {
          item: doc
        });
      })
  },

  // fonction pour afficher les produits
  listeProd: function (req, res) {
    Produits.find()
      .populate('categorie')
      .then(function (doc) {
        res.render('listProd', {
          itemm: doc,
          i: doc,
        });
      })
  },

  // fonction pour supprimer un produit
  supprimerProduit: function (req, res) {
    const produitId = req.params.id;

    // Assurez-vous que produitId est un ObjectID valide
    if (!mongoose.Types.ObjectId.isValid(produitId)) {
      return res.status(400).send('ID de produit invalide.');
    }

    // Recherchez le produit par son ID
    Produits.findById(produitId)
      .then(produit => {
        if (!produit) {
          return res.status(404).send('Produit non trouvé.');
        }

        // Supprimez l'image du dossier d'uploads (facultatif)
        if (produit.imageProd && produit.id) {
          const imagePath = path.join(__dirname, '../uploads', produit.imageProd);
          fs.unlinkSync(imagePath);

          // Supprimez le produit de la base de données
          Produits.deleteOne({ _id: produitId })
            .then(() => {
              console.log('Produit supprimé avec succès.');
              res.redirect('/listProd'); // Redirection vers la liste des produits après la suppression
            })
            .catch(err => {
              console.error('Erreur lors de la suppression du produit :', err);
              res.redirect('/listProd'); // Redirection en cas d'erreur
            });
        }


      })
      .catch(err => {
        console.error(err);
        res.redirect('/listProd'); // Redirection en cas d'erreur
      });
  },

  // fonction pour supprimer une catégorie
  supprimerCategorie: function (req, res) {
    const categorieId = req.params.id;

    // Assurez-vous que categorieId est un ObjectID valide
    if (!mongoose.Types.ObjectId.isValid(categorieId)) {
      return res.status(400).send('ID de catégorie invalide.');
    }

    // Recherchez la catégorie par son ID
    Categories.findById(categorieId)
      .then(categorie => {
        if (!categorie) {
          return res.status(404).send('Catégorie non trouvée.');
        }

        // Supprimez l'image du dossier d'uploads (facultatif)
        if (categorie.imageCat) {
          const imagePath = path.join(__dirname, '../uploads', categorie.imageCat);
          fs.unlinkSync(imagePath);
        }

        // Supprimez les produits associés à la catégorie de la base de données
        Produits.deleteMany({ categorie: categorieId })
          .then(() => {
            console.log('Produits associés à la catégorie supprimés avec succès.');

            // Supprimez la catégorie de la base de données
            Categories.deleteOne({ _id: categorieId })
              .then(() => {
                console.log('Catégorie supprimée avec succès.');
                res.redirect('/listeCat'); // Redirection vers la liste des catégories après la suppression
              })
              .catch(err => {
                console.error('Erreur lors de la suppression de la catégorie :', err);
                res.redirect('/listeCat'); // Redirection en cas d'erreur
              });
          })
          .catch(err => {
            console.error('Erreur lors de la suppression des produits associés à la catégorie :', err);
            res.redirect('/listeCat'); // Redirection en cas d'erreur
          });
      })
      .catch(err => {
        console.error(err);
        res.redirect('/listeCat'); // Redirection en cas d'erreur
      });
  },

  // tous les produits
  allProd: function (req, res) {
    Produits.find()
      //.then((prod) => { res.status(200).json({ prod }); })
      .then((produits) => {
        res.status(200).json(produits);
      })
      .catch((error) => {
        console.log(error)
        res.status(401).json({ error: 'Invalid request for categories' });
      });
  },

  // tous les categories
  allCat: function (req, res) {
    Categories.find()
      //.then((categ) => { res.status(200).json({ categ }); })
      .then((categories) => {
        res.status(200).json(categories);
      })
      .catch((error) => {
        console.log(error)
        res.status(401).json({ error: 'Invalid request for produits' })
      })
  }
}

module.exports = functions