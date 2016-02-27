(function() {
    'use strict';
    var ID = 'scmFieldSelect';
    angular.module('json-schema-ui')
    .directive(ID, ["$rootScope", "$parse", "schemaFieldsService", "schemaStateService",
        function($rootScope, $parse, schemaFieldsService, schemaStateService) {
            return {
                restrict: "E",
                replace: true,
                templateUrl: "/schema/field/select/select.html",
                link: function(scope, element, attrs) {
                    scope.selected = {};
                    schemaFieldsService.getDictionary(scope.field.source, function(values){
                        var selectedValue = $parse(scope.field.path)(scope.data),
                            selectedItem = null;
                        if (!Array.isArray(values)) {
                            return console.error("json-schema-ui#scmFieldSelect: Expected Array, got: ", values);
                        }
                        scope.values = values;
                        scope.loading = values.length === 0;
                        if (selectedValue) {
                            selectedItem = values.filter(function(item) {
                                return item.key === selectedValue;
                            })[0];
                        }
                        if (selectedItem) {
                            scope.selected.label = selectedItem.label;
                        }
                    });
                    scope.loading = true;
                }
            }
        }
    ]);
})();
