'use strict';

angular
	.module('app.core')
	.controller('MainController', ['$scope', 'FirebaseServices', function($scope, FirebaseServices) {

		/*
		 * FIREBASE
		 */

		$scope.addFirebase = function() {
			$scope.addFirebase = FirebaseServices.addFirebase();
		}

		$scope.removeFirebase = function() {
			$scope.removeFirebase = FirebaseServices.removeFirebase();
		}

	}]);