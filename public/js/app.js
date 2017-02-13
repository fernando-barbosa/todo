angular.module('todo', ['ngRoute'])
.config(function($routeProvider, $locationProvider) {
	$locationProvider.hashPrefix('');

	$routeProvider.when('/list', {
		templateUrl: 'partials/list.html',
		controller: 'ListController'
	});
	
	$routeProvider.when('/addnew', {
		templateUrl: 'partials/add-new.html',
	 	controller: 'AddController'
	});

	$routeProvider.otherwise({
		redirectTo: '/list'
	});
});