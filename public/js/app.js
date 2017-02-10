angular.module('todo', ['ngRoute'])
.config(function($routeProvider, $locationProvider) {
	$routeProvider.when('/list', {
		templateUrl: 'partials/list.html',
		controller: 'ListController'
	});
	
	// $routeProvider.when('/addnew', {
	// 	templateUrl: 'partials/add-new.html'
	//  controller: 'ListController'
	// });

	$routeProvider.otherwise({
		redirectTo: '/list'
	});
});