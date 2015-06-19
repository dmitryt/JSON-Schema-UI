(function(){
	'use strict';
	var ID = "schemaFieldsService";

	angular.module("adstreamJsonSchemaUI")
	.service(ID, [
		function schemaFieldsService() {
			return {
				getDirectiveByType: function(type) {
					return {
                        "string": "scm-fields-edit-input",
                        "text": "scm-fields-edit-textarea",
                        "textarea": "scm-fields-edit-textarea",
                        "dictionary": "scm-fields-edit-select",
                        "date": "scm-fields-edit-date",
                        "custom_code": "scm-fields-edit-input",
                        "boolean": "scm-fields-edit-checkbox",
                        "integer": "scm-fields-edit-number",
                        "email": "scm-fields-edit-email",
                        "enum": "scm-fields-edit-enum",
                        "array": "scm-fields-edit-array"
                    }[type];
				}
			};
		}
	]);
})();