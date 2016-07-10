console.log('Hello from script.js!');

// will need to also inject ngDialog as dependency if use modals in Favorites list
var adoptionApp = angular.module('adoptionApp', ['ui.router']);

adoptionApp.config(function($stateProvider, $urlRouterProvider) { // .config allows configuration of app before it boots up
	$urlRouterProvider.otherwise('/welcome');
	$stateProvider
	.state('welcome', {
		url: '/welcome',
		templateUrl: '/views/partials/welcome.html'
	})
	.state('about', {
		url: '/about',
		templateUrl: '/views/partials/about.html'
	})
	.state('criteria', {
		url: '/criteria',
		templateUrl: '/views/partials/criteria.html'
		// controller: " "
	})
	.state('fetch', {
		url: '/fetch',
		templateUrl: '/views/partials/fetch.html'
		// controller: " "
	})
	.state('favorites', {
		url: '/favorites',
		templateUrl: '/views/partials/favorites.html'
		// controller: " "
	});
}); // end adoptionApp states configuration



// test API access
adoptionApp.controller('HitApiController', ['$scope', '$http', function ($scope, $http) {
  $scope.showMeTheDogs = []; // empty array to push dog data to
  $scope.dog_index = 0;
  $scope.dog = {};
  $scope.next = function () {
	  if ($scope.dog_index >= $scope.showMeTheDogs.length - 1) {
		  $scope.dog_index = 0;
	  } else {
		  $scope.dog_index++;
	  }
	  console.log($scope.showMeTheDogs.length + '/' + $scope.dog_index);
  }; // end .next

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
            criteria: $scope.zipcodeIn
          },
          {
            fieldName: "animalLocationDistance",
            operation: "radius",
            criteria: $scope.searchRadiusIn
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
        fields: [ "animalName", "animalBreed", "animalPrimaryBreed", "animalSex", "animalGeneralAge", "animalLocation", "animalEnergyLevel", "animalDescriptionPlain", "animalGeneralSizePotential", "animalBirthdateExact", "animalOKWithDogs", "animalOKWithCats", "animalOKWithKids", "animalHousetrained", "animalCratetrained", "animalUrl", "animalAdoptionFee", "animalPictures"]
  } // end search
}; // end var data

    $http({
      method: 'POST',
      url: 'https://api.rescuegroups.org/http/v2.json',
      headers: {'Content-Type': 'application/json'},
      data: data
    }).then( function( response ){
      console.log( "response.data: ", response.data );

	$scope.showMeTheDogs.push(response.data);

    }); // end api hit test
  }; // end hitAPI function
}]); // end HitApiController




// // create a controller to define adoptionApp's behavior
adoptionApp.controller('FavoriteDogsController', ['$scope', '$http', function ($scope, $http) {
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
}]); // end FavoriteDogsController




// test modal functionality
adoptionApp.controller('ModalController', function ($scope, ngDialog) {
	$scope.openModal = function() {
		ngDialog.open({ template: 'partials/fetch.html', className: 'ngdialog-theme-default' });
	};
}); // end ModalController
