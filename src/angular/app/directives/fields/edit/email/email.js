(function() {
    'use strict';
    var ID = 'scmFieldsEditEmail';
    angular.module('adstreamJsonSchemaUI')
    .directive(ID, [
        function() {
            return {
                restrict: "E",
                replace: true,
                templateUrl: "/schema/fields/edit/email/email.html"
            }
        }
    ]);
})();
