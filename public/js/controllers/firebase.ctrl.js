angular.module('todo')
.controller('FirebaseController', function($scope, $firebaseObject, $firebaseArray, $firebase) {

	// Firebase
	var storage = firebase.database();
	var storageRef = storage.ref();

	var uploadObjects = document.getElementById('uploadObjects');
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

	 		console.log('Adicionado ao local storage com sucesso!');

			// $scope.addTodo();
		});
	}

	$scope.removeFirebase = function() {
		var obj = $firebaseObject(storageRef);

		obj.$remove().then(function() {

		});

		$scope.archive();
	}

	// $scope.removeFirebase = function() {
	// 	var list = $firebaseObject(storageRef);
	// 	// var list = $firebaseArray(storageRef);

	// 	list.$remove().then(function(){
	// 		console.log('Removido com sucesso!');
	// 	}, function(error){
	// 		console.log('erro: ' + error);
	// 	});
	// }

});