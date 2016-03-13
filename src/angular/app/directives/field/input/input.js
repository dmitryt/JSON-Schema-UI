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
                link: {
                    pre: function(scope, element, attrs) {
                        var type = scope.field.type;
                        if (type === 'email') {
                            scope.pattern = schemaFieldsService.getPattern(type);
                            scope.field.validators = [{
                                label: 'HINT_ACCEPTED',
                                fn: function(v) {
                                    return scope.pattern.test(v);
                                }
                            }];
                        }
                    }
                }
            }
        }
    ]);
})();
