angular.module('DashMod').
  controller('DashCtrl',['$scope','$http',function($scope,$http){

    $scope.getUser= function(){
    console.log('Acquisition des infos user');

    $http.get('/getUser')
      .then(function onSuccess(user){
        console.log(user);
      })
      .catch(function onError(err){
        console.log(err);
      })
    }

  }])
