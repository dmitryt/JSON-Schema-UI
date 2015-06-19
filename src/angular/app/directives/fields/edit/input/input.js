(function() {
    'use strict';
    var ID = 'scmFieldsEditInput';
    angular.module('adstreamJsonSchemaUI')
    .directive(ID, [
        function() {
            return {
                restrict: "E",
                replace: true,
                templateUrl: "/schema/fields/edit/input/input.html"
            }
        }
    ]);
})();
