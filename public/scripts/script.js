console.log('Hello from script.js!');

var adoptionApp = angular.module('adoptionApp', ['ui.router', 'ngMaterial', 'ngMdIcons', 'ngAnimate', 'ui.bootstrap', 'ngSanitize']);

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
	})
	.state('fetch', {
		url: '/fetch',
		templateUrl: '/views/partials/fetch.html'
	})
	.state('favorites', {
		url: '/favorites',
		templateUrl: '/views/partials/favorites.html'
	});
}); // end adoptionApp states configuration



///////////////////////// ------------------------------------------------------------------------------------------------------

// test ModalController
adoptionApp.directive('modalDialog', function() {
	return {
		restrict: 'E',
	    	scope: {
	      show: '='
	},
	    	replace: true, // Replace with the template below
	    	transclude: true, // we want to insert custom content inside the directive
	    	link: function(scope, element, attrs) {
	      	scope.dialogStyle = {};
	      	if (attrs.width)
	        		scope.dialogStyle.width = attrs.width;
	      	if (attrs.height)
	        		scope.dialogStyle.height = attrs.height;
	      	scope.hideModal = function() {
	        		scope.show = false;
	      	};
	    	},
	    	template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div>"
	  };
}); // end test modal directive


adoptionApp.controller('ModalController', ['$scope', function($scope) {
	$scope.animationsEnabled = true;
	$scope.modalShown = false;
  	$scope.toggleModal = function(index) {
    		$scope.modalShown = !$scope.modalShown;
	};
}]); // end test ModalController

///////////////////////// ------------------------------------------------------------------------------------------------------



