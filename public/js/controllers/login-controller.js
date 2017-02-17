angular.module('todo')
.controller('loginController', function($scope) {
	var email = 'devmobile@stone.com.br';
	var password = '12345';

	$scope.doLogin = function() {
		if (email === $scope.emailLogin && password === $scope.passwordLogin) {
			window.location = '#/list';
		} else {
			Materialize.toast('Login incorreto.', 4000);
		}
	};
});