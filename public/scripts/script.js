console.log('Hello from script.js');

// create AngularJS module, inject ui.router as dependency
var adoptionApp=angular.module('adoptionApp', ['ui.router']);

adoptionApp.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/welcome');
	$stateProvider
	.state('welcome', {
		url: '/welcome',
		templateUrl: 'partials/welcome.html'
	})
	.state('about', {
		url: '/about',
		templateUrl: 'partials/about.html'
	})
	.state('profile', {
		url: '/profile',
		templateUrl: 'partials/profile.html'
	})
	.state('criteria', {
		url: '/criteria',
		templateUrl: 'partials/criteria.html'
	})
	.state('fetch', {
		url: '/fetch',
		templateUrl: 'partials/fetch.html',
		controller: 'AdoptionController'
	})
	.state('favorites', {
		url: '/favorites',
		templateUrl: 'partials/favorites.html',
		controller: 'AdoptionController'
	})
	.state('signout', {
		url: '/signout',
		templateUrl: 'partials/signout.html'
	})
	.state('welcome.signin', {
		url: '/signin',
		templateUrl: 'partials/signin.html'
	})
	.state('welcome.signup', {
		url: '/signup',
		templateUrl: 'partials/signup.html'
	});
});


// // create a controller to define adoptionApp's behavior
adoptionApp.controller('AdoptionController', ['$scope', '$http', function ($scope, $http) {
// code that gets executed when this controller is called
// define function that will create object to send to adoptiondb
$scope.addDog = function () {
  event.preventDefault();
  var sendDogToDb = {
    name: $scope.nameIn,
    age: $scope.ageIn,
    breed: $scope.breedIn
  };
  // make a call to server with object to be stored in db
  $http({
    method: 'POST',
    url: '/postDog',
    data: sendDogToDb
  });
}; // end addDog function

// define function to get Favorited dogs from dogdb
$scope.getDogs = function () {
   $http({
     method: 'GET',
     url: '/getDogs'
}).then(function(response){
     $scope.allDogs = response.data; // .data is the data in the response; allDogs is the array of objects in dogdb
     console.log($scope.allDogs);
   }, function myError(response){
     console.log(response.statusText);
}); // end 'then' success response (success and myError functions)
 }; // end getDogs function

 // delete dog from DOM
 $scope.deleteDog = function (index) {
   var deleteOne = $scope.allDogs[index];
   $scope.allDogs.splice(index, 1);
   console.log('deleted dog:' + deleteOne._id);
   var dogId = {id: deleteOne._id};
   $http({
     method: 'POST',
     url: '/deleteDog',
     data: dogId
   });
 }; // end deleteDog function
}]); // end AdoptionController
