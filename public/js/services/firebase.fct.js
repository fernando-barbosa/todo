'use strict';

angular
	.module('app.config')
	.factory('FirebaseServices', dataFirebaseService);

 function dataFirebaseService($scope, $firebaseObject, $firebaseArray, $firebase) {

	var storage = firebase.database();
	var storageRef = storage.ref();

	var objectTitle = document.getElementById('item_title');
	var objectContent = document.getElementById('item_content');

	var todoFirebaseID;

	$scope.addFirebase = function() {
		var objects = {
			title: objectTitle.value,
			content: objectContent.value
		}

		var list = $firebaseArray(storageRef);
		list.$add(objects).then(function(storageRef) {
	 		todoFirebaseID = storageRef.key;

	 		console.log('Adicionado ao Firebase com sucesso!');

			// $scope.addTodo();
		});
	};

	$scope.removeFirebase = function() {
		var obj = $firebaseObject(storageRef);

		obj.$remove().then(function() {

		});

		$scope.archive();
	};

	return todoFirebaseID;

}