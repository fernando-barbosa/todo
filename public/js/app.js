angular.module('todo', ['ngRoute'])
.config(function($routeProvider, $locationProvider) {
	$locationProvider.hashPrefix('');

	$routeProvider.when('/list', {
		templateUrl: 'partials/list.html',
		controller: 'todoController'
	});

	$routeProvider.when('/addnew', {
		templateUrl: 'partials/add-new.html',
	 	controller: 'todoController'
	});

	$routeProvider.otherwise({
		redirectTo: '/list'
	});
});