(function() {
    'use strict';
    var ID = 'scmFieldTextarea';
    angular.module('json-schema-ui')
    .directive(ID, [
        function() {
            return {
                restrict: "E",
                replace: true,
                templateUrl: "/schema/field/textarea/textarea.html"
            }
        }
    ]);
})();
