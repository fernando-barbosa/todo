angular.module('todo')
.controller('todoController', function($scope, $firebase) {
	
	//var fireRef = new Firebase('https://todo-cbb8c.firebaseio.com');

	$scope.saved = localStorage.getItem('todos');
	$scope.todos = (localStorage.getItem('todos')!==null) ? JSON.parse($scope.saved) : [  ];
	// $scope.todos = $firebase(fireRef).$asArray();
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

		// push to firebase
		$scope.todos.$add({
			text: $scope.todoText,
			content: $scope.todoContent,
			completed: false
		});

		console.log("Funcionou!");

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