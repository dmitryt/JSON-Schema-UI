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
                        var subPath = $parse("subPath")($scope),
                            path = $parse("field.path")($scope),
                            modelPath = ["data", path].join(".");
                        $attrs["ngModel"] = modelPath;
                    }
                ],
                link: function(scope, element, attrs, ngModel) {
                    var type = $parse("field.type")(scope),
                        FORMATTERS = {
                            dictionary: function(value) {
                                var s = scope,
                                    storeItem = null;
                                if (value) {
                                    storeItem = ($parse("fieldModel.values")(scope) || []).filter(function(i){
                                        return i.key == String(value);
                                    })[0];
                                }
                                return storeItem || value;
                            }
                        },
                        PARSERS = {
                            date: function(value) {
                                return angular.isDate(value) ? value.toISOString() : value;
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
