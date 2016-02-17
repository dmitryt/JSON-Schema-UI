describe('scmFieldsEditFormatter', function(){
    var $compile,
        $parse,
        scope;

    beforeEach(module('json-schema-ui'));
    beforeEach(inject(function(_$compile_, _$rootScope_, _$parse_){
        $compile = _$compile_;
        $parse = _$parse_;
        scope = _$rootScope_.$new();
    }));

    it('should preprocess data with correct path', function(){
        var path = '_cm.common.title',
            updateScope = function(scope) {
                scope.field = {
                    type: 'string',
                    relativePath: path,
                    path: path,
                    value: null
                };
                scope.data = {};
                return scope;
            },
            element = $compile('<input type="text" ng-model scm-field-formatter />')(updateScope(scope));
        scope.$digest();
        element.val('123').trigger('input');
        scope.$apply();
        expect($parse(path)(scope.data)).toEqual('123');
    });
});