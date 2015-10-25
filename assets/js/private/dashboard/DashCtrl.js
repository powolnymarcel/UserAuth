angular.module('DashMod').
  controller('DashCtrl',['$scope','$http','toastr',function($scope,$http,toastr){


    $scope.getUser= function(){
      $http.get('/getUser')
        .then(function onSuccess(user){
          console.log(user);
          $scope.user= user.data;
          toastr.success('Bienvenue sur votre profil', 'Excellent!',{
            closeButton: true,
            timeOut: 1500
          });
          var date= new Date();
          var dateNow = date;
          var timeUserLastLogin = $scope.user.lastLoggedIn;
          var OnlytimeUserLastLogin = timeUserLastLogin;
          $scope.dateNow=dateNow;
          $scope.dateSub=OnlytimeUserLastLogin;
        });
    };

// Message flash au click sur le lien editer
    $scope.editer= function() {
      toastr.warning('Editer votre profil', 'Edition!',{
        closeButton: true,
        maxOpened:2,
        progressBar: true

      });
    };
// EDITION USER
    $scope.editerUser=function(){


      $http.put('/editerUser',{
        email:$scope.user.email,
        nom: $scope.user.nom,
        prenom: $scope.user.prenom,
        pseudo: $scope.user.pseudo,
        id: $scope.user.id,
        demo: $scope.user.demo
      }).success(function (data, status, headers) {
alert('okok')      })
        .error(function (data, status, header, config) {
          console.log(data);
          console.log('*******************************');
          console.log(status);
          console.log('*******************************');
          console.log(header);
          console.log('*******************************');
          console.log(config);
          console.log('*******************************');
          throw new Error("my error message");
        });
    };
// Autre version
   //  // EDITION USER
   //  $scope.editerUser=function(){
   //    $http.put('/editerUser',{
   //      email:$scope.user.email,
   //      nom: $scope.user.nom,
   //      prenom: $scope.user.prenom,
   //      pseudo: $scope.user.pseudo,
   //      id: $scope.user.id,
   //      demo: $scope.user.demo
   //    }) .success(function (data, status, headers) {
   //      $scope.user= data;
   //    })
   //      .error(function (data, status, header, config) {
   //        $scope.ServerResponse =  htmlDecode("Data: " + data +
   //        "\n\n\n\nstatus: " + status +
   //        "\n\n\n\nheaders: " + header +
   //        "\n\n\n\nconfig: " + config);
   //      });
   //  };
// LOGOUT SESSION USER
    $scope.logout= function() {
      toastr.danger('Deconnexion',{
        closeButton: true,
        progressBar: true
      });
    };
// Suppression USER
    $scope.supprimerCompte = function(){
      if(confirm('!!! Attention: Operation irréversible !!!')){
        var id = $scope.user.id;
        var demo = $scope.user.demo;
        if(!demo){
          $http.delete('/delete/'+id,{demo:demo}).then(function(err,req){
            // Le then reçoit le code 200 de la part du serveur donc il sait que tout va bien, donc le then est executéé pour un redirec
            window.location.href = '/';
          });
        }
        else{
          alert('Negatif! Meme en bidouillant le code ^_^ \nBut if you are smart, you can find a way ;)' );
        }
        ////////////////////////////////////////////// FIXER LE REDIRECT !!!!!!!!!!!!!!!!

    }
  };
// Changement mot de passe USER

    $scope.changePassword = function(){
      var id = $scope.user.id;
      var password = $scope.password;
      var demo = $scope.user.demo;
      if(!demo) {
        $http.put('/pwdchange', {
          password: password,
          id: id
        }).then(function (err, res) {
          toastr.warning('Password changé', 'Info', {
            closeButton: true
          });
        });
      }
      else{
        alert('Negatif! Meme en bidouillant le code ^_^ \nBut if you are smart, you can find a way ;)' );
      }
    };



    $http.get('/getUser',function onSuccess(user){
      console.log(user);
      $scope.user= user.data;});

  }])
  // ****************************************************DIRECTIVE**************** POUR VERIF DU MATCH DES 2 PASSWORD

  .directive('pwCheck', [function () {
    return {
      require: 'ngModel',
      link: function (scope, elem, attrs, ctrl) {
        var firstPassword = '#' + attrs.pwCheck;
        elem.add(firstPassword).on('keyup', function () {
          scope.$apply(function () {
            var v = elem.val()===$(firstPassword).val();
            ctrl.$setValidity('pwmatch', v);
          });
        });
      }
    }
  }]);


