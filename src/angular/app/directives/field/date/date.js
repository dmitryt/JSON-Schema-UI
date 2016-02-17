(function() {
    var ID = 'scmFieldDate';

angular.module('json-schema-ui')
.directive(ID, [
    function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: "/schema/field/date/date.html",
            link: function(scope, element, attrs) {
                scope.open = function() {
                    scope.opened = true;
                };

                scope.dateOptions = {
                    formatYear: 'yy',
                    startingDay: 1
                };

                // TODO => Move to settings
                scope.format = 'dd/MM/yyyy';
            }
        };
    }
]);

})();
