(function() {
    'use strict';
    var ID = 'scmFieldRadio';
    angular.module('json-schema-ui')
    .directive(ID, ["schemaFieldsService", "schemaStateService",
        function(schemaFieldsService, schemaStateService) {
            return {
                restrict: "E",
                replace: true,
                templateUrl: "/schema/field/radio/radio.html",
                link: function(scope, element, attrs) {
                    var updateCb = function() {
                        schemaFieldsService.getDictionary(scope.field.source).then(function(values){
                            var selectedItem = null;
                            scope.values = values;
                            if (!Array.isArray(values)) {
                                return console.error("json-schema-ui#scmFieldRadio: Expected Array, got: ", values);
                            }
                            selectedItem = schemaFieldsService.findSelectedItem(values, scope.field.path, scope.data);
                            if (selectedItem) {
                                scope.displayedValue = selectedItem.label;
                            }
                        });
                    };
                    updateCb();
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
