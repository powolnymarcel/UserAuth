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
              gravatarUrl: gravatarUrl
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

  //  ObjectID = require('sails-mongo/node_modules/mongodb').ObjectID;
  //  var o_id = new ObjectID(req.param('id'));
  //  console.log(o_id );

    console.log('Je suis dans le ctrl Serveur pour l\'update');
    var password= req.param('password');
    var email = req.param('email');
    var nom = req.param('nom');
    var prenom = req.param('prenom');
    var pseudo = req.param('pseudo');
    var id = req.param('id');
    console.log('---------------------------------------------------------------');
    console.log('Vous etes sur le point d\'éditer les infos suivantes : ');
    console.log('---------------------------------------------------------------');
    console.log('Le password est : '+password);
    console.log('Le email est : '+email);
    console.log('Le nom est : '+nom);
    console.log('Le prenom est : '+prenom);
    console.log('Le pseudo est : '+pseudo);
    console.log('Le ID est : '+id);
    console.log('************************************************************');
    console.log('************************************************************');
    console.log(req.body);
    console.log('************************************************************');
    console.log('************************************************************');








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
    var Passwords = require('machinepack-passwords');

    Passwords.encryptPassword({
      password:req.body.password
    }).exec({
      error:function(err){
        return res.negociate(err);
      },
      // si réussi on passe à l'etape suivante et on fetch le gravatar
      success:function(encryptedPassword){


        var nouvelleVAleurs={
          "email": req.body.email,
          "nom": req.body.nom,
          "prenom": req.body.prenom,
          "password": encryptedPassword,
          "pseudo": req.body.pseudo
        }


//CECI FONCTIONNE !!!!!!!!!!!!!!!!!!
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////

        User.update({id:id},nouvelleVAleurs).exec(function afterwards(err, updated){

          if (err) {
            // handle error here- e.g. `res.serverError(err);`
            console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')+res.serverError(err);

            return;
          }

          console.log('Updated user to have name ' + updated);
        });


      }
    })


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













  }


};

