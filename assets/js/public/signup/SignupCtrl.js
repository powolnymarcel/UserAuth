angular.module('SignupMod').
  controller('SignupCtrl',['$scope','$http',function($scope,$http){


    $scope.runSignup = function(){
      console.log('signup envoye par -> '+ $scope.nom);

      //Submission du form au serveur SAILS
      $http.post('/signup',{
        nom:      $scope.nom,
        prenom:   $scope.prenom,
        pseudo:   $scope.pseudo,
        email:    $scope.email,
        // A ce moment le password est en clair mais on va utiliser la fn NodeMachine plus tard pour encrypter le password
        password: $scope.password
      })
                      // si tout s'est bien passé on redirige vers '/dashboard' avec un put pour avoir les infos de l'user fraichement enregistré
        .then(function onSuccess(res){

          $http.put('/login',{
            email:$scope.email,
            password: $scope.password
          }).then(function onSuccess(){
            console.log('Login après register reussi')
            //Si on est loggé et qu'on veut visiter le login FORM ON sera redirigé.
            window.location= '/dashboard'
          })
        })
        // si erreurs alors on LOG les erreurs
        .catch(function onError(err){
          console.log('**********Erreur*********: '+err);
        })
    }
  }])
