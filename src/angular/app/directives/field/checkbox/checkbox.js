(function() {
    'use strict';
    var ID = 'scmFieldCheckbox';
    angular.module('json-schema-ui')
    .directive(ID, [
        function() {
            return {
                restrict: "E",
                replace: true,
                templateUrl: "/schema/field/checkbox/checkbox.html"
            }
        }
    ]);
})();
