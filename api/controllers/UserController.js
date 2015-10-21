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
  }


};

