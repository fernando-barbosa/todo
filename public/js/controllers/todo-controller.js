angular.module('todo')
.controller('todoController', function($scope, $firebaseObject, $firebaseArray, $firebase) {

	// Firebase
	var storage = firebase.database();
	var storageRef = storage.ref();
	
	var uploadObjects = document.getElementById('uploadObjects');
	var objectTitle = document.getElementById('item_title');
	var objectContent = document.getElementById('item_content');

	$scope.addFirebase = function() {
		var objects = {
			title: objectTitle.value,
			content: objectContent.value
		}

		var list = $firebaseArray(storageRef);
			list.$add({ todo: objects }).then(function(ref) {
			console.log("Adicionado ao banco com sucesso!");
			console.log('Title: ', objectTitle.value);
			console.log('Content: ', objectContent.value);
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

		console.log("Adicionado ao localStorage com sucesso!");

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