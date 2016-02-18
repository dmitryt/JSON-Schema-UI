(function(){
	'use strict';
	var ID = "schemaFieldsService";

	angular.module("json-schema-ui")
	.service(ID, ["$q", "$http", "schemaStateService",
		function schemaFieldsService($q, $http, schemaStateService) {
			return {
				loadDictionary: function(source) {
					var df = $q.defer(),
						endPoint = schemaStateService.get("dictionaryEndpoint"),
						dParser = schemaStateService.get("dictionaryParser"),
						resource = function(source) {
							var url = [endPoint || "dictionaries", source].join('/');
							return $http.get(url, {cache: true});
						};
					resource(source)
						.then(function(res){
							var d = res.data || [];
							df.resolve(dParser ? dParser(d) : d);
						});
					return df.promise;
				},
				loadSchema: function(source) {
					var df = $q.defer(),
						endPoint = schemaStateService.get("schemaEndpoint"),
						resource = function(source) {
							var url = [endPoint || "schemas", source].join('/');
							return $http.get(url, {cache: true});
						};
					return resource(source);
				},
				getDirectiveByType: function(type) {
					return {
                        "input": "scm-field-input",
                        "textarea": "scm-field-textarea",
                        "select": "scm-field-select",
                        "date": "scm-field-date",
                        "checkbox": "scm-field-checkbox",
						"radio": "scm-field-radio",
                        "array": "scm-field-array"
                    }[type];
				}
			};
		}
	]);
})();
