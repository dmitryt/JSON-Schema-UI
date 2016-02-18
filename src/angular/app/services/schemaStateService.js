(function(){
	'use strict';
	var ID = "schemaStateService";

	angular.module("json-schema-ui")
	.provider(ID, [
		function schemaStateServiceProvider() {
            var config = {};
			return {
				configure: function(_config) {
					angular.merge(config, _config || {});
				},
				$get: ["$parse", function schemaStateService($parse) {
					return {
						get: function(key) {
							return $parse(key)(config);
						}
					};
				}]
			}
		}
	]);
})();
