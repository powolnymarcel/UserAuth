/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	  // Création de la fonction signup

  signup:function(req,res){
    console.log("backendSignUp")

    // On charge machinePassword
    var Passwords = require('machinepack-passwords');

    Passwords.encryptPassword({
      password: req.param('password')
    }).exec({
      error:function(err){
        return res.negociate(err);
      },
      // si réussi on passe à l'etape suivante et on fetch le gravatar
      success:function(encryptedPassword){
        console.log("ssssssssssssssssssssssssssssssss");
        console.log(encryptedPassword);
        console.log("ssssssssssssssssssssssssssssssss");

        require('machinepack-gravatar').getImageUrl({
          emailAddress: req.param('email')
        }).exec({
          error:function(err) {
            return res.negociate(err);
          },
          // si réussi on passe à l'etape suivante et on crée le user

          success:function(gravatarUrl){
            // CREER l'utilisateur
            User.create({
              nom : req.param('nom'),
              prenom:req.param('prenom'),
              pseudo:req.param('pseudo'),
              email:req.param('email'),
              password:encryptedPassword,
              lastLoggedIn: new Date(),
              gravatarUrl: gravatarUrl,
              demo: false
            },function userCreated(err,newUser){
              if(err){
                console.log('Erreur: ' + err);
                return res.negociate(err);
              }
              // Variable session pour dire si le user est loggé
              console.log('Utilisateur Ajouté');
              return res.json({
                id:newUser.id
              })
            })
          }
        })
      }
    })
  },
  login: function(req,res){
    // Valider l'user
    User.findOne({
      email: req.param('email')
    },function foundUser(err, user){
      if(err){
        return res.negotiate(err);
      }
      if(!user){
          //La fn notFound est prédefinnie dans le dossier api/responses/notFound
        return res.notFound();
      }
     require('machinepack-passwords').checkPassword({
        passwordAttempt: req.param('password'),
        encryptedPassword: user.password
      }).exec({
        error: function(err){
          console.log(err);
          return res.negotiate(err);
        },
        incorrect: function(){
          console.log('Erreur mot de passe incorrect')
          return res.notFound();
        },
        success: function(){
          req.session.me= user.id;
          console.log('Succes vous etes loggé')
          return res.ok();
        }
      })
    })
  },

  logout:function(req,res){
    User.findOne({id:req.session.me},function(err,user){
      if(err){
        return res.negotiate(err);
      }
      if(!user){
        //La fn notFound est prédefinnie dans le dossier api/responses/notFound
        return res.notFound();
      }
        req.session.me=null;
      return res.redirect('/');

    })
  },
  editerUser:function(req,res){

    console.log('FOnction editerUser executée !!! ----->>> ' + date);

                console.log('************************************************************');
                console.log('************************************************************');
                console.log('Je suis dans le Serveur UserController.js pour l\'update');
                console.log('************************************************************');
                console.log('************************************************************');

    var id =req.body.id;
    var leChangementCmaintenant = function(){
           var nouvelleVAleurs={
              "email": req.body.email,
              "nom": req.body.nom,
              "prenom": req.body.prenom,
              "pseudo": req.body.pseudo
            };
      if(req.body.demo===false){
            User.update({id:id},nouvelleVAleurs).exec(function afterwards(err, updated){
              if (err) {
                // handle error here- e.g. `res.serverError(err);`
                console.log('Error')+res.serverError(err);
                return;
              }

              console.log('************************************************************');
              console.log('************************************************************');
              console.log('Nom de l\'utilisateur mis à jour : ' + updated[0].nom);
              console.log('Je SORS du Serveur UserController.js fin d\'update');
              console.log('************************************************************');
              console.log('************************************************************');
            });
      }
      else{
        return;
      }

        }
    leChangementCmaintenant();

//*******************  AUTRES METHODE ESSAYEE
// ********************************************************************
    // User.findOneById(req.body.id).done(function (err, user) {
    //   if (err) {
    //     return fn(null, null);
    //   } else {
    //     user.email = req.body.email;
    //     user.save(function(error) {
    //      if(error) {
    //        // do something with the error.
    //      } else {
    //        // value saved!
    //        req.send(user);
    //      }
    //       }
    //     )
    //   }
    // })

// ***************************************************************************************************
    //  var user = User.findOneById(req.body.id,req.body).done(function(error, user) {
    //    if(error) {
    //      // do something with the error.
    //    }
//
    //    if(req.body.email) {
    //      // validate whether the email address is valid?
//
    //      // Then save it to the object.
    //      user.email = req.body.email;
    //    }
    //    // Repeat for each eligible attribute, etc.
//
    //    user.save(function(error) {
    //      if(error) {
    //        // do something with the error.
    //      } else {
    //        // value saved!
    //        req.send(user);
    //      }
    //    });
    //  });
//
//

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
       //       User.update({
       //           id: req.body.id
       //
       //         },
       //         req.body
       //         , function(err, users) {
       //   // Error handling
       //           if (err) {
       //             return console.log(err);
       //   // Updated users successfully!
       //           } else {
       //             console.log("Users updated:", users);
       //           }
       //         });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// METTRE EN PLACE LE UPDT

   //.exec({
   //  error:function(err){
   //    return res.negociate(err);
   //  },
   //  // si réussi on passe à l'etape suivante
   //  success:function(encryptedPassword){
   //    console.log("ssssssssssssssssssssssssssssssss");
   //    console.log(encryptedPassword);
   //    console.log("ssssssssssssssssssssssssssssssss");

   //    require('machinepack-gravatar').getImageUrl({
   //      emailAddress: req.param('email')
   //    }).exec({
   //      error:function(err) {
   //        return res.negociate(err);
   //      },
   //      // si réussi on passe à l'etape suivante et on crée le user

   //      success:function(gravatarUrl){
   //        // CREER l'utilisateur
   //        User.create({
   //          nom : req.param('nom'),
   //          prenom:req.param('prenom'),
   //          pseudo:req.param('pseudo'),
   //          email:req.param('email'),
   //          password:encryptedPassword,
   //          lastLoggedIn: new Date(),
   //          gravatarUrl: gravatarUrl
   //        },function userCreated(err,newUser){
   //          if(err){
   //            console.log('Erreur: ' + err);
   //            return res.negociate(err);
   //          }
   //          // Variable session pour dire si le user est loggé
   //          console.log('Utilisateur Ajouté');
   //          return res.json({
   //            id:newUser.id
   //          })
   //        })
   //      }
   //    })
   //  }
   // })
  },
  delete:function(req,res){
    var id = req.param('id');

     User.findOne({id:id}).exec(function findOneCB(err, responseDeMongoDB){
      console.log('Je vois que c est '+responseDeMongoDB.demo);
      var demo = responseDeMongoDB.demo;

       if(demo===false){
         console.log('Utilisateur a confirmé donc -> Je le supprime !!!!!')
         User.destroy({id:id}).exec(function deleteCB(err){
           console.log('User supprimé, retour en arrière impossible.');
           req.session.me=null
           // J'envoie un code 200 pour indiquer que ça s'est bien passé
           return res.send(200);
         });
       }
       else {
         return;
       }
    });


   //if(demo===false){
   //  console.log('Utilisateur a confirmé donc -> Je le supprime !!!!!')
   //User.destroy({id:id}).exec(function deleteCB(err){
   //  console.log('User supprimé, retour en arrière impossible.');
   //  req.session.me=null
   //    // J'envoie un code 200 pour indiquer que ça s'est bien passé
   //  return res.send(200);
   //    });
   //}
   //else{
   //  return;
   //}
  }
};

