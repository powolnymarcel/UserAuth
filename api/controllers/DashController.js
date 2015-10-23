/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  // Création de la fonction signup

  checkUser: function(req,res){
    if(!req.session.me){
      console.log('Acces impossible, vous n\'etes pas loggé');
      return res.view('login')
    }
    else{
      console.log('Acces POSSIBLE, vous etes loggé!!');
      return res.view('dashboard')
    }
  },


  getUser:function(req,res){
    date = new Date();
    console.log('FOnction getUser executée !!! ----->>> ' + date);

    User.findOne({id: req.session.me},function(err,user){
      if(err){
        res.negociate(err);
      }
      return res.send(user);
    })
  }



};

