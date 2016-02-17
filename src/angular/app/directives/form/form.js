(function() {
'use strict';
	var ID = 'scmForm';

	angular.module('json-schema-ui')
	.directive(ID, [
		function() {
			return {
				scope:{
					fields:'=',
					data:'=',
					isReadonly: "=",
					subPath: "@"
				},
				restrict: "E",
				replace:true,
				templateUrl: "/schema/form/form.html"
			};
		}
	]);
})();
