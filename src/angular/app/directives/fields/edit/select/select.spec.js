describe('scmFieldsEditSelect', function(){
    var $q,
        $compile,
        $parse,
        $rootScope,
        hierarchy,
        getNewScope = function() {
            return $rootScope.$new();
        },
        createElement = function(updateScopeFn) {
            var scope = getNewScope(),
                element = $compile('<scm-fields-edit-select></scm-fields-edit-select>')(updateScopeFn(scope));
            scope.$digest();
            return element;
        },
        initFieldScope = function(path, data) {
            return function(scope) {
                scope.data = data;
                scope.field = {
                    type: 'dictionary',
                    relativePath: path,
                    path: path,
                    value: null,
                    hierarchy: [
                        "_cm.asset.common.advertiser",
                        "_cm.asset.common.brand",
                        "_cm.asset.common.sub_brand",
                        "_cm.asset.common.product"
                    ]
                };
                return scope;
            }
        },
        installHierarchy = function() {
            var data = {},
                parent = createElement(initFieldScope('_cm.asset.common.advertiser', data)),
                child = createElement(initFieldScope('_cm.asset.common.brand', data));
            return {parent: parent, child: child};
        },
        cleanObject = function(o) {
            return angular.fromJson(angular.toJson(o));
        },
        setObject = function(path, value, o) {
            var aPath = (path || "").split("."),
                acc = o;
            for (var i = 0; i < aPath.length; i++) {
                if (i < aPath.length - 1) {
                    if (typeof acc[aPath[i]] !== 'object' || acc[aPath[i]] === null) {
                        acc[aPath[i]] = {};
                    }
                } else {
                    acc[aPath[i]] = value;
                }
                acc = acc[aPath[i]];
            }
        };

    beforeEach(module('/schema/fields/edit/select/select.html'));
    beforeEach(module('adstreamJsonSchemaUI', function($provide) {
        var mockService = {
                getValues: function(field, data) {
                    var df = $q.defer(),
                        store = {
                            "_cm.asset.common.advertiser": [{key: "Adv1", name: "adv1"}, {key: "Adv2", name: "adv2"}],
                            "_cm.asset.common.brand": [{key: "Brand1", name: "brand1"}, {key: "Brand2", name: "brand2"}]
                        },
                        values = store[field.relativePath],
                        index = field.hierarchy.indexOf(field.relativePath),
                        allPreviousValuesAreFilled = function(index) {
                            while (--index >= 0) {
                                if (!mockUtils.getObject(field.hierarchy[index], data)) {
                                    return false;
                                }
                            }
                            return true;
                        };
                    if (index > 0 && !allPreviousValuesAreFilled(index)) {
                        values = [];
                    }
                    df.resolve(values);
                    return df.promise;
                }
            },
            mockUtils = {
                getObject: function(path, o) {
                    var result = o,
                        aPath = (path || "").split('.');
                    for (var i = 0; i < aPath.length; i++) {
                        if (result === undefined) {
                            break;
                        }
                        result = result[aPath[i]];
                    }
                    return result;
                }
            };
        $provide.value("schemaDictionaryService", mockService);
        $provide.value("schemaUtils", mockUtils);
    }));
    beforeEach(inject(function(_$q_, _$compile_, _$rootScope_, _$parse_){
        $q = _$q_;
        $compile = _$compile_;
        $parse = _$parse_;
        $rootScope = _$rootScope_;

        hierarchy = installHierarchy();
    }));

    afterEach(function(){
        hierarchy = null;
    });

    it('should update child dropdown with values, according to the hierarchy', function(){
        var pScope = hierarchy.parent.scope(),
            cScope = hierarchy.child.scope(),
            getValues = function(scope) {
                return scope.fieldModel && scope.fieldModel.values;
            };
        expect(cleanObject(getValues(pScope))).toEqual([{key: "Adv1", name: "adv1"}, {key: "Adv2", name: "adv2"}]);
        expect(getValues(cScope)).toEqual([]);
        setObject("_cm.asset.common.advertiser", "Adv1", pScope.data);
        cScope.$apply();
        expect(cleanObject(getValues(cScope))).toEqual([{key: "Brand1", name: "brand1"}, {key: "Brand2", name: "brand2"}]);
    });

    it('should disable child control, when there is no selected value in parent control', function(){
        var pScope = hierarchy.parent.scope(),
            cScope = hierarchy.child.scope(),
            getValues = function(scope) {
                return scope.fieldModel && scope.fieldModel.values;
            },
            getDisabled = function(scope) {
                return scope.fieldModel && scope.fieldModel.disabled;
            };
        expect(cleanObject(getValues(pScope))).toEqual([{key: "Adv1", name: "adv1"}, {key: "Adv2", name: "adv2"}]);
        expect(getValues(cScope)).toEqual([]);
        setObject("_cm.asset.common.advertiser", "Adv1", pScope.data);
        cScope.$apply();
        expect(getDisabled(cScope)).toBeFalsy();
        setObject("_cm.asset.common.advertiser", undefined, pScope.data);
        cScope.$apply();
        expect(getDisabled(cScope)).toBeTruthy();
    });
});