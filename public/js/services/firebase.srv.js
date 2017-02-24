'use strict';

angular
	.module('app.config')
	.service('FirebaseServices', dataFirebaseService);

function dataFirebaseService($firebaseObject, $firebaseArray, $firebase) {

	var storage = firebase.database();
	var storageRef = storage.ref();

	function addFirebase() {
		var objectTitle = document.getElementById('item_title');
		var objectContent = document.getElementById('item_content');

		var objects = {
			title: objectTitle.value,
			content: objectContent.value
		}

		var list = $firebaseArray(storageRef);
		list.$add(objects).then(function(storageRef) {
	 		console.log('Adicionado ao Firebase com sucesso!');
			Materialize.toast('Adicionado ao banco de dados com sucesso!', 2000);
		}, function(error){
			console.log('erro: ' + error);
		});

		return list;
	}

	return {
		addFirebase: addFirebase
	}
}