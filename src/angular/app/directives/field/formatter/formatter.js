(function() {
    'use strict';
    var ID = 'scmFieldFormatter';

    angular.module('json-schema-ui')
    .directive(ID, ["$parse", "schemaFieldsService",
        function($parse, schemaFieldsService) {
            return {
                restrict: "A",
                priority: 2,
                require: "ngModel",
                controller: ["$scope", "$attrs",
                    function($scope, $attrs) {
                        var path = $parse("field.path")($scope),
                            modelPath = ["data", path].join(".");
                        $attrs["ngModel"] = modelPath;
                    }
                ],
                link: function(scope, element, attrs, ngModel) {
                    var type = $parse("field.type")(scope),
                        mode = $parse("field.view.minMode")(scope),
                        FORMATTERS = {
                            date: function(value) {
                                var result = value;
                                if (result && mode === 'year') {
                                    result = new Date(value, 0);
                                }
                                return result;
                            }
                        },
                        PARSERS = {
                            date: function(value) {
                                var result = value;
                                if (angular.isDate(value)) {
                                    result = value.toISOString();
                                    if (mode === 'year') {
                                        result = value.getFullYear();
                                    }
                                }
                                return result;
                            },
                            dictionary: function(value) {
                                return [value.key || value.name || value];
                            }
                        },
                        acc;
                    if (PARSERS[type]) {
                        ngModel.$parsers.push(PARSERS[type]);
                    }
                    if (FORMATTERS[type]) {
                        ngModel.$formatters.push(FORMATTERS[type]);
                    }
                    if (scope.field.validators) {
                        scope.__meta__.validation = acc = {};
                        schemaFieldsService.setModelValidators(ngModel, scope.field.validators, acc);
                    }
                }
            };
        }
    ]);

})();
