(function() {
    'use strict';
    var ID = 'scmFieldRadio';
    angular.module('json-schema-ui')
    .directive(ID, ["schemaFieldsService",
        function(schemaFieldsService) {
            return {
                restrict: "E",
                replace: true,
                templateUrl: "/schema/field/radio/radio.html",
                link: function(scope, element, attrs) {
                    var updateValues = function() {
                        schemaFieldsService.loadDictionary(scope.field.source)
                        .then(function(values){
                            scope.values = values;
                        });
                    };
                    updateValues();
                }
            }
        }
    ]);
})();
