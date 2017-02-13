angular.module('directives', [])
.directives('infoPanel', function() {
	var ddo = {};

	ddo.restrict = "AE";
	ddo.tranclude = true;

	ddo.scope = {
		title = '@'
	};

	ddo.templateUrl = 'js/directives/info-panel.html';

	return ddo;
});