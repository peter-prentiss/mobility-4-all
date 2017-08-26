myApp.controller('RiderLoginController', function($http, $location, UserService, NgMap) {
    console.log('RiderLoginController created');
    var vm = this;
    vm.user = {
      username: '',
      password: ''
    };
    vm.message = '';

    vm.login = function() {
      console.log('LoginController -- login');
      if(vm.user.username === '' || vm.user.password === '') {
        vm.message = "Enter your username and password!";
      } else {
        console.log('LoginController -- login -- sending to server...', vm.user);
        $http.post('/', vm.user).then(function(response) {
          if(response.data.username) {
            console.log('LoginController -- login -- success: ', response.data);
            // location works with SPA (ng-route)
            $location.path('/user'); // http://localhost:5000/#/user
          } else {
            console.log('LoginController -- login -- failure: ', response);
            vm.message = "Wrong!!";
          }
        }).catch(function(response){
          console.log('LoginController -- registerUser -- failure: ', response);
          vm.message = "Wrong!!";
        });
      }
    };

    vm.registerUser = function() {
      console.log('LoginController -- registerUser');

      if(vm.user.username === '' || vm.user.password === '') {
        vm.message = "Choose a username and password!";
      } else {
        if (vm.user.selection == 'rider') {
        console.log('LoginController -- registerUser -- sending to server...', vm.user);
        $http.post('/register/rider', vm.user).then(function(response) {
          console.log('LoginController -- registerRider -- success');
          $location.path('/rider-login');
        }).catch(function(response) {
          console.log('LoginController -- registerRider -- error');
          vm.message = "Please try again.";
        });
      } if (vm.user.selection == 'driver') {
        console.log('LoginController -- registerUser -- sending to server...', vm.user);
        $http.post('/register/driver', vm.user).then(function(response) {
          console.log('LoginController -- registerDriver -- success');
          $location.path('/driver-login');
        }).catch(function(response) {
          console.log('LoginController -- registerDrier -- error');
          vm.message = "Please try again.";
        });
      }
      }

    };

    // Testing out ng-map

    NgMap.getMap().then(function(map) {
      console.log(map.getCenter());
      console.log('markers', map.markers);
      console.log('shapes', map.shapes);
  });
});
