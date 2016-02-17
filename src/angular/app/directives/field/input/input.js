(function() {
    'use strict';
    var ID = 'scmFieldInput';
    angular.module('json-schema-ui')
    .directive(ID, [
        function() {
            return {
                restrict: "E",
                replace: true,
                templateUrl: "/schema/field/input/input.html"
            }
        }
    ]);
})();