adoptionApp.controller('SettingsAPIController', ['$scope', '$sanitize', '$http', '$sce', function ($scope, $sanitize, $http, $sce) {
	console.log('SettingsAPIController loaded');
	// available to all functions within controller
	$scope.objectToSendToDb = {}; // most recently entered settings
	$scope.currentUser = {}; // stores most recently saved search settings
	$scope.showMeTheDogs = []; // stores all dogs from search results
	$scope.allDogs = {}; // stores empty object that contains actual dog objects from API
	$scope.sendDogToDb = {}; // stores specific 'favorited' dog object to be sent to db
	$scope.favoriteDogs = []; // stores favorited dogs saved in db

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

		swal('Success!', 'Settings saved.', 'success');

	}; // end saveSettings function


	$scope.hitAPI = function(dogNumber){
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
							{fieldName: "animalBreed",
							operation: "contains",
							criteria:  $scope.currentUser.breed},
							{fieldName: "animalHousetrained",
							operation: "equals",
							criteria:  $scope.currentUser.housetrained},
							{fieldName: "animalCratetrained",
							operation: "equals",
							criteria:  $scope.currentUser.cratetrained}],
					fields: ["animalName", "animalBreed", "animalPrimaryBreed", "animalSex", "animalGeneralAge", "animalLocation", "animalEnergyLevel", "animalDescriptionPlain", "animalGeneralSizePotential", "animalBirthdateExact", "animalOKWithDogs", "animalOKWithCats", "animalOKWithKids", "animalHousetrained", "animalCratetrained", "animalAdoptionFee", "animalPictures", "locationName", "animalID", "locationPhone"] // info from API we want to return
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
					$scope.allDogs = $scope.showMeTheDogs[0]; // empty object that contains actual dog objects

////////////--------------------/////////////////////-----------------------///////////////////////// targeting right thing but not communicating with ng-bind-html in fetch.html -- descriptions don't show up in dogs' modals

					// for (var dogId in $scope.allDogs) { // iterates through object that contains dog objects
					// 	var obj = $scope.allDogs[dogId]; // var obj is each individual dog object
					//     	console.log('obj: ', obj); // logs out each dog object and their fields/values
					//     	for (var description in obj) { // iterates through fields of each individual dog object
					// 		if (description == 'animalDescriptionPlain') // target 'animalDescriptionPlain' field
					//         		console.log(description + " = " + obj[description]); // logs out each dog object's 'animalDescriptionPlain' field
					// 	  		$scope.apiDog = obj[description]; // store ^ in variable to hopefully sanitize the data using ng-bind-html
					// 	  		console.log('$scope.apiDog: ', $scope.apiDog); // logs out description field
					//     	} // end inner for/in
					// } // end outer for/in

////////////--------------------/////////////////////-----------------------/////////////////////////

			}); // end $http post
		}, function myError(response) {
			console.log(response.statusText);
		}); // end myError and .then function response

		// if ($scope.showMeTheDogs.length < 1) {
		// 	swal('Bummer!', 'No dogs match your search criteria.', 'error');
		// } // end alert message if no search results returned

  	}; // end hitAPI function


	// add favorite dog to 'favoritedogs' collection in db
	$scope.addDog = function (dogNumber) { // dogNumber is index # assigned by ng-repeat
		event.preventDefault();
		console.log('addDog button clicked - index#: ' + dogNumber);
		var indexer = 0;
		for (var dogId in $scope.allDogs) { // dogId is dog's API ID #. $scope.allDogs is all the dog objects from search results
			if (indexer == dogNumber) {
				console.log("favorite this dog: ", dogId);
			   	sendDogToDb = $scope.allDogs[dogId]; // the specific dog whose 'add' button was clicked
	   		   	console.log('sendDogToDb: ', sendDogToDb);
			}
			indexer++;
		}
		$http({
			method: 'POST',
			url: '/postDog',
			data: sendDogToDb
		});

		swal('Gotcha!', 'Dog saved to favorites.', 'success');

	}; // end addDog function


	// define function to get favorited dogs from dogdb
	$scope.getFavoriteDogs = function () {
		console.log('getFavoriteDogs button clicked');

	   	$http({
	     		method: 'GET',
	     		url: '/getFavoriteDogs'
		}).then(function(response){
	     		$scope.favoriteDogs = response.data; // .data is the data in the response; favoriteDogs is the array of saved dog objects in dogdb
	     		console.log('$scope.favoriteDogs: ', $scope.favoriteDogs);
			console.log($scope.favoriteDogs.length);

////////////////////////////-----------------////////////////////////////////-----------------///////////////////////////
			// trying to target each dog object when button clicked and sanitize 'description' to remove html entities. any description button clicked just brings up last dog in array's description (sanitized at least though)

			// for (var count = 0; count < $scope.favoriteDogs.length; count ++) {
			// 		$scope.fav = $scope.favoriteDogs[count].description;
			// 		console.log('$scope.fav: ', $scope.fav);
			// }

			for (var count = 0; count < $scope.favoriteDogs.length; count ++) {
					$scope.test = $scope.favoriteDogs[count];// object
					console.log('$scope.test: ', $scope.test);
					for (var p in $scope.test) {// p is each field in object
						if (p == 'description') { // want to target description to sanitize it
							$scope.fav = $scope.test[p]; // correctly targets description field
							console.log('description: ', $scope.test[p]);
						}
					}
			}
////////////////////////////-----------------////////////////////////////////-----------------///////////////////////////

	   	}, function myError(response){
	     		console.log(response.statusText);
		}); // end 'then' success response (success and myError functions)
	}; // end getDogs function


	// delete dog from DOM (My Favorites view)
      $scope.deleteDog = function (index) {
      	var deleteOne = $scope.favoriteDogs[index];
        	$scope.favoriteDogs.splice(index, 1);
        	console.log('deleted dog:' + deleteOne._id);
        	var dogId = {id: deleteOne._id};
        	$http({
          		method: 'POST',
          		url: '/deleteDog',
          		data: dogId
        	});
      }; // end deleteDog function


	// removes dog from DOM (search results page) on button click
	$scope.hideDog = function (dogNumber) { // dogNumber is index # assigned by ng-repeat
		event.preventDefault();
		console.log('addDog button clicked - index#: ' + dogNumber);
		var counter = 0; // resets dog API ID#s to start at 0
		for (var dogId in $scope.allDogs) { // dogId is dog's API ID #. counter and dogId align as 'counter' var. $scope.allDogs is all the dog objects from search results
			if (counter == dogNumber) {
				console.log('hide this dog: ', dogId);
				console.log('before delete', $scope.allDogs);
				delete $scope.allDogs[dogId]; // remove dog from DOM whose button was clicked
				console.log('after delete', $scope.allDogs);
			} // end if
			counter++;
		} // end for
	}; // end hideDog function test


}]); // end SettingsAPIController
