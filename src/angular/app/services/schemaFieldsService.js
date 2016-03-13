(function(){
	'use strict';
	var ID = "schemaFieldsService";

	angular.module("json-schema-ui")
	.service(ID, ["$q", "$parse", "$rootScope", "$http", "schemaStateService",
		function schemaFieldsService($q, $parse, $rootScope, $http, schemaStateService) {
			var store = {},
				localeChangedListeners = {},
				selectedLocale = null,
				localeChangedIndex = 0,
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
			$rootScope.$on('$translateChangeSuccess', function(event, obj){
				var locale = (obj.language || "").split("-")[0];
				selectedLocale = locale;
				angular.forEach(localeChangedListeners, function(fn) {
					if (angular.isFunction(fn)) {
						fn();
					}
				});
			});
			return {
				getDictionary: function(source) {
					var df = $q.defer(),
	                    isTranslated = schemaStateService.get('i18n');
					fetchDictionary(source).then(function(values) {
						df.resolve(isTranslated ? values[selectedLocale || 'en'] : values);
					});
					return df.promise;
				},
				subscribeOnLocaleChanged: function(cb) {
					localeChangedListeners[++localeChangedIndex] = cb;
				},
				unsubscribeOnLocaleChanged: function(index) {
					delete localeChangedListeners[index];
				},
				findSelectedItem: function(values, path, data) {
					var selectedValue = $parse(path)(data || {}),
						selectedItem = null;
					if (selectedValue) {
						selectedItem = (values || []).filter(function(item) {
							return item.key === selectedValue;
						})[0];
					}
					return selectedItem;
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
						"email": "scm-field-input",
						"password": "scm-field-input",
                        "textarea": "scm-field-textarea",
                        "select": "scm-field-select",
                        "date": "scm-field-date",
                        "checkbox": "scm-field-checkbox",
						"radio": "scm-field-radio",
                        "array": "scm-field-array"
                    }[type];
				},
				getPattern: function(key) {
					return {
						"email": /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/
					}[key];
				},
				setModelValidators: function(ngModel, validators, acc) {
					if (Array.isArray(validators)) {
						validators.forEach(function(v){
							var _key = v.key || v.label;
							ngModel.$validators[_key] = function() {
								return acc[_key] = v.fn.apply(v.fn, arguments);
							};
						});
					}
				}
			};
		}
	]);
})();
