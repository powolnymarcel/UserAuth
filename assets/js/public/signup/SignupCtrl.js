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
                      // si tout s'est bien passé on redirige vers '/' pour avoir le form de login
        .then(function onSuccess(res){
          window.location='/'
        })
        // si erreurs alors on LOG les erreurs
        .catch(function onError(err){
          console.log('**********Erreur*********: '+err);
        })
    }
  }])
