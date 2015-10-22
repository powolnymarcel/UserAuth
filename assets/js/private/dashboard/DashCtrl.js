angular.module('DashMod').
  controller('DashCtrl',['$scope','$http','toastr',function($scope,$http,toastr){
    console.log("-----------");
    var prev = window.location.href;
    console.log(prev);
    console.log("-----------");

    $scope.getUser= function(){
    console.log('Acquisition des infos user');
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
      })
      .catch(function onError(err){
        console.log(err);
      })
    }

    $scope.editer= function() {
      toastr.warning('Editer votre profil', 'Edition!',{
        closeButton: true,
        maxOpened:2,
        progressBar: true

      });
    }
    $scope.logout= function() {
      toastr.danger('Deconnexion',{
        closeButton: true,
        progressBar: true
      });
    }
    }])
