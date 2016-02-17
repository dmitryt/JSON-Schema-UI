(function(){
	'use strict';
	var ID = "schemaDictionaryResource";

	angular.module("json-schema-ui")
	.service(ID, ["$http", "schemaStateService",
		function schemaDictionaryResource($http, schemaStateService) {
			var endPoint = schemaStateService.get("dictionaryEndpoint"),
				dParser = schemaStateService.get("dictionaryParser");
			return {
				get: function(source) {
					var url = [endPoint || "dictionaries", source].join('/');
					return $http.get(url, {cache: true});
				}
			};
		}
	]);
})();
