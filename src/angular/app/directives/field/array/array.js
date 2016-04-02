(function() {
	'use strict';
    var ID = 'scmFieldArray';
	angular.module('json-schema-ui')
	.directive(ID, ["$parse", "$q",
		function($parse, $q) {
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
						var cb = function() {
								var fm = scope.formModel,
									modelItem = _field.modelItem ? angular.extend({}, _field.modelItem, fm) : fm;
								if (scope.editItemIndex > -1) {
									values[scope.editItemIndex] = modelItem;
				                } else {
									values.unshift(modelItem);
				                }
								scope.resetForm();
							},
							values = scope.values;
						if (_field.unique) {
							var fieldObject = _field.fields.filter(function(o){
									return o.path === _field.unique;
								})[0],
								fieldValues = values.map(function(o){
									return $parse(fieldObject.path)(o);
								}),
								fieldUniqueIndex = fieldValues.indexOf($parse(fieldObject.path)(scope.formModel)),
								df = $q.defer();
							if (fieldUniqueIndex !== -1 && scope.editItemIndex === -1) {
								scope.$emit('Json-Schema-Ui:scmFieldArray#onItemUpdate', {df: df, fieldLabel: $parse('view.label')(fieldObject)});
								df.promise.then(function(){
									scope.editItemIndex = fieldUniqueIndex;
									cb();
								});
							} else {
								cb();
							}
						} else {
							cb();
						}
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
