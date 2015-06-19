(function() {
    'use strict';
    var ID = 'scmFieldsEditSelect';
    angular.module('adstreamJsonSchemaUI')
    .directive(ID, ["schemaDictionaryService",
        function(schemaDictionaryService) {
            return {
                restrict: "E",
                replace: true,
                templateUrl: "/schema/fields/edit/select/select.html",
                link: function(scope, element, attrs) {
                    var propSchema = scope.field,
                        hierarchy = propSchema.hierarchy || [],
                        parentPath = (function(hierarchy, path) {
                            var index = hierarchy.indexOf(path);
                            return index > 0 ? hierarchy[index - 1] : null;
                        })(hierarchy, propSchema.path),
                        updateValues = function() {
                            schemaDictionaryService.getValues(scope.field, scope.data)
                            .then(function(values){
                                scope.fieldModel.values = values;
                            });
                        };
                    scope.fieldModel = {
                        disabled: !!parentPath
                    };
                    scope.disabled = !!parentPath;
                    if (!!hierarchy.length && parentPath) {
                        scope.$watch(['data', parentPath].join('.'), function(value) {
                            scope.fieldModel.disabled = !angular.isDefined(value);
                            updateValues();
                        });
                    } else {
                        updateValues();
                    }
                }
            }
        }
    ]);
})();