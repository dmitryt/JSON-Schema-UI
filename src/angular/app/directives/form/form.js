(function() {
'use strict';
	var ID = 'scmForm';

	angular.module('json-schema-ui')
	.directive(ID, ["$parse", "schemaFieldsService",
		function($parse, schemaFieldsService) {
			return {
				scope:{
					schema:'=',
					data:'=',
					isReadonly: "=",
					subPath: "@"
				},
				restrict: "E",
				replace:true,
				templateUrl: "/schema/form/form.html",
				link: function(scope, element, attrs) {
					var url;
                    if (Array.isArray(scope.schema)) {
						scope.fields = scope.schema;
					} else if (typeof scope.schema === 'string') {
						url = scope.schema.split('@');
						schemaFieldsService.loadSchema(url[0])
						.then(function(res){
							var data = res.data,
								path = url[1];
							scope.fields = path ? $parse(path)(data) : data;
						});
					}
                }
			};
		}
	]);
})();
