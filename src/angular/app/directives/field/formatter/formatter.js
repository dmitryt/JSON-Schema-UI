(function() {
    'use strict';
    var ID = 'scmFieldFormatter';

    angular.module('json-schema-ui')
    .directive(ID, ["$parse",
        function($parse) {
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
                        FORMATTERS = {
                            
                        },
                        PARSERS = {
                            date: function(value) {
                                var result = value,
                                    mode = $parse("field.view.minMode")(scope);
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
                        };
                    if (PARSERS[type]) {
                        ngModel.$parsers.push(PARSERS[type]);
                    }
                    if (FORMATTERS[type]) {
                        ngModel.$formatters.push(FORMATTERS[type]);
                    }
                }
            };
        }
    ]);

})();
