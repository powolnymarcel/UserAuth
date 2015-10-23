/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  signup:function(req,res){
    console.log("backendSignUp")
    var Passwords = require('machinepack-passwords');
    Passwords.encryptPassword({
      password: req.param('password')
    }).exec({
      error:function(err){
        return res.negociate(err);
      },
      success:function(encryptedPassword){
        require('machinepack-gravatar').getImageUrl({
          emailAddress: req.param('email')
        }).exec({
          error:function(err) {
            return res.negociate(err);
          },

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
    User.findOne({
      email: req.param('email')
    },function foundUser(err, user){
      if(err){
        return res.negotiate(err);
      }
      if(!user){
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
        return res.notFound();
      }
        req.session.me=null;
      return res.redirect('/');
    })
  },
  editerUser:function(req,res){
    console.log('Je suis dans le ctrl Serveur pour l\'update');
    var password= req.param('password');
    var email = req.param('email');
    var nom = req.param('nom');
    var prenom = req.param('prenom');
    var pseudo = req.param('pseudo');
    var id = req.param('id');
               var nouvelleVAleurs={
              "email": req.body.email,
              "nom": req.body.nom,
              "prenom": req.body.prenom,
              "pseudo": req.body.pseudo
            };
    User.update({id:id},nouvelleVAleurs).exec(function afterwards(err, updated){
              if (err) {
                console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')+res.serverError(err);
                return;
              }
              console.log('Updated user to have name ' + updated);
            });

  },
  delete:function(req,res){
    var id = req.param('id');
    User.destroy({id:id}).exec(function deleteCB(err){
      req.session.me=null
      return res.send(200);


        });
  }
};

