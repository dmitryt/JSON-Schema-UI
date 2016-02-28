(function() {
    var ID = 'scmFieldDate';

angular.module('json-schema-ui')
.directive(ID, ["$parse", "schemaStateService",
    function($parse, schemaStateService) {
        return {
            restrict: "E",
            replace: true,
            templateUrl: "/schema/field/date/date.html",
            link: function(scope, element, attrs) {
                var format = schemaStateService.get('dateFormat') || 'dd/MM/yyyy',
                    minMode = $parse("field.view.minMode")(scope);
                scope.today = new Date();
                scope.open = function() {
                    scope.popup.opened = true;
                };

                scope.dateOptions = {
                    formatYear: 'yy',
                    startingDay: 1
                };

                scope.popup = {
                    opened: false
                };

                scope.minMode = minMode || 'day';

                scope.format = minMode === 'year' ? 'yyyy' : format;
            }
        };
    }
]);

})();
