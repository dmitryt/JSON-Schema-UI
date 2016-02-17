(function() {
    'use strict';
    var ID = 'scmFieldSelect';
    angular.module('json-schema-ui')
    .directive(ID, ["schemaDictionaryService",
        function(schemaDictionaryService) {
            return {
                restrict: "E",
                replace: true,
                templateUrl: "/schema/field/select/select.html",
                link: function(scope, element, attrs) {
                    var updateValues = function() {
                        schemaDictionaryService.loadData(scope.field)
                        .then(function(values){
                            scope.values = values;
                        });
                    };
                    updateValues();
                }
            }
        }
    ]);
})();
