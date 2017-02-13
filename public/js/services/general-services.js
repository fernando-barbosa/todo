angular.module('generalServices', ['ngResource'])
.factory('dataResource', function($resource) {
	return $resource('', null, {
		'update' : {
			method : 'PUT'
		}
	});
});