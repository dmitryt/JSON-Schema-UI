(function() {
    'use strict';
    var ID = 'scmFieldSelect';
    angular.module('json-schema-ui')
    .directive(ID, ["schemaFieldsService",
        function(schemaFieldsService) {
            return {
                restrict: "E",
                replace: true,
                templateUrl: "/schema/field/select/select.html",
                link: function(scope, element, attrs) {
                    schemaFieldsService.loadDictionary(scope.field.source)
                    .then(function(values){
                        scope.values = values;
                        scope.loading = values.length === 0;
                    });
                    scope.loading = true;
                }
            }
        }
    ]);
})();
