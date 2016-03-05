(function() {
    'use strict';
    var ID = 'scmFieldSelect';
    angular.module('json-schema-ui')
    .directive(ID, ["$rootScope", "schemaFieldsService", "schemaStateService",
        function($rootScope, schemaFieldsService, schemaStateService) {
            return {
                restrict: "E",
                replace: true,
                templateUrl: "/schema/field/select/select.html",
                link: function(scope, element, attrs) {
                    scope.selected = {};
                    var updateCb = function() {
                        schemaFieldsService.getDictionary(scope.field.source).then(function(values){
                            var selectedItem = null;
                            if (!Array.isArray(values)) {
                                return console.error("json-schema-ui#scmFieldSelect: Expected Array, got: ", values);
                            }
                            scope.values = values;
                            scope.loading = values.length === 0;
                            selectedItem = schemaFieldsService.findSelectedItem(values, scope.field.path, scope.data);
                            if (selectedItem) {
                                scope.displayedValue = selectedItem.label;
                            }
                        });
                    };
                    updateCb();
                    scope.loading = true;
                    if (schemaStateService.get('i18n')) {
                        var token = schemaFieldsService.subscribeOnLocaleChanged(updateCb);
                        scope.$on('destroy', function() {
                            schemaFieldsService.unsubscribeOnLocaleChanged(token);
                        });
                    }
                }
            }
        }
    ]);
})();
