angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http, Chats, Units) {

  //
    $http.get("http://api.openweathermap.org/data/2.5/forecast/daily?cnt=15&lat=35&lon=139&units=" + Units.get()).success(function (data){
      Chats.set(data.list);
      console.log(data.list);
      $scope.weatherToday = Chats.getOne();
      $scope.chats = Chats.all();
      });

    //Metodo de actualizacion
    $scope.doRefresh = function() {
    $http.get("http://api.openweathermap.org/data/2.5/forecast/daily?cnt=15&lat=35&lon=139&units=" + Units.get())
     .success(function(data) {
       Chats.set(data.list);
      $scope.weatherToday = Chats.getOne();
      $scope.chats = Chats.all();
     })
     .finally(function() {
       $scope.$broadcast('scroll.refreshComplete');
     });
    }
})

.controller('ChatsCtrl', function($scope, $http, Chats) {
  $scope.chats = Chats.all();

  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.weatherToday = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, Units) {
  
  $scope.celcius = function(){
      Units.set("metric");
  }
  $scope.fahrenheit = function(){
      Units.set("imperial");
  }
  $scope.kelvin = function(){
      Units.set("kelvin");
  }

});
