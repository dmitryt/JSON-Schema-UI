(function() {
	'use strict';
    var ID = 'scmFieldsEditArrayItem';

	angular.module('adstreamJsonSchemaUI')
	.directive(ID, ['schemaUtils',
		function(schemaUtils) {
			return {
				scope: {
					field: '=',
					data: '='
				},
				restrict: 'E',
				replace: true,
				transclude: true,
				templateUrl: "/schema/fields/edit/array/item/item.html",
				link: function(scope) {
					scope.isVisible = schemaUtils.isFieldVisibleForEdit;
				}
			};
		}
	]);
})();
