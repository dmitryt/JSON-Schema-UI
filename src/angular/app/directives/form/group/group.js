(function() {
'use strict';
	var ID = 'scmFormGroup';

	angular.module('adstreamJsonSchemaUI')
	.directive(ID, [
		'schemaUtils',
		function(schemaUtils) {
			return {
				scope:{
					group:'=',
					data:'='
				},
				restrict: "E",
				replace:true,
				templateUrl: "/schema/form/group/group.html",
				link : function(scope) {
					scope.isEdit = true;
					scope.isView = false;
					scope.isGroupVisible = schemaUtils.isGroupVisibleForEdit;
				}
			};
		}
	]);
})();