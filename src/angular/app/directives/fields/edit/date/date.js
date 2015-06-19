(function() {
    var ID = 'scmFieldsEditDate';

angular.module('adstreamJsonSchemaUI')
.directive(ID, [
    function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: "/schema/fields/edit/date/date.html",
            link: function(scope, element, attrs) {
                scope.open = function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
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
