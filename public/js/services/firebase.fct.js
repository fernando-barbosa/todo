'use strict';

angular
	.module('app.config')
	.factory('FirebaseServices', dataFirebaseService);

function dataFirebaseService($firebaseObject, $firebaseArray, $firebase) {

	var storage = firebase.database();
	var storageRef = storage.ref();

	var todoFirebaseID;

	function addFirebase() {
		var objectTitle = document.getElementById('item_title');
		var objectContent = document.getElementById('item_content');

		var objects = {
			title: objectTitle.value,
			content: objectContent.value
		}

		var list = $firebaseArray(storageRef);
		list.$add(objects).then(function(storageRef) {
	 		todoFirebaseID = storageRef.key;
	 		console.log('Adicionado ao Firebase com sucesso!');
		}, function(error){
			console.log('erro: ' + error);
		});

		return list;

	}

	function removeFirebase() {
		var list = $firebaseObject(storageRef);
		list.$remove().then(function(){
			console.log('Removido do Firebase com sucesso!');
		}, function(error){
			console.log('erro: ' + error);
		});

		return list;
	}

	return {
		addFirebase: addFirebase,
		removeFirebase: removeFirebase
	}

}