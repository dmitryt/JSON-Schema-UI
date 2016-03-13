(function() {
    'use strict';
    var ID = 'scmField',
        TEMPLATE_PATH = "/schema/field/field.html";

    angular.module('json-schema-ui')
    .directive(ID, [
        "$compile",
        "$parse",
        "$templateCache",
        "schemaFieldsService",
        function($compile, $parse, $templateCache, schemaFieldsService) {
            return {
                scope: {
                    field: '=',
                    data: '=',
                    isReadonly: "=",
                    subPath: "@"
                },
                restrict: "E",
                replace: true,
                templateUrl: TEMPLATE_PATH,
                link: {
                    pre: function preLink(scope, element, attrs) {
                        scope.$watch("field.path", function(value){
                            var modelPath = ["data", value].join(".");
                            if (angular.isDefined(value)) {
                                scope.displayedValue = $parse(modelPath)(scope);
                            }
                        });
                        scope.__meta__ = {};
                        scope.getValue = function(key) {
                            var path = scope.field.path,
                                pathArr = (scope.field.path || "").split('.');
                            if (key) {
                                pathArr[pathArr.length - 1] = key;
                                path = pathArr.join('.');
                            }
                            return $parse(path)(scope.data);
                        };
                    },
                    post: function postLink(scope, element, attrs) {
                        var sField = scope.field || {},
                            type = $parse("type")(sField),
                            tpl = $templateCache.get(TEMPLATE_PATH),
                            directiveName = $parse('directive')(sField) || schemaFieldsService.getDirectiveByType(type),
                            directiveStr = tpl.replace(/\%s/g, directiveName);
                        if (directiveName) {
                            element.replaceWith($compile(directiveStr)(scope));
                        } else {
                            console.error("[JSON-Schema-UI]: Directive is not supported", sField);
                        }
                    }
                }
            };
        }
    ]);

})();
