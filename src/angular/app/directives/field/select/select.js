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
                    var updateCb = function() {
                            schemaFieldsService.getDictionary(scope.field.source).then(function(values){
                                var selectedItem = null,
                                    applyFilters = function(values) {
                                        return values.filter(function(v) {
                                            return filters.indexOf(v.key) === -1;
                                        });
                                    };
                                if (!Array.isArray(values)) {
                                    return console.error("json-schema-ui#scmFieldSelect: Expected Array, got: ", values);
                                }
                                scope.values = scope.isReadonly ? values : applyFilters(values);
                                scope.loading = scope.values.length === 0;
                                selectedItem = schemaFieldsService.findSelectedItem(scope.values, scope.field.path, scope.data);
                                if (selectedItem) {
                                    scope.displayedValue = selectedItem.label;
                                }
                            });
                        },
                        filters = [],
                        subscribeOnLocaleChangedToken = null,
                        listeners = [];
                    updateCb();
                    if (schemaStateService.get('i18n')) {
                        subscribeOnLocaleChangedToken = schemaFieldsService.subscribeOnLocaleChanged(updateCb);
                    }
                    scope.loading = true;

                    if (!scope.isReadonly && scope.field.unique) {
                        listeners.push(scope.$on('JsonSchemaUi:scmFieldArray:onItemUpdate', function(event, data) {
                            filters = data.map(function(v){
                                return $parse(scope.field.path)(v);
                            });
                            updateCb();
                        }));
                    }

                    scope.$on('destroy', function() {
                        if (subscribeOnLocaleChangedToken) {
                            schemaFieldsService.unsubscribeOnLocaleChanged(subscribeOnLocaleChangedToken);
                        }
                        listeners.forEach(function(fn) {
                            if (angular.isFunction(fn)) {
                                fn();
                            }
                        });
                    });
                }
            }
        }
    ]);
})();
