(function() {
	'use strict';
    var ID = 'scmFieldArray';

	angular.module('json-schema-ui')
	.directive(ID, ["$parse",
		function($parse) {
			return {
				restrict: 'E',
				replace: true,
				templateUrl: "/schema/field/array/array.html",
				link: function(scope) {
					var _field = scope.field,
						getOrInitArray = function() {
							var getter = $parse(_field.path),
								setter = getter.assign;
							if (!angular.isDefined(getter(scope.data))) {
								setter(scope.data, []);
							}
							return getter(scope.data);
						};

					scope.values = getOrInitArray();
					scope.onSaveItem = function() {
		                if (scope.editItemIndex > -1) {
							scope.values[scope.editItemIndex] = scope.formModel;
		                } else {
							scope.values.unshift(scope.formModel);
		                }
						scope.resetForm();
					};
					scope.onRemoveItem = function(index) {
						scope.values.splice(index, 1);
					};
					scope.onEditItem = function(index) {
						scope.formModel = angular.copy(scope.values[index]);
		                scope.editItemIndex = index;
					};
					scope.resetForm = function() {
						scope.formModel = {};
		                scope.editItemIndex = -1;
					};
					scope.resetForm();
				}
			};
		}
	]);
})();
