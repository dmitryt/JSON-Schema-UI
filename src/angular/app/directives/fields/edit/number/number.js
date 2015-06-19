(function() {
    'use strict';
    var ID = 'scmFieldsEditNumber';
    angular.module('adstreamJsonSchemaUI')
    .directive(ID, [
        function() {
            return {
                restrict: "E",
                replace: true,
                templateUrl: "/schema/fields/edit/number/number.html"
            }
        }
    ]);
})();
