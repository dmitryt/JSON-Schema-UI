(function() {
    'use strict';
    var ID = 'scmFieldInput';
    angular.module('json-schema-ui')
    .directive(ID, ["$parse", "schemaFieldsService",
        function($parse, schemaFieldsService) {
            return {
                restrict: "E",
                replace: true,
                templateUrl: "/schema/field/input/input.html",
                link: function(scope, element, attrs) {
                    var PREDEFINED_INPUT_TYPES = {
                        "email": "email",
                        "password": "password"
                    };
                    scope.pattern = schemaFieldsService.getPattern(scope.field.type);
                    scope.type = PREDEFINED_INPUT_TYPES[scope.field.type] || 'text';
                    scope.validate = function () {
                        if (!scope.pattern) {
                            return true;
                        }
                        return scope.pattern.test($parse(scope.field.path)(scope.data));
                    };
                }
            }
        }
    ]);
})();
