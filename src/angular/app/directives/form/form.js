(function() {
'use strict';
	var ID = 'scmForm';

	angular.module('adstreamJsonSchemaUI')
	.directive(ID, [
		function() {
			return {
				scope:{
					groups:'=',
					data:'='
				},
				restrict: "E",
				replace:true,
				templateUrl: "/schema/form/form.html"
			};
		}
	]);
})();