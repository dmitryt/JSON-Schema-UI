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
                    display: "@",
                    subPath: "@"
                },
                restrict: "E",
                replace: true,
                templateUrl: TEMPLATE_PATH,
                link: {
                    pre: function preLink(scope, element, attrs) {
                        var staticModel = $parse("field.model")(scope),
                            path = $parse("field.path")(scope),
                            getter = null,
                            modelRoot = null,
                            value = null,
                            initValue = function() {
                                var path = ['data', scope.field.path].join('.'),
                                    ftype = $parse('type')(scope.field),
                                    defaultValue = ftype === 'array' ? [] : '';
                                if (!$parse(path)(scope)) {
                                    $parse(path).assign(scope, defaultValue);
                                }
                            };
                        if (staticModel) {
                            modelRoot = ["data", path.split('@').reverse()[1]].filter(Boolean).join('.');
                            getter = $parse(modelRoot);
                            if (!getter(scope)) {
                                getter.assign(scope, angular.copy(staticModel));
                            }
                            scope.field.path = path.replace(/\@/g, '.');
                        }
                        scope.$watch("field.path", function(value){
                            var modelPath = ["data", value].join(".");
                            if (angular.isDefined(value)) {
                                scope.displayedValue = $parse(modelPath)(scope);
                            }
                        });
                        if (scope.field.path.indexOf('subPath') !== -1) {
                            scope.$watch("subPath", initValue);
                        } else {
                            initValue();
                        }
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
