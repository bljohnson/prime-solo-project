console.log('Hello from script.js');

// var key = require('../modules/api.js');

// create AngularJS module, inject ui.router as dependency
var adoptionApp = angular.module('adoptionApp', ['ui.router', 'ngDialog']);

adoptionApp.config(function($stateProvider, $urlRouterProvider) { // .config allows configuration of app before it boots up
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
		controller: 'HitApiController'
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
// define function that will create object to send to adoptiondb (THIS SHOULD JUST BE DOGS THE USER 'FAVORITES')
$scope.addDog = function () {
  event.preventDefault();
  var sendDogToDb = {
    name: $scope.nameIn,
    age: $scope.ageIn,
    breed: $scope.breedIn,
    gender: $scope.genderIn
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
  $scope.showMeTheDogs = []; // empty array to push dog data to
  $scope.hitAPI = function(){
    console.log('hit API');
    var data = {
      apikey: '0mOrCBOl', // need to figure out how to hide in a file that gets exported/ng-included in
      objectType: 'animals',
      objectAction: 'publicSearch',
      search: {
        resultStart: 0,
        resultLimit: 30, // start with small result set for demo purposes so less wait time
        resultSort: "animalLocationDistance",
        resultOrder: "asc", // this is finicky - sometimes sorts by radius correctly (closest to farthest dogs), sometimes not
        calcFoundRows: "Yes",
        filters: [
          {
            fieldName: "animalStatus", // this can be hardcoded in
            operation: "equals",
            criteria: "Available"
          },
          {
            fieldName: "animalSpecies", // this can be hardcoded in
            operation: "equals",
            criteria: "dog"
          },
	    {
            fieldName: "animalGeneralAge",
            operation: "equals",
            criteria: $scope.ageIn
          },
	    {
		fieldName: "animalSex",
		operation: "equals",
		criteria: $scope.genderIn
	    },
	    {
	     fieldName: "animalGeneralSizePotential",
	     operation: "equals",
	     criteria: $scope.sizeIn
	   },
          {
            fieldName: "animalLocation",
            operation: "equals",
            criteria: "55427" // will need to pull from user profile input
          },
          {
            fieldName: "animalLocationDistance",
            operation: "radius",
            criteria: "50" // will need to pull from user profile input
          },
	    {
		fieldName: "animalOKWithDogs",
		operation: "equals",
		criteria: $scope.dogFriendlyIn
	    },
	    {
		fieldName: "animalOKWithCats",
		operation: "equals",
		criteria: $scope.catFriendlyIn
	    },
	    {
		fieldName: "animalOKWithKids",
		operation: "equals",
		criteria: $scope.kidFriendlyIn
	    },
	    {
            fieldName: "animalEnergyLevel",
            operation: "equals",
            criteria: $scope.energyLevelIn
          },
	    {
            fieldName: "animalDescriptionPlain"
          },
	{
	  fieldName: "animalPrimaryBreed",
	  operation: "contains",
	  criteria: $scope.breedIn
	},
	{
	  fieldName: "animalHousetrained",
	  operation: "equals",
	  criteria: $scope.housetrainedIn
	},
	{
	  fieldName: "animalCratetrained",
	  operation: "equals",
	  criteria: $scope.cratetrainedIn
  	}
        ],
        fields: [ "animalName", "animalBreed", "animalPrimaryBreed", "animalSex", "animalGeneralAge", "animalLocation", "animalEnergyLevel", "animalDescriptionPlain", "animalGeneralSizePotential", "animalBirthdateExact", "animalOKWithDogs", "animalOKWithCats", "animalOKWithKids", "animalHousetrained", "animalCratetrained", "animalSpecialneeds", "animalSpecialneedsDescription", "animalUrl", "animalNoFemaleDogs", "animalNoMaleDogs", "animalNoLargeDogs", "animalNoSmallDogs", "animalAdoptionFee", "animalPictures"]
  } // end search
}; // end var data

    // var apiURL = 'https://api.rescuegroups.org/http/v2.json';
    // console.log('apiURL: ', apiURL);

    $http({
      method: 'POST',
      url: 'https://api.rescuegroups.org/http/v2.json',
      headers: {'Content-Type': 'application/json'},
      data: data
    }).then( function( response ){
      console.log( "response.data: ", response.data );
	// console.log('hopefully Macey: ', response.data.data[10174487]); // target dog object from search results using it's Object #. Within data object within data object. Display this in favs list.
	$scope.showMeTheDogs.push(response.data);
    }); // end api hit test
  }; // end hitAPI function
}]); // end HitApiController



// test modal functionality
adoptionApp.controller('ModalController', function ($scope, ngDialog) {
	$scope.openModal = function() {
		ngDialog.open({ template: 'partials/fetch.html', className: 'ngdialog-theme-default' });
	};
}); // end ModalController
