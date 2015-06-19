(function(){
	'use strict';
	var ID = "schemaDictionaryResource";

	angular.module("adstreamJsonSchemaUI")
	.provider(ID,
		function schemaDictionaryResourceProvider() {
			var endPoint = null;
			return {
				setEndPoint: function(value) {
					endPoint = value;
				},
				$get: ["$resource", function($resource) {
					return function schemaDictionaryResource(params) {
						var path = [endPoint || "dictionaries", ":dictionaryName"].join('/'),
							_params = angular.extend(params || {}, {cache: true});
						return $resource(path, {dictionaryName: '@dictionaryName'}, _params);
					}
				}]
			}
		}
	);
})();