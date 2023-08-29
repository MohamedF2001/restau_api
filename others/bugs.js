/*
  add_cat: function (req, res) {
    const x = Categories();
    x.nomCat = req.body.nomCat;
    x.descriptionCat = req.body.descriptionCat;
    x.imageCat = req.file.filename;
    
    // Supposons que votre URL de base soit quelque chose comme ceci
    const imageUrlBase = 'https://cluster0.mongodb.net/images/';
  
    x.save()
      .then(result => {
        // Génération de l'URL complète vers l'image
        const imageUrl = imageUrlBase + result.imageCat;
  
        console.log(result);
        console.log("Image URL:", imageUrl);
  
        // Vous pouvez ensuite envoyer l'URL de l'image dans le contexte de votre réponse,
        // afin qu'il puisse être utilisé dans votre application front-end
        res.json({ imageUrl }); // Ou toute autre manipulation de réponse que vous utilisez
      })
      .catch(err => {
        console.error(err);
        // Gestion de l'erreur
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la sauvegarde.' });
      });
  },
  */

  /*
  add_cat: function (req, res) {
    const x = Categories();
    x.nomCat = req.body.nomCat;
    x.descriptionCat = req.body.descriptionCat;
    
    // Supposons que votre URL de base soit quelque chose comme ceci
    const imageUrlBase = 'https://cluster0.mongodb.net/images/';
  
    // Génération de l'URL complète vers l'image
    const imageUrl = imageUrlBase + req.file.filename;
  
    x.imageCat = imageUrl; // Enregistrement de l'URL dans la propriété imageCat
    
    x.save()
      .then(result => {
        console.log(result);
        console.log("Image URL:", imageUrl);
  
        // Redirection ou réponse en fonction de votre flux de contrôle
        // res.redirect('/listeCat') ou res.redirect('/formcat')
        // Ou bien, vous pouvez également renvoyer l'objet résultat
        res.json(result);
      })
      .catch(err => {
        console.error(err);
        // Gestion de l'erreur
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la sauvegarde.' });
      });
  },
  */
  