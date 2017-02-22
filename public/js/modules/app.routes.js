'use strict';

angular
    .module('app.routes', ['ngRoute'])
    .config(config);

function config($routeProvider, $locationProvider) {
	$locationProvider.hashPrefix('');

	$routeProvider.when('/login', {
		templateUrl: 'partials/login.html',
		controller: 'loginController'
	});

	$routeProvider.when('/login-forget-pass', {
		templateUrl: 'partials/login-forget-pass.html',
		controller: 'loginController'
	});

	$routeProvider.when('/list', {
		templateUrl: 'partials/list.html',
		controller: 'LocalStorageController'
	});

	$routeProvider.when('/addnew', {
		templateUrl: 'partials/add-new.html',
	 	controller: 'LocalStorageController'
	});

	$routeProvider.otherwise({
		redirectTo: '/login'
	});
}