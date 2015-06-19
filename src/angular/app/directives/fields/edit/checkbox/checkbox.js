(function() {
    'use strict';
    var ID = 'scmFieldsEditCheckbox';
    angular.module('adstreamJsonSchemaUI')
    .directive(ID, [
        function() {
            return {
                restrict: "E",
                replace: true,
                templateUrl: "/schema/fields/edit/checkbox/checkbox.html"
            }
        }
    ]);
})();
