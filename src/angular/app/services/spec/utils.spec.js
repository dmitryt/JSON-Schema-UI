describe('schemaUtils', function(){
    var utils;
    beforeEach(module('json-schema-ui'));
    beforeEach(inject(function(_schemaUtils_){
        utils = _schemaUtils_;
    }));

    it('should hide groups correctly', function(){
        var expectedHiddenGroups = [
                {fields: []},
                {fields: [{}], hidden: true}
            ],
            expectedResults = expectedHiddenGroups.map(utils.isGroupVisibleForEdit);
        expect(utils.isGroupVisibleForEdit({fields: [{}]})).toBeTruthy();
        expect(expectedResults).toEqual([false, false]);
        expect(utils.isGroupVisibleForEdit({fields: [{}, {}]}, true, function(fields){
            return false;
        })).toBeFalsy();
    });

    it('should hide fields correctly', function(){
        var expectedHiddenFields = [
                {hidden: true},
                {view: {deleted: true}},
                {view: {e: {visible: false}}},
                {view: {e: {hidden: true}}}
            ],
            expectedResults = expectedHiddenFields.map(utils.isFieldVisibleForEdit);
        expect(expectedResults).toEqual([false, false, false, false]);
        expect(utils.isFieldVisibleForEdit({}, true)).toBeFalsy();

    });
});