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
                link: function postLink(scope, element, attrs) {
                    var sField = scope.field || {},
                        type = $parse("type")(sField),
                        tpl = $templateCache.get(TEMPLATE_PATH),
                        directiveName = type ? schemaFieldsService.getDirectiveByType(type) : $parse('directive')(sField),
                        directiveStr = tpl.replace(/\%s/g, directiveName);
                    if (directiveName) {
                        element.replaceWith($compile(directiveStr)(scope));
                    } else {
                        console.error("[JSON-Schema-UI]: Directive is not supported", sField);
                    }
                    scope.displayedValue = $parse(scope.field.path)(scope.data);
                }
            };
        }
    ]);

})();
