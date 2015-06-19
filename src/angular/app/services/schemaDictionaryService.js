(function(){
	'use strict';
	var ID = "schemaDictionaryService";

	angular.module("adstreamJsonSchemaUI")
	.service(ID, ["$q", "schemaUtils", "schemaDictionaryResource",
		function schemaDictionaryService($q, schemaUtils, schemaDictionaryResource) {
			var resource = schemaDictionaryResource(),
				get = function(field, data, cb) {
					var params = {dictionaryName: field.name, type: 'full'};
					if (field.scope === 'agency') {
                        params.agency = schemaUtils.getObject('agency._id', data);
                    }
                    resource.get(params, cb);
				},
				findValues = function(field, data, dict) {
					var hierarchy = field.hierarchy || [],
						index = hierarchy.indexOf(field.path),
						hierarchyValuePaths = hierarchy.slice(0, index + 1)
							.map(function(path){
								var v = schemaUtils.getObject(path, data);
								return v ? String(v).toLowerCase() : null;
							})
							.filter(Boolean)
							.map(function(v){
								return [v, 'values'].join('.');
							}),
						path = ['values'].concat(hierarchyValuePaths).join('.'),
						valuesObj = schemaUtils.getObject(path, dict),
						result = [];
					angular.forEach(valuesObj, function(o){
						result.push({key: o.key, name: o.name || o.key});
					});
					return result;
				};
			return {
				getValues: function(field, data) {
					var df = $q.defer();
					get(field, data, function(dict){
						df.resolve(findValues(field, data, dict));
					});
					return df.promise;
				}
			};
		}
	]);
})();