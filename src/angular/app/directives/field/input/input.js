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
                        },
                        type = scope.field.type,
                        pattern;
                    scope.type = PREDEFINED_INPUT_TYPES[type] || 'text';
                    if (type === 'email') {
                        scope.pattern = schemaFieldsService.getPattern(type);
                        scope.field.validators = [{
                            label: 'HINT_ACCEPTED',
                            fn: function() {
                                return scope.pattern.test($parse(scope.field.path)(scope.data));
                            }
                        }];
                    }
                }
            }
        }
    ]);
})();
