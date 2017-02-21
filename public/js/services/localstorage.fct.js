'use strict';

angular
	.module('app.services')
	.factory('localStorageServices', dataLocalService);

 function dataLocalService($scope) {

	// var todoLocalStorageID;

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

}