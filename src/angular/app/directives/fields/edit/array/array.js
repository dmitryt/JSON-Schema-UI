(function() {
	'use strict';
    var ID = 'scmFieldsEditArray';

	angular.module('adstreamJsonSchemaUI')
	.directive(ID, [
		function() {
			return {
				restrict: 'E',
				replace: true,
				templateUrl: "/schema/fields/edit/array/array.html",
				controller: function($scope) {
					$scope.values = Array.isArray($scope.field.value) ? $scope.field.value : [{}];
				},
				link: function(scope) {
					var values = scope.values;
					scope.onAdd = function() {
						if (Array.isArray(values)) {
							values.unshift({});
						}
					};
					scope.onRemove = function(index) {
						if (Array.isArray(values)) {
							values.splice(index, 1);
						}
					};
				}
			};
		}
	]);
})();
