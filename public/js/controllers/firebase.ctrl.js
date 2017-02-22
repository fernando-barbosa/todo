'use strict';

angular
	.module('app.config')
	.controller('FirebaseController', function($scope, $firebaseObject, $firebaseArray, $firebase) {

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

		 		console.log('Adicionado ao Firebase com sucesso!');

				// $scope.addTodo();
			});
		}

		$scope.removeFirebase = function() {
			var list = $firebaseObject(storageRef);
			// var list = $firebaseArray(storageRef);
			console.log('ok');
			list.$remove().then(function(){
				console.log('Removido do Firebase com sucesso!');
			}, function(error){
				console.log('erro: ' + error);
			});
		}

	});