angular.module('todo', ['ngRoute', 'firebase'])
.config(function($routeProvider, $locationProvider) {
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
		controller: 'todoController'
	});

	$routeProvider.when('/addnew', {
		templateUrl: 'partials/add-new.html',
	 	controller: 'todoController'
	});

	$routeProvider.otherwise({
		redirectTo: '/login'
	});

	var config = {
	    apiKey: "AIzaSyA4qsHaA0K3i6xe2L64_MOpnUoAcL_jrCc",
	    authDomain: "todo-cbb8c.firebaseapp.com",
	    databaseURL: "https://todo-cbb8c.firebaseio.com",
	    storageBucket: "todo-cbb8c.appspot.com",
		messagingSenderId: "959119166709"
	};
	firebase.initializeApp(config);
});