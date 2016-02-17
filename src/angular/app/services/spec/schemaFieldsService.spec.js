describe('schemaFieldsService', function(){
    var service;
    beforeEach(module('json-schema-ui'));
    beforeEach(inject(function(_schemaFieldsService_){
        service = _schemaFieldsService_;
    }));

    it('support processing all major field types', function(){
        var expectedSupportedTypes = ["string", "text", "textarea", "dictionary", "date", "custom_code", "boolean", "integer", "email", "enum", "array"],
            result = expectedSupportedTypes.map(service.getDirectiveByType);
        expect(result).not.toContain(undefined);
    });
});