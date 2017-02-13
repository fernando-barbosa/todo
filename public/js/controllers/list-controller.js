angular.module('todo')
.controller('ListController', function($scope, dataResource) {
	$scope.items = [];

	$scope.delete = function(item) {
		dataResource.delete({itemId : item._id}, function() {

		});
	};
});