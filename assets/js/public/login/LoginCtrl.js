angular.module('LoginMod').
  controller('LoginCtrl',['$scope','$http','toastr',function($scope,$http,toastr){
    console.log('Login form lancé')


  $scope.runLogin= function(){
    console.log('Login envoyé par ' + $scope.email)

    $http.put('/login',{
      email:$scope.email,
      password: $scope.password
    }).then(function onSuccess(){
      console.log('Login reussi')
      //Si on est loggé et qu'on veut visiter le login FORM ON sera redirigé.
      window.location= '/dashboard'
    }).catch(function onError(err){
      if (err.status == 400 || 404){
        //TOASTR PERMET D'AVOIR DES MESSAGES FLASH
          toastr.error('Informations erronée', 'Error',{
            closeButton: true
          });
        return;
      }
      toastr.error('une erreur est survennue,  veuillez essayer plus tard.', 'Error',{
        closeButton: true
      });
      return;
    })
  }



  }])
