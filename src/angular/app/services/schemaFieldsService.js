(function(){
	'use strict';
	var ID = "schemaFieldsService";

	angular.module("json-schema-ui")
	.service(ID, ["$q", "$rootScope", "$http", "schemaStateService",
		function schemaFieldsService($q, $rootScope, $http, schemaStateService) {
			var store = {},
				fetchDictionary = function(source) {
					var df = $q.defer(),
						endPoint = schemaStateService.get("dictionaryEndpoint"),
						dParser = schemaStateService.get("dictionaryParser"),
						resource = function(source) {
							var url = [endPoint || "dictionaries", source].join('/');
							return $http.get(url, {cache: true});
						};
					if (store[source]) {
						df.resolve(store[source]);
					} else {
						resource(source).then(function(res){
							store[source] = dParser ? dParser(res.data): res.data;
							df.resolve(store[source]);
						}.bind(this));
					}
					return df.promise;
				};
			return {
				getDictionary: function(source, cb) {
					var df = $q.defer(),
	                    isTranslated = schemaStateService.get('i18n'),
						loadValues = function(locale) {
							fetchDictionary(source).then(function(values) {
								cb(isTranslated ? values[locale || 'en'] : values);
							});
						};
					if (isTranslated) {
                        $rootScope.$on('$translateChangeSuccess', function(event, obj){
							var value = (obj.language || "").split("-")[0];
							loadValues(value);
                        });
                    }
					loadValues();
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
