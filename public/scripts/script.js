console.log('Hello from script.js');

// var key = require('../modules/api.js');

// create AngularJS module, inject ui.router as dependency
var adoptionApp = angular.module('adoptionApp', ['ui.router']);

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



// test API access
adoptionApp.controller('HitApiController', ['$scope', '$http', function ($scope, $http) {
  $scope.hitAPI = function(){
    console.log('hit API');
    var data = {
      apikey: '0mOrCBOl',
      objectType: 'animals',
      objectAction: 'publicSearch',
      search: {
        resultStart: 0,
        resultLimit: 20,
        resultSort: "animalID",
        resultOrder: "asc",
        calcFoundRows: "Yes",
        filters: [
          {
            fieldName: "animalStatus",
            operation: "equals",
            criteria: "Available"
          },
          {
            fieldName: "animalSpecies",
            operation: "equals",
            criteria: "dog"
          },
          {
            fieldName: "animalLocation",
            operation: "equals",
            criteria: "92117"
          },
          {
            fieldName: "animalLocationDistance",
            operation: "radius",
            criteria: "30"
          },
        ],
        fields: [ "animalID","animalOrgID","animalName","animalBreed","animalLocation" ]
      }
};

    var apiURL = 'https://api.rescuegroups.org/http/v2.json';
    console.log('apiURL: ', apiURL);

    $http({
      method: 'POST',
      url: apiURL,
      headers: {'Content-Type': 'application/json'},
      data: data
    }).then( function( response ){
      console.log( "response.data: ", response.data );
    }); // end api hit test
  };
}]); // end API controller
