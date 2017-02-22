'use strict';

angular
	.module('app.core')
	.factory('LocalStorageServices', dataLocalStorageService);

function dataLocalStorageService() {

	var saved;
	var todos;

	saved = localStorage.getItem('todos');
	todos = (localStorage.getItem('todos')!==null) ? JSON.parse(saved) : [  ];
	localStorage.setItem('todos', JSON.stringify(todos))

	function addLocalStorage() {
		var todoText;
		var todoContent;

		todos.push({
			text: todoText,
			content: todoContent,
			done: false
		});

		todoText = ''; //clear the input after adding
		todoContent = ''; //clear the input after adding
		localStorage.setItem('todos', JSON.stringify(todos));

		console.log('Adicionado ao local storage com sucesso!');

		return todos;
	};

	function remaining() {
		var count = 0;
		angular.forEach(todos, function(todo){
			count+=todo.done ? 0 : 1;
		});
		return count;
	};

	function removeLocalStorage() {
		var oldTodos = todos;
		todos = [];

		angular.forEach(oldTodos, function(todo){
			if (!todo.done)
				todos.push(todo);
			console.log('Removido do local storage com sucesso!');
		});

		localStorage.setItem('todos', JSON.stringify(todos)); 
	};

	return {
		addLocalStorage: addLocalStorage,
		remaining: remaining,
		removeLocalStorage: removeLocalStorage
	}

}