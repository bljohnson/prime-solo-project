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



// trying to show one dog at a time from search results
// adoptionApp.controller('HitApiController', ['$scope', '$http', function ($scope, $http) {
// 	$scope.showMeTheDogs = []; // empty array to push dog data to
// 	$scope.allDogs=[];
//   	$scope.dog_index = 0;
//   	$scope.dog = {};
//   	$scope.next = function () {
// 	  	if ($scope.dog_index >= $scope.showMeTheDogs.length - 1) {
// 		  	$scope.dog_index = 0;
// 	  	} else {
// 		  	$scope.dog_index++;
// 	  	}
// 	  	console.log($scope.showMeTheDogs.length + '/' + $scope.dog_index);
//   	}; // end .next
// }]);




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




// // test modal functionality
// adoptionApp.controller('ModalController', function ($scope, ngDialog) {
// 	$scope.openModal = function() {
// 		ngDialog.open({ template: 'partials/about.html', className: 'ngdialog-theme-default' });
// 	};
// }); // end ModalController




// ---------------------------------------------------------------------------------------------------------------------------------------

adoptionApp.controller('SettingsAPIController', ['$scope', '$http', function ($scope, $http) {
	console.log('SettingsAPIController loaded');
	$scope.objectToSendToDb = {}; // most recently entered settings
	$scope.currentUser = {};
	$scope.saveSettings = function () { // saves most recently entered settings to db
		console.log('saveSettings button clicked');
		$scope.objectToSendToDb = {
			status: 'available', // hard code in
			species: 'dog', // hard code in
			age: $scope.ageIn,
			gender: $scope.genderIn,
			size: $scope.sizeIn,
			location: $scope.zipcodeIn,
			radius: $scope.searchRadiusIn,
			dogFriendly: $scope.dogFriendlyIn,
			catFriendly: $scope.catFriendlyIn,
			kidFriendly: $scope.kidFriendlyIn,
			energyLevel: $scope.energyLevelIn,
			primaryBreed: $scope.breedIn,
			housetrained: $scope.housetrainedIn,
			cratetrained: $scope.cratetrainedIn
		}; // end objectToSendToDb
		console.log('object sent to db: ', $scope.objectToSendToDb);
		//make call to server with object to be stored in db
		$http({
			method: 'POST',
			url: '/postSettings',
			data: $scope.objectToSendToDb
		}).success(function(response) {
			console.log('response from postSettings: ', response);
			$scope.hitAPI();
		}); // end http post
	}; // end saveSettings function


	$scope.hitAPI = function(){
		var userSettings = {}; // global in order to access its contents from search page
		$http({
			method: 'GET',
			url: '/getSettings'
		}).then(function(response) { // get most recently saved settings from db, then use them to make API request
			userSettings = response.data; // gets all sets of settings saved in db
			console.log('userSettings: ', userSettings);
			// test w/ most recent
			console.log( '# of sets of user settings:',  userSettings.length  );
			$scope.currentUser = userSettings[ Number( userSettings.length ) -1 ]; // gets most recently saved settings. userSettings = array of objects, each has set of settings.
			console.log( 'current settings - status:  ', $scope.currentUser.status  );

			$scope.showMeTheDogs=[]; // stores all dogs from search results

			var data = {
				apikey: '0mOrCBOl', // need to figure out how to hide in a file that gets exported/ng-included in
				objectType: 'animals',
				objectAction: 'publicSearch',
				search: {
					resultStart: 0,
					resultLimit: 30,
					resultSort: "animalLocationDistance",
					resultOrder: "asc", // finicky - sometimes sort by radius correctly (closest to farthest), sometimes not
					calcFoundRows: "Yes",
					filters: [{fieldName: "animalStatus", // user's search criteria
							operation: "equals",
							criteria: $scope.currentUser.status},
							{fieldName: "animalSpecies",
							operation: "equals",
							criteria: $scope.currentUser.species},
							{fieldName: "animalGeneralAge",
							operation: "equals",
							criteria:  $scope.currentUser.age},
							{fieldName: "animalSex",
							operation: "equals",
							criteria: $scope.currentUser.gender},
						 	{fieldName: "animalGeneralSizePotential",
							operation: "equals",
							criteria:  $scope.currentUser.size},
							{fieldName: "animalLocation",
							operation: "equals",
							criteria:  $scope.currentUser.location},
							{fieldName: "animalLocationDistance",
							operation: "radius",
							criteria:  $scope.currentUser.radius},
							{fieldName: "animalOKWithDogs",
							operation: "equals",
							criteria:  $scope.currentUser.dogs},
							{fieldName: "animalOKWithCats",
							operation: "equals",
							criteria:  $scope.currentUser.cats},
							{fieldName: "animalOKWithKids",
							operation: "equals",
							criteria:  $scope.currentUser.kids},
							{fieldName: "animalEnergyLevel",
							operation: "equals",
							criteria:  $scope.currentUser.energy},
							{fieldName: "animalPrimaryBreed",
							operation: "contains",
							criteria:  $scope.currentUser.breed},
							{fieldName: "animalHousetrained",
							operation: "equals",
							criteria:  $scope.currentUser.housetrained},
							{fieldName: "animalCratetrained",
							operation: "equals",
							criteria:  $scope.currentUser.cratetrained}],
					fields: ["animalName", "animalBreed", "animalPrimaryBreed", "animalSex", "animalGeneralAge", "animalLocation", "animalEnergyLevel", "animalDescriptionPlain", "animalGeneralSizePotential", "animalBirthdateExact", "animalOKWithDogs", "animalOKWithCats", "animalOKWithKids", "animalHousetrained", "animalCratetrained", "animalUrl", "animalAdoptionFee", "animalPictures"] // info from API we want to return
				} // end search
			}; // end var data

			$http({
				method: 'POST',
				url: 'https://api.rescuegroups.org/http/v2.json',
				headers: {'Content-Type': 'application/json'},
				data: data
				}).then(function(response){
					console.log("response.data: ", response.data);
					$scope.showMeTheDogs.push(response.data.data); // whole API data structure
					// console.log( "$scope.showMeTheDogs: ", $scope.showMeTheDogs );
					// console.log( "$scope.showMeTheDogs[0]: ", $scope.showMeTheDogs[0] );
					$scope.allDogs = $scope.showMeTheDogs[0]; // empty object that contains actual dog objects
			}); // end $http post

		}, function myError(response) {
			console.log(response.statusText);
		}); // end myError and .then function response
  	}; // end hitAPI function
}]); // end SettingsAPIController



// -------------------------------------------------------------------------------------------------------------
