(function() {
    'use strict';
    var ID = 'scmFieldsEditEnum';
    angular.module('adstreamJsonSchemaUI')
    .directive(ID, [
        function() {
            return {
                restrict: "E",
                replace: true,
                templateUrl: "/schema/fields/edit/enum/enum.html"
            }
        }
    ]);
})();
