(function() {
    'use strict';
    var ID = 'scmFieldsEdit';

    angular.module('adstreamJsonSchemaUI')
    .directive(ID, [
        "$compile",
        "$parse",
        "schemaFieldsService",
        function($compile, $parse, schemaFieldsService) {
            return {
                scope: {
                    field: '=',
                    data: '='
                },
                restrict: "E",
                replace: true,
                link: function(scope, element, attrs) {
                    var type = $parse("view.template")(scope.field) || $parse("type")(scope.field),
                        directiveName = $parse('view.directive')(scope.field) || schemaFieldsService.getDirectiveByType(type),
                        directiveStr = '<%s class="size1of{{field.width || 1}}"></%s>'.replace(/\%s/g, directiveName);
                    if (directiveName) {
                        element.replaceWith($compile(directiveStr)(scope));
                    } else {
                        console.error("[Andstream-JSON-Schema-UI]: Directive is not supported", scope.field);
                    }
                }
            };
        }
    ]);

})();