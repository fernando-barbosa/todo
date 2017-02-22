angular.module('todo')
.controller('loginController', function($scope) {
	var email = 'login@email.com.br';
	var password = '12345';

	$scope.doLogin = function() {
		if (email === $scope.emailLogin && password === $scope.passwordLogin) {
			window.location = '#/list';
		} else {
			Materialize.toast('Login incorreto.', 4000);
		}
	};

	$scope.goToForget = function() {
		window.location = '#/login-forget-pass';
	}

	$scope.goToLogin = function() {
		window.location = '#/login';
	}

	
});