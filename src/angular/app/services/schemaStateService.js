(function(){
	'use strict';
	var ID = "schemaStateService";

	angular.module("json-schema-ui")
	.provider(ID,
		function schemaStateServiceProvider() {
            var store = {},
				availableOptions = ['dictionaryEndpoint', 'dictionaryParser'];
			return {
				set: function(key, value) {
					if (availableOptions.indexOf(key) !== -1) {
						store[key] = value;
					}
				},
				$get: [function schemaStateService() {
					return {
						get: function(key) {
							return store[key];
						}
					};
				}]
			}
		}
	);
})();
