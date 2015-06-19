describe('schemaDictionaryService', function(){
    describe("Asynchronous specs", function() {
        var $rootScope,
            data,
            service,
            dict,
            field,
            df,
            getFixture = function(name) {
                return loadJSONFixtures(name)[name];
            };
        beforeEach(module('adstreamJsonSchemaUI', function($provide) {
            var mockResource = function() {
                    return {
                        get: function(params, cb){
                            if (cb) {
                                cb(dict);
                            }
                        }
                    }
                },
                mockUtils = {
                    getObject: function(path, o) {
                        var result = o,
                            aPath = (path || "").split('.');
                        for (var i = 0; i < aPath.length; i++) {
                            result = result[aPath[i]];
                            if (result === undefined) {
                                break;
                            }
                        }
                        return result;
                    }
                };
            $provide.value("schemaDictionaryResource", mockResource);
            $provide.value("schemaUtils", mockUtils);
        }));

        beforeEach(inject(function (_$rootScope_, _$q_, _schemaDictionaryService_) {
            $rootScope = _$rootScope_;
            df = _$q_.defer();
            jasmine.getJSONFixtures().fixturesPath = 'base/app/fixtures';
            service = _schemaDictionaryService_;
            data = {
                _cm: {asset: {common: {advertiser: ["Nokia"]}}}
            };
            dict = getFixture("advertiser.json");
            field = {
              "description": "Brand",
              "name": "advertiser",
              "tags": [
                "ordering"
              ],
              "type": "dictionary",
              "relativePath": "_cm.asset.common.brand",
              "path": "_cm.asset.common.brand",
              "width": 1,
              "hierarchy": [
                "_cm.asset.common.advertiser",
                "_cm.asset.common.brand",
                "_cm.asset.common.sub_brand",
                "_cm.asset.common.product"
              ]
            };
        }));

        afterEach(function(){
            dict = null;
            groups = null;
        });

        it('should fetch all values from dictionary for a given field', function(){
            var expectedValues = [{key: 'Brand', name: 'Brand'}, {key: 'Brand 2', name: 'Brand 2'}],
                receivedResults;
            service.getValues(field, data).then(function(r){
                receivedResults = r;
            });
            $rootScope.$apply();
            expect(receivedResults).toEqual(expectedValues);
        });
    });
});