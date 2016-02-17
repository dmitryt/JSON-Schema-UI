(function(){
	'use strict';
	var ID = "schemaDictionaryService";

	angular.module("json-schema-ui")
	.service(ID, ["$q", "schemaUtils", "schemaDictionaryResource", "schemaStateService",
		function schemaDictionaryService($q, schemaUtils, schemaDictionaryResource, schemaStateService) {
			var dParser = schemaStateService.get("dictionaryParser");
			return {
				loadData: function(field) {
					var df = $q.defer();
					schemaDictionaryResource.get(field.source)
					.then(function(res){
						var d = res.data || [];
						df.resolve(dParser ? dParser(d) : d);
					});
					return df.promise;
				}
			};
		}
	]);
})();
