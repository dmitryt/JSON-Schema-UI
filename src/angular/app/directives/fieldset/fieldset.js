(function() {
'use strict';
	var ID = 'scmFieldset';

	angular.module('json-schema-ui')
	.directive(ID, ["$parse", "schemaFieldsService",
		function($parse, schemaFieldsService) {
			return {
				scope:{
					schema:'=',
					data:'=',
					isReadonly: "=",
					display: "@",
					subPath: "@"
				},
				restrict: "E",
				replace: true,
				templateUrl: "/schema/fieldset/fieldset.html",
				controller: ['$scope', function($scope) {
					this.getField = function(path) {
						if (Array.isArray($scope.fields)) {
							return $scope.fields.filter(function(f){
								return f.path === path;
							})[0];
						}
						return null;
					};
				}],
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
