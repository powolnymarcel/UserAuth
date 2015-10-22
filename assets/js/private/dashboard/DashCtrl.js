angular.module('DashMod').
  controller('DashCtrl',['$scope','$http','$filter',function($scope,$http,$filter){

    $scope.getUser= function(){
    console.log('Acquisition des infos user');

    $http.get('/getUser')
      .then(function onSuccess(user){
        console.log(user);
        $scope.user= user.data;

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

  }])
