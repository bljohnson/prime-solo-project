console.log('Hello from script.js');

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
		templateUrl: 'partials/fetch.html'
	})
	.state('favorites', {
		url: '/favorites',
		templateUrl: 'partials/favorites.html'
	})
	.state('signout', {
		url: '/signout',
		templateUrl: 'partials/signout.html'
	});
});
