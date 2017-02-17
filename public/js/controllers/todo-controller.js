angular.module('todo')
.controller('todoController', function($scope, $firebaseObject, $firebaseArray, $firebase) {

	// Firebase
	var storage = firebase.database();
	var storageRef = storage.ref('todo');

	var uploadObjects = document.getElementById('uploadObjects');
	var objectTitle = document.getElementById('item_title');
	var objectContent = document.getElementById('item_content');

	$scope.getFirebaseJSON = function() {
		storageRef.on('value', snap => {
			console.log('Retornando dados do Firebase: ');

			// console.log(JSON.stringify(snap.val()));

			var data = snap.val();
			var jstring = JSON.stringify(data);
			console.log(jstring);

		});
	}

	$scope.addFirebase = function() {
		var objects = {
			title: objectTitle.value,
			content: objectContent.value
		}

		var list = $firebaseArray(storageRef);
		list.$add(objects).then(function(uid) {
		  	console.log('Id do item: ' + uid);
			console.log('Adicionado ao banco com sucesso!');
		});

		$scope.getFirebaseJSON();
	}

	$scope.removeFirebase = function() {
		var list = $firebaseObject(storageRef);
		// var list = $firebaseArray(storageRef);

		list.$remove().then(function(){
			console.log('Removido com sucesso!');
		}, function(error){
			console.log('erro: ' + error);
		});
	}

	// Local Storage
	$scope.saved = localStorage.getItem('todos');
	$scope.todos = (localStorage.getItem('todos')!==null) ? JSON.parse($scope.saved) : [  ];
	localStorage.setItem('todos', JSON.stringify($scope.todos))

	$scope.addTodo = function() {
		$scope.todos.push({
			text: $scope.todoText,
			content: $scope.todoContent,
			done: false
		});

		$scope.todoText = ''; //clear the input after adding
		$scope.todoContent = ''; //clear the input after adding
		localStorage.setItem('todos', JSON.stringify($scope.todos));

		console.log('Adicionado ao local storage com sucesso!');

		window.location = '#/list';
	};

	$scope.remaining = function() {
		var count = 0;
		angular.forEach($scope.todos, function(todo){
			count+= todo.done ? 0 : 1;
		});
		return count;
	};

	$scope.archive = function() {
		var oldTodos = $scope.todos;
		$scope.todos = [];
		angular.forEach(oldTodos, function(todo){
			if (!todo.done)
				$scope.todos.push(todo);
		});
		localStorage.setItem('todos', JSON.stringify($scope.todos));
	};

});